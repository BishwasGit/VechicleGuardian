// repairCenterRoutes.js

const express = require('express');
const router = express.Router();
const { db } = require('../db');

router.get('/checkVerificationStatus/:repaircenter_id', async (req, res) => {
    try {
      const { repaircenter_id } = req.params;
  
      // Assuming you have a 'verification' column in your repair_centers table
      const [rows] = await db.execute('SELECT verification FROM repair_centers WHERE repaircenter_id = ?', [repaircenter_id]);
  
      if (rows.length === 0) {
        return res.status(404).json({ error: 'Repair center not found' });
      }
  
      const verificationStatus = rows[0].verification;
       console.log(verificationStatus);
      // Check if the verification status is 'Verified'
      if (verificationStatus === 'Verified') {
        res.json({ verified: true });
      } else {
        res.json({ verified: false });
      }
    } catch (error) {
      console.error('Error checking verification status:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

module.exports = router;
