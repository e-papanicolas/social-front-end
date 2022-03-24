import { UserContext } from "../../App";
import { useContext, useState, useRef, useEffect } from "react";
import ChatMessage from "./ChatMessage";
import { createConsumer } from "@rails/actioncable";

function Chat({ friend, messages, setMessages, chatID }) {
  const user = useContext(UserContext);
  const token = localStorage.getItem("jwt");
  const [newMsg, setNewMsg] = useState("");
  const cable = useRef();

  useEffect(() => {
    if (!cable.current) {
      cable.current = createConsumer("ws://tweet-tweeter.herokuapp.com/cable");
    }

    const channelObject = {
      channel: "ChatChannel",
      chat_id: chatID,
    };

    const handlers = {
      received(data) {
        console.log(data);
        if (data.messages) {
          setMessages(data.messages);
        } else if (data.content) {
          setMessages([...messages, data]);
        }
      },
      connected() {
        console.log("connected");
      },
      disconnected() {
        console.log("disconnected");
        cable.current = null;
      },
    };

    const subscription = cable.current.subscriptions.create(
      channelObject,
      handlers
    );

    return function cleanup() {
      cable.current = null;
      subscription.unsubscribe();
    };
  }, [chatID, messages]);

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
  }

  return (
    <>
      <div className="h-5/6 mt-10 overflow-y-scroll">
        {messages
          ? messages.map((msg) => {
              return <ChatMessage key={msg.id} data={msg} />;
            })
          : null}
      </div>
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
