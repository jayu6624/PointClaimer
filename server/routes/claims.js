const express = require("express")
const User = require("../models/User")
const Claim = require("../models/Claim")
const router = express.Router()

// Get all claims with user details
router.get("/", async (req, res) => {
  try {
    const claims = await Claim.find().populate("userId", "name").sort({ timestamp: -1 }).limit(100) // Limit to last 100 claims
    res.json(claims)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Claim points for a user
router.post("/", async (req, res) => {
  try {
    const { userId } = req.body

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" })
    }

    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({ error: "User not found" })
    }

    // Generate random points between 1-10
    const pointsAwarded = Math.floor(Math.random() * 10) + 1

    // Create claim record
    const claim = new Claim({
      userId,
      pointsAwarded,
    })
    await claim.save()

    // Update user's total points and claim count
    user.totalPoints += pointsAwarded
    user.claimCount += 1
    await user.save()

    res.json({
      claim,
      pointsAwarded,
      newTotal: user.totalPoints,
      user: user.name,
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

module.exports = router
