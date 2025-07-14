const mongoose = require("mongoose")

const claimSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  pointsAwarded: {
    type: Number,
    required: true,
    min: 1,
    max: 10,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model("Claim", claimSchema)
