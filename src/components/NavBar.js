import { NavLink } from "react-router-dom";
import React from "react";
import "../index.css";

function NavBar({ handleLogOut }) {
  return (
    <div
      className="w-70 h-full shadow-md bg-white absolute z-10"
      id="sidenavSecExample"
    >
      <div className="pt-4 pb-2 px-6">
        <a href="#!">
          <div className="grow ml-3">
            <p className="text-sm font-semibold text-blue-600">
              Social Media App Name
            </p>
          </div>
          <div className="flex items-center">
            <div className="shrink-0">
              <img
                src="https://img.icons8.com/external-bearicons-glyph-bearicons/64/000000/external-User-essential-collection-bearicons-glyph-bearicons.png"
                className="rounded-full w-10"
                alt="Avatar"
              />
            </div>
            <div className="grow ml-3">
              <p className="text-sm font-semibold text-blue-600">Users Name</p>
            </div>
            <div className="grow ml-3">
              <button
                className="bg-white hover:bg-gray-100 text-gray-800 py-1 px-2 text-xs border border-gray-400 rounded shadow"
                onClick={null}
              >
                Log Out
              </button>
            </div>
          </div>
        </a>
      </div>

      <ul className="relative px-1 mt-10">
        <li className="relative">
          <NavLink
            to="/me"
            className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out"
          >
            Profile
          </NavLink>
        </li>
      </ul>
      <ul className="relative px-1">
        <li className="relative">
          <NavLink
            to="/"
            className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out"
          >
            <span>Feed</span>
          </NavLink>
        </li>
      </ul>
      <ul className="relative px-1">
        <li className="relative">
          <NavLink
            to="/chat"
            className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out"
          >
            <span>Chat</span>
          </NavLink>
        </li>
      </ul>
      <ul className="relative px-1">
        <li className="relative">
          <NavLink
            to="/friends"
            className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out"
          >
            <span>Friends</span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default NavBar;
