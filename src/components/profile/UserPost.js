import React from "react";
import { CreatedDate } from "../ToolComponents/CreatedDate";

const UserPost = ({ post }) => {
  return (
    <div className="ml-2 w-11/12 flex flex-col p-1 rounded-md ring-2 ring-sky-400 my-2 bg-sky-200 group">
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
        <small>Likes: 0 (not implemented yet)</small>
      </div>
    </div>
  );
};

export default UserPost;
