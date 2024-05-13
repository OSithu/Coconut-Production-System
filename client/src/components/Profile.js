
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";

const Profile = () => {
  const [cusName, setCusName] = useState("");
  const [cusEmail, setusEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [cusLocation, setCusLocation] = useState("");
  const [username, setUsername] = useState("");
  const [profileDetails, setProfileDetails] = useState([]);
  const navigate = useNavigate();

  const { username: cusUsername } = useParams();

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const user = await axios.get(
          `http://localhost:8000/cusID/${cusUsername}`
        );
        setCusName(user.data.userDetails.cusName);
        setusEmail(user.data.userDetails.cusEmail);
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
  }, [cusUsername]);

  //implementing handleDelete function
  const handleDelete = async (username) => {
    try {
      const confirm = window.confirm("Are you sure you want to delete?");

      if (confirm) {
        await axios.delete(`http://localhost:8000/custDetails/delete/${username}`);
        alert("Customer deleted successfully");
        navigate("/");
      } else {
        alert("Deletion Cancel");
      }
    } catch (err) {
      console.log("HandleDelete function failed! Error: " + err.message);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center">
      <div
        className="card text-center"
        style={{ width: "40rem", marginTop: "100px" }}
      >
        <div style={{ marginTop: "20px", padding: "20px" }}>
          <img src="/images/profile.png" className="profileImg" />
          <br />
          <br />
          <h4 style={{ textAlign: "center" }}>{cusName}</h4>
          <dl className="row">
            <dd>
              <strong>Customer Name:</strong> {cusName || "Loading..."}
            </dd>
            <dd>
              <strong>Customer Email:</strong> {cusEmail || "Loading..."}
            </dd>
            <dd>
              <strong>Contact Number:</strong> {contactNumber || "Loading..."}
            </dd>
            <dd>
              <strong>Customer Location:</strong> {cusLocation || "Loading..."}
            </dd>
          </dl>
          {/* <a
            className="btn btn-warning"
            href={/editCus/${username}}
          >
            <i className="fas fa-edit"></i>&nbsp;Edit
          </a> */}


<Link to={`/editCus/${cusUsername}`}>
  <button className="btn btn-warning">
    <i className="fas fa-edit"></i>&nbsp;Edit
  </button>
</Link>
          &nbsp;
          <button
            className="btn btn-danger"
            onClick={() => handleDelete(username)} // Pass username to handleDelete
          >
            <i className="far fa-trash-alt"></i>&nbsp;Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
