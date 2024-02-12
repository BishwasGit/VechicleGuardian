const express = require("express");
const router = express.Router();
const { db } = require('../../db');

router.post("/storevehicleincomeexpenses", async (req, res) => {
  try {
    const {
      expenses_data,
      income_data,
      total_expenses_amount,
      total_income_amount,
      vehicleDetails_id,
    } = req.body;
    const created_at = new Date().toISOString().slice(0, 19).replace('T', ' ');
    // Insert the vehicle income and expenses data
    const insertQuery =
      "INSERT INTO vehicle_income_expenses (vehicleDetails_id, expenses_data, income_data, total_expenses_amount, total_income_amount, created_at) VALUES (?, ?, ?, ?, ?, ?)";
    const result = await db.execute(insertQuery, [
      vehicleDetails_id,
      JSON.stringify(expenses_data),
      JSON.stringify(income_data),
      total_expenses_amount,
      total_income_amount,
      created_at,
    ]);

    if (result) {
      res.json({ message: "Vehicle income and expenses data stored successfully!" });
    } else {
      res.status(500).json({ error: "Failed to store vehicle income and expenses data." });
    }
  } catch (error) {
    console.error("Error storing vehicle income and expenses data:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

module.exports = router;
