// routes/measureRoutes.js
const express = require('express');
const router = express.Router();
const measureController = require('../controllers/measureController');

router.post('/measures', measureController.createMeasure);
router.get('/measures', measureController.getMeasures);
router.get('/measures/:id', measureController.getMeasureById);
router.put('/measures/:id', measureController.updateMeasure);
router.delete('/measures/:id', measureController.deleteMeasure);

module.exports = router;