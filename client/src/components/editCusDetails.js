import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditCusDetails = () => {
  // Changed from 'editCusDetails' to 'EditCusDetails'

  const { profileName } = useParams();
  const [cusName, setCusName] = useState("");
  const [cusEmail, setCusEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [cusLocation, setCusLocation] = useState("");
  const [username, setUsername] = useState("");

  // const { id } = useParams();
  const navigate = useNavigate();

  // useEffect(() => {
  //   const getOneCustomer = async () => {
  //     await axios
  //       .get(`http://localhost:8000/cusID/${id}`)
  //       .then((res) => {
  //         setCusName(res.data.cusDetails.cusName);
  //         setCusEmail(res.data.cusDetails.cusEmail);
  //         setContactNumber(res.data.cusDetails.contactNumber);
  //         setCusLocation(res.data.cusDetails.cusLocation);
  //         console.log(res.data.message);
  //       })
  //       .catch((err) => {
  //         if (err.response) {
  //           console.log(err.response.data.error);
  //         } else {
  //           console.log("Error occurred while processing your get request");
  //         }
  //       });
  //   };

  //   getOneCustomer();
  // }, [id]);

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const user = await axios.get(
          `http://localhost:8000/cusID/${profileName}`
        );
        setCusName(user.data.userDetails.cusName);
        setCusEmail(user.data.userDetails.cusEmail);
        setContactNumber(user.data.userDetails.contactNumber);
        setCusLocation(user.data.userDetails.cusLocation);
        setUsername(user.data.userDetails.username);
        console.log("Status : " + user.data.success);
      } catch (err) {
        if (err.response) {
          console.log(err.response.data.error);
        } else {
          console.log("Error occurred while getting data");
        }
      }
    };

    getUserDetails();
  }, [profileName]);

  // const updateData = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const confirmed = window.confirm(
  //       "Are you sure you want to update this detail?"
  //     );
  //     if (confirmed) {
  //       let updatedCustomerData = {
  //         cusName: cusName,
  //         cusEmail: cusEmail,
  //         contactNumber: contactNumber,
  //         cusLocation: cusLocation,
  //         username: username,
  //       };

  //       await axios
  //         .put(
  //           `http://localhost:8000/cusDetails/update/${id}`,
  //           updatedCustomerData // Corrected variable name from 'updatedOrderData' to 'updatedCustomerData'
  //         )
  //         .then((res) => {
  //           alert(res.data.success);
  //           console.log(res.data.success);
  //           navigate("/viewCus");
  //         })
  //         .catch((err) => {
  //           if (err.response) {
  //             console.log(err.response.data.success);
  //           } else {
  //             console.log("Error occurred while processing your put request");
  //           }
  //         });
  //     } else {
  //       alert("Update cancelled!");
  //     }
  //   } catch (err) {
  //     console.log("Update failed!");
  //   }
  // };

  return (
    <div className="col-md-8 mt-4 mx-auto">
      <h1 className="h3 mb-3 font-weight-normal">Edit customer details</h1>
      <form className="needs-validation" noValidate onSubmit={"updateData"}>
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
