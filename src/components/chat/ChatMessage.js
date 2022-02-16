import React from "react";
import { format } from "date-fns";
import { useContext } from "react";
import { UserContext } from "../../App";

export default function ChatMessage({ data }) {
  const user = useContext(UserContext);
  console.log(data);
  // const formatDate = (data) => {
  //   const timestamp = data.created_at;
  //   const date = timestamp.slice(0, 9);
  //   const time = timestamp.slice(11, 15);
  //   console.log(date, time);
  //   format(new Date());
  // };
  // formatDate();
  if (data.user_id === user.id) {
    return (
      <div key={data.user_id} className="bg-sky-500">
        <p>{data.content}</p>
        <p>{data.user_id}</p>
        <p>{data.created_at}</p>
      </div>
    );
  } else {
    return (
      <div key={data.user_id} className="bg-white">
        <p>{data.content}</p>
        <p>{data.user_id}</p>
        <p>{data.created_at}</p>
      </div>
    );
  }
}
