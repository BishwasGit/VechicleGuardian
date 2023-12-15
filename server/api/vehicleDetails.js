const express = require('express');
const router = express.Router();
const { db } = require('../db');

router.post('/storeVehicleDetails', async (req, res) => {
  try {
    const {
      customer_id,
      vehicleType,
      vehicleNumber,
      vehicleLot,
      vehicleCompany,
      vehicleModel,
      billBookDetails,
    } = req.body;

    console.log(req.body);
    // Check for duplicate vehicle number
    const vehicleNumberExists = await checkDuplicateEntry('vehicle_number', vehicleNumber);
    if (vehicleNumberExists) {
      return res.status(400).json({ error: 'Vehicle number already exists!' });
    }

    // If no duplicate, insert the new vehicle details
    const insertQuery = 'INSERT INTO vehicle_details (customer_id, vehicle_type, vehicle_number, vehicle_lot_number, vehicle_company, vehicle_model, bill_book_details) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const result = await db.execute(insertQuery, [customer_id, vehicleType, vehicleNumber, vehicleLot, vehicleCompany, vehicleModel, JSON.stringify(billBookDetails)]);
    if (result) {
      res.json({ message: 'Vehicle details stored successfully!' });
    } else {
      res.status(500).json({ error: 'Failed to store vehicle details.' });
    }
  } catch (error) {
    console.error('Error storing vehicle details:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }

});
const checkDuplicateEntry = async (fieldName, value) => {
  const countQuery = `SELECT COUNT(*) AS count FROM vehicle_details WHERE ${fieldName} = ?`;
  const [result] = await db.execute(countQuery, [value]);
  return result[0].count > 0;
};

module.exports = router;
