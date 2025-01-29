// models/Measure.js
const mongoose = require('mongoose');

const measureSchema = new mongoose.Schema({
  caseNumber: { type: String, required: true },
  autoAvocaDate: { type: Date, required: true },
  processStatus: { type: String, required: true },
  criminalNewsNumber: { type: String, required: true },
  typeOfViolence: { type: String, required: true },
  injury: { type: String, required: true },
  familyRelationship: { type: String, required: true },
  victimName: { type: String, required: true },
  victimDocumentType: { type: String, required: true },
  victimDocumentNumber: { type: String, required: true },
  victimGender: { type: String, required: true },
  victimAge: { type: Number, required: true },
  victimAgeRange: { type: String, required: true },
  victimPhone: { type: String, required: true },
  victimSector: { type: String, required: true },
  offenderName: { type: String, required: true },
  offenderDocumentType: { type: String, required: true },
  offenderDocumentNumber: { type: String, required: true },
  offenderAge: { type: Number, required: true },
  offenderPhone: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Measure', measureSchema);