const express = require('express');
const { createReturn } = require('../controllers/returnController');
const { auth, adminOnly } = require('../middleware/auth');

const router = express.Router();

router.post('/', auth, adminOnly, createReturn);

module.exports = router; 