// api/login.js
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { db } = require("../db");

router.post("/repairCenterLogin", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Retrieve customer_id along with the hashed password from the database
    const [result] = await db.execute(
      "SELECT repaircenter_id, password FROM repaircenter_users WHERE username = ?",
      [username]
    );

    if (result.length === 0) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const { repaircenter_id, password: hashedPassword } = result[0];
    // console.log(result[0]);
    // Compare the provided password with the hashed password
    bcrypt.compare(password, hashedPassword, (err, passwordMatch) => {
      if (err) {
        console.error("Error comparing passwords:", err);
        return res.status(500).send("Internal Server Error");
      }
      if (passwordMatch) {
        // Passwords match, login successful
        // console.log(customer_id)
        res.json({ success: true, message: "Login successful", repaircenter_id });
      } else {
        // Passwords don't match, login failed
        res.status(401).json({ error: "Invalid username or password" });
      }
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
