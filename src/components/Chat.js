import "../styles/Chat.css";

function Chat({ user }) {
  return (
    <div id="chat-container">
      <p>chat page</p>
      <div id="welcome">
        <h1>WELCOME {user.first_name}</h1>
      </div>
    </div>
  );
}

export default Chat;
