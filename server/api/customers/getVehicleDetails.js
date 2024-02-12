const express = require("express");
const router = express.Router();
const { db } = require('../../db');

router.get("/getvehicleDetails/:vehicleDetailsId", async (req, res) => {
  try {
    const { vehicleDetailsId } = req.params;
    const vehicleDetails_Id = parseInt(vehicleDetailsId, 10);
    // Retrieve vehicle details based on customer_id from the database
    const [vehicleDetails] = await db.execute(
      "SELECT * FROM vehicle_details WHERE vehicleDetails_id = ? AND status = 1",
      [vehicleDetails_Id]
    );
    // Assuming the response structure; modify as per your database schema
    res.json(vehicleDetails);
  } catch (error) {
    console.error("Error fetching vehicle details:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
