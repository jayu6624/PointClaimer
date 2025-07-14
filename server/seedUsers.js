const mongoose = require("mongoose")
const User = require("./models/User")
require("dotenv").config()

const defaultUsers = [
  "Alice Johnson",
  "Bob Smith",
  "Charlie Brown",
  "Diana Prince",
  "Edward Norton",
  "Fiona Green",
  "George Wilson",
  "Hannah Davis",
  "Ian Mitchell",
  "Julia Roberts",
]

const seedUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/pointclaimer")

    // Check if users already exist
    const existingUsers = await User.find()
    if (existingUsers.length > 0) {
      console.log("Users already exist. Skipping seed.")
      return
    }

    // Create default users
    const users = defaultUsers.map((name) => ({ name, totalPoints: 0, claimCount: 0 }))
    await User.insertMany(users)

    console.log("Default users seeded successfully!")
  } catch (error) {
    console.error("Error seeding users:", error)
  } finally {
    mongoose.connection.close()
  }
}

seedUsers()
