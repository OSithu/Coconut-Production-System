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
          <title> Product Details </title>
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
              a { display: none; }
              .action-col { display: none; }
              .actionCol { display: none; }
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
        <div className="print-header" >
            <img src="/images/logo.png" className='imageReport2' />
            <h1> Jayakody Koppara Stores </h1>
            <hr />
          </div>
          <div class="reportHeader" >
            <div class="imgContainer">
              <img src="/image/logo.png" alt="Description of image">
            </div>
            <br/>
            <h2>Product Details</h2>
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
            <div className="pDetails" style={{marginRight: "250px", marginLeft: "100px"}}>
              <li>
                <a class="active" href="/viewProduct">
                  Product Records
                </a>
              </li>
            </div>
            <div className="logo">
              <img src="./images/logo.png" className="image"></img>
            </div>
            <div className="pDetails" style={{marginLeft: "250px", marginRight: "100px"}}>
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
        <p
            style={{
              textAlign: "center",
              fontFamily: "sans-serif",
              fontSize: "24px",
            }}
          >
            Product Records{" "}
          </p>

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
            <button className="btn btn-success">
              <a
                href="/addProductCnt"
                style={{ textDecoration: "none", color: "white" }}
              >
                Add New Product Record
              </a>
            </button>
          </div>
          <div ref={componentPDF} style={{ width: "100%" }}>
            <table
              className="table"
              style={{
                backgroundColor: "rgba(217, 255, 242, 0.6)",
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
                  <th className="actionCol "scope="col" style={{ borderRight: "1px solid white" }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredProductCnt.map((productCnt, index) => (
                  <tr key={productCnt._id}>
                    <td style={{ borderRight: "1px solid white" }}>
                      {/* <a href={`/productCnt/${productCnt._id}`} style ={{textDecoration: 'none'}}>
                    {productCnt.productId}
                  </a> */}
                      <Link
                        to={`/productCnt/${productCnt._id}`}
                        style={{ textDecoration: "none", color:"black" }}
                      >
                        {productCnt.productId}
                      </Link>
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
                      <a
                        className="btn btn-warning"
                        href={`/editProductCnt/${productCnt._id}`}
                      >
                        <i className="fas fa-edit"></i>&nbsp;Edit
                      </a>
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
          <div className="d-grid d-md-flex justify-content-md-end mb-3">
            <button className="btn btn-success" onClick={generateReport}>
              Generate PDF
            </button>{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProductCnt;
