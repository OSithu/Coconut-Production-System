import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateCusDetails = () => {
  const [cusName, setCusName] = useState("");
  const [cusEmail, setCusEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [cusLocation, setCusLocation] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!cusName) {
      errors.cusName = "Customer name is required";
      isValid = false;
    }

    // Validate email format
    if (!cusEmail || !/^[a-z0-9]+@[a-z0-9]+\.[a-z]{2,}$/i.test(cusEmail)) {
      errors.cusEmail = "Invalid email address";
      isValid = false;
    }
    
    // Validate contact number format
    if (!contactNumber || !/^\d{10}$/.test(contactNumber)) {
      errors.contactNumber = "Invalid contact number";
      isValid = false;
    }

    if (!cusLocation) {
      errors.cusLocation = "Address is required";
      isValid = false;
    }

    if (!username) {
      errors.username = "Username is required";
      isValid = false;
    }

    if (!password) {
      errors.password = "Password is required";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const sendData = async (e) => {
    e.preventDefault();

    if (validateForm()) {
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

        // Reset form after successful submission
        setCusName("");
        setCusEmail("");
        setContactNumber("");
        setCusLocation("");
        setUsername("");
        setPassword("");
        setErrors({});
      } catch (err) {
        console.log("sendData function failed! ERROR: " + err.message);
      }
    }
  };

  return (
    <div className="col-md-8 mt-4 mx-auto">
      <h1 className="h3 mb-3 font-weight-normal">Add new customer detail</h1>
      <form className="needs-validation" noValidate onSubmit={sendData}>
        <div className="form-group" style={{ marginBottom: "15px" }}>
          <label style={{ marginBottom: "5px" }}>Customer name</label>
          <input
            type="text"
            className={`form-control ${errors.cusName ? "is-invalid" : ""}`}
            name="cusName"
            placeholder="Enter customer name"
            onChange={(e) => setCusName(e.target.value)}
            value={cusName}
            required
          />
          {errors.cusName && (
            <div className="invalid-feedback">{errors.cusName}</div>
          )}
        </div>

        <div className="form-group" style={{ marginBottom: "15px" }}>
          <label style={{ marginBottom: "5px" }}>Email address</label>
          <input
            type="text"
            className={`form-control ${errors.cusEmail ? "is-invalid" : ""}`}
            name="cusEmail"
            placeholder="Enter email address"
            onChange={(e) => setCusEmail(e.target.value)}
            value={cusEmail}
            required
          />
          {errors.cusEmail && (
            <div className="invalid-feedback">{errors.cusEmail}</div>
          )}
        </div>

        <div className="form-group" style={{ marginBottom: "15px" }}>
          <label style={{ marginBottom: "5px" }}>Contact number</label>
          <input
            type="text"
            className={`form-control ${
              errors.contactNumber ? "is-invalid" : ""
            }`}
            name="contactNumber"
            placeholder="Enter contact number"
            onChange={(e) => setContactNumber(e.target.value)}
            value={contactNumber}
            required
          />
          {errors.contactNumber && (
            <div className="invalid-feedback">{errors.contactNumber}</div>
          )}
        </div>

        <div className="form-group" style={{ marginBottom: "15px" }}>
          <label style={{ marginBottom: "5px" }}>Address</label>
          <input
            type="text"
            className={`form-control ${
              errors.cusLocation ? "is-invalid" : ""
            }`}
            name="cusLocation"
            placeholder="Enter address"
            onChange={(e) => setCusLocation(e.target.value)}
            value={cusLocation}
            required
          />
          {errors.cusLocation && (
            <div className="invalid-feedback">{errors.cusLocation}</div>
          )}
        </div>

        <div className="form-group" style={{ marginBottom: "15px" }}>
          <label style={{ marginBottom: "5px" }}>Username</label>
          <input
            type="text"
            className={`form-control ${errors.username ? "is-invalid" : ""}`}
            name="username"
            placeholder="Enter username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            required
          />
          {errors.username && (
            <div className="invalid-feedback">{errors.username}</div>
          )}
        </div>

        <div className="form-group" style={{ marginBottom: "15px" }}>
          <label style={{ marginBottom: "5px" }}>Password</label>
          <input
            type="text"
            className={`form-control ${errors.password ? "is-invalid" : ""}`}
            name="password"
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
          {errors.password && (
            <div className="invalid-feedback">{errors.password}</div>
          )}
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