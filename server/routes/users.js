const express = require("express")
const User = require("../models/User")
const router = express.Router()

// Get all users sorted by total points
router.get("/", async (req, res) => {
  try {
    const users = await User.find().sort({ totalPoints: -1 })
    res.json(users)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Add a new user
router.post("/", async (req, res) => {
  try {
    const { name } = req.body

    if (!name || !name.trim()) {
      return res.status(400).json({ error: "Name is required" })
    }

    const existingUser = await User.findOne({ name: name.trim() })
    if (existingUser) {
      return res.status(400).json({ error: "User with this name already exists" })
    }

    const user = new User({ name: name.trim() })
    await user.save()

    res.status(201).json(user)
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ error: "User with this name already exists" })
    } else {
      res.status(500).json({ error: error.message })
    }
  }
})

// Get user by ID
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) {
      return res.status(404).json({ error: "User not found" })
    }
    res.json(user)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

module.exports = router
