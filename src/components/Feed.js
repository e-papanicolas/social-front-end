import "../index.css";

function Feed({ user }) {
  return (
    <div className="bg-yellow-100 min-h-screen flex flex-col">
      <p>feed</p>
      <div id="welcome">
        <h1 className="text-xl font-bold">WELCOME {user.first_name}</h1>
      </div>
    </div>
  );
}

export default Feed;
