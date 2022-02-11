import { NavLink } from "react-router-dom";
import React from "react";
import "../index.css"

function NavBar({ handleLogOut }) {
  return (
      <div className="min-w-screen h-20 bg-gray-500 flex justify-between items-center p-50">
      <h1 className="text-2xl">social-media-app</h1>

      <div className="">
        <ul className="flex space-x-20 w-1000">
          <li>
            <NavLink className="text-white text-2xl" to="/">
              Feed
            </NavLink>
          </li>
          <li>
            <NavLink className="text-white text-2xl" to="/me">
              Profile
            </NavLink>
          </li>
          <li>
            <NavLink className="text-white text-2xl" to="/chat">
              Chat
            </NavLink>
          </li>
          <li>
            <NavLink className="text-white text-2xl" to="/friends">
              Friends
            </NavLink>
          </li>
          <li onClick={handleLogOut} className="text-white text-2xl">
            Log Out
          </li>
        </ul>
      </div>
    </div>
    
  );
}

export default NavBar;
