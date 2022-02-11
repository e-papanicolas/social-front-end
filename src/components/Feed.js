import "../styles/Feed.css";

function Feed({ user }) {
  return (
    <div id="feed-container">
      <p>feed</p>
      <div id="welcome">
        <h1>WELCOME {user.first_name}</h1>
      </div>
    </div>
  );
}

export default Feed;
