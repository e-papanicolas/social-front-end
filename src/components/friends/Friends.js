import { useState } from "react";
import "../../index.css";

function Friends({ user, allUsers, handleAddFriend, friendsList }) {
  const [searchList, setSearchList] = useState([]);

  //Filters "People you might know" and eliminates them if they're in your friends list already
  const filteredFriends = allUsers.filter((user) => {
    const friendIdList = friendsList.map((friend) => friend.id);
    return !friendIdList.includes(user.id);
  });

  


  function handleUserSearch(e) {
    const results = allUsers.filter((user) => {
      return (
        user.first_name
          .toLowerCase()
          .startsWith(e.target.value.toLowerCase()) ||
        user.username.toLowerCase().startsWith(e.target.value.toLowerCase())
      );
    });
    setSearchList(results);
    if (e.target.value === "") {
      setSearchList([]);
    }
  }

  return (
    <div className="bg-white-100 min-h-screen flex justify-around pl-72 py-10">
      <div className="flex flex-col">
      <div className="flex justify-center">
        <p className="text-2xl font-bold text-gray-700 mb-5">My Friends</p>
      </div>
      <div className="">
        {friendsList.length > 0 ? (
          friendsList.map((friend) => {
            return (
              <div key={friend.id}>
                <ul className="group flex w-96">
                  <li
                    key={friend.username}
                    className="flex bg-sky-300 border border border-sky-500 rounded my-1 px-5 w-full"
                  >
                    <img
                      src="https://img.icons8.com/external-bearicons-glyph-bearicons/64/000000/external-User-essential-collection-bearicons-glyph-bearicons.png"
                      className="rounded-full w-10 p-2"
                      alt="Avatar"
                    />
                    <p className="pt-2 text-gray-700">
                      {friend.first_name} {friend.last_name}
                    </p>
                    <p className="pl-2 pt-3.5 text-gray-700 text-xs">
                      {friend.username}
                    </p>
                  </li>
                </ul>
              </div>
            );
          })
        ) : (
          <p> You don't have any friends yet!</p>
        )}
      </div>
      </div>

      <div className="flex flex-col">

          <div classname="">
            <label className="text-2xl font-bold text-gray-700 mr-3">Find a friend:</label>
              <input 
                type="text" 
                placeholder="Search for a friend"
                className="border border-sky-400 rounded-md p-1" 
                onChange={handleUserSearch}/>

          </div>

          <div className="mt-5">

            {searchList.map(friend => {
              return (
                <div key={friend.id}>
                  <ul className="flex group">
                    <li
                      className="flex bg-sky-300 border border border-sky-500 rounded my-1 px-5 w-full"
                    >
                      <img
                        src="https://img.icons8.com/external-bearicons-glyph-bearicons/64/000000/external-User-essential-collection-bearicons-glyph-bearicons.png"
                        className="rounded-full w-10 p-2"
                        alt="Avatar"
                      />
                      <p className="pt-2 text-gray-700">
                        {friend.first_name} {friend.last_name}
                      </p>
                      <p className="pl-2 pt-3.5 text-gray-700 text-xs">
                        {friend.username}
                      </p>
                      {/* <button
                        className=" p-0.5 m-2 text-gray-700 bg-gray-400 text-xs rounded hover:bg-gray-500"
                        onClick={() => handleAddFriend(friend.id)}
                      >
                        Unfriend
                      </button> */}
                    </li>
                    <button
                      className=" p-0.5 px-1 m-2 text-gray-700 bg-sky-300 text-xs rounded border border-sky-500 hover:bg-sky-400 hidden group-hover:block"
                      onClick={() => handleAddFriend(friend.id)}>
                      Follow
                  </button>
                  </ul>
                </div>
              );

            })}

          </div>

          <div className="flex justify-center mt-10">
            <p className="text-2xl font-bold text-gray-700 mb-5">People You Might Know</p>
          </div>

          <ul>
            {filteredFriends.map((friend) => {
              if (user.id !== friend.id) {
                return (
                  <div key={friend.id}>
                    <ul className="flex group">
                      <li className="flex bg-sky-300 border border border-sky-500 rounded my-1 px-5 w-full">
                        <img
                          src="https://img.icons8.com/external-bearicons-glyph-bearicons/64/000000/external-User-essential-collection-bearicons-glyph-bearicons.png"
                          className="rounded-full w-10 p-2"
                          alt="Avatar"
                        />
                        <p className="pt-2 text-gray-700">
                          {friend.first_name} {friend.last_name}
                        </p>
                        <p className="pl-2 pt-3.5 text-gray-700 text-xs">
                          {friend.username}
                        </p>
                      </li>
                      <button
                      className=" p-0.5 px-1 m-2 text-gray-700 bg-sky-300 text-xs rounded border border-sky-500 hover:bg-sky-400 hidden group-hover:block"
                      onClick={() => handleAddFriend(friend.id)}>
                      Follow
                      </button>
                    </ul>
                  </div>
                );
              }
            })}
          </ul>

      </div>
      
      
    </div>
  );
}

export default Friends;
