const express = require('express');
const router = express.Router();

router.post('/register', (req, res) => {
  res.status(501).json({ message: 'Registration not implemented' });
});

router.post('/login', (req, res) => {
  res.status(501).json({ message: 'Login not implemented' });
});

module.exports = router;