import React from "react";
// import { format } from "date-fns";
import { useContext } from "react";
import { UserContext } from "../../App";

export default function ChatMessage({ data }) {
  const user = useContext(UserContext);
  const date = new Date(data.created_at).toString();

  if (data.user_id === user.id) {
    return (
      <div className="w-full flex flex-col items-end">
        <p className="bg-sky-500 rounded-tl-xl rounded-tr-xl rounded-bl-xl p-3 justify-end w-1/2 mr-2">
          {data.content}
        </p>
        {/* <p>{data.created_at}</p> */}
        <p className="mr-2">
          {date.slice(0, 10)} {date.slice(16, 21)}
        </p>
      </div>
    );
  } else {
    return (
      <div className="w-full flex flex-col items-start">
        <p className="bg-white rounded-tl-xl rounded-tr-xl rounded-br-xl p-3 justify-start w-1/2">
          {data.content}
        </p>
        <p>
          {date.slice(0, 10)} {date.slice(16, 21)}
        </p>
      </div>
    );
  }
}

// const formatDate = (data) => {
//   const timestamp = data.created_at;
//   const date = timestamp.slice(0, 9);
//   const time = timestamp.slice(11, 15);
//   console.log(date, time);
//   format(new Date());
// };
// formatDate();
