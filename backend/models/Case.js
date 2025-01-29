// models/Case.js
const mongoose = require('mongoose');

const caseSchema = new mongoose.Schema({
  caseNumber: {
    type: String,
    required: true,
  },
  registrationDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  rightsViolated: {
    type: String,
    required: true,
  },
  victimInfo: {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
  },
  offenderInfo: {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
  },
  measures: { type: [Object], default: [] },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

caseSchema.pre('save', async function (next) {
  if (this.isNew) {
    const count = await mongoose.model('Case').countDocuments();
    this.caseNumber = `PARD-${count + 1}`;
  }
  next();
});

module.exports = mongoose.model('Case', caseSchema);