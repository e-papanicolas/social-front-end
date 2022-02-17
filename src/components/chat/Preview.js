import React from "react";
import { UserContext } from "../../App";
import { useContext, useState } from "react";

export default function Preview({ chat }) {
  const user = useContext(UserContext);

  console.log(chat);
  const sender = chat.chatters.find((c) => c.sender_id !== user.id);
  const date = new Date(chat.updated_at).toString();

  return (
    <div>
      <div>{sender[0].avatar}</div>
      <div>
        <p>
          {sender[0].first_name} {sender[0].last_name} @{sender[0].username}
        </p>
        <p>
          {date.slice(0, 10)} {date.slice(16, 21)}
        </p>
        <p>preview here</p>
      </div>
    </div>
  );
}
