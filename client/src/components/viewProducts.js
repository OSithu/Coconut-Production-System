import React, { useEffect, useState, useRef, Component } from "react";
import axios from "axios";
//import { Link } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import ProductNav from "./ProductNav";
import { BsSearch } from "react-icons/bs";
import "../stylesheets/product.css";

const ViewProducts = () => {
  const componentPDF = useRef();
  const [allProducts, setAllItem] = useState([]);
  const [searchProducts, setSearchProducts] = useState("");
  const [showWarning, setShowWarning] = useState(false);
  const [warningProductId, setWarningProductId] = useState(null);

  useEffect(() => {
    const getAllItems = async () => {
      try {
        const response = await axios.get("http://localhost:8000/products");
        const existingProducts = response.data.existingProducts;
        setAllItem(existingProducts);

        // Trigger warning for all products that are low on stock
        const lowStockProducts = existingProducts.filter(
          (product) => product.quantity < product.reOrderLevel
        );

        if (lowStockProducts.length > 0) {
          setShowWarning(true);
          const warningProductIds = lowStockProducts.map(
            (product) => product.productId
          );
          setWarningProductId(warningProductIds);
        } else {
          setShowWarning(false);
          setWarningProductId([]);
        }

        console.log("Status: " + response.data.success);
        console.log("Message: " + response.data.message);
      } catch (err) {
        if (err.response) {
          console.log(err.response.data.error);
        } else {
          console.log("Error occurred while processing your get request");
        }
      }
    };

    getAllItems();
  }, []);

  //implementing function for the pdf downloading
  const generateReport = () => {
    const table = document.querySelector(".table");
    const content = table.outerHTML;
    const newWindow = window.open();
    newWindow.document.write(`
    <html>
    <head>
      <title>Product Details</title>
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
        "Are you sure you want to delete this product?"
      );
      if (confirmed) {
        await axios
          .delete(`http://localhost:8000/products/delete/${id}`)
          .then((res) => {
            alert(res.data.message);
            console.log(res.data.message);
            setAllItem(allProducts.filter((products) => products._id !== id));
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

  const filteredProducts = allProducts.filter(
    (products) =>
      products.productId.toLowerCase().includes(searchProducts.toLowerCase()) ||
      products.productName
        .toLowerCase()
        .includes(searchProducts.toLowerCase()) ||
      products.category.toLowerCase().includes(searchProducts.toLowerCase())
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
          <h2 className="plantTopic">All Products </h2>
          {/* <div className="plantSearch">
            <input
              type="text"
              className="form-control"
              placeholder="Search products..."
              value={searchProducts}
              onChange={(e) => setSearchProducts(e.target.value)}
            />
            <button
              className="btn btn-outline-secondary"
              type="button"
              style={{ backgroundColor: "#e6e6e6" }}
            >
              <BsSearch />
            </button>
          </div> */}

          <div>
            <div style={{ display: "flex", alignItems: "center", marginBottom:"10px", width:"900px" }}>
              <input
                type="text"
                className="form-control"
                placeholder="Search Products..."
                value={searchProducts}
                onChange={(e) => setSearchProducts(e.target.value)}
                style={{ marginRight: "5px" }} // Add margin to separate input and button
              />
              <button
                className="btn btn-outline-secondary"
                type="button"
                style={{ backgroundColor: "#e6e6e6" }}
              >
                <BsSearch />
              </button>
            </div>
          </div>

          <div style={{ textAlign: "right", marginBottom: "10px" }}>
            
            <button className="btn btn-success">
              <a
                href="/addProduct"
                style={{ textDecoration: "none", color: "white" }}
              >
                Add New Product
              </a>
            </button>{" "}
            &nbsp;&nbsp;&nbsp;&nbsp;
            <button className="btn btn-success" onClick={generateReport}>
              Generate Report
            </button>
          </div>

          {showWarning && (
            <div
              className="alert alert-warning"
              role="alert"
              style={{ color: "red" }}
            >
              {warningProductId && `${warningProductId} is low on stock`}
            </div>
          )}
          <div ref={componentPDF} style={{ width: "100%" }}>
            <div className="print-header" style={{ display: "none" }}>
              <img src="/images/logo.png" />
              <h1> Jayakody Koppara Stores </h1>
              <hr />
            </div>
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
                  {/* <th scope="col">#</th> */}
                  <th scope="col" style={{ borderRight: "1px solid white" }}>
                    Product ID
                  </th>
                  <th scope="col" style={{ borderRight: "1px solid white" }}>
                    Product Name
                  </th>
                  <th scope="col" style={{ borderRight: "1px solid white" }}>
                    Product Image
                  </th>
                  <th scope="col" style={{ borderRight: "1px solid white" }}>
                    Available Quantity
                  </th>
                  <th scope="col" style={{ borderRight: "1px solid white" }}>
                    Unit Price
                  </th>
                  <th scope="col" style={{ borderRight: "1px solid white" }}>
                    Category
                  </th>
                  <th scope="col" style={{ borderRight: "1px solid white" }}>
                    Manufactured Date
                  </th>
                  <th scope="col" style={{ borderRight: "1px solid white" }}>
                    Expiration Date
                  </th>
                  <th scope="col" style={{ borderRight: "1px solid white" }}>
                    Re-order Level
                  </th>
                  <th scope="col" style={{ borderRight: "1px solid white" }}>
                    Additional notes
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
                {filteredProducts.map((products) => (
                  <tr
                    key={products._id}
                    className={
                      products.quantity < products.reOrderLevel
                        ? "table-danger"
                        : ""
                    }
                  >
                    <td style={{ borderRight: "1px solid white" }}>
                      {products.productId}
                    </td>
                    <td style={{ borderRight: "1px solid white" }}>
                      {products.productName}
                    </td>
                    <td style={{ borderRight: "1px solid white" }}>
                      {products.productImage && products.productImage.data ? (
                        <img
                          src={`data:${products.productImage.contentType};base64,${products.productImage.data}`}
                          alt="Products"
                          style={{ width: "100px" }}
                        />
                      ) : (
                        <span>No image</span>
                      )}
                    </td>

                    <td style={{ borderRight: "1px solid white" }}>
                      {products.quantity} {products.quantityUnit}
                    </td>
                    <td style={{ borderRight: "1px solid white" }}>
                      {" "}
                      {products.price.unit} {products.price.value}
                    </td>
                    <td style={{ borderRight: "1px solid white" }}>
                      {products.category}
                    </td>
                    <td style={{ borderRight: "1px solid white" }}>
                      {products.manufacturedDate}
                    </td>
                    <td style={{ borderRight: "1px solid white" }}>
                      {products.expirationDate}
                    </td>
                    <td style={{ borderRight: "1px solid white" }}>
                      {products.reOrderLevel} {products.quantityUnit}
                    </td>
                    <td style={{ borderRight: "1px solid white" }}>
                      {products.quantity < products.reOrderLevel && (
                        <span style={{ color: "red" }}>Stock level is low</span>
                      )}
                    </td>
                    <td className="action-col">
                      <a
                        className="btn btn-warning"
                        href={`/editProduct/${products._id}`}
                        style={{ width: "100px" }}
                      >
                        <i className="fas fa-edit"></i>&nbsp;Edit
                      </a>
                      <a
                        className="btn btn-danger"
                        href="#"
                        onClick={() => handleDelete(products._id)}
                        style={{ width: "100px" }}
                      >
                        <i className="far fa-trash-alt"></i>&nbsp;Delete
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="print-footer" style={{ display: "none" }}>
              <hr />
              {/* <p>Report Generated on {currentDate} </p> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProducts;
