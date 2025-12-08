const express = require('express');
const router = express.Router();

// Placeholder CRUD routes for rooms (to be extended by team members)
router.get('/', (req, res) => {
  res.json({ msg: 'List rooms - implement' });
});

router.post('/', (req, res) => {
  res.json({ msg: 'Create room - implement' });
});

module.exports = router;
