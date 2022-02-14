import "../styles/Chat.css";
import { UserContext } from "../App";
import { useContext, useState, useEffect } from "react";
import Chat from "./Chat";

function Messages({ allUsers }) {
  const user = useContext(UserContext);
  const token = localStorage.getItem("jwt");
  const [messageSearch, setMessageSearch] = useState("");
  const [userSearch, setUserSearch] = useState("");
  const [userDisplay, setUserDisplay] = useState([]);
  const [popup, setPopup] = useState(false);
  const [currentChat, setCurrentChat] = useState(false);
  const [chatFriend, setChatFriend] = useState(null);

  function handleUserSearch(e) {
    setUserSearch(e.target.value);
    const results = allUsers.filter((user) => {
      return (
        user.first_name
          .toLowerCase()
          .startsWith(e.target.value.toLowerCase()) ||
        user.username.toLowerCase().startsWith(e.target.value.toLowerCase())
      );
    });
    setUserDisplay(results);
    if (e.target.value === "") {
      setUserDisplay([]);
    }
  }

  function handleNewMessage() {
    setPopup(true);
  }

  function handleStartNewChat(user) {
    setCurrentChat(true);
    setPopup(!popup);
    setChatFriend(user);
  }

  if (popup) {
    return (
      <div className="bg-yellow-100 min-h-screen p-72 grid grid-cols-2">
        <h1 className="font-bold text-xl">New message</h1>
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            placeholder="search for people"
            value={userSearch}
            onChange={handleUserSearch}
          ></input>
        </form>
        <div>
          {userDisplay.map((user) => {
            return (
              <div
                key={user.id}
                className="flex"
                onClick={() => handleStartNewChat(user)}
              >
                <img
                  src={user.avatar}
                  alt={user.username}
                  className="rounded-full shadow-lg h-10"
                />
                <div>
                  <p>
                    {user.first_name} {user.last_name}
                  </p>
                  <p>{user.username}</p>
                </div>
              </div>
            );
          })}
        </div>
        <h1 onClick={() => setPopup(!popup)}>X</h1>
      </div>
    );
  }

  return (
    <div className="bg-yellow-100 min-h-screen pl-72 grid grid-cols-2">
      <div>
        <h1 className="font-bold text-xl">Messages</h1>
        <button onClick={handleNewMessage}>+ NEWMSG</button>
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            placeholder="search for people"
            value={messageSearch}
            onChange={(e) => setMessageSearch(e.target.value)}
          ></input>
        </form>
        <div>render all chats</div>
      </div>
      <div>
        {currentChat ? (
          <Chat friend={chatFriend} />
        ) : (
          "You have no chats right now"
        )}
      </div>
    </div>
  );
}

export default Messages;
