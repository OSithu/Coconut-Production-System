import React, { useState, useEffect } from "react";
import axios from "axios";

const ViewCusDetails = () => {
  const [allCustomers, setAllCustomers] = useState([]);

  useEffect(() => {
    const getAllCustomers = async () => {
      try {
        const res = await axios.get("http://localhost:8000/cusDetails");
        setAllCustomers(res.data.existingRecords);
        console.log("Status: " + res.data.success);
        console.log(res.data.message);
      } catch (err) {
        if (err.response) {
          console.log(err.response.data.error);
        } else {
          console.log("Error occurred while processing your get request");
        }
      }
    };

    getAllCustomers();
  }, []);

  //implementing handleDelete function
  const handleDelete = async (id) => {
    try {
      const confirm = window.confirm("Are you sure you want to delete?");

      if (confirm) {
        await axios
          .delete(`http://localhost:8000/cusDetails/delete/${id}`)
          .then((res) => {
            alert(res.data.message);
            console.log(res.data.message);
            setAllCustomers(
              allCustomers.filter((customer) => customer._id !== id)
            );
          })
          .catch((err) => {
            if (err.response) {
              console.log(err.response.data.message);
            } else {
              console.log("Error occured while processing your axios delete");
            }
          });
      } else {
        alert("Deletion Cancel");
      }
    } catch (err) {
      console.log("HandleDelete function failed ! Error" + err.message);
    }
  };

  return (
    <div className="container">
      <p>All Customer Details</p>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">cusName</th>
            <th scope="col">cusEmail</th>
            <th scope="col">contactNumber</th>
            <th scope="col">cusLocation</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {allCustomers.map((cusDetails, index) => (
            <tr key={index}>
              <th scope="row">C{index + 1}</th>
              <td>{cusDetails.cusName}</td>
              <td>{cusDetails.cusEmail}</td>
              <td>{cusDetails.contactNumber}</td>
              <td>{cusDetails.cusLocation}</td>
              <td>
                <a
                  className="btn btn-warning"
                  href={`/editCus/${cusDetails._id}`}
                >
                  <i className="fas fa-edit"></i>&nbsp;Edit
                </a>
                &nbsp;
                <a
                  className="btn btn-danger"
                  href="#"
                  onClick={() => handleDelete(cusDetails._id)}
                >
                  <i className="far fa-trash-alt"></i>&nbsp;Delete
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="btn btn-success">
        <a href="/addCus" style={{ textDecoration: "none", color: "white" }}>
          Add Customer
        </a>
        &nbsp; &nbsp;
        <a href="/login" style={{ textDecoration: "none", color: "white" }}>
          Login
        </a>
      </button>
    </div>
  );
};

export default ViewCusDetails;
