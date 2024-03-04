const express = require('express');
const router = express.Router();
const { db } = require('../../db');
const { generatePDFInvoice } = require('../generate/pdf');

router.post('/startRepairData', async (req, res) => {
  try {
    const { vehicleId, repaircenter_workers_id, date, totalCost, changesMade, completion_time } = req.body;
    await generatePDFInvoice(req.body, (response) => {
      res.status(200).json(response);
    });
  } catch (error) {
    console.error('Error adding repair data:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

module.exports = router;
