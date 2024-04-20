import React, { useEffect, useState, useRef, Component } from "react";
import axios from "axios";
//import { Link } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import ProductNav from "./ProductNav";
import { BsSearch } from "react-icons/bs";

const ViewProducts = () => {
  const componentPDF = useRef();
  const [allProducts, setAllItem] = useState([]);
  const [searchProducts, setSearchProducts] = useState("");

  useEffect(() => {
    const getAllItems = async () => {
      await axios
        .get("http://localhost:8000/products")
        .then((res) => {
          setAllItem(res.data.existingProducts);
          console.log("Status: " + res.data.success);
          console.log("Message:" + res.data.message);
        })
        .catch((err) => {
          if (err.response) {
            console.log(err.response.data.error);
          } else {
            console.log("Error occured while processing your get request");
          }
        });
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
      products.productName.toLowerCase().includes(searchProducts.toLowerCase()) ||
      products.category.toLowerCase().includes(searchProducts.toLowerCase())
  );

  return (
    // <div style={{backgroundImage: "url(/productBack1.jpg)",}}>
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
            <button className="btn btn-outline-secondary" type="button">
              <BsSearch />
            </button>
          </div>
        </p>
        <div style={{ textAlign: "right" }}>
          <button className="btn btn-success">
            <a
              href="/addProduct"
              style={{ textDecoration: "none", color: "white" }}
            >
              Add New Product
            </a>
          </button>{" "}
          &nbsp;&nbsp;&nbsp;&nbsp;
          <button className="btn btn-success">
            <a
              href="/viewProductCnt"
              style={{ textDecoration: "none", color: "white" }}
            >
              Product Count
            </a>
          </button>
        </div>
        <div ref={componentPDF} style={{ width: "100%" }}>
          <div className="print-header" style={{ display: "none" }}>
            <h1> Jayakody Koppara Stores </h1>
            <hr />
          </div>

          <table className="table">
            <thead>
              <tr>
                {/* <th scope="col">#</th> */}
                <th scope="col">productId</th>
                <th scope="col">productName</th>
                <th scope="col">productImage</th>
                <th scope="col">quantity(kg or litre)</th>
                <th scope="col">unitPrice</th>
                <th scope="col">category</th>
                <th scope="col">manufacturedDate</th>
                <th scope="col">expirationDate</th>
                <th scope="col">Re-orderLevel</th>
                <th scope="col">Additional notes</th>
                <th scope="col">Actions</th>
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
                  <td>{products.productId}</td>
                  <td>{products.productName}</td>
                  <td>
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

                  <td>
                    {products.quantity} {products.quantityUnit}
                  </td>
                  <td>
                    {" "}
                    {products.price.unit} {products.price.value}
                  </td>
                  <td>{products.category}</td>
                  <td>{products.manufacturedDate}</td>
                  <td>{products.expirationDate}</td>
                  <td>{products.reOrderLevel}</td>
                  <td>
                    {products.quantity < products.reOrderLevel && (
                      <span style={{ color: "red" }}>
                        Quantity below reorder level
                      </span>
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
