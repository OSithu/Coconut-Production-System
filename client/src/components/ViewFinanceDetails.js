import React, { useEffect, useState, useRef } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import FinanceNv from "./FinanceNv";
import { BsSearch } from 'react-icons/bs';

import { useReactToPrint } from "react-to-print";

import "../stylesheets/viewFinanceDetails.css";
import "../stylesheets/printFinance.css";

const ViewFianceDetails = () => {
  const componentPDF = useRef();
  const [allDetails, setAllDetails] = useState([]);
  const [searchFinance, setSearchFinance] = useState('');//search
  

  useEffect(() => {
    const getDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/financeRecords`);
        setAllDetails(res.data.existingfinance);
        console.log('Status:', res.data.success);
      } catch (err) {
        console.error('Error fetching finance records:', err);
      }
    }
    getDetails();
  }, []);

  //Remove Time in Identify Date Part
  function formatDate(identifyDate) {
    const date = new Date(identifyDate);
    return date.toISOString().split('T')[0]; 
  }

  const handleDelete = async (id) => {
    try {
      const confirm = window.confirm('Are you sure you want to delete?');
      if (confirm) {
        await axios.delete(`http://localhost:3000/financeRecords/delete/${id}`);
        setAllDetails(allDetails.filter(finance => finance._id !== id));
      }
    } catch (err) {
      console.error('Error deleting finance record:', err);
    }
  }

  //filter teansaction type based on searchtype
const filteredFinance = allDetails.filter(finance =>
  finance.type.toLowerCase().includes(searchFinance.toLowerCase())
  );

  const currentDate = new Date().toLocaleDateString();

  // const generatePDF = useReactToPrint({
  //   content: () => componentPDF.current,
  //   documentTitle: "Financial_Report",
  //   onAfterPrint: () => alert("Data Saved in PDF")
  // });

  //repoert generation
  const generatePDF = () => {
    const table = document.querySelector('.finance-table');
    const content = table.outerHTML;
    const newWindow = window.open();
    newWindow.document.write(`
    <html>
    <head>
      <title>Budget Details</title>
      <style>
        /* Add your print styles here */
        @media print {
          /* Hide buttons */
          button { display: none; }
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
        .imgContainer img {
          max-width: 200px; 
          max-height: 100px; 
        }
        .reportHeader {
          text-align: center;
        }
        
        .imgContainer {
          margin: 0 auto; /* Center the image horizontally */
          display: inline-block; /* Ensure the container does not take up full width */
        }
      </style>
    </head>
    <body><div class="reportHeader" >
    <div class="imgContainer">
      <img src="/images/logo.png">
    </div>
    <br/>
    <h2>Finance Details</h2>
    <hr />
  </div>
      ${content}
    </body>
    <div className="print-footer">
        <hr />
        <p>Report Generated on {currentDate}</p>
      </div>
  </html>
    `);
    newWindow.print();
    newWindow.close();
  };

  // const handleSendEmail = async (req, res) => {
  //   try {
  //     const response = await axios.post(`http://localhost:3000/sendemail`);
  //     // Assuming res.data.success contains the success message
  //     alert(response.data.success);
  //     console.log(response.data.success);
  //   } catch (error) {
  //     console.error('Error sending email:', error);
  //   }
  // }

  const handleSendEmail = async (req, res) => {
    try {
      const response = await axios.post(`http://localhost:3000/sendemail`);
      // Assuming res.data.success contains the success message
      alert(response.data.success);
      console.log(response.data.success);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }
  
  
  return (
    <div className="view-finance-details">
      <FinanceNv />
      <p className="finance-title">All Financial Transactions</p>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by type"
          value={searchFinance}
          onChange={(e) => setSearchFinance(e.target.value)}
          />
          <button className="btn btn-outline-secondary" type="button">
            <BsSearch/>
          </button>
      </div>
      <button className="btn btn-success"><a href="/createFinanceDetails" style={{textDecoration:'none', color:'white'}}>Create New Post</a></button>
      {/* <button className="btn btn-success" onClick={handleSendEmail}>Notify managers</button>       */}
      {/* <button className="btn btn-success" onClick={handleSendEmail}>Notify managers</button> */}

      <div ref={componentPDF}>
      <div className="print-header" style={{ display: "none" }}>
            <img src="/images/logo.png" className='imageReport2' />
            <h1> Jayakody Koppara Stores </h1>
            <hr />
          </div>
        <table className="finance-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Type</th>
              <th>Description</th>
              <th>Income</th>
              <th>Expenses</th>
              <th>TotalAmount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredFinance.map((finance,index)=> (
              <tr key={index}>
                <td>{formatDate(finance.date)}</td>
                <td>{finance.type}</td>
                <td>{finance.Description}</td>
                <td>Rs.{String(finance.Income)}</td>
                <td>Rs.{String(finance.Expences)}</td>
                <td>Rs.{String(finance.totalAmount)}</td>
                <td>
                  <Link to={`/editFinanceDetails/${finance._id}`}>
                    <button type="button" className="btn btn-warning">
                      <i className="fas fa-edit"></i>&nbsp; Edit
                    </button>
                  </Link>
                  &nbsp;
                  <button type="button" className="btn btn-danger" onClick={() => handleDelete(finance._id)}>
                    <i className="far fa-trash-alt"></i>&nbsp;Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* <div className="print-footer">
        <hr />
        <p>Report Generated on {currentDate}</p>
      </div> */}
      {/* <button className="btn btn-success"><a href="/createFinanceDetails" style={{textDecoration:'none', color:'white'}}>Create New Post</a></button> */}
      <button className="btn btn-success" onClick={generatePDF}>PDF</button>
    </div>
  );
}

export default ViewFianceDetails;

