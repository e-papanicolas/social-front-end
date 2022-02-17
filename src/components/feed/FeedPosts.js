import React, { useState } from "react";
import { CreatedDate } from "../ToolComponents/CreatedDate";
import { NumberWithCommas } from "../ToolComponents/NumberWithCommas";

const FeedPosts = ({ post }) => {
  const token = localStorage.getItem("jwt");
  const [likes, setLikes] = useState(post.likes);
  const [likeHeart, setLikeHeart] = useState(false);

  function handleNewLike() {
    setLikeHeart(!likeHeart);
    fetch(`http://localhost:3000/posts/${post.id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ likes: likeHeart ? likes - 1 : likes + 1 }),
    }).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          setLikes(likeHeart ? likes - 1 : likes + 1);
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
      className="flex flex-col mr-20 rounded-md ring-2 ring-sky-400 my-2 bg-sky-200 group "
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
      <div className="flex">
        <button
          onClick={handleNewLike}
          className="max-w-fit px-1 ml-2 text-red-500 hidden group-hover:block"
        >
          {likeHeart ? "♥" : "♡"}
        </button>
        <small className="ml-1 hidden group-hover:block">
          {NumberWithCommas(likes)}{" "}
          {likes === 1 ? "person likes this" : "people like this"}
        </small>
      </div>
    </div>
  );
};

export default FeedPosts;
