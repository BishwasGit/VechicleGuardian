// Import necessary modules
const express = require('express');
const router = express.Router();
const { db } = require('../../db');

// Endpoint to fetch messages
router.get('/messages_cr', async (req, res) => {
  const { repaircenters_id, customer_id } = req.query;
  try {
    // Fetch messages from the database based on repaircenters_id and customer_id
    const [messages] = await db.execute('SELECT * FROM messages_cr WHERE repaircenters_id = ? AND customer_id = ? ORDER BY timestamp ASC', [repaircenters_id, customer_id]);
    console.log([messages]);
    // Respond with the fetched messages
    res.json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Export the router
module.exports = router;
