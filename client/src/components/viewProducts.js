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
            <div className="pDetails" style={{marginRight: "250px", marginLeft: "100px"}}>
              <li>
                <a class="active" href="/viewProduct">
                  Product Details
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
            All Products
            <div className="input-group mb-3">
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
            </div>
          </p>
          <div style={{ textAlign: "right", marginBottom: "10px" }}>
            <button className="btn btn-success">
              <a
                href="/addProduct"
                style={{ textDecoration: "none", color: "white" }}
              >
                Add New Product
              </a>
            </button>{" "}
          </div>
          <div ref={componentPDF} style={{ width: "100%" }}>
            <div className="print-header" style={{ display: "none" }}>
              <img src="/images/logo.png" />
              <h1> Jayakody Koppara Stores </h1>
              <hr />
                        
            </div>
            {showWarning && (
              <div className="alert alert-warning" role="alert">
                {warningProductId && `${warningProductId} is low on stock`}
              </div>
            )}
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
                        style={{ width: "90px" }}
                      >
                        <i className="fas fa-edit"></i>&nbsp;Edit
                      </a>
                      <a
                        className="btn btn-danger"
                        href="#"
                        onClick={() => handleDelete(products._id)}
                        style={{ width: "90px" }}
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

export default ViewProducts;
