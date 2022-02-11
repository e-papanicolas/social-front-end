import "../styles/Chat.css";

function Chat({ user }) {
  return (
    <div className="bg-yellow-100 flex flex-col min-h-screen">
      <p>chat page</p>
      <div>
        <h1 className="text-xl font-bold">WELCOME {user.first_name}</h1>
      </div>
    </div>
  );
}

export default Chat;
