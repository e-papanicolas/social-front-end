import "../../index.css";

function Friends({ user, allUsers, handleAddFriend, friendsList }) {
  //Filters "People you might know" and eliminates them if they're in your friends list already
  const filteredFriends = allUsers.filter((user) => {
    const friendIdList = friendsList.map((friend) => friend.id);
    return !friendIdList.includes(user.id);
  });

  return (
    <div className="bg-yellow-100 min-h-screen flex felx-col flex flex-col pl-72 py-10">
      <p className="text-xl font-bold text-gray-700">My Friends</p>
      {friendsList.length > 0 ? (
        friendsList.map((friend) => {
          return (
            <div key={friend.id}>
              <ul>
                <li
                  key={friend.username}
                  className="flex divide-y-2 divide-gray-500"
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
              </ul>
            </div>
          );
        })
      ) : (
        <p> You don't have any friends yet!</p>
      )}
      <p className="text-xl font-bold text-gray-700 pt-5">
        People you might know:
      </p>
      <ul>
        {filteredFriends.map((friend) => {
          if (user.id !== friend.id) {
            return (
              <li
                key={friend.username}
                className="flex divide-y-2 divide-gray-500"
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
                <button
                  className=" p-0.5 m-2 text-gray-700 bg-gray-400 text-xs rounded hover:bg-gray-500"
                  onClick={() => handleAddFriend(friend.id)}
                >
                  Add Friend
                </button>
              </li>
            );
          }
        })}
      </ul>
      <div className=""></div>
    </div>
  );
}

export default Friends;
