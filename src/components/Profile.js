import "../index.css"

function Profile({ user }) {
  return (
    <div className="bg-yellow-200">
      <p>profile page</p>
      <div id="welcome">
        <h1 className="text-3xl font-bold underline">WELCOME {user.first_name}</h1>
      </div>
    </div>
  );
}
export default Profile;
