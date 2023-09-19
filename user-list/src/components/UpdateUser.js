import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MultiSelectAutocomplete from "./MultiSelectAutoComplete";
import { countries } from "../data";

function UpdateUser({ updateUser, listOfUsers, setPath }) {
  const initialState = {
    userId: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    emailId: "",
    address1: "",
    address2: "",
    state: "",
    city: "",
    zipCode: "",
    country: "",
  };
  const [userData, setUserData] = useState(initialState);
  const [phone, setPhone] = useState("");
  const { userId } = useParams();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    let temp = { ...userData };
    temp[name] = value;
    setUserData(temp);
  };

  const isDataValid = (userData) => {
    let isValid = true;
    if (userData.firstName.length < 5) isValid = false;
    if (userData.lastName.length < 5) isValid = false;
    if (userData.address1.length < 1) isValid = false;
    if (userData.phoneNumber.length < 10) isValid = false;
    if (
      !/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/.test(userData.emailId)
    )
      isValid = false;
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isDataValid(userData)) {
      console.log(userData);
      alert("Enter Valid Data");
      return;
    }
    updateUser(userData);
    navigate(-1);
  };

  useEffect(() => {
    let existingItems = localStorage.getItem("usersList");
    if (existingItems) {
      existingItems = JSON.parse(existingItems);
      if (existingItems.length == 0) navigate("/");
      console.log(existingItems);
      setUserData(existingItems.filter((x) => x.userId == userId)[0]);
      setPath(window.location.href);
    } else navigate("/");
  }, []);

  return userData != undefined ? (
    <form onSubmit={handleSubmit} className="formContainer">
      <div className="inputContainer">
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          name="firstName"
          id="firstName"
          onChange={(e) => handleChange(e)}
          value={userData.firstName}
        />
      </div>
      <div className="inputContainer">
        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          name="lastName"
          id="lastName"
          onChange={(e) => handleChange(e)}
          value={userData.lastName}
        />
      </div>
      <div className="inputContainer">
        <label htmlFor="emailId">EmailId</label>
        <input
          type="text"
          name="emailId"
          id="emailId"
          onChange={(e) => handleChange(e)}
          value={userData.emailId}
        />
      </div>
      <div className="inputContainer">
        <label htmlFor="phoneNumber">Mobile Number</label>
        <PhoneInput
          country={"eg"}
          enableSearch={true}
          value={userData.phoneNumber.length > 0 ? userData.phoneNumber : phone}
          onChange={(phone) => {
            setPhone(phone);
            let temp = userData;
            temp["phoneNumber"] = phone;
            setUserData(temp);
          }}
        />
        {/* <input
          type="text"
          name="phoneNumber"
          id="phoneNumber"
          onChange={(e) => handleChange(e)}
          value={userData.phoneNumber}
        /> */}
      </div>
      <div className="inputContainer">
        <label htmlFor="address1">Address1</label>
        <input
          type="text"
          name="address1"
          id="address1"
          onChange={(e) => handleChange(e)}
          value={userData.address1}
        />
      </div>
      <div className="inputContainer">
        <label htmlFor="address2">Address2</label>
        <input
          type="text"
          name="address2"
          id="address2"
          onChange={(e) => handleChange(e)}
          value={userData.address2}
        />
      </div>
      <div className="inputContainer">
        <label htmlFor="state">State</label>
        <input
          type="text"
          name="state"
          id="state"
          onChange={(e) => handleChange(e)}
          value={userData.state}
        />
      </div>
      <div className="inputContainer">
        <label htmlFor="city">City</label>
        <input
          type="text"
          name="city"
          id="city"
          onChange={(e) => handleChange(e)}
          value={userData.city}
        />
      </div>
      <div className="inputContainer">
        {/* <label htmlFor="country">Country</label> */}
        <MultiSelectAutocomplete
          label={"country"}
          userData={userData}
          setUserData={setUserData}
          optionsList={countries}
        />
        {/* <input
          type="text"
          name="country"
          id="country"
          onChange={(e) => handleChange(e)}
          value={userData.country}
        /> */}
      </div>
      <div className="inputContainer">
        <label htmlFor="zipCode">Zip Code</label>
        <input
          type="text"
          name="zipCode"
          id="zipCode"
          onChange={(e) => handleChange(e)}
          value={userData.zipCode}
        />
      </div>
      <button type="submit">Update</button>
    </form>
  ) : (
    ""
  );
}

export default UpdateUser;
