// Import necessary modules
const express = require('express');
const router = express.Router();
const { db } = require('../../db');

// Endpoint to send a message
router.post('/sendMessage', async (req, res) => {
  const { repaircenters_id, customer_id, message, senderType, markCompleted} = req.body;
    console.log(req.body);
  try {
    // Insert the message into the database
    await db.execute('INSERT INTO messages_cr (repaircenters_id, customer_id, message_contents, senderType, timestamp, markedCompleted) VALUES (?, ?, ?, ?, NOW())', [repaircenters_id, customer_id, message, senderType, markCompleted]);
    
    // Respond with success message
    res.status(201).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Export the router
module.exports = router;
