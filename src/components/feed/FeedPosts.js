import React, { useContext, useState } from "react";
import { UserContext } from "../../App";
import { CreatedDate } from "../ToolComponents/CreatedDate";
import { NumberWithCommas } from "../ToolComponents/NumberWithCommas";

const FeedPosts = ({ post }) => {
  const token = localStorage.getItem("jwt");
  const [likes, setLikes] = useState(post.likes);
  const [likeHeart, setLikeHeart] = useState(false);
  const user = useContext(UserContext);

  function handleNewLike() {
    setLikeHeart(!likeHeart);
    fetch(`http://tweet-tweeter.herokuapp.com/posts/${post.id}`, {
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
      className="flex flex-col mr-20 rounded-md my-2 bg-sky-200 group px-2 py-1"
    >
      <div className="flex flex-row">
        <img src={user.avatar} className="rounded-full w-10 p-2" alt="Avatar" />
        <p className="max-w-fit my-1 p-1 rounded-lg font-semibold">
          {post.user.username === user.username
            ? "You"
            : `@${post.user.username}`}
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
