// controllers/measureController.js
const Measure = require('../models/Measure');

exports.getMeasures = async (req, res) => {
  try {
    const measures = await Measure.find();
    res.status(200).json(measures);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createMeasure = async (req, res) => {
  try {
    const {
      caseNumber,
      autoAvocaDate,
      processStatus,
      criminalNewsNumber,
      typeOfViolence,
      injury,
      familyRelationship,
      victimName,
      victimDocumentType,
      victimDocumentNumber,
      victimGender,
      victimAge,
      victimAgeRange,
      victimPhone,
      victimSector,
      offenderName,
      offenderDocumentType,
      offenderDocumentNumber,
      offenderAge,
      offenderPhone,
    } = req.body;

    const newMeasure = new Measure({
      caseNumber,
      autoAvocaDate,
      processStatus,
      criminalNewsNumber,
      typeOfViolence,
      injury,
      familyRelationship,
      victimName,
      victimDocumentType,
      victimDocumentNumber,
      victimGender,
      victimAge,
      victimAgeRange,
      victimPhone,
      victimSector,
      offenderName,
      offenderDocumentType,
      offenderDocumentNumber,
      offenderAge,
      offenderPhone,
    });

    await newMeasure.save();
    res.status(201).json(newMeasure);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getMeasureById = async (req, res) => {
  try {
    const measure = await Measure.findById(req.params.id);
    if (!measure) {
      return res.status(404).json({ message: 'Measure not found' });
    }
    res.status(200).json(measure);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateMeasure = async (req, res) => {
  try {
    const measure = await Measure.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!measure) {
      return res.status(404).json({ message: 'Measure not found' });
    }
    res.status(200).json(measure);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteMeasure = async (req, res) => {
  try {
    const measure = await Measure.findByIdAndDelete(req.params.id);
    if (!measure) {
      return res.status(404).json({ message: 'Measure not found' });
    }
    res.status(200).json({ message: 'Measure deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};