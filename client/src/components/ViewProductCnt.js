import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ProductNav from "./ProductNav";
import { useReactToPrint } from "react-to-print";
import { BsSearch } from "react-icons/bs";

const ViewProductCnt = () => {
  const componentPDF = useRef();
  const [allProductRecords, setAllRecords] = useState([]);
  const [searchProductCnt, setSearchProductCnt] = useState("");

  useEffect(() => {
    const getAllRecords = async () => {
      await axios
        .get("http://localhost:8000/productCnt")
        .then((res) => {
          setAllRecords(res.data.existingProductCnt);
          console.log("Status: " + res.data.success);
          console.log(res.data.message);
        })
        .catch((err) => {
          if (err.response) {
            console.log(err.response.data.error);
          } else {
            console.log("Error occured while processing your get request");
          }
        });
    };

    getAllRecords();
  }, []);

  //implementing function for the pdf downloading
  const generateReport = () => {
    const table = document.querySelector(".table");
    const content = table.outerHTML;
    const newWindow = window.open();
    newWindow.document.write(`
    <html>
    <head>
      <title>Product Records</title>
      <style>
      img{
        height:100px;
        margin: 5px;
      }
        /* Add your print styles here */
        @media print {
          /* Hide buttons */
          a { display: none; }
          .action-col{ display: none; }
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
        .imgContainer {
          text-align: center;
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
      <h1>Jayakody Koppara Stores</h2>
    </div>
    <br/>
    <h2>Product Records</h2>
    <hr />
  </div>

      ${content}
    </body>
  </html>
    `);
    newWindow.print();
    newWindow.close();
  };

  //implementing handleDelete function
  const handleDelete = async (id) => {
    try {
      const confirmed = window.confirm(
        "Are you sure you want to delete this product record?"
      );
      if (confirmed) {
        await axios
          .delete(`http://localhost:8000/productCnt/delete/${id}`)
          .then((res) => {
            alert(res.data.message);
            console.log(res.data.message);
            setAllRecords(
              allProductRecords.filter((productCnt) => productCnt._id !== id)
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
        alert("Deletion cancelled!");
      }
    } catch (err) {
      console.log("handleDelete function failed! ERROR: " + err.message);
    }
  };

  const filteredProductCnt = allProductRecords.filter((productCnt) =>
    productCnt.productId.toLowerCase().includes(searchProductCnt.toLowerCase())
  );

  return (
    <div>
      <div className="header">
        <div>
          <ul className="navbar">
            <div
              className="pDetails"
              style={{ marginRight: "150px", marginLeft: "50px" }}
            >
              <li>
                <a class="active" href="/productDash">
                  Home
                </a>
              </li>
            </div>
            <div
              className="pDetails"
              style={{ marginRight: "50px", marginLeft: "0px" }}
            >
              <li>
                <a class="active" href="/viewProduct">
                  Product Details
                </a>
              </li>
            </div>
            <div className="logo" style={{ margin: "0 auto" }}>
            <a href="/dashboard">
              <img src="./images/logo.png" className="image"></img>
              </a>
            </div>
            <div
              className="pDetails"
              style={{ marginRight: "150px", marginLeft: "200px" }}
            >
              <li>
                <a href="/viewProductCnt">Product Records</a>
              </li>
            </div>
          </ul>
        </div>
      </div>
      <br></br>
      <div className="container">
        <div>
          <h2
            className="plantTopic"
          >
            Product Records{" "}
          </h2>

          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search product records..."
              value={searchProductCnt}
              onChange={(e) => setSearchProductCnt(e.target.value)}
            />
            <button className="btn btn-outline-secondary" type="button">
              <BsSearch />
            </button>
          </div>

          <div style={{ textAlign: "right" }}>
            <div style={{ textAlign: "right", marginBottom: "10px" }}>
              <button className="btn btn-success">
                <a
                  href="/addProductCnt"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  Add New Record
                </a>
              </button>{" "}
              &nbsp;&nbsp;&nbsp;&nbsp;
              <button className="btn btn-success" onClick={generateReport}>
                Generate PDF
              </button>{" "}
            </div>
          </div>
          <div ref={componentPDF} style={{ width: "100%" }}>
            <table
              className="table"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.7)",
                borderRadius: "10px",
                marginTop: "20px",
              }}
            >
              <thead>
                <tr>
                  <th scope="col" style={{ borderRight: "1px solid white" }}>
                    Product ID
                  </th>
                  <th scope="col" style={{ borderRight: "1px solid white" }}>
                    Quantity
                  </th>
                  <th scope="col" style={{ borderRight: "1px solid white" }}>
                    Date
                  </th>
                  <th scope="col" style={{ borderRight: "1px solid white" }}>
                    Description
                  </th>
                  <th
                    className="action-col"
                    scope="col"
                    style={{ borderRight: "1px solid white" }}
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredProductCnt.map((productCnt, index) => (
                  <tr key={productCnt._id}>
                    <td style={{ borderRight: "1px solid white" }}>
                      {/* <Link
                        to={`/productCnt/${productCnt._id}`}
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        {productCnt.productId}
                      </Link> */}
                      {productCnt.productId}
                    </td>
                    {/* <td>{productCnt.productId}</td> */}
                    <td style={{ borderRight: "1px solid white" }}>
                      {productCnt.quantity} {productCnt.quantityUnit}
                    </td>
                    <td style={{ borderRight: "1px solid white" }}>
                      {productCnt.productDate}
                    </td>
                    <td style={{ borderRight: "1px solid white" }}>
                      {productCnt.description}
                    </td>
                    <td style={{ borderRight: "1px solid white" }}>
                      {/* <a
                        className="btn btn-warning"
                        href={`/editProductCnt/${productCnt._id}`}
                      >
                        <i className="fas fa-edit"></i>&nbsp;Edit
                      </a> */}
                      &nbsp;
                      <a
                        className="btn btn-danger"
                        href="#"
                        onClick={() => handleDelete(productCnt._id)}
                      >
                        <i className="far fa-trash-alt"></i>&nbsp;Delete
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProductCnt;
