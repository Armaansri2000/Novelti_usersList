import React, { useEffect, useState } from "react";
import User from "./User";
import { Link } from "react-router-dom";

function Home({ listOfUsers, deleteUser, setPath }) {
  const [usersList, setUsersList] = useState(listOfUsers);
  useEffect(() => {
    console.log(usersList);
    setUsersList(listOfUsers);
  }, [listOfUsers]);
  useEffect(() => {
    setPath(window.location.href);
  });
  return (
    <div className="homeContainer">
      {usersList.length ? (
        usersList.map((userData, index) => (
          <User key={index} userData={userData} deleteUser={deleteUser} />
        ))
      ) : (
        <div className="message">
          <h2>Click on the below button to create new user</h2>
          <Link to={'/createUser'}>Create New User</Link>
        </div>
      )}
    </div>
  );
}

export default Home;
