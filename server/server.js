import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { db, initDb } from "./db.js";
import { authMiddleware, generateToken, sanitizeObject } from "./auth.js";
import bcrypt from "bcryptjs";
import UAParser from "ua-parser-js";
import multer from "multer";
import fs from "fs";

dotenv.config();

const app = express(); // ✅ MUST BE FIRST
const PORT = process.env.PORT || 4000;

/* ================= FILE PATH SETUP ================= */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const clientDistPath = path.join(__dirname, "..", "dist");

/* ================= INIT DB ================= */
initDb();

const uploadDir = path.join(process.cwd(), "uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
} 

/* ================= MULTER (FILE UPLOAD) ================= */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads"); // ✅ must match folder name
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

/* ================= MIDDLEWARE ================= */
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        ...helmet.contentSecurityPolicy.getDefaultDirectives(),
        "img-src": [
          "'self'",
          "data:",
          "https://purecatamphetamine.github.io",
        ],
      },
    },
  })
);

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(morgan("dev"));

/* ================= RATE LIMIT ================= */
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
  message: "Too many requests, please try again later.",
});

/* ================= HELPER ================= */
function getClientIp(req) {
  const forwarded =
    req.headers["x-forwarded-for"] ||
    req.headers["x-real-ip"] ||
    req.connection?.remoteAddress ||
    req.socket?.remoteAddress;

  if (!forwarded) return "";
  if (typeof forwarded === "string") {
    return forwarded.split(",")[0].trim();
  }
  return forwarded[0];
}

/* ================= HEALTH ================= */
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

/* ================= LOGIN ================= */
app.post("/api/login", (req, res) => {
  const body = sanitizeObject(req.body);
  const { email, password } = body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  db.get("SELECT * FROM users WHERE email = ?", [email], (err, user) => {
    if (err) return res.status(500).json({ message: "Server error" });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const valid = bcrypt.compareSync(password, user.password);
    if (!valid)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = generateToken(user);

    res.json({
      token,
      user: { id: user.id, name: user.name, email: user.email },
    });
  });
});

/* ================= CONTACT API ================= */
app.post("/api/contact", contactLimiter, (req, res) => {
  const ipAddress = getClientIp(req);
  const userAgent = req.headers["user-agent"] || "";

  const parser = new UAParser(userAgent);
  const uaResult = parser.getResult();

  const body = sanitizeObject(req.body || {});
  const {
    name,
    email,
    phone,
    subject,
    message,
    screenResolution,
    language,
    timezone,
    referrer,
    deviceType: clientDeviceType,
  } = body;

  if (!name || !email || !message) {
    return res
      .status(400)
      .json({ message: "Name, email and message are required" });
  }

  const browser = uaResult.browser?.name || "";
  const os = uaResult.os?.name || "";
  const deviceType =
    clientDeviceType || uaResult.device?.type || "desktop";

  db.run(
    `
    INSERT INTO contacts (
      name, email, phone, subject, message,
      ip_address, browser, os, device_type,
      screen_resolution, language, timezone,
      referrer, user_agent
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [
      name,
      email,
      phone || "",
      subject || "",
      message,
      ipAddress,
      browser,
      os,
      deviceType,
      screenResolution || "",
      language || "",
      timezone || "",
      referrer || "",
      userAgent,
    ],
    function (err) {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Failed to save contact" });
      }
      res.status(201).json({ message: "Contact saved" });
    }
  );
});
app.delete("/api/contacts/:id", (req, res) => {
  const { id } = req.params;

  db.run("DELETE FROM contacts WHERE id = ?", [id], function (err) {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to delete contact" });
    }

    res.json({ message: "Contact deleted successfully" });
  });
});

/* ================= ✅ CANDIDATE API (WITH RESUME) ================= */
app.post("/api/candidate", upload.single("resume"), (req, res) => {
  try {
    const { name, email, phone, current_role, message } = req.body;
    const file = req.file;

    // ✅ Check required fields
    if (!name || !email) {
      return res.status(400).json({ message: "Name & Email required" });
    }

    if (!file) {
      return res.status(400).json({ message: "Resume file is required" });
    }

    const resumePath = file.path.replace(/\\/g, "/"); // handle Windows paths

    db.run(
      `INSERT INTO candidates (name, email, phone, current_role, message, resume)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [name, email, phone || "", current_role || "", message || "", resumePath],
      function (err) {
        if (err) {
          console.error("DB ERROR:", err);
          return res.status(500).json({ error: err.message });
        }

        const newCandidate = {
          id: this.lastID,
          name,
          email,
          phone: phone || "",
          current_role: current_role || "",
          message: message || "",
          resume: resumePath,
          created_at: new Date().toISOString(),
        };

        // ✅ Return the new candidate so frontend can update immediately
        res.status(201).json({
          message: "Candidate saved successfully",
          candidate: newCandidate,
        });
      }
    );
  } catch (error) {
    console.error("SERVER ERROR:", error);
    res.status(500).json({ error: error.message });
  }
});
app.get("/api/candidates", (req, res) => {
  db.all("SELECT * FROM candidates", [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});
app.delete("/api/candidates/:id", (req, res) => {
  const { id } = req.params;

  db.run("DELETE FROM candidates WHERE id = ?", [id], function (err) {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to delete candidate" });
    }

    res.json({ message: "Candidate deleted successfully" });
  });
});

app.get("/api/candidates/:id/resume", (req, res) => {
  const { id } = req.params;
  const uploadsRoot = path.join(__dirname, "uploads");

  db.get("SELECT resume FROM candidates WHERE id = ?", [id], (err, row) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Failed to fetch resume" });
    }

    if (!row?.resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    const resumePath = row.resume.replace(/\\/g, "/");
    const absolutePath = path.resolve(__dirname, resumePath);

    if (!absolutePath.startsWith(uploadsRoot) || !fs.existsSync(absolutePath)) {
      return res.status(404).json({ message: "Resume file not found" });
    }

    res.download(absolutePath, path.basename(absolutePath));
  });
});
/* ================= PROTECTED ROUTES ================= */
app.get("/api/contacts", (req, res) => {
  db.all("SELECT * FROM contacts ORDER BY created_at DESC", [], (err, rows) => {
    if (err) return res.status(500).json({ message: "Error fetching" });
    res.json(rows);
  });
});

/* ================= STATIC FRONTEND ================= */
app.use(express.static(clientDistPath));
app.get("*", (req, res) => {
  res.sendFile(path.join(clientDistPath, "index.html"));
});

/* ================= START SERVER ================= */
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});