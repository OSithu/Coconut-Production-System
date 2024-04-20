import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import OrderNav from "./OrderNav";

import { useReactToPrint } from "react-to-print";

const ViewOrderDetails = () => {

  const componentPDF = useRef();

  const [allProducts, setAllItem] = useState([]);

  useEffect(() => {
    const getAllItems = async () => {
      await axios
        .get("http://localhost:8000/orderDetails")
        .then((res) => {
          setAllItem(res.data.existingRecords);
          console.log("Status: " + res.data.success);
          console.log(res.data.message);
        })
        .catch((err) => {
          if (err.response) {
            console.log(err.response.data.error);
          } else {
            console.log("Error occurred while processing your get request");
          }
        });
    };

    getAllItems();
  }, []);

  //implementing PDF download function
  const generatePDF = useReactToPrint({
    content: ()=>componentPDF.current,
    documentTitle:"UserData",
    onAfterPrint:()=>alert("Data saved in PDF")
  });

  //implementing handleDelete function
  const handleDelete = async (id) => {
    try {
      const confirm = window.confirm("Are you sure you want to delete?");

      if (confirm) {
        await axios
          .delete(`http://localhost:8000/orderDetails/delete/${id}`)
          .then((res) => {
            alert(res.data.message);
            console.log(res.data.message);
            setAllItem(allProducts.filter((order) => order._id !== id));
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
      <OrderNav />
      <p>All Order Details</p>
      <button className="btn btn-success">
        <a href="/addOrder" style={{ textDecoration: "none", color: "white" }}>
          Add Order
        </a>
      </button>

      <div ref={componentPDF} style={{width:"100%"}}>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">orderName</th>
            <th scope="col">quantity</th>
            <th scope="col">orderDate</th>
          </tr>
        </thead>
        <tbody>
          {allProducts.map((orderDetails, index) => (
            <tr key={index}>
              <th scope="row">OR{index + 1}</th>
              <td>{orderDetails.orderName}</td>
              <td>{orderDetails.quantity}</td>
              <td>{orderDetails.orderDate}</td>
              <td>

                <a
                  href={`/OrderProfile/${orderDetails._id}`}
                  className="btn btn-primary"
                >
                  View Order
                </a>
                &nbsp;

                <a
                  className="btn btn-danger"
                  href="#"
                  onClick={() => handleDelete(orderDetails._id)}
                >
                  <i className="far fa-trash-alt"></i>&nbsp;Delete
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>

      <div className="d-grid d-md-flex justify-content-md-end mb-3">
      <button className="btn btn-success" onClick={ generatePDF}>PDF</button>  </div>

      
    </div>
  );
};

export default ViewOrderDetails;