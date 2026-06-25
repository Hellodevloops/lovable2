import bcrypt from "bcryptjs";
import { db } from "./db.js";

const email = "admin@luxehire.in";
const newPassword = "EGd80(d3)3A*9#BE$}_";

const hashed = bcrypt.hashSync(newPassword, 10);

db.run(
  "UPDATE users SET password = ? WHERE email = ?",
  [hashed, email],
  (err) => {
    if (err) {
      console.error("Failed to update admin password:", err);
    } else {
      console.log(`Admin password updated for ${email}`);
    }
    db.close();
  }
);

