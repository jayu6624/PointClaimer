"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { UserPlus, Plus } from "lucide-react"
import { addUser } from "../services/api"

const AddUserForm = ({ onUserAdded }) => {
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name.trim()) return

    setLoading(true)
    try {
      await addUser(name.trim())
      setName("")
      setIsOpen(false)
      onUserAdded()
    } catch (error) {
      console.error("Error adding user:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white/10 backdrop-blur-lg rounded-xl p-6 shadow-xl"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-center gap-2 text-white font-semibold py-3 px-4 rounded-lg bg-green-500 hover:bg-green-600 transition-colors"
      >
        <UserPlus />
        Add New User
      </button>

      {isOpen && (
        <motion.form
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          onSubmit={handleSubmit}
          className="mt-4 space-y-4"
        >
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter user name"
            className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-white/30 focus:border-white/50 focus:outline-none"
            required
          />
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={loading || !name.trim()}
              className="flex-1 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <Plus size={16} />
              {loading ? "Adding..." : "Add User"}
            </button>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 text-white border border-white/30 rounded-lg hover:bg-white/10 transition-colors"
            >
              Cancel
            </button>
          </div>
        </motion.form>
      )}
    </motion.div>
  )
}

export default AddUserForm
