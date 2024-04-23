import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { BsSearch } from "react-icons/bs";
import CustomerNav from "./CustomerNav";
import { BsSearch } from 'react-icons/bs';
import '../stylesheets/customer.css';


const ViewCusDetails = () => {
  const componentPDF = useRef();
  const [allCustomers, setAllCustomers] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [searchCustomer, setSearchCustomer] = useState("");

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

  const generateReport = () => {
    const table = document.querySelector(".table");
    const content = table.outerHTML;
    const newWindow = window.open();
    newWindow.document.write(`
      <html>
        <head>
          <title> Customer Details </title>
          <style>
            img {
              height: 100px; 
              margin: 5px; 
            }
            .imgContainer {
              text-align: center;
            }
            h2 {
              text-align: center;
            }
            
            @media print {
              /* Hide buttons */
              button, a { display: none; }
              .action-col { display: none; }
              /* Apply table styles */
              table {
                width: 100%;
                border-collapse: collapse;
              }
              th, td {
                border: 1px solid #000;
                padding: 8px;
                text-align: left;
              }
              th {
                background-color: #f2f2f2;
              }
            }
          </style>
        </head>
        <body>
          <div class="reportHeader" >
            <div class="imgContainer">
              <img src="/images/logo.png" alt="Description of image">
            </div>
            <br/>
            <h2>Customer Details</h2>
            <hr />
          </div>
          ${content}
        </body>
      </html>
    `);
    newWindow.print();
    newWindow.close();
  };

  const handleDelete = async (id) => {
    try {
      const confirm = window.confirm("Are you sure you want to delete?");

      if (confirm) {
        await axios.delete(`http://localhost:8000/cusDetails/delete/${id}`);
        const updatedCustomers = allCustomers.filter(
          (customer) => customer._id !== id
        );
        setAllCustomers(updatedCustomers);
        alert("Customer deleted successfully");
      } else {
        alert("Deletion canceled");
      }
    } catch (err) {
      console.log("Error occurred while deleting customer:", err.message);
    }
  };

  //filter allCustomers based on searchCustomer
  const filteredCustomer = allCustomers.filter((cusDetails) =>
    cusDetails.cusName.toLowerCase().includes(searchCustomer.toLowerCase())
  );

  return (
    <div>
      <div className="header">
        <div>
         
          <ul className="navbar">
          <div className="nav-left">
          <li>
              <a class="active" href="/dashboard">
                Home
              </a>
            </li>
            <li>
              <a href="/viewCus">Customer</a>
            </li>
            <li>
              <a href="/viewOrder">Order</a>
            </li>
           
          </div>
            <div className="logo">
              <img src="./images/logo.png" className="image"></img>
            </div>
            <div className="nav-right">
            <li>
              <a href="#contact">Contact</a>
            </li>
            <li>
              <a href="#about">About</a>
            </li>
            </div>

          </ul>
        </div>
      </div>
      <br></br>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by customer name"
          value={searchCustomer}
          onChange={(e) => setSearchCustomer(e.target.value)}
        />
        <button className="btn btn-outline-secondary" type="button">
          <BsSearch />
        </button>
      </div>
      <div className="d-grid d-md-flex justify-content-md-end mb-3">
        <button className="btn btn-success" onClick={generateReport}>
          Report
        </button>
      </div>
      <div ref={componentPDF} style={{ width: "100%" }}>
        <div className="print-header" style={{ display: "none" }}>
          <img src="/images/logo.png" className="imageReport2" />
          <h1> Jayakody Koppara Stores </h1>
          <hr />
        </div>
        <div className="cus-details">
          <div className="container" style={{ backgroundColor: "rgba(255, 255, 255, 0.7)" }}>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">cusName</th>
                  <th scope="col">cusEmail</th>
                  <th scope="col">contactNumber</th>
                  <th scope="col">cusLocation</th>
                  <th className= "action-col" scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomer.map((cusDetails, index) => (
                  <tr key={index}>
                    <th scope="row">C{index + 1}</th>
                    <td>{cusDetails.cusName}</td>
                    <td>{cusDetails.cusEmail}</td>
                    <td>{cusDetails.contactNumber}</td>
                    <td>{cusDetails.cusLocation}</td>
                    <td className= "action-col">
                      <a
                        href={`/CustomerProfile/${cusDetails._id}`}
                        className="btn btn-primary"
                      >
                        View profile
                      </a>
                      &nbsp;
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(cusDetails._id)}
                      >
                        <i className="far fa-trash-alt"></i>&nbsp;Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="print-footer" style={{ display: "none" }}>
          <hr />
          <p>Report Generated on {currentDate.toString()}</p>
        </div>
      </div>
    </div>
  );
};

export default ViewCusDetails;