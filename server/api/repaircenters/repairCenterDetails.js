const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { db } = require('../../db');

router.get('/RepairCenterDetails/:repaircenter_id', async (req, res) => {
  try {
    const { repaircenter_id } = req.params;
    const repariCenterId = parseInt(repaircenter_id, 10);

    // Retrieve customer details based on customer_id from the database
    const [repairCenterDetails] = await db.execute('SELECT * FROM repaircenter_users WHERE repaircenter_id = ?', [repariCenterId]);

    // Assuming the response structure; modify as per your database schema
    //console.log(repairCenterDetails);
    res.json({ repairCenterDetails });
  } catch (error) {
    console.error('Error fetching repair center details:', error);
    res.status(500).send('Internal Server Error');
  }
});


module.exports = router;