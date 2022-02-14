import "../index.css";
import UserPost from "./UserPost";
import { CreatedDate } from "./Tool Components/CreatedDate";

function Profile({ user }) {
  //For Adding friends profile picture later
  // for (let i = 0; i < 5; i++) {
  //   let friend = user.friends[i];
  //   return friend.avatar;
  // }

  return (
    <div className="bg-yellow-100 min-h-screen min-w-screen ml-60 pt-40 flex justify-center ">
      <div className="ml-10 flex flex-col items-center">
        <div className="absolute top-0 h-60 -z-1 w-full bg-white flex justify-center items-center">
          <p>banner?</p>
        </div>
        <span className="w-52 h-64 flex flex-col items-center">
          <img
            src={user.avatar}
            alt="user avatar"
            className="h-full w-40 object-cover rounded-full border-4 border-white z-10"
          />
          <h2>
            {user.first_name[0].toUpperCase() + user.first_name.slice(1)}{" "}
            {user.last_name[0].toUpperCase() + user.last_name.slice(1)}
          </h2>
          <h2 className="font-bold">{user.username}</h2>
          <div>
            <p>You currently have {user.friends.length} friends</p>
          </div>
          <div id="welcome">
            <p>Joined {CreatedDate(user)}</p>
          </div>
        </span>

        <div>
          <span className="w-full h-64 flex flex-col items-start">
            <h3 className="ml-2 mt-5 font-bold">Your post history</h3>
            {user.posts === 0 ? (
              <p>It's quiet in here. Post something!</p>
            ) : (
              user.posts.map((post) => {
                return <UserPost post={post} />;
              })
            )}
          </span>
        </div>
      </div>
    </div>
  );
}
export default Profile;
