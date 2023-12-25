const express = require("express");
const router = express.Router();
const { db } = require("../db");

router.get("/vehicleDetails/:customer_id", async (req, res) => {
  try {
    const { customer_id } = req.params;
    const customerId = parseInt(customer_id, 10);
    console.log(customerId);
    // Retrieve vehicle details based on customer_id from the database
    const [vehicleDetails] = await db.execute(
      "SELECT * FROM vehicle_details WHERE customer_id = ? AND status = 1",
      [customerId]
    );

    //console.log(vehicleDetails);
    // Assuming the response structure; modify as per your database schema
    res.json(vehicleDetails);
  } catch (error) {
    console.error("Error fetching vehicle details:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
