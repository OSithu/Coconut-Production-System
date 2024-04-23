import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import OrderNav from "./OrderNav";
import { BsSearch } from 'react-icons/bs';

import { useReactToPrint } from "react-to-print";

const ViewOrderDetails = () => {
  const componentPDF = useRef();
  const [allProducts, setAllItem] = useState([]);
  const [searchOrder, setSearchOrder] = useState('');
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const getAllItems = async () => {
      await axios
        .get("http://localhost:8000/orderDetails")
        .then((res) => {
          setAllItem(res.data.existingRecords);
          setCurrentDate(new Date().toString());
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

  //filter allProducts based on searchOrder
  const filteredOrder = allProducts.filter(orderDetails =>
    orderDetails.orderName.toLowerCase().includes(searchOrder.toLowerCase())
  );

  return (
    <div className="container">
      <OrderNav />
      <p>All Order Details</p>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by product name"
          value={searchOrder}
          onChange={(e) => setSearchOrder(e.target.value)}
          />
          <button className="btn btn-outline-secondary" type="button">
            <BsSearch/>
          </button>
      </div>
      <div className="d-grid d-md-flex justify-content-md-end mb-3">
      <button className="btn btn-success" onClick={ generatePDF}>Report</button>  </div>

      <div ref={componentPDF} style={{width:"100%"}}>

      <div className="print-header" style={{ display: "none" }}>
                    <h1> Jayakody Koppara Stores </h1>
                    <hr/>
                </div>

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
          {filteredOrder.map((orderDetails, index) => (
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

      <div className="print-footer" style={{ display: "none" }}>
                    <hr/>
                    <p>Report Generated on {currentDate} </p>
                </div>



    </div>
  );
};

export default ViewOrderDetails;