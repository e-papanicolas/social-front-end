import "../../index.css";
import UserPost from "./UserPost";
import { CreatedDate } from "../ToolComponents/CreatedDate";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../App";

function Profile({ setUser }) {
  const user = useContext(UserContext);
  const [editProfile, setEditProfile] = useState(false);
  const [bioInput, setBioInput] = useState("");
  const [deleteWarning, setDeleteWarning] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState("");
  const token = localStorage.getItem("jwt");
  const navigate = useNavigate();

  //For Adding friends profile picture later
  // for (let i = 0; i < 5; i++) {
  //   let friend = user.friends[i];
  //   return friend.avatar;
  // }
  const bioInputHandler = (e) => {
    setBioInput(e.target.value);
  };

  const submitBioEdit = () => {
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
        setEditProfile(false);
      });
  };

  const deleteHandler = (e) => {
    e.preventDefault();
    if (confirmDelete === user.username) {
      console.log("deleted");

      fetch(`http://localhost:3000/users/${user.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      localStorage.clear();
      setUser({});
      navigate("/");
    } else {
      console.log("type in confirmation first");
    }
  };
  return (
    <div className="min-h-screen w-screen pt-40 flex justify-center ">
      <div className="ml-10 flex flex-col items-center">
        <div className="absolute top-0 h-60 -z-1 w-full bg-slate-400 flex justify-center items-center">
          <p className="text-white">Upload a banner here!</p>
        </div>
        <span className="w-96 h-64 flex flex-col items-center">
          <span className="z-10">
            <img
              src={user.avatar}
              alt="user avatar"
              className="h-40 w-40 object-cover rounded-full border-4 border-white bg-slate-400"
            />
          </span>
          <h2>
            {user.first_name[0].toUpperCase() + user.first_name.slice(1)}{" "}
            {user.last_name[0].toUpperCase() + user.last_name.slice(1)}
          </h2>
          <h2 className="font-bold">{`@${user.username}`}</h2>
          <div>
            <p>You currently have {user.friends.length} friends</p>
          </div>
          <div id="welcome">
            <p>Joined {CreatedDate(user)}</p>
          </div>
          <div className="flex justify-center mt-5">
            <button
              className="mb-5 px-5 py-1 bg-sky-500 text-white rounded-full hover:bg-sky-600 text-white"
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
                className="ml-5 mb-5 px-4 py-1 bg-slate-400 text-white rounded-full hover:bg-slate-500 text-white"
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
                className="w-full h-24 px-1.5 mb-2 form-control block text-base font-normal text-gray-700 bg-gray-200 bg-clip-padding border border-solid border-amber-600 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-gray-100 focus:outline-none"
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

          <div className=" h-full w-full ">
            <h3 className="ml-2 mt-5 font-bold">Your post history</h3>
            <span className="w-full h-40 flex flex-col items-start overflow-y-scroll">
              {user.posts.length === 0 ? (
                <p>It's quiet in here. Post something!</p>
              ) : (
                user.posts.map((post) => {
                  return <UserPost post={post} key={post.id} />;
                })
              )}
            </span>
          </div>

          <div className="w-1/2 flex justify-center mt-5">
            <button
              className={`w-600 text-xs px-3 py-2 rounded-full ml-2 text-white py-1 px-3 my-2  ${
                deleteWarning
                  ? "bg-slate-400 hover:bg-slate-500"
                  : "bg-red-500 hover:bg-red-700"
              }`}
              onClick={() => setDeleteWarning(!deleteWarning)}
            >
              {deleteWarning ? "Cancel" : "Delete Account"}
            </button>
          </div>
          {deleteWarning ? (
            <div className="w-full">
              <p className="text-center">
                <strong>WARNING:</strong> You are about to delete your account.
                This cannot be undone.
              </p>
              <p className="text-center">
                Please type your username and press "I Agree" to confirm.
              </p>
              <form onSubmit={deleteHandler}>
                <input
                  type="text"
                  name="deleteUser"
                  className="bg-slate-200 border-[1px] border-red-500 rounded-md"
                  placeholder={user.username}
                  onChange={(e) => {
                    setConfirmDelete(e.target.value);
                  }}
                />
                <input
                  type="submit"
                  className="w-600 text-xs px-3 py-2 rounded-full ml-2 text-white py-1 px-3 my-2 bg-red-500 hover:bg-red-700"
                  value="I Agree"
                />
              </form>
            </div>
          ) : null}
        </span>
      </div>
    </div>
  );
}
export default Profile;
