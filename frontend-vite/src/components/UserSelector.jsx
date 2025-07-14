"use client"

import { motion } from "framer-motion"
import { User, Crown } from "lucide-react"

const UserSelector = ({ users, selectedUser, onUserSelect }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white/10 backdrop-blur-lg rounded-xl p-6 shadow-xl"
    >
      <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
        <User />
        Select User
      </h2>
      <div className="space-y-2 max-h-96 overflow-y-auto">
        {users.map((user, index) => (
          <motion.button
            key={user._id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onUserSelect(user)}
            className={`w-full p-4 rounded-lg text-left transition-all flex items-center justify-between ${
              selectedUser?._id === user._id
                ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                : "bg-white/20 text-white hover:bg-white/30"
            }`}
          >
            <div className="flex items-center gap-3">
              {index === 0 && <Crown className="text-yellow-400" size={20} />}
              <div>
                <div className="font-semibold">{user.name}</div>
                <div className="text-sm opacity-75">
                  Rank #{index + 1} • {user.totalPoints} points
                </div>
              </div>
            </div>
            <div className="text-2xl font-bold">{user.totalPoints}</div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  )
}

export default UserSelector
