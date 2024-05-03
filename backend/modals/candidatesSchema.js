const mongoose = require("mongoose");

const candidateSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  party: {
    type: String,
    required: true,
  },
  region: {
    type: String,
    required: true,
  },
  votes: {
    type: Number,
    default: 0,
  },
});

const Candidate = mongoose.model("Candidate", candidateSchema, "candidates");

module.exports = { Candidate };
