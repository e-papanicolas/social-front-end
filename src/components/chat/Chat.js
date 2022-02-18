import { UserContext } from "../../App";
import { useContext, useState } from "react";
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
    fetch(`http://tweet-tweeter.herokuapp.com/chat_messages`, {
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
    console.log(data);
    if (data.messages) {
      setMessages(data.messages);
    } else if (data.content) {
      setMessages([...messages, data]);
    }
  }

  return (
    <>
      <ActionCableConsumer
        channel={channelObject}
        onReceived={(data) => handleRecieveData(data)}
      >
        <div className="h-5/6 mt-10 overflow-y-scroll">
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
            className="m-3 p-2 w-4/6 rounded-md border"
            type="textarea"
            placeholder="Start typing a message"
            value={newMsg}
            onChange={(e) => {
              setNewMsg(e.target.value);
            }}
          ></input>
          <button
            type="submit"
            className="w-1/6 bg-white m-3 p-2 rounded-md text-white bg-sky-500 "
          >
            SEND
          </button>
        </form>
      </div>
    </>
  );
}

export default Chat;
