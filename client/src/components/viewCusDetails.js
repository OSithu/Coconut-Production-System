import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import CustomerNav from "./CustomerNav";
import { BsSearch } from 'react-icons/bs';

import { useReactToPrint } from "react-to-print";

const ViewCusDetails = () => {
  const componentPDF = useRef();
  const [allCustomers, setAllCustomers] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [searchCustomer, setSearchCustomer] = useState('');

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

  const generatePDF = useReactToPrint({
    content: () => componentPDF.current,
    documentTitle: "UserData",
    onAfterPrint: () => alert("Data saved in PDF")
  });

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
  const filteredCustomer = allCustomers.filter(cusDetails =>
    cusDetails.cusName.toLowerCase().includes(searchCustomer.toLowerCase())
  );

  return (
    <div className="container">
      <CustomerNav />
      <p>All Customer Details</p>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by customer name"
          value={searchCustomer}
          onChange={(e) => setSearchCustomer(e.target.value)}
          />
          <button className="btn btn-outline-secondary" type="button">
            <BsSearch/>
          </button>
      </div>
      <div className="d-grid d-md-flex justify-content-md-end mb-3">
        <button className="btn btn-success" onClick={generatePDF}>
          Report
        </button>
      </div>
      <div ref={componentPDF} style={{ width: "100%" }}>
      <div className="print-header" style={{ display: "none" }}>
        <h1> Jayakody Koppara Stores </h1>
        <hr />
      </div>
      <div className="cus-details">
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
            {filteredCustomer.map((cusDetails, index) => (
              <tr key={index}>
                <th scope="row">C{index + 1}</th>
                <td>{cusDetails.cusName}</td>
                <td>{cusDetails.cusEmail}</td>
                <td>{cusDetails.contactNumber}</td>
                <td>{cusDetails.cusLocation}</td>
                <td>
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
        <div className="print-footer" style={{ display: "none" }}>
          <hr />
          <p>Report Generated on {currentDate.toString()}</p>
        </div>
      </div>
    </div>
  );
};

export default ViewCusDetails;