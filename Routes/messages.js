const express = require('express');
const router = express.Router();
const messageController = require('../Controllers/messageController');

// Create a new message
router.post('/', messageController.createMessage);

// Get all messages
router.get('/', messageController.getAllMessages);

// Update a message
router.put('/:id', messageController.updateMessage);

// Delete a message
router.delete('/:id', messageController.deleteMessage);

module.exports = router;
