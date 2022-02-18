import React from "react";
import { CreatedDate } from "../ToolComponents/CreatedDate";

const UserPost = ({ post }) => {
  return (
    <div className="ml-2 w-11/12 flex flex-col py-2 px-3 rounded-md my-2 bg-sky-200 group">
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
        <small>Likes: {post.likes}</small>
      </div>
    </div>
  );
};

export default UserPost;
