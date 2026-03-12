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

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const clientDistPath = path.join(__dirname, "..", "dist");

initDb();

app.use(helmet());
app.use(
  cors({
    origin: true, // reflect request origin
    credentials: true,
  })
);
app.use(express.json());
app.use(morgan("dev"));

// Rate limiting for contact form
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50, // limit each IP
  message: "Too many contact requests from this IP, please try again later.",
});

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

// Healthcheck
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

// Auth: POST /api/login
app.post("/api/login", (req, res) => {
  const body = sanitizeObject(req.body);
  const { email, password } = body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  db.get(
    "SELECT * FROM users WHERE email = ?",
    [email],
    (err, user) => {
      if (err) {
        console.error("Login DB error", err);
        return res.status(500).json({ message: "Internal server error" });
      }
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const valid = bcrypt.compareSync(password, user.password);
      if (!valid) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const token = generateToken(user);
      return res.json({
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      });
    }
  );
});

// Contact: POST /api/contact
app.post("/api/contact", contactLimiter, (req, res) => {
  const ipAddress = getClientIp(req);
  const headers = req.headers;
  const userAgent = headers["user-agent"] || "";

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
    clientDeviceType ||
    uaResult.device?.type ||
    "desktop";

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
        console.error("Error inserting contact", err);
        return res.status(500).json({ message: "Failed to save contact" });
      }
      return res.status(201).json({ id: this.lastID, message: "Contact saved" });
    }
  );
});

// Protected: GET /api/contacts
app.get("/api/contacts", authMiddleware, (req, res) => {
  const { search = "", deviceType = "", page = "1", limit = "10" } =
    req.query || {};

  const pageNum = Math.max(parseInt(page, 10) || 1, 1);
  const pageSize = Math.max(parseInt(limit, 10) || 10, 1);
  const offset = (pageNum - 1) * pageSize;

  const params = [];
  const where = [];

  if (search) {
    where.push("(name LIKE ? OR email LIKE ?)");
    const like = `%${search}%`;
    params.push(like, like);
  }

  if (deviceType) {
    where.push("device_type = ?");
    params.push(deviceType);
  }

  const whereClause = where.length ? `WHERE ${where.join(" AND ")}` : "";

  db.get(
    `SELECT COUNT(*) as total FROM contacts ${whereClause}`,
    params,
    (countErr, countRow) => {
      if (countErr) {
        console.error("Count contacts error", countErr);
        return res.status(500).json({ message: "Failed to fetch contacts" });
      }

      db.all(
        `
        SELECT *
        FROM contacts
        ${whereClause}
        ORDER BY created_at DESC
        LIMIT ? OFFSET ?
      `,
        [...params, pageSize, offset],
        (err, rows) => {
          if (err) {
            console.error("List contacts error", err);
            return res.status(500).json({ message: "Failed to fetch contacts" });
          }

          return res.json({
            data: rows,
            total: countRow?.total || 0,
            page: pageNum,
            limit: pageSize,
          });
        }
      );
    }
  );
});

// Protected: GET /api/contacts/:id
app.get("/api/contacts/:id", authMiddleware, (req, res) => {
  const { id } = req.params;

  db.get(
    "SELECT * FROM contacts WHERE id = ?",
    [id],
    (err, row) => {
      if (err) {
        console.error("Get contact error", err);
        return res.status(500).json({ message: "Failed to fetch contact" });
      }
      if (!row) {
        return res.status(404).json({ message: "Contact not found" });
      }
      return res.json(row);
    }
  );
});

// Protected: DELETE /api/contacts/:id
app.delete("/api/contacts/:id", authMiddleware, (req, res) => {
  const { id } = req.params;
  db.run(
    "DELETE FROM contacts WHERE id = ?",
    [id],
    function (err) {
      if (err) {
        console.error("Delete contact error", err);
        return res.status(500).json({ message: "Failed to delete contact" });
      }
      if (this.changes === 0) {
        return res.status(404).json({ message: "Contact not found" });
      }
      return res.json({ message: "Contact deleted" });
    }
  );
});

// Serve built frontend (Vite) from /dist when running in production
app.use(express.static(clientDistPath));
app.get("*", (req, res) => {
  res.sendFile(path.join(clientDistPath, "index.html"));
});

app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
});

