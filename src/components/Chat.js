import { UserContext } from "../App";
import { useContext, useState, useEffect } from "react";
import { ActionCableConsumer } from "react-actioncable-provider";

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
      chat_id: 1,
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
    })
      .then((res) => res.json())
      .then((data) => {
        setMessages([...messages, data]);
        // console.log(data);
      });
  }

  return (
    <ActionCableConsumer channel={channelObject} onReceived={console.log}>
      <p>User:</p>
      <p>{user.username}</p>
      <p>Friend:</p>
      <p>{friend.username}</p>

      <div>
        {messages
          ? messages.map((msg) => {
              return (
                <div key={msg.id}>
                  <p>{msg.content}</p>
                  <p>{msg.user_id}</p>
                </div>
              );
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
