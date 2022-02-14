import { UserContext } from "../App";
import { useContext, useState, useEffect } from "react";

function Chat({ friend }) {
  const user = useContext(UserContext);
  const token = localStorage.getItem("jwt");

  return (
    <div>
      <p>User:</p>
      <p>{user.username}</p>
      <p>Friend:</p>
      <p>{friend.username}</p>
    </div>
  );
}

export default Chat;
