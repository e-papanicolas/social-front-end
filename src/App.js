import { useState, useEffect, createContext } from "react";
import { useNavigate, Route, Routes } from "react-router-dom";

import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Feed from "./components/Feed";
import NavBar from "./components/NavBar";
import Profile from "./components/Profile";
import Chat from "./components/Chat";
import Friends from "./components/Friends";

import "./index.css";
export const UserContext = createContext();

function App() {
  const token = localStorage.getItem("jwt");
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [errors, setErrors] = useState([]);
  const [posts, setPosts] = useState([]);
  
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
        });
      } else {
        res.json().then((data) => {
          setErrors(data.errors);
        });
      }
    });

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
    console.log(newPost);

    fetch("http://localhost:3000/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newPost)
    }).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          const updatedPosts = [...currentUser.posts, data]
          setCurrentUser({...currentUser, posts: updatedPosts});
        });
      } else {
        res.json().then((data) => {
          console.log(data.errors);
        });
      }
    });
  }

  console.log(posts);

  console.log(currentUser);

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
    <div className="">
      <div className=""></div>
      <UserContext.Provider value={currentUser}>
        <NavBar handleLogOut={handleLogOut} user={currentUser} />
        <Routes>
          <Route path="/me" element={<Profile user={currentUser} />} />
          <Route path="/chat" element={<Chat user={currentUser} />} />
          <Route path="/friends" element={<Friends user={currentUser} />} />
          <Route path="/" element={<Feed user={currentUser} posts={posts} handleAddPost={handleAddPost}/>} />
        </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;
