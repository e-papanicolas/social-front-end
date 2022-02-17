import "../../index.css";
import { useState, useContext } from "react";
import { UserContext } from "../../App";
import FeedPosts from "./FeedPosts";

function Feed({ posts, handleAddPost }) {
  const user = useContext(UserContext);
  const [filterFriends, setFilterFriends] = useState(true);
  const [newPost, setNewPost] = useState({
    content: "",
    user_id: user.id,
  });
  const [category, setCategory] = useState("friends");

  let friendsPostsArray = [];
  //Filters posts by friends
  const friendsPosts = user.friends.map((friend) =>
    posts.filter((post) => friend.id === post.user.id)
  );

  //Takes each friend and pushes post into empty array
  friendsPosts.map((user) => {
    return user.map((posts) => friendsPostsArray.push(posts));
  });

  // const sortedPosts = [...posts];
  const sortedPosts = filterFriends ? [...friendsPostsArray] : [...posts];
  sortedPosts.sort(function (a, b) {
    return new Date(b.created_at) - new Date(a.created_at);
  });

  function handleFormChange(e) {
    setNewPost({ ...newPost, [e.target.name]: e.target.value });
  }

  const categorySelector = (category) => {
    setCategory(category);
  };

  return (
    <div className="min-h-screen flex flex-col pl-72 pt-10">
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
          className="w-full px-1.5 ml-5 mb-2 form-control block text-base font-normal text-gray-700 bg-gray-200 bg-clip-padding border border-solid border-sky-500 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-gray-100 focus:outline-none"
          onChange={handleFormChange}
        ></textarea>
        <div className="flex">
          <button className="ml-5 mb-5 px-3 py-2 px-3 bg-sky-400 text-white rounded-full hover:bg-sky-600 text-white">
            Share My Post
          </button>
          {/* <button
            type="submit"
            className="ml-5 mb-5 px-1.5 bg-gray-200 text-gray-700 border border-amber-600 rounded hover:bg-gray-300"
            onClick={null}
          >
            Add a Picture
          </button> */}
        </div>
      </form>

      <div className="w-full text-center border-t-[1px] mb-2 pt-4">
        <span
          className={`mx-20 cursor-pointer p-2 rounded-md ${
            category === "friends" ? "bg-sky-400 text-white" : ""
          }`}
          onClick={() => {
            setFilterFriends(true);
            categorySelector("friends");
          }}
        >
          Friends Posts
        </span>
        <span
          className={`mx-20 cursor-pointer p-2 rounded-md ${
            category === "discover" ? "bg-sky-400 text-white" : ""
          }`}
          onClick={() => {
            setFilterFriends(false);
            categorySelector("discover");
          }}
        >
          Discover more
        </span>
      </div>

      {sortedPosts.length > 0 ? (
        sortedPosts.map((post) => {
          return <FeedPosts post={post} key={post.id} />;
        })
      ) : (
        <p>Add more friends to see what they're up to!</p>
      )}
    </div>
  );
}
export default Feed;
