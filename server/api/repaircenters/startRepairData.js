const express = require('express');
const router = express.Router();
const { db } = require('../../db');
// const moment = require('moment-timezone');

router.post('/startRepairData', async (req, res) => {
  try {
    // Extract data from the request body
    const { vehicleId, repaircenter_workers_id,  date, totalCost, changesMade, completion_time } = req.body;
    console.log( req.body)
    // Parse the date string to create a Date object
    // const parsedDate = new Date(date);

    // // Calculate the completed_time by adding totalEstimatedTime (in minutes) to the parsedDate
    // const completedTime = new Date(parsedDate.getTime() + totalEstimatedTime * 60000);

    // // Format the date and time
    // const formattedCompletedTime = moment(completedTime).format('YYYY-MM-DD hh:mm:ss A');

    //console.log(formattedCompletedTime);

    // Process and store the repair data in your database
    // Note: Adjust the database query as per your schema
    const repairDataQuery = 'INSERT INTO repair_data (vehicleDetails_id, repaircenter_workers_id, repair_date, total_cost, changes_made, completion_time) VALUES (?, ?, ?, ?, ?, ? )';
    await db.execute(repairDataQuery, [vehicleId, repaircenter_workers_id, date, totalCost, changesMade, completion_time]);

    res.status(200).json({ success: true, message: 'Repair data added successfully' });
  } catch (error) {
    console.error('Error adding repair data:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

module.exports = router;
