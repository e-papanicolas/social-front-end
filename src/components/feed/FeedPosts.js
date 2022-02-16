import React, { useState } from "react";
import { CreatedDate } from "../ToolComponents/CreatedDate";
import { NumberWithCommas } from "../ToolComponents/NumberWithCommas";

const FeedPosts = ({ post }) => {
  const token = localStorage.getItem("jwt");
  const [likes, setLikes] = useState(post.likes);

  function handleNewLike() {
    fetch(`http://localhost:3000/posts/${post.id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ likes: likes + 1 }),
    }).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          setLikes(likes + 1);
          console.log(data);
        });
      } else {
        res.json().then((data) => {
          console.log(data.errors);
        });
      }
    });
  }

  return (
    <div
      key={post.content}
      className="flex flex-col mr-20 rounded-md ring-2 ring-gray-300 my-2 bg-amber-200 group"
    >
      <div className="flex flex-row">
        <img
          src="https://img.icons8.com/external-bearicons-glyph-bearicons/64/000000/external-User-essential-collection-bearicons-glyph-bearicons.png"
          className="rounded-full w-10 p-2"
          alt="Avatar"
        />
        <p className="max-w-fit my-1 p-1 rounded-lg font-semibold">
          {post.user.username}
        </p>
        <small className="self-center">{CreatedDate(post)}</small>
      </div>
      <p className="px-3">{post.content}</p>
      <small className="ml-3">Likes: {NumberWithCommas(likes)}</small>
      <button
        onClick={handleNewLike}
        className="max-w-fit px-1 rounded-md ml-2 text-white ring-2 ring-gray-300 my-2 bg-gray-400 hover:bg-gray-600 hidden group-hover:block"
      >
        Like
      </button>
    </div>
  );
};

export default FeedPosts;
