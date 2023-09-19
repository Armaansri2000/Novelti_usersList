import React, { useEffect } from "react";
import "./user.css";
import { useNavigate } from "react-router-dom";

function User({ userData, deleteUser }) {
  const navigate = useNavigate();

  const handleDelete = (userId) => {
    const choice = window.confirm(
      "Are you sure, you want to Delete this User??"
    );
    if (choice) deleteUser(userId);
  };
  const handleEdit = (userId) => {
    navigate(`/updateUser/${userId}`);
  };

  return (
    <div className="userContainer">
      <div className="left">
        <div className="top">
          <h2>{`${userData.firstName} ${userData.lastName}`}</h2>
        </div>
        <div className="bottom">
          <span>{userData.phoneNumber}</span>
          <span>{userData.state}</span>
          <span>
            {typeof userData.country == "object"
              ? "'"+userData.country.join(' , ')+"'"
              : ""}
          </span>
        </div>
      </div>
      <div className="right">
        <button onClick={(e) => handleEdit(userData.userId)}>Edit</button>
        <button onClick={(e) => handleDelete(userData.userId)}>Delete</button>
      </div>
    </div>
  );
}

export default User;
