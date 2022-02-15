import { UserContext } from "../App";
import { useContext, useState, useEffect } from "react";
import { ActionCableConsumer } from "react-actioncable-provider";
import ChatMessage from "./ChatMessage";

function Chat({ friend, messages, setMessages, chatID }) {
  const user = useContext(UserContext);
  const token = localStorage.getItem("jwt");
  const [newMsg, setNewMsg] = useState("");

  const channelObject = {
    channel: "ChatChannel",
    message: [],
  };

  // useEffect(() => {
  //   fetch("http://localhost:3000/chats/1", {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then(console.log);
  // }, [token]);

  const newMessageObj = {
    message: {
      user_id: user.id,
      chat_id: chatID,
      content: newMsg,
    },
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
    });
    // .then((res) => res.json())
    // .then((data) => {
    //   setMessages([...messages, data]);
    //   console.log(data);
    // });
  }

  function handleRecieveData(data) {
    console.log(data);
    // if (data.messages) {
    //   setMessages(data.messages);
    // }
    // if (data.chat_id === chatID) {
    //   return <ChatMessage key={data.id} data={data} />;
    // }
  }

  return (
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
      <div>
        <form onSubmit={handleSendMessage}>
          <input
            type="textarea"
            placeholder="start typing a message"
            value={newMsg}
            onChange={(e) => {
              setNewMsg(e.target.value);
              console.log(e.target.value);
            }}
          ></input>
          <button type="submit">SEND</button>
        </form>
      </div>
    </ActionCableConsumer>
  );
}

export default Chat;
