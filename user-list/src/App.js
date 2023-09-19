import logo from "./logo.svg";
import "./App.css";
import CreateUser from "./components/CreateUser";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UpdateUser from "./components/UpdateUser";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import { useEffect, useState } from "react";

function App() {
  const [listOfUsers, setListOfUsers] = useState([]);
  const [userId, setUserId] = useState(0);
  const [path, setPath] = useState("");

  const addUser = (userData) => {
    userData.userId = userId;
    setListOfUsers([userData, ...listOfUsers]);
    let existingItems = localStorage.getItem("usersList");
    existingItems = JSON.parse(existingItems);
    if (existingItems)
      localStorage.setItem(
        "usersList",
        JSON.stringify([...existingItems, userData])
      );
    else localStorage.setItem("usersList", JSON.stringify([userData]));
  };

  const incrementUserId = () => {
    const t = userId + 1;
    setUserId(t);
    return t;
  };

  const deleteUser = (userId) => {
    const temp = listOfUsers.filter((x) => x.userId != userId);
    setListOfUsers(temp);
    localStorage.setItem("usersList", JSON.stringify(temp));
  };
  const updateUser = (userData) => {
    const temp = listOfUsers.filter((x) => x.userId != userData.userId);
    setListOfUsers([userData, ...temp]);
    let existingItems = localStorage.getItem("usersList");
    existingItems = JSON.parse(existingItems);
    if (existingItems)
      localStorage.setItem("usersList", JSON.stringify([userData, ...temp]));    
  };

  useEffect(() => {
    if (!listOfUsers || listOfUsers.length == 0) {
      let existingItems = localStorage.getItem("usersList");
      if (existingItems) {
        existingItems = JSON.parse(existingItems);
        setListOfUsers(existingItems);
      }
    }
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar path={path} setPath={setPath} />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                listOfUsers={listOfUsers}
                deleteUser={deleteUser}
                setPath={setPath}
              />
            }
          />
          <Route
            path="/createUser"
            element={
              <CreateUser addUser={addUser} incrementUserId={incrementUserId} />
            }
          />
          <Route
            path="/updateUser/:userId"
            element={
              <UpdateUser
                updateUser={updateUser}
                listOfUsers={listOfUsers}
                setPath={setPath}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
