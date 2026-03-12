import jwt from "jsonwebtoken";
import xss from "xss";

const JWT_SECRET = process.env.JWT_SECRET || "dev_jwt_secret_change_me";
const JWT_EXPIRES_IN = "7d";

export function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      name: user.name,
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
}

export function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ")
    ? authHeader.slice(7)
    : null;

  if (!token) {
    return res.status(401).json({ message: "Authorization token missing" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    return next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}

export function sanitizeString(value) {
  if (typeof value !== "string") return value;
  return xss(value.trim());
}

export function sanitizeObject(obj) {
  const result = {};
  Object.keys(obj || {}).forEach((key) => {
    const value = obj[key];
    result[key] = typeof value === "string" ? sanitizeString(value) : value;
  });
  return result;
}

