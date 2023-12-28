const express = require('express');
const router = express.Router();
const { db } = require('../../db');

router.post('/addVacancyDetails', async (req, res) => {
  try {
    // Extract data from the request body
    const { repaircenter_id, vacancy } = req.body;
    console.log(req.body);

    // Check if repair center exists
    const checkRepairCenterQuery = 'SELECT * FROM repair_centers WHERE repaircenter_id = ?';
    const [repairCenterRows] = await db.execute(checkRepairCenterQuery, [repaircenter_id]);

    if (repairCenterRows.length === 0) {
      // Repair center does not exist, return an error
      return res.status(404).json({ success: false, message: 'Repair Center not found' });
    }

    // Repair center exists, update the vacancy details
    const updateVacancyQuery = 'UPDATE repair_centers SET vacancy = ? WHERE repaircenter_id = ?';
    await db.execute(updateVacancyQuery, [vacancy, repaircenter_id]);

    res.status(200).json({ success: true, message: 'Vacancy details updated successfully' });
  } catch (error) {
    console.error('Error updating vacancy details:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

module.exports = router;
