const express = require('express');
const router = express.Router();
const { db } = require('../../db');

router.post('/addVacancyDetails', async (req, res) => {
  try {
    // Extract data from the request body
    const { repaircenter_id, vacancy } = req.body;
    console.log(req.body);

    // Check if repair center exists
    const checkRepairCenterQuery = 'SELECT * FROM repair_vacancy WHERE repaircenter_id = ?';
    const [repairCenterRows] = await db.execute(checkRepairCenterQuery, [repaircenter_id]);

    if (repairCenterRows.length === 0) {
      // Repair center does not exist, insert a new vacancy entry
      const insertVacancyQuery = 'INSERT INTO repair_vacancy (repaircenter_id, vacancy) VALUES (?, ?)';
      await db.execute(insertVacancyQuery, [repaircenter_id, vacancy]);

      res.status(200).json({ success: true, message: 'Vacancy details added successfully' });
    } else {
      // Repair center exists, update the vacancy details
      const updateVacancyQuery = 'UPDATE repair_vacancy SET vacancy = ? WHERE repaircenter_id = ?';
      await db.execute(updateVacancyQuery, [vacancy, repaircenter_id]);

      res.status(200).json({ success: true, message: 'Vacancy details updated successfully' });
    }
  } catch (error) {
    console.error('Error updating vacancy details:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

module.exports = router;
