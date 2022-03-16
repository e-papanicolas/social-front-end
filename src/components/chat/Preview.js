import React from "react";
import { UserContext } from "../../App";
import { useContext } from "react";

export default function Preview({
  chat,
  handleStartExistingChat,
  handleDeleteChat,
}) {
  const user = useContext(UserContext);

  const date = new Date(chat.updated_at).toString();

  return (
    <div className="cursor-pointer">
      <div
        onClick={() => handleStartExistingChat(chat)}
        className="flex justify-between"
      >
        <div className="flex items-center">
          <img
            src={user.avatar}
            className="rounded-full w-20 p-2"
            alt="Avatar"
          />
          <div>
            <p>
              <strong>
                {chat.sender.first_name[0].toUpperCase() +
                  chat.sender.first_name.slice(1)}{" "}
                {chat.sender.last_name[0].toUpperCase() +
                  chat.sender.last_name.slice(1)}{" "}
                @{chat.sender.username}
              </strong>
            </p>
            <p className="text-slate-500 text-xs">{date.slice(0, 10)}</p>
          </div>
        </div>
        <div className="flex items-center mx-5">
          <button onClick={() => handleDeleteChat(chat)}>X</button>
        </div>
      </div>
    </div>
  );
}
