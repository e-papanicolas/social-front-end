import { UserContext } from "../../App";
import { useContext, useState, useEffect } from "react";
import Chat from "./Chat";
import Preview from "./Preview";

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
  const [chats, setChats] = useState([]);
  const [update, setUpdate] = useState(false);

  // get all of users chats
  useEffect(() => {
    fetch(`http://tweet-tweeter.herokuapp.com/chats/${user.id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setChats(data);
      });
  }, [token, user, update]);

  // searches all users
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

  // handles deleting a chat
  function handleDeleteChat(chat) {
    fetch(`http://tweet-tweeter.herokuapp.com/chats/${chat.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(() => {
      setUpdate(!update);
    });
  }

  // handles popup for start new chat/message
  function handleNewMessage() {
    setPopup(true);
  }

  // sends request to start new chat
  function handleStartNewChat(new_user) {
    setCurrentChat(true);
    setPopup(!popup);
    setChatFriend(new_user);

    fetch(`http://tweet-tweeter.herokuapp.com/chats`, {
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
      });
  }

  // starts chat that already exists in preview
  function handleStartExistingChat(chat) {
    fetch(`http://tweet-tweeter.herokuapp.com/chats`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: `chat test`,
        sender_id: chat.sender.id,
        recipient_id: chat.recipient.id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setCurrentChat(true);
        setMessages(data.chat_messages);
        setChatID(data.id);
      });
  }

  // renders chat previews and chat screen
  return (
    <div>
      {popup ? (
        <div className="absolute w-full h-screen bg-gray-500/[.5] z-20 flex justify-center items-center">
          <div className="bg-white p-3 min-w-content min-h-fit flex justify-center flex-col overflow-y-scroll rounded-md shadow-lg">
            <div className="flex">
              <div className="flex w-full items-center">
                <h1 className="font-bold text-xl">New message</h1>
              </div>
              <form onSubmit={(e) => e.preventDefault()}>
                <input
                  className="p-2 m-3 border border-blue-100 rounded-md"
                  type="text"
                  placeholder="search for people"
                  value={userSearch}
                  onChange={handleUserSearch}
                ></input>
              </form>
            </div>
            <div>
              {userDisplay.map((user) => {
                return (
                  <div
                    key={user.id}
                    className="flex hover:bg-blue-400 p-2 rounded-md"
                    onClick={() => handleStartNewChat(user)}
                  >
                    <img
                      src={user.avatar}
                      alt={user.username}
                      className="rounded-full shadow-lg h-10 mr-5"
                    />
                    <div>
                      <p>
                        {user.first_name[0].toUpperCase() +
                          user.first_name.slice(1)}{" "}
                        {user.last_name[0].toUpperCase() +
                          user.last_name.slice(1)}
                      </p>
                      <p className="text-slate-400">{`@${user.username}`}</p>
                    </div>
                  </div>
                );
              })}
              <div className="w-full flex justify-center">
                <button
                  className="w-600 px-1 px-3 py-1 rounded-md ml-2 text-white my-2 bg-gray-400 hover:bg-gray-500"
                  onClick={() => setPopup(!popup)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <div className=" min-h-screen max-h-screen pl-72 grid grid-cols-3 overflow-hidden pt-5">
        <div className="h-full overflow-y-hidden border-r-[1px]">
          <div className="flex flex-col w-full border-b-[1px]">
            <div className="flex justify-between pr-10">
              <h1 className="font-bold text-xl">Messages</h1>
              <button onClick={handleNewMessage}>+ NEWMSG</button>
            </div>
            <form onSubmit={(e) => e.preventDefault()}>
              <input
                type="text"
                placeholder="search chats"
                value={messageSearch}
                onChange={(e) => setMessageSearch(e.target.value)}
                className="border p-1 mt-2 mb-2 rounded-md"
              ></input>
            </form>
          </div>
          {chats.length > 0
            ? chats.map((chat) => {
                return (
                  <Preview
                    chat={chat}
                    key={chat.id}
                    handleDeleteChat={handleDeleteChat}
                    handleStartExistingChat={handleStartExistingChat}
                  />
                );
              })
            : null}
        </div>
        <div className="col-span-2">
          {currentChat ? (
            <Chat
              friend={chatFriend}
              messages={messages}
              chatID={chatID}
              setMessages={setMessages}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Messages;
