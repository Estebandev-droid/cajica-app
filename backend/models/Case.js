// models/Case.js
const mongoose = require('mongoose');

const caseSchema = new mongoose.Schema({
  caseNumber: {
    type: String,
    required: true,
    unique: true,
  },
  knowledgeDate: { type: Date, required: true },
  openingDate: { type: Date, required: true },
  status: { type: String, required: true },
  consultationReason: { type: String, required: true },
  violatedRight: { type: String, required: true },
  injury: { type: String, required: true },
  familyRelationship: { type: String, required: true },
  nnaName: { type: String, required: true },
  birthDate: { type: Date, required: true },
  age: { type: Number, required: true },
  documentType: { type: String, required: true },
  historyNumber: { type: String, required: true },
  eps: { type: String, required: true },
  residenceSector: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  restorationMeasure: { type: String, required: true },
});

module.exports = mongoose.model('Case', caseSchema);