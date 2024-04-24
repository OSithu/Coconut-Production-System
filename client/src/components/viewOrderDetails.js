import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { BsSearch } from 'react-icons/bs';


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

  const generateReport = () => {
    const table = document.querySelector(".table");
    const content = table.outerHTML;
    const newWindow = window.open();
    newWindow.document.write(`
      <html>
        <head>
          <title> Order Details </title>
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
            <h2>Order Details</h2>
            <hr />
          </div>
          ${content}
        </body>
      </html>
    `);
    newWindow.print();
    newWindow.close();
  };

  //Remove Time in Identify Date Part
function formatDate(orderDate) {
  const date = new Date(orderDate);
  return date.toISOString().split('T')[0]; 
}

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
          placeholder="Search by product name"
          value={searchOrder}
          onChange={(e) => setSearchOrder(e.target.value)}
          />
          <button className="btn btn-outline-secondary" type="button">
            <BsSearch/>
          </button>
      </div>
      <div className="d-grid d-md-flex justify-content-md-end mb-3">
      <button className="btn btn-success" onClick={ generateReport}>Report</button>  </div>

      <div ref={componentPDF} style={{width:"100%"}}>

      <div className="print-header" style={{ display: "none" }}>
                    <h1> Jayakody Koppara Stores </h1>
                    <hr/>
                </div>
    <div className="container" style={{ backgroundColor: "rgba(255, 255, 255, 0.7)" }}>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">orderName</th>
            <th scope="col">quantity</th>
            <th scope="col">orderDate</th>
            <th className= "action-col" scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrder.map((orderDetails, index) => (
            <tr key={index}>
              <th scope="row">OR{index + 1}</th>
              <td>{orderDetails.orderName}</td>
              <td>{orderDetails.quantity}</td>
              <td>{formatDate(orderDetails.orderDate)}</td>
              
              <td>
                      <a
                        href={`/OrderProfile/${orderDetails._id}`}
                        className="btn btn-primary"
                      >
                        View order
                      </a>
                      &nbsp;
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(orderDetails._id)}
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
                    <hr/>
                    <p>Report Generated on {currentDate} </p>
                </div>
    </div>
    </div>
  );
};

export default ViewOrderDetails;