import React from "react";
import { CreatedDate } from "./Tool Components/CreatedDate";

const UserPost = ({ post }) => {
  return (
    <div className="flex flex-col m-2">
      <div className="flex items-end">
        <img
          src={post.user.avatar}
          alt="user"
          className="h-8 w-8 object-cover rounded-full"
        />
        <small className="ml-2">Posted on {CreatedDate(post)}</small>
      </div>
      <div>
        <p>{post.content}</p>
      </div>
      <div>
        <small>Likes: 0</small>
      </div>
    </div>
  );
};

export default UserPost;
