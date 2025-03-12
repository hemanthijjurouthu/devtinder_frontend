import React from "react";
import axios from "axios";
import { BASE_URL } from "../utils/Constants";
import { useDispatch } from "react-redux";
import { removeFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const dispatch = useDispatch();

  const handleClick = async (status, userId) => {
    try {
      await axios.post(`${BASE_URL}/request/send/${status}/${userId}`, {}, { withCredentials: true });
      dispatch(removeFeed(userId));
    } catch (err) {
      console.log("ERROR:", err.message);
    }
  };

  const { _id, firstName, lastName, photoURL, about, age, gender, skills = [] } = user;

  return (
    <div className="relative w-80 h-[520px] rounded-2xl overflow-hidden shadow-xl bg-base-300 border border-gray-700 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:border-primary">
      {/* Cover Image */}
      <div className="w-full h-[55%]">
        <img
          className="w-full h-full object-cover object-top rounded-t-2xl"
          src={photoURL || "/default-profile.png"}
          alt="Profile"
        />
      </div>

      {/* User Info */}
      <div className="p-6 flex flex-col justify-between h-[45%]">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white">{firstName} {lastName}</h2>
          <p className="text-sm text-gray-400">{age} years old, {gender}</p>
          <p className="mt-2 text-gray-300">{about || "No bio available"}</p>
        </div>

        {/* Skills Section */}
        {skills.length > 0 && (
          <div className="mt-3 flex flex-wrap justify-center gap-2">
            {skills.map((skill, index) => (
              <span key={index} className="px-3 py-1 text-xs font-medium rounded-lg bg-primary text-white shadow-md">
                {skill}
              </span>
            ))}
          </div>
        )}

        {/* Action Buttons with Handlers */}
        <div className="flex justify-between mt-4 gap-1">
        <button
            className="w-1/2 py-2 rounded-lg bg-pink-500 text-white font-medium hover:bg-pink-700 transition-all"
            onClick={() => handleClick("interested", _id)}
          >
            Interested
          </button>
          <button
            className="w-1/2 py-2 rounded-lg bg-blue-500 text-white font-medium hover:bg-blue-700 transition-all"
            onClick={() => handleClick("ignored", _id)}
          >
            Ignore
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
