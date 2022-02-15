import "../index.css";
import UserPost from "./UserPost";
import { CreatedDate } from "./ToolComponents/CreatedDate";
import { useState } from "react";

function Profile({ user, setUser }) {
  const [editProfile, setEditProfile] = useState(false);
  const [bioInput, setBioInput] = useState("");
  const token = localStorage.getItem("jwt");

  //For Adding friends profile picture later
  // for (let i = 0; i < 5; i++) {
  //   let friend = user.friends[i];
  //   return friend.avatar;
  // }
  const bioInputHandler = (e) => {
    setBioInput(e.target.value);
  };

  const submitBioEdit = () => {
    console.log(bioInput);
    fetch(`http://localhost:3000/update_bio/${user.id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        bio: bioInput,
        id: user.id,
      }),
    })
      .then((res) => res.json())
      .then((updatedUser) => {
        setUser(updatedUser.user);
        console.log(updatedUser.user);
        setEditProfile(false);
      });
  };

  return (
    <div className="bg-yellow-100 min-h-screen min-w-screen pt-40 flex justify-center ">
      <div className="ml-10 flex flex-col items-center">
        <div className="absolute top-0 h-60 -z-1 w-full bg-white flex justify-center items-center">
          <p>banner?</p>
        </div>
        <span className="w-64 h-64 flex flex-col items-center">
          <span className="z-10">
            <img
              src={user.avatar}
              alt="user avatar"
              className="h-40 w-40 object-cover rounded-full border-4 border-white "
            />
          </span>
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
          <div className="flex">
            <button
              className="w-600 px-1 rounded-md ml-2 text-white ring-2 ring-gray-300 my-2 bg-gray-400"
              onClick={() => {
                editProfile === true
                  ? submitBioEdit()
                  : setEditProfile(!editProfile);
              }}
            >
              {editProfile === true ? "Save" : "Edit Bio"}
            </button>
            {editProfile === true ? (
              <button
                className="w-600 px-1 rounded-md ml-2 text-white ring-2 ring-gray-300 my-2 bg-gray-400"
                onClick={() => {
                  setEditProfile(!editProfile);
                }}
              >
                Cancel
              </button>
            ) : null}
          </div>

          {editProfile === true ? (
            <div className="w-full flex flex-col items-center justify-center">
              <textarea
                name="bio"
                placeholder={user.bio}
                className="w-full h-24 px-1.5 ml-5 mb-2 form-control block text-base font-normal text-gray-700 bg-gray-200 bg-clip-padding border border-solid border-amber-600 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-gray-100 focus:outline-none"
                onChange={bioInputHandler}
              ></textarea>
            </div>
          ) : user.bio === null ? (
            <div className="flex flex-col items-center justify-center">
              <p>You haven't created a bio yet</p>
              <p className="text-xs text-center text-slate-500">
                Write something about yourself to let everyone know more about
                you!
              </p>
            </div>
          ) : (
            <p>{user.bio}</p>
          )}
        </span>

        <div className="mt-28 h-full w-full ">
          <h3 className="ml-2 mt-5 font-bold">Your post history</h3>
          <span className="w-full h-80 flex flex-col items-start overflow-y-scroll">
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
