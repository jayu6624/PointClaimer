"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import UserSelector from "./components/UserSelector"
import Leaderboard from "./components/Leaderboard"
import ClaimHistory from "./components/ClaimHistory"
import AddUserForm from "./components/AddUserForm"
import { getUsers, claimPoints, getClaims } from "./services/api"
import { Zap, Trophy, History } from "lucide-react"

function App() {
  const [users, setUsers] = useState([])
  const [selectedUser, setSelectedUser] = useState(null)
  const [claims, setClaims] = useState([])
  const [loading, setLoading] = useState(false)
  const [notification, setNotification] = useState(null)
  const [activeTab, setActiveTab] = useState("leaderboard")

  useEffect(() => {
    fetchUsers()
    fetchClaims()
    // Poll for updates every 3 seconds
    const interval = setInterval(() => {
      fetchUsers()
      fetchClaims()
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const fetchUsers = async () => {
    try {
      const data = await getUsers()
      setUsers(data.sort((a, b) => b.totalPoints - a.totalPoints))
    } catch (error) {
      console.error("Error fetching users:", error)
    }
  }

  const fetchClaims = async () => {
    try {
      const data = await getClaims()
      setClaims(data)
    } catch (error) {
      console.error("Error fetching claims:", error)
    }
  }

  const handleClaimPoints = async () => {
    if (!selectedUser) {
      showNotification("Please select a user first!", "error")
      return
    }

    setLoading(true)
    try {
      const result = await claimPoints(selectedUser._id)
      showNotification(`🎉 ${selectedUser.name} earned ${result.pointsAwarded} points!`, "success")
      fetchUsers()
      fetchClaims()
    } catch (error) {
      showNotification("Error claiming points. Please try again.", "error")
    } finally {
      setLoading(false)
    }
  }

  const showNotification = (message, type) => {
    setNotification({ message, type })
    setTimeout(() => setNotification(null), 3000)
  }

  const handleUserAdded = () => {
    fetchUsers()
    showNotification("New user added successfully!", "success")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 flex items-center justify-center gap-3">
            <Trophy className="text-yellow-400" />
            PointClaimer
          </h1>
          <p className="text-xl text-gray-300">Real-Time Gamified Leaderboard System</p>
        </motion.div>

        {/* Notification */}
        <AnimatePresence>
          {notification && (
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg ${
                notification.type === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"
              }`}
            >
              {notification.message}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - User Selection & Actions */}
          <div className="lg:col-span-1 space-y-6">
            <UserSelector users={users} selectedUser={selectedUser} onUserSelect={setSelectedUser} />

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleClaimPoints}
              disabled={loading || !selectedUser}
              className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold py-4 px-6 rounded-xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Zap className={loading ? "animate-spin" : ""} />
              {loading ? "Claiming..." : "Claim Random Points!"}
            </motion.button>

            <AddUserForm onUserAdded={handleUserAdded} />
          </div>

          {/* Right Column - Leaderboard & History */}
          <div className="lg:col-span-2">
            {/* Tab Navigation */}
            <div className="flex mb-6 bg-white/10 rounded-lg p-1">
              <button
                onClick={() => setActiveTab("leaderboard")}
                className={`flex-1 py-3 px-4 rounded-md font-medium transition-all flex items-center justify-center gap-2 ${
                  activeTab === "leaderboard" ? "bg-white text-gray-900" : "text-white hover:bg-white/20"
                }`}
              >
                <Trophy size={20} />
                Leaderboard
              </button>
              <button
                onClick={() => setActiveTab("history")}
                className={`flex-1 py-3 px-4 rounded-md font-medium transition-all flex items-center justify-center gap-2 ${
                  activeTab === "history" ? "bg-white text-gray-900" : "text-white hover:bg-white/20"
                }`}
              >
                <History size={20} />
                History
              </button>
            </div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
              {activeTab === "leaderboard" ? (
                <Leaderboard key="leaderboard" users={users} />
              ) : (
                <ClaimHistory key="history" claims={claims} users={users} />
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
