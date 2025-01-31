const Case = require('../models/Case');

exports.getCases = async (req, res) => {
  try {
    const cases = await Case.find();
    res.status(200).json(cases);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createCase = async (req, res) => {
  try {
    const count = await Case.countDocuments();
    const caseNumber = `PARD-${count + 1}`;
    const newCase = new Case({
      ...req.body,
      caseNumber,
    });
    await newCase.save();
    res.status(201).json(newCase);
  } catch (error) {
    res.status(400).json({ message: error.message });
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
  try {
    const caseItem = await Case.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!caseItem) {
      return res.status(404).json({ message: 'Case not found' });
    }
    res.status(200).json(caseItem);
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