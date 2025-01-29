// routes/caseRoutes.js
const express = require('express');
const router = express.Router();
const caseController = require('../controllers/caseController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/cases', authMiddleware, caseController.getCases);
router.post('/cases', authMiddleware, caseController.createCase);
router.get('/cases/:id', authMiddleware, caseController.getCaseById); // Nueva ruta para obtener un caso específico
router.put('/cases/:id', authMiddleware, caseController.updateCase); // Nueva ruta para actualizar un caso específico

module.exports = router;