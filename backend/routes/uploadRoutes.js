const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const fileController = require('../controllers/fileController');

router.post('/upload', authMiddleware, fileController.uploadFile);
router.get('/files', authMiddleware, fileController.getFiles);
router.get('/files/:id', authMiddleware, fileController.getFile);

module.exports = router;