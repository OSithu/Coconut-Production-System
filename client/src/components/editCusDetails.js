import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditCusDetails = () => {
  const [cusName, setCusName] = useState("");
  const [cusEmail, setCusEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [cusLocation, setCusLocation] = useState("");
  const { username } = useParams(); // Extracting username directly
  const navigate = useNavigate();

  useEffect(() => {
    const getOneCustomer = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/cusID/${username}`);
        const { cusName, cusEmail, contactNumber, cusLocation } =
          res.data.userDetails;
        setCusName(cusName);
        setCusEmail(cusEmail);
        setContactNumber(contactNumber);
        setCusLocation(cusLocation);
      } catch (err) {
        console.log("Error occurred while processing your get request", err);
      }
    };

    getOneCustomer();
  }, [username]);

  const updateData = async (e) => {
    e.preventDefault();
    try {
      const confirmed = window.confirm(
        "Are you sure you want to update this detail?"
      );
      if (confirmed) {
        let updatedCustomerData = {
          cusName: cusName,
          cusEmail: cusEmail,
          contactNumber: contactNumber,
          cusLocation: cusLocation,
        };
        await axios.put(
          `http://localhost:8000/custDetails/update/${username}`, // Use 'username' for the URL
          updatedCustomerData
        );
        alert("Customer details updated successfully!");
        navigate(`/Profile/${username}`);
      } else {
        alert("Update cancelled!");
      }
    } catch (err) {
      console.log("Update failed!", err);
    }
  };

  return (
    <div className="col-md-8 mt-4 mx-auto">
      <h1 className="h3 mb-3 font-weight-normal">Edit customer details</h1>
      <form className="needs-validation" noValidate onSubmit={updateData}>
        <div className="form-group" style={{ marginBottom: "15px" }}>
          <label style={{ marginBottom: "5px" }}>Customer Name</label>
          <input
            type="text"
            className={`form-control `}
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
            className={`form-control `}
            name="cusEmail"
            placeholder="Enter email address"
            onChange={(e) => setCusEmail(e.target.value)}
            value={cusEmail}
            required
          />
          {/* {errors.cusEmail.length > 0 &&
                            <div className='invalid-feedback'>{errors.cusEmail}</div>} */}
        </div>

        <div className="form-group" style={{ marginBottom: "15px" }}>
          <label style={{ marginBottom: "5px" }}>Contact number</label>
          <input
            type="text"
            className={`form-control `}
            name="contactNumber"
            placeholder="Enter contact number"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
            required
          />
          {/* {errors.contactNumber.length > 0 &&
                            <div className='invalid-feedback'>{errors.contactNumber}</div>} */}
        </div>

        <div className="form-group" style={{ marginBottom: "15px" }}>
          <label style={{ marginBottom: "5px" }}>Address</label>
          <input
            type="text"
            className={`form-control `}
            name="cusLocation"
            placeholder="Enter address"
            value={cusLocation}
            onChange={(e) => setCusLocation(e.target.value)}
            required
          />
          {/* {errors.cusLocation.length > 0 &&
                            <div className='invalid-feedback'>{errors.cusLocation}</div>} */}
        </div>

        <button
          className="btn btn-success"
          type="submit"
          style={{ marginTop: "15px" }}
        >
          &nbsp;Update
        </button>
      </form>
    </div>
  );
};

export default EditCusDetails;
