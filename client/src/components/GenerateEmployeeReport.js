import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import "./../stylesheets/plantation.css"; // Import the CSS file
import { BsSearch } from "react-icons/bs";

//import {useReactprint}
import { useReactToPrint } from "react-to-print";

const ViewEmployee = () => {
  const conponentPDF = useRef();

  const [allEmployee, setAllEmployee] = useState([]);


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
    content: () => conponentPDF.current,
    documentTitle: "userData",
    onAfterPrint: () => alert("download successful"),
  });


  return (
    <div>
      
      <div className="card" ref={conponentPDF} style={{ width: "100%" }}>
      <div className="reportlogo">
              <img src="./images/logo.png" className="imageReport"></img>
              <br></br>
              <h1 className="plantTopic">Jayakody Koppara Stores</h1>
              <br></br>
              <h2 className="plantTopic">Disease Spread Records</h2>
            </div>
  <div className="card-body">
    <div className="container" >
      <div style={{ marginTop: "20px" }}>
        <div>
          <table className="table" id="plantTable">
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
            </tr>
          </thead>

          <tbody>
            {allEmployee.map((records, index) => (
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
              </tr>
            ))}
          </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</div>

<br></br>
      <div className="d-flex justify-content-center mb-3">
        <button className="btn btn-success" onClick={generatePDF}>
          Download
        </button>
      </div>
    </div>
  );
};


export default ViewEmployee;
