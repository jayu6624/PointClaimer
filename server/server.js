const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config()

const userRoutes = require("./routes/users")
const claimRoutes = require("./routes/claims")

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/pointclaimer", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB")
})

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err)
})

// Routes
app.use("/api/users", userRoutes)
app.use("/api/claims", claimRoutes)

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
