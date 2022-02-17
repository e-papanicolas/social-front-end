import { useState, useEffect, createContext } from "react";
import { useNavigate, Route, Routes } from "react-router-dom";

import Login from "./components/login/Login";
import SignUp from "./components/login/SignUp";
import Feed from "./components/feed/Feed";
import NavBar from "./components/navBar/NavBar";
import Profile from "./components/profile/Profile";
import Messages from "./components/chat/Messages";
import Friends from "./components/friends/Friends";

import "./index.css";
export const UserContext = createContext();

function App() {
  const token = localStorage.getItem("jwt");
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [errors, setErrors] = useState([]);
  const [friendsList, setFriendsList] = useState([]);

  const [posts, setPosts] = useState([]);

  const [allUsers, setAllUsers] = useState([]);

  function handleLogin(user) {
    setCurrentUser(user);
    setLoggedIn(true);
    navigate("/");
  }

  // function handleLogOut() {
  //   fetch("http://localhost:3000/logout", {
  //     method: "DELETE",
  //   }).then(() => {
  //     navigate("/login");
  //     setLoggedIn(false);
  //     localStorage.clear();
  //   });
  // }

  function handleLogOut() {
    setLoggedIn(false);
    localStorage.clear();
    navigate("/");
  }

  // verifies user for auth
  useEffect(() => {
    fetch("http://localhost:3000/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          setCurrentUser(data.user);
          setLoggedIn(true);
          setFriendsList(data.user.friends);
        });
      } else {
        res.json().then((data) => {
          setErrors(data.errors);
        });
      }
    }, []);

    fetch("http://localhost:3000/posts", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          setPosts(data);
        });
      } else {
        res.json().then((data) => {
          console.log(data.errors);
        });
      }
    });
  }, [token]);

  function handleAddPost(newPost, e) {
    e.preventDefault();

    fetch("http://localhost:3000/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newPost),
    }).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          const updatedPosts = [...currentUser.posts, data];
          setCurrentUser({ ...currentUser, posts: updatedPosts });
        });
      } else {
        res.json().then((data) => {
          console.log(data.errors);
        });
      }
    });
  }

  // gets all users
  useEffect(() => {
    fetch("http://localhost:3000/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          setAllUsers(data);
        });
      } else {
        res.json().then((data) => {
          setErrors(data.errors);
        });
      }
    });
  }, [token]);

  function handleAddFriend(friendId) {
    const updatedFriends = [...currentUser.friends, friendId];
    currentUser.friends = updatedFriends;

    fetch(`http://localhost:3000/add_friend/${currentUser.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ friends: currentUser.friends }),
    })
      .then((resp) => resp.json())
      .then((friends) => {
        currentUser.friends = friends;
        setCurrentUser(currentUser);
        setFriendsList(friends);
      });
  }

  if (currentUser.name === "") {
    return <p>LOADING...</p>;
  }

  if (loggedIn === false) {
    return (
      <div>
        <Routes>
          <Route
            path="/signup"
            element={
              <SignUp
                setCurrentUser={setCurrentUser}
                handleLogin={handleLogin}
              />
            }
          />

          <Route exact path="/" element={<Login onLogin={handleLogin} />} />

          {errors ? errors.map((e) => <div>{e}</div>) : null}
        </Routes>
      </div>
    );
  }

  return (
    <div className="h-screen">
      <UserContext.Provider value={currentUser}>
        <NavBar handleLogOut={handleLogOut} user={currentUser} />
        <Routes>
          <Route
            path="/me"
            element={<Profile user={currentUser} setUser={setCurrentUser} />}
          />
          <Route
            path="/chat"
            element={<Messages user={currentUser} allUsers={allUsers} />}
          />
          <Route
            path="/friends"
            element={
              <Friends
                user={currentUser}
                allUsers={allUsers}
                handleAddFriend={handleAddFriend}
                friendsList={friendsList}
              />
            }
          />
          <Route
            path="/"
            element={
              <Feed
                user={currentUser}
                posts={posts}
                handleAddPost={handleAddPost}
              />
            }
          />
        </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;
