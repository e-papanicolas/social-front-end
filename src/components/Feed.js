import "../index.css";
import { useContext, useEffect, useState } from "react";
import { CreatedDate } from "./ToolComponents/CreatedDate";

//import { UserContext } from "../App"

function Feed({ user, posts, handleAddPost }) {
  //const user = useContext(UserContext);
  const [newPost, setNewPost] = useState({
    content: "",
    user_id: user.id,
  });

  const sortedPosts = [...posts];
  sortedPosts.sort(function (a, b) {
    return new Date(b.created_at) - new Date(a.created_at);
  });

  function handleFormChange(e) {
    setNewPost({ ...newPost, [e.target.name]: e.target.value });
  }

  return (
    <div className="bg-yellow-100 min-h-screen flex flex-col pl-72 pt-10">
      <div id="welcome">
        <h1 className="text-xl font-bold mb-2">WELCOME {user.first_name}</h1>
      </div>
      <form
        onSubmit={(e) => handleAddPost(newPost, e)}
        className="flex flex-col mr-32 items-start"
      >
        <textarea
          name="content"
          placeholder="What's on your mind?"
          className="w-full px-1.5 ml-5 mb-2 form-control block text-base font-normal text-gray-700 bg-gray-200 bg-clip-padding border border-solid border-amber-600 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-gray-100 focus:outline-none"
          onChange={handleFormChange}
        ></textarea>
        <div className="flex">
          <button className="ml-5 mb-5 px-1.5 bg-gray-200 text-gray-700 border border-amber-600 rounded hover:bg-gray-300">
            Share My Post
          </button>
          <button
            type="submit"
            className="ml-5 mb-5 px-1.5 bg-gray-200 text-gray-700 border border-amber-600 rounded hover:bg-gray-300"
            onClick={null}
          >
            Add a Picture
          </button>
        </div>
      </form>

      {sortedPosts.map((post) => {
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
            <button className="max-w-fit px-1 rounded-md ml-2 text-white ring-2 ring-gray-300 my-2 bg-gray-400 hover:bg-gray-600 hidden group-hover:block">
              Like
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default Feed;
