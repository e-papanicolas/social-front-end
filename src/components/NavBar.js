import { NavLink, useNavigate } from "react-router-dom";
import React from "react";
import "../index.css";
import 'tw-elements';

function NavBar({ user, handleLogOut }) {
  const navigate = useNavigate();


  return (

    <div
      className="w-70 h-full shadow-md bg-gray-300 absolute z-10"
      id="sidenavSecExample"
    >
      <div className="pt-4 pb-2 px-6">
          <div className="grow ml-3">
            <p className="text-2xl font-semibold text-stone-700">
              App Name
            </p>
          </div>
          <div className="flex items-center">
            <div className="flex mt-5">
              <div className="shrink-0">
                <img
                  src="https://img.icons8.com/external-bearicons-glyph-bearicons/64/000000/external-User-essential-collection-bearicons-glyph-bearicons.png"
                  className="rounded-full w-10"
                  alt="Avatar"
                />
              </div>
              <div className="grow ml-3 pt-2">
                <p className="text-md font-semibold text-stone-700">{user.first_name} {user.last_name}</p>

              </div>
            </div>
          </div>
   
      </div>

      <ul class="relative px-1 mt-5">
        <li class="relative" onClick={() => navigate("/me")}>
          <a class="flex items-center text-lg py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-amber-600 hover:bg-gray-200 transition duration-300 ease-in-out" href="#!" data-mdb-ripple="true" data-mdb-ripple-color="yellow">
            <span>Profile</span>
          </a>
        </li>
        <li class="relative" onClick={() => navigate("/")}>
          <a class="flex items-center text-lg py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-amber-600 hover:bg-gray-200 transition duration-300 ease-in-out" href="#!" data-mdb-ripple="true" data-mdb-ripple-color="yellow">
            <span>Newsfeed</span>
          </a>
        </li>
        <li class="relative" onClick={() => navigate("friends")}>
          <a class="flex items-center text-lg py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-amber-600 hover:bg-gray-200 transition duration-300 ease-in-out" href="#!" data-mdb-ripple="true" data-mdb-ripple-color="yellow">
            <span>Friends</span>
          </a>
        </li>
        <li class="relative" onClick={() => navigate("/chat")}>
          <a class="flex items-center text-lg py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-amber-600 hover:bg-gray-200 transition duration-300 ease-in-out" href="#!" data-mdb-ripple="true" data-mdb-ripple-color="yellow">
            <span>Chat</span>
          </a>
        </li>
        <li class="relative mt-5" onClick={handleLogOut}>
          <a class="flex items-center text-lg py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-amber-600 hover:bg-gray-200 transition duration-300 ease-in-out" href="#!" data-mdb-ripple="true" data-mdb-ripple-color="yellow">
            <span>Logout</span>
          </a>
        </li>
      </ul>
    </div>
  );
}

export default NavBar;
