import { UserContext } from "../../App";
import { useContext, useState, useEffect } from "react";
import { ActionCableConsumer } from "react-actioncable-provider";
import ChatMessage from "./ChatMessage";

function Chat({ friend, messages, setMessages, chatID }) {
  const user = useContext(UserContext);
  const token = localStorage.getItem("jwt");
  const [newMsg, setNewMsg] = useState("");

  const channelObject = {
    channel: "ChatChannel",
    chat_id: chatID,
  };

  const newMessageObj = {
    user_id: user.id,
    chat_id: chatID,
    content: newMsg,
  };

  function handleSendMessage(e) {
    e.preventDefault();
    fetch(`http://localhost:3000/chat_messages`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMessageObj),
    }).then(() => setNewMsg(""));
    // .then((res) => res.json())
    // .then((data) => {
    //   setMessages([...messages, data]);
    //   console.log(data);
    // });
  }

  function handleRecieveData(data) {
    if (data.content) {
      setMessages([...messages, data]);
    }
  }

  return (
    <>
      <ActionCableConsumer
        channel={channelObject}
        onReceived={(data) => handleRecieveData(data)}
      >
        <p>User:</p>
        <p>{user.username}</p>
        <p>Friend:</p>
        <p>{friend.username}</p>

        <div>
          {messages
            ? messages.map((msg) => {
                return <ChatMessage key={msg.id} data={msg} />;
              })
            : null}
        </div>
      </ActionCableConsumer>
      <div className="absolute bottom-0 right-0 w-2/5">
        <form onSubmit={handleSendMessage}>
          <input
            className="m-3 p-2 w-4/6 rounded-md"
            type="textarea"
            placeholder="start typing a message"
            value={newMsg}
            onChange={(e) => {
              setNewMsg(e.target.value);
            }}
          ></input>
          <button
            type="submit"
            className="w-1/6 bg-white m-3 p-2 rounded-md text-sky-500"
          >
            SEND
          </button>
        </form>
      </div>
    </>
  );
}

export default Chat;
