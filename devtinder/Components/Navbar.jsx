import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { removeUser } from "../utils/userSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:3000/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      navigate("/login");
    } catch (err) {
      console.log("ERROR:", err);
    }
  };

  const user = useSelector((store) => store.user);

  return (
    <nav className="navbar bg-base-300 text-white shadow-lg px-6 py-4">
      <div className="flex-1 flex items-center gap-3">
        <img 
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_JQGaxBnOqLYWK3b6Z4dbXx9sMl_YSGOuhQ&s" // Replace with your image URL or path
          alt="DevTinder Logo"
          className="w-10 h-10 object-cover rounded-full"
        />
        <Link to="/" className="text-[30px] font-extrabold text-blue-800">
          DevTinder
        </Link>
      </div>


      {user && (
        <div className="flex items-center gap-4 bg-gradient-to-r from-blue-900 via-indigo-800 to-purple-900 p-4 shadow-md rounded-xl">
        <span className="text-lg font-semibold text-white hidden sm:block drop-shadow-lg">
          Welcome, {user.firstName}
        </span>
  
        {/* User Dropdown */}
        <div className="dropdown dropdown-end relative">
          <button
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar hover:scale-110 transition-transform duration-300"
          >
            <div className="w-12 h-12 rounded-full border-2 border-white overflow-hidden shadow-md">
              <img src={user.photoURL} alt="User Avatar" className="object-cover" />
            </div>
          </button>
  
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 w-56 p-3 bg-opacity-90 bg-gray-900 text-white rounded-lg shadow-xl backdrop-blur-md border border-gray-700"
          >
            <li>
              <Link to="/profile" className="hover:bg-indigo-700 text-lg transition-colors duration-300 rounded-md px-3 py-2 text-[17px]">
                Profile
              </Link>
            </li>
            <li>
              <Link to="/connections" className="hover:bg-indigo-700 transition-colors duration-300 rounded-md px-3 py-2 text-[17px]">
                Connections
              </Link>
            </li>
            <li>
              <Link to="/requests" className="hover:bg-indigo-700 transition-colors duration-300 rounded-md px-3 py-2 text-[17px]">
                Received Requests
              </Link>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="hover:bg-red-600 transition-colors duration-300 rounded-md px-3 py-2 text-[17px]"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
      )}
    </nav>
  );
};

export default Navbar;
