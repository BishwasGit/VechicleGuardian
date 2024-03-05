const express = require('express');
const router = express.Router();
const { db } = require('../../db');

// In your server-side code (e.g., repairCenterRoutes.js)
router.get('/fetchVehicleList', async (req, res) => {
    try {
      const [rows] = await db.execute('SELECT * FROM vehicle_details');
      res.json(rows);
    } catch (error) {
      console.error('Error fetching vehicle list:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  

  
module.exports = router;