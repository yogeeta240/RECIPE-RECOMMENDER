const express = require('express');
const router = express.Router();

router.post('/favorite', (req, res) => {
  res.status(501).json({ message: 'Favorite not implemented' });
});

module.exports = router;