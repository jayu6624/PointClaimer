"use client";

import { motion } from "framer-motion";
import { History, Calendar, User, Zap } from "lucide-react";

const ClaimHistory = ({ claims, users }) => {
  const getUserName = (userId) => {
    const user = users.find((u) => u._id === userId);
    return user ? user.name : "Unknown User";
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white/10 backdrop-blur-lg rounded-xl p-6 shadow-xl"
    >
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
        <History />
        Claim History
      </h2>
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {claims.length === 0 ? (
          <div className="text-center text-gray-400 py-8">
            <History size={48} className="mx-auto mb-4 opacity-50" />
            <p>No claims yet. Start claiming points!</p>
          </div>
        ) : (
          claims.map((claim, index) => (
            <motion.div
              key={claim._id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white/20 rounded-lg p-4 text-white"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-500 rounded-full p-2">
                    <User size={16} />
                  </div>
                  <div>
                    <div className="font-semibold">
                      {getUserName(claim.userId)} took {claim.pointsAwarded}{" "}
                      points
                    </div>
                    <div className="text-sm opacity-75 flex items-center gap-1">
                      <Calendar size={12} />
                      {formatDate(claim.timestamp)}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="text-yellow-400" size={16} />
                  <span className="text-xl font-bold text-yellow-400">
                    +{claim.pointsAwarded}
                  </span>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </motion.div>
  );
};

export default ClaimHistory;
