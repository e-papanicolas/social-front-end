import React from "react";
import { UserContext } from "../../App";
import { useContext } from "react";

export default function Preview({
  chat,
  handleStartExistingChat,
  handleDeleteChat,
}) {
  const user = useContext(UserContext);

  // console.log(chat);

  const date = new Date(chat.updated_at).toString();

  return (
    <div className="cursor-pointer">
      <div onClick={() => handleStartExistingChat(chat)}>
        <img src={user.avatar} className="rounded-full w-10 p-2" alt="Avatar" />
        <div>
          <p>
            {chat.sender.first_name} {chat.sender.last_name} @
            {chat.sender.username}
          </p>
          <p>{date.slice(0, 10)}</p>
        </div>
      </div>
      <button onClick={() => handleDeleteChat(chat)}>X</button>
    </div>
  );
}
