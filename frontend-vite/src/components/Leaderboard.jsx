"use client";

import { Crown, Medal, User } from "lucide-react";
import { motion } from "framer-motion";

const podiumColors = [
  "from-yellow-400 to-yellow-200", // 1st
  "from-gray-400 to-gray-200", // 2nd
  "from-orange-400 to-yellow-200", // 3rd
];

const getPodiumBg = (idx) => `bg-gradient-to-b ${podiumColors[idx]}`;
const getMedalColor = (idx) =>
  ["text-yellow-400", "text-gray-400", "text-orange-400"][idx];

const Leaderboard = ({ users = [] }) => {
  const top3 = users.slice(0, 3);
  const rest = users.slice(3);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white/10 backdrop-blur-lg rounded-xl p-6 shadow-xl"
    >
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
        <Crown className="text-yellow-400" />
        Leaderboard
      </h2>
      {/* Podium */}
      <div className="flex justify-center items-end gap-4 mb-8">
        {top3.map((user, idx) => (
          <div
            key={user._id}
            className={`flex flex-col items-center ${
              idx === 0 ? "scale-110 z-10" : "scale-100"
            }`}
          >
            <div
              className={`relative w-24 h-24 rounded-full shadow-lg border-4 border-white ${getPodiumBg(
                idx
              )} flex items-center justify-center mb-2`}
              style={{ minHeight: 96 }}
            >
              {idx === 0 && (
                <Crown className="absolute -top-8 left-1/2 -translate-x-1/2 text-yellow-400 w-10 h-10 drop-shadow-lg" />
              )}
              {/* Avatar or placeholder */}
              <div className="w-20 h-20 rounded-full bg-white/80 flex items-center justify-center overflow-hidden">
                {user.avatarUrl ? (
                  <img
                    src={user.avatarUrl}
                    alt={user.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-10 h-10 text-gray-400" />
                )}
              </div>
            </div>
            <div className="font-bold text-white text-lg text-center truncate max-w-[6rem]">
              {user.name}
            </div>
            <div
              className={`flex items-center gap-1 font-bold text-lg ${getMedalColor(
                idx
              )}`}
            >
              <Medal className={getMedalColor(idx)} size={18} />
              {user.totalPoints ?? user.points}
            </div>
            <div className="text-xs text-white/70">
              {["1st", "2nd", "3rd"][idx]}
            </div>
          </div>
        ))}
      </div>
      {/* Rest of leaderboard */}
      <div className="bg-white/20 rounded-lg p-4">
        {rest.length === 0 ? (
          <div className="text-center text-gray-300 py-4">No more users</div>
        ) : (
          <table className="w-full text-white">
            <thead>
              <tr className="text-left text-gray-300">
                <th className="py-2">Rank</th>
                <th className="py-2">User</th>
                <th className="py-2">Points</th>
              </tr>
            </thead>
            <tbody>
              {rest.map((user, idx) => (
                <tr
                  key={user._id}
                  className="border-t border-white/10 hover:bg-white/10 transition"
                >
                  <td className="py-2 px-2 font-bold">{idx + 4}</td>
                  <td className="py-2 px-2 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-white/80 flex items-center justify-center overflow-hidden">
                      {user.avatarUrl ? (
                        <img
                          src={user.avatarUrl}
                          alt={user.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <User className="w-5 h-5 text-gray-400" />
                      )}
                    </span>
                    <span className="truncate max-w-[8rem]">{user.name}</span>
                  </td>
                  <td className="py-2 px-2 font-bold flex items-center gap-1">
                    <Medal className="text-yellow-400" size={16} />
                    {user.totalPoints ?? user.points}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </motion.div>
  );
};

export default Leaderboard;
