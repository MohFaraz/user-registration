const express = require("express");
const router = express.Router();
const pool = require("../db/mysql2");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middlewares/auth");

router.get("/users", async (req, res) => {
  const [rows, fields] = await pool.execute("SELECT * FROM USER");
  console.log(rows, fields);
  res.status(200).json(rows);
});

router.post("/users", async (req, res) => {
  try {
    const { name, email, password, company } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const query =
      "INSERT INTO USER (name, email, password, company) VALUES (?, ?, ?, ?)";
    const data = [name, email, hashedPassword, company];
    const user = await pool.execute(query, data);
    const token = jwt.sign({ id: user[0].insertId }, "secretkey");
    res.status(201).json({ token });
  } catch (error) {
    console.error(error);
  }
});

router.post("/users/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const [rows, fields] = await pool.execute(
      "SELECT * FROM USER WHERE email=?",
      [email]
    );
    console.log(rows);
    if (rows.length === 0) throw new Error("User not found");
    const isMatch = await bcrypt.compare(password, rows[0].password);
    if (!isMatch) throw new Error("Incorrect password");
    const token = jwt.sign({ id: rows[0].id }, "secretkey");
    res.status(200).json({ user: rows[0], token });
  } catch (error) {
    console.log({ error });
    res.status(500).json({ error });
  }
});
router.get("/users/me", auth, async (req, res) => {
  res.status(200).json(req.user);
});
module.exports = router;
