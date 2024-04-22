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
          const warningProductIds = lowStockProducts.map(product => product.productId);
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
  const generatePDF = useReactToPrint({
    content: () => componentPDF.current,
    documentTitile: "ProductDetails",
    onAfterPrint: () => alert("Data saved in PDF"),
  });

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
    <div className="container">
      <ProductNav />
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
                <th scope="col" style={{ borderRight: "1px solid white" }}>
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
                    {products.reOrderLevel}
                  </td>
                  <td style={{ borderRight: "1px solid white" }}>
                    {products.quantity < products.reOrderLevel && (
                      <span style={{ color: "red" }}>Stock level is low</span>
                    )}
                  </td>
                  <td>
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
          <button className="btn btn-success" onClick={generatePDF}>
            Generate PDF
          </button>{" "}
        </div>
      </div>
    </div>
  );
};

export default ViewProducts;
