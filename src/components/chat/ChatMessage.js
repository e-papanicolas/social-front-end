import React from "react";
import { format } from "date-fns";

export default function ChatMessage({ data }) {
  console.log(data);
  // const formatDate = (data) => {
  //   const timestamp = data.created_at;
  //   const date = timestamp.slice(0, 9);
  //   const time = timestamp.slice(11, 15);
  //   console.log(date, time);
  //   format(new Date());
  // };
  // formatDate();
  return (
    <div key={data.user_id}>
      <p>{data.content}</p>
      <p>{data.user_id}</p>
      <p>{data.created_at}</p>
    </div>
  );
}
