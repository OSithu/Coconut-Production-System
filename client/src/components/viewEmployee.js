import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import "./../stylesheets/plantation.css"; // Import the CSS file
import { BsSearch } from "react-icons/bs";

//import {useReactprint}
import { useReactToPrint } from "react-to-print";

const ViewEmployee = () => {
  const ComponentPDF = useRef();

  const [allEmployee, setAllEmployee] = useState([]);
  const [searchEmployee, setSearchEmployee] = useState("");

  useEffect(() => {
    const getAllEmployee = async () => {
      await axios
        .get(`http://localhost:8000/view`)
        .then((res) => {
          setAllEmployee(res.data.existingRecords);
          console.log("Status: " + res.data.success);
        })
        .catch((err) => {
          if (err.response) {
            console.log(err.response.data.error);
          } else {
            console.log(
              "Error Occured While Processing Your Axios Get Request. " +
                err.error
            );
          }
        });
    };

    getAllEmployee();
  }, []);

  //Remove Time in Identify Date Part
  function formatDate(dateOfBirth) {
    const date = new Date(dateOfBirth);
    return date.toISOString().split('T')[0]; 
  }

function formatDate1(startDate) {
  const date = new Date(startDate);
  return date.toISOString().split('T')[0]; 
  }

  //implement PDF Download function

  const generatePDF = useReactToPrint({
    content: () => ComponentPDF.current,
    documentTitle: "userData",
    onAfterPrint: () => alert("download successful"),
  });

  //Implementing handleDelete Function

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this items..?"
    );
    if (confirmed) {
      await axios
        .delete(`http://localhost:8000/employee/delete/${id}`)
        .then((res) => {
          alert(res.data.message);
          console.log(res.data.message);
        })
        .catch((err) => {
          if (err.response) {
            console.log(err.response.data.error);
          } else {
            console.log(
              "Error Occured While Processing Your Axios Delete Request. " +
                err.error
            );
          }
        });
    } else {
      alert("Delete cancelled!");
    }
  };
  // Employee based on searchemployee
  const filteredEmployee = allEmployee.filter((records) =>
    records.fullName.toLowerCase().includes(searchEmployee.toLowerCase())
  );
  return (
    <div>
      
      <div className="header">
        <div>
         
          <ul className="navbar">
          <div className="nav-left">
          <li>
              <a class="active" href="#home">
                Home
              </a>
            </li>
            <li>
              <a href="#news">Employee Details</a>
            </li>
            <li>
              <a href="/ViewTaskShedule">Work Schedule</a>
            </li>
           
          </div>
            <div className="logo">
              <img src="./images/logo.png" className="image"></img>
            </div>
            <div className="nav-right">
            <li>
              <a href="/filter">Benifits Packages</a>
            </li>
            <li>
              <a href="/salcal">Salary Calculator</a>
            </li>
            <li>
              <a href="/whcal">Work Hour</a>
            </li>
            </div>

          </ul>
        </div>
      </div>
      <br></br>
      <h1 className='plantTopic'>Employee Details</h1>

      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by Employee  No"
          value={searchEmployee}
          onChange={(e) => setSearchEmployee(e.target.value)}
        />
        <button className="btn btn-outline-secondary" type="button">
          <BsSearch />
        </button>
      </div>
      <div  >
      <button className="btn btn-success">
        <a href="/addEmp" style={{ textDecoration: "none", color: "white" }}>
          Add New Records
        </a>
      </button>

      <button className="btn btn-success">
        <a href="/salcal" style={{ textDecoration: "none", color: "white" }}>
          cal
        </a>
      </button>

      <br></br>

      <div ref={ComponentPDF} style={{ width: "100%" }}>
        
      <br></br>

        <table class="table" id="plantTable">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">fullName</th>
              <th scope="col">NIC</th>
              <th scope="col">dateOfBirth</th>
              <th scope="col">gender</th>
              <th scope="col">contactNumber</th>
              <th scope="col">contactEmail</th>
              <th scope="col">address</th>
              <th scope="col">jobTitle</th>
              <th scope="col">department</th>
              <th scope="col">startDate</th>
              <th scope="col">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredEmployee.map((records, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{records.fullName}</td>
                <td>{records.NIC}</td>
                <td>{formatDate(records.dateOfBirth)}</td>
                <td>{records.gender}</td>
                <td>{records.contactNumber}</td>
                <td>{records.contactEmail}</td>
                <td>{records.address}</td>
                <td>{records.jobTitle}</td>
                <td>{records.department}</td>
                <td>{formatDate(records.startDate)}</td>
                <td>
                  <a
                    className="btn btn-warning"
                    href={`/editEmp/${records._id}`}
                  >  
                    <i className="fas fa-edit"></i>&nbsp;Edit
                  </a>
                  &nbsp;
                  <a
                    className="btn btn-danger"
                    href="#"
                    onClick={() => handleDelete(records._id)}
                  >
                    <i className="fas fa-trash-alt"></i>&nbsp;Delete
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>


      <div className="d-grid d-md-flex justify-content-md-end mb-3">
   
        <button className="btn btn-success">
        <a href="/empReport" style={{ textDecoration: "none", color: "white" }}>
            Generate Report
        </a>
      </button>
      </div>
    </div>
  );
};

export default ViewEmployee;
