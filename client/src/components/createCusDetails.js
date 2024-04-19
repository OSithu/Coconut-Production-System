import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateCusDetails = () => {
  // Changed from 'createCusDetails' to 'CreateCusDetails'
  const [cusName, setCusName] = useState("");
  const [cusEmail, setCusEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [cusLocation, setCusLocation] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  //implementing sendData function
  const sendData = async (e) => {
    e.preventDefault();

    try {
      let newCusData = {
        cusName: cusName,
        cusEmail: cusEmail,
        contactNumber: contactNumber,
        cusLocation: cusLocation,
        username: username,
        password: password,
      };

      await axios
        .post("http://localhost:8000/cusDetails/save", newCusData)
        .then((res) => {
          alert(res.data.success);
          console.log(res.data.success);
          navigate("/login");
        })
        .catch((err) => {
          if (err.response) {
            console.log(err.response.data.error);
          } else {
            console.log(
              "Error occurred while processing your axios post request. " +
                err.error
            );
          }
        });
    } catch (err) {
      console.log("sendData function failed! ERROR: " + err.message);
    }

    //set state back to first state
    setCusName("");
    setCusEmail("");
    setContactNumber("");
    setCusLocation("");
    setUsername("");
    setPassword("");
  };

  return (
    <div className="col-md-8 mt-4 mx-auto">
      <h1 className="h3 mb-3 font-weight-normal">Add new customer detail</h1>
      <form className="needs-validation" noValidate onSubmit={sendData}>
        <div className="form-group" style={{ marginBottom: "15px" }}>
          <label style={{ marginBottom: "5px" }}>Customer name</label>
          <input
            type="text"
            className={`form-control`}
            name="cusName"
            placeholder="Enter customer name"
            onChange={(e) => setCusName(e.target.value)}
            value={cusName}
            required
          />
          {/*errors.cusName.length > 0 &&
                            <div className='invalid-feedback'>{errors.cusName}</div>*/}
        </div>

        <div className="form-group" style={{ marginBottom: "15px" }}>
          <label style={{ marginBottom: "5px" }}>Email address</label>
          <input
            type="text"
            className={`form-control`}
            name="cusEmail"
            placeholder="Enter email address"
            onChange={(e) => setCusEmail(e.target.value)}
            value={cusEmail}
            required
          />
          {/* {errors.cusEmail.length > 0 &&
                            <div className='invalid-feedback'>{errors.v}</div>} */}
        </div>

        <div className="form-group" style={{ marginBottom: "15px" }}>
          <label style={{ marginBottom: "5px" }}>Contact number</label>
          <input
            type="text"
            className={`form-control`}
            name="contactNumber"
            placeholder="Enter contact number"
            onChange={(e) => setContactNumber(e.target.value)}
            value={contactNumber}
            required
          />
          {/* {errors.contactNumber.length > 0 &&
                            <div className='invalid-feedback'>{errors.contactNumber}</div>} */}
        </div>

        <div className="form-group" style={{ marginBottom: "15px" }}>
          <label style={{ marginBottom: "5px" }}>Address</label>
          <input
            type="text"
            className={`form-control`}
            name="cusLocation"
            placeholder="Enter address"
            onChange={(e) => setCusLocation(e.target.value)}
            value={cusLocation}
            required
          />
          {/* {errors.cusLocation.length > 0 &&
                            <div className='invalid-feedback'>{errors.cusLocation}</div>} */}
        </div>

        <div className="form-group" style={{ marginBottom: "15px" }}>
          <label style={{ marginBottom: "5px" }}>Username</label>
          <input
            type="text"
            className={`form-control`}
            name="username"
            placeholder="Enter username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            required
          />
          {/* {errors.username.length > 0 &&
                            <div className='invalid-feedback'>{errors.username}</div>} */}
        </div>

        <div className="form-group" style={{ marginBottom: "15px" }}>
          <label style={{ marginBottom: "5px" }}>Password</label>
          <input
            type="text"
            className={`form-control`}
            name="password"
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
          {/* {errors.password.length > 0 &&
                            <div className='invalid-feedback'>{errors.password}</div>} */}
        </div>
        <button
          className="btn btn-success"
          type="submit"
          style={{ marginTop: "15px" }}
        >
          <i className="far fa-check-square"></i>
          &nbsp;Save
        </button>
      </form>
    </div>
  );
};

export default CreateCusDetails;
