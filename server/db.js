import sqlite3 from "sqlite3";
import path from "path";
import { fileURLToPath } from "url";
import bcrypt from "bcryptjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, "database.sqlite");

sqlite3.verbose();

export const db = new sqlite3.Database(dbPath);

export function initDb() {
  db.serialize(() => {
    db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        email TEXT UNIQUE,
        password TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    db.run(`
      CREATE TABLE IF NOT EXISTS contacts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        email TEXT,
        phone TEXT,
        subject TEXT,
        message TEXT,
        ip_address TEXT,
        browser TEXT,
        os TEXT,
        device_type TEXT,
        screen_resolution TEXT,
        language TEXT,
        timezone TEXT,
        referrer TEXT,
        user_agent TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Seed a default admin user if none exists
    const defaultEmail = "admin@luxehire.in";
    const defaultPassword = "EGd80(d3)3A*9#BE$}_"; // NOTE: change in production

    db.get("SELECT id FROM users LIMIT 1", (err, row) => {
      if (err) {
        console.error("Error checking users table", err);
        return;
      }
      if (!row) {
        const hashed = bcrypt.hashSync(defaultPassword, 10);
        db.run(
          "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
          ["Admin", defaultEmail, hashed],
          (insertErr) => {
            if (insertErr) {
              console.error("Error seeding default admin user", insertErr);
            } else {
              console.log(
                `Seeded default admin user: ${defaultEmail} / ${defaultPassword}`
              );
            }
          }
        );
      }
    });
  });
}

