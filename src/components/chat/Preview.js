import React from "react";
import { UserContext } from "../../App";
import { useContext, useState } from "react";

export default function Preview({
  chat,
  handleStartExistingChat,
  handleDeleteChat,
}) {
  const user = useContext(UserContext);

  console.log(chat);

  const date = new Date(chat.updated_at).toString();

  return (
    <>
      <div onClick={() => handleStartExistingChat(chat)}>
        <div>{chat.sender.avatar}</div>
        <div>
          <p>
            {chat.sender.first_name} {chat.sender.last_name} @
            {chat.sender.username}
          </p>
          <p>{date}</p>
          <p>preview here</p>
        </div>
      </div>
      <button onClick={() => handleDeleteChat(chat)}>X</button>
    </>
  );
}
