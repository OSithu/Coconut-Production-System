import React, { useEffect, useState } from "react";
import axios from "axios";
//import { Link } from "react-router-dom";

const ViewProducts = () => {
  const [allProducts, setAllItem] = useState([]);

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

  return (
    // <div style={{backgroundImage: "url(/productBack1.jpg)",}}>
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
            {allProducts.map((products) => (
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

                <td>{products.quantity}</td>
                <td>Rs.{products.price}</td>
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
      </div>
    </div>
    // </div>
  );
};

export default ViewProducts;
