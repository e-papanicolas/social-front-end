import React from "react";

export default function ChatMessage({ data }) {
  console.log(data);
  return (
    <div className="bg-white">
      <p>{data.content}</p>
      <p>{data.user_id}</p>
      <p>{data.created_at}</p>
    </div>
  );
}
