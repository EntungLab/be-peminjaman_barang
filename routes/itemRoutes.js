const express = require('express');
const { getAllItems, createItem } = require('../controllers/itemController');
const { auth, adminOnly } = require('../middleware/auth');
const upload = require('../middleware/upload');

const router = express.Router();

router.get('/', auth, getAllItems);
router.post('/', auth, adminOnly, upload.single('image'), createItem);

module.exports = router; 