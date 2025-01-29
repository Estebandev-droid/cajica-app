// controllers/caseController.js
const Case = require('../models/Case');

exports.getCases = async (req, res) => {
  try {
    const cases = await Case.find();
    res.json(cases);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createCase = async (req, res) => {
  const { registrationDate, status, rightsViolated, victimInfo, offenderInfo } = req.body;
  try {
    const count = await Case.countDocuments();
    const caseNumber = `PARD-${count + 1}`;
    const newCase = new Case({
      caseNumber,
      registrationDate,
      status,
      rightsViolated,
      victimInfo,
      offenderInfo,
    });
    const savedCase = await newCase.save();
    res.status(201).json(savedCase);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getCaseById = async (req, res) => {
  try {
    const caseItem = await Case.findById(req.params.id);
    if (!caseItem) {
      return res.status(404).json({ message: 'Case not found' });
    }
    res.json(caseItem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateCase = async (req, res) => {
  const { caseNumber, registrationDate, status, rightsViolated, victimInfo, offenderInfo } = req.body;

  try {
    const caseItem = await Case.findById(req.params.id);
    if (!caseItem) {
      return res.status(404).json({ message: 'Case not found' });
    }

    caseItem.caseNumber = caseNumber || caseItem.caseNumber;
    caseItem.registrationDate = registrationDate || caseItem.registrationDate;
    caseItem.status = status || caseItem.status;
    caseItem.rightsViolated = rightsViolated || caseItem.rightsViolated;
    caseItem.victimInfo = victimInfo || caseItem.victimInfo;
    caseItem.offenderInfo = offenderInfo || caseItem.offenderInfo;

    await caseItem.save();
    res.json(caseItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteCase = async (req, res) => {
  try {
    const caseToDelete = await Case.findById(req.params.id);
    if (!caseToDelete) {
      return res.status(404).json({ message: 'Case not found' });
    }
    await caseToDelete.remove();
    res.json({ message: 'Case deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};