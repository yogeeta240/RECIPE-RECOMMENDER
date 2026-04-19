const express = require('express');
const router = express.Router();

router.post('/rate', (req, res) => {
  res.status(501).json({ message: 'Rating not implemented' });
});

module.exports = router;