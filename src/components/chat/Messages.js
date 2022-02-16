import { UserContext } from "../../App";
import { useContext, useState, useEffect } from "react";
import Chat from "./Chat";
import { ActionCableProvider } from "react-actioncable-provider";

function Messages({ allUsers }) {
  const user = useContext(UserContext);
  const token = localStorage.getItem("jwt");
  const [messageSearch, setMessageSearch] = useState("");
  const [userSearch, setUserSearch] = useState("");
  const [userDisplay, setUserDisplay] = useState([]);
  const [popup, setPopup] = useState(false);
  const [currentChat, setCurrentChat] = useState(false);
  const [chatFriend, setChatFriend] = useState(null);
  const [messages, setMessages] = useState([]);
  const [chatID, setChatID] = useState(null);

  // useEffect(() => {
  //   fetch(`http://localhost:3000/chats`, {
  //     method: "GET",
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //     });
  // }, [token, user]);

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

  function handleStartNewChat(new_user) {
    setCurrentChat(true);
    setPopup(!popup);
    setChatFriend(new_user);

    fetch(`http://localhost:3000/chats`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: `chat test`,
        sender_id: user.id,
        recipient_id: new_user.id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setMessages(data.chat_messages);
        setChatID(data.id);
        console.log(data);
      });
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
            placeholder="search chats"
            value={messageSearch}
            onChange={(e) => setMessageSearch(e.target.value)}
          ></input>
        </form>
        <div>render all chats</div>
      </div>
      <div>
        {currentChat ? (
          <ActionCableProvider url="ws://localhost:3000/cable">
            <Chat
              friend={chatFriend}
              messages={messages}
              chatID={chatID}
              setMessages={setMessages}
            />
          </ActionCableProvider>
        ) : null}
      </div>
    </div>
  );
}

export default Messages;
