import { useState, useEffect, createContext } from "react";
import { useNavigate, Route, Routes } from "react-router-dom";

import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Feed from "./components/Feed";
import NavBar from "./components/NavBar";
import Profile from "./components/Profile";
import Messages from "./components/Messages";
import Friends from "./components/Friends";

import "./index.css";
export const UserContext = createContext();

function App() {
  const token = localStorage.getItem("jwt");
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [errors, setErrors] = useState([]);
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
        });
      } else {
        res.json().then((data) => {
          setErrors(data.errors);
        });
      }
    });
  }, [token]);

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
    <div className="App">
      <div className="background"></div>
      <UserContext.Provider value={currentUser}>
        <NavBar handleLogOut={handleLogOut} user={currentUser} />
        <Routes>
          <Route path="/me" element={<Profile user={currentUser} />} />
          <Route
            path="/chat"
            element={<Messages user={currentUser} allUsers={allUsers} />}
          />
          <Route path="/friends" element={<Friends user={currentUser} />} />
          <Route path="/" element={<Feed user={currentUser} />} />
        </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;
