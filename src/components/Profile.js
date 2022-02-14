import "../index.css";

function Profile({ user }) {
  console.log(user.created_at);

  const monthName = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const year = user.created_at.slice(0, 4);
  const month = monthName[parseInt(user.created_at.slice(5, 7))];
  const day = user.created_at.slice(8, 10);

  return (
    <div className="bg-yellow-100 min-h-screen min-w-screen p-72">
      <p>profile page</p>
      <div>
        <img src="" alt="" />
      </div>
      <div id="welcome">
        <h2>{user.username}</h2>
        <p>
          Joined {month} {day}, {year}
        </p>
        <h1 className="text-3xl font-bold underline">
          WELCOME {user.first_name}
        </h1>
      </div>
    </div>
  );
}
export default Profile;
