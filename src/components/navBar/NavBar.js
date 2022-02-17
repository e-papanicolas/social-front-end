import { useNavigate } from "react-router-dom";
import React from "react";
import "../../index.css";
import "tw-elements";
import { UserContext } from "../../App";
import { useContext } from "react";

function NavBar({ handleLogOut }) {
  const user = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <div
      className="w-60 h-full shadow-md bg-white border-r-[1px] border-r-sky-300 fixed z-10"
      id="sidenavSecExample"
    >
      <div className="pt-4 pb-5 px-6">
        <div className="grow ml-3">
          <p className="text-2xl font-semibold text-stone-700">tweeter</p>
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
              <p className="text-md font-semibold text-stone-700">
                {`@${user.username}`}
              </p>
            </div>
          </div>
        </div>
      </div>

      <ul className="relative px-1 mt-5">
        <li className="relative" onClick={() => navigate("/me")}>
          <a
            className="flex items-center text-lg py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-white hover:bg-sky-300 transition duration-300 ease-in-out"
            href="#!"
            data-mdb-ripple="true"
            data-mdb-ripple-color="white"
          >
            <span>Profile</span>
          </a>
        </li>
        <li className="relative" onClick={() => navigate("/")}>
          <a
            className="flex items-center text-lg py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-white hover:bg-sky-300 transition duration-300 ease-in-out"
            href="#!"
            data-mdb-ripple="true"
            data-mdb-ripple-color="white"
          >
            <span>Newsfeed</span>
          </a>
        </li>
        <li className="relative" onClick={() => navigate("friends")}>
          <a
            className="flex items-center text-lg py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-white hover:bg-sky-300 transition duration-300 ease-in-out"
            href="#!"
            data-mdb-ripple="true"
            data-mdb-ripple-color="white"
          >
            <span>Friends</span>
          </a>
        </li>
        <li className="relative" onClick={() => navigate("/chat")}>
          <a
            className="flex items-center text-lg py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-white hover:bg-sky-300 transition duration-300 ease-in-out"
            href="#!"
            data-mdb-ripple="true"
            data-mdb-ripple-color="white"
          >
            <span>Chat</span>
          </a>
        </li>
        <li className="relative mt-5" onClick={handleLogOut}>
          <a
            className="flex items-center text-lg py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-white hover:bg-sky-300 transition duration-300 ease-in-out"
            href="#!"
            data-mdb-ripple="true"
            data-mdb-ripple-color="white"
          >
            <span>Logout</span>
          </a>
        </li>
      </ul>
    </div>
  );
}

export default NavBar;
