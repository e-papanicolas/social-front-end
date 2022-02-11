import "../index.css";

function Friends({ user }) {
  return (
    <div className="bg-yellow-100 min-h-screen flex felx-col flex flex-col">
      <p>friends page</p>
      <div className="">
        <h1 className="text-xl font-bold">WELCOME {user.first_name}</h1>
      </div>
    </div>
  );
}

export default Friends;
