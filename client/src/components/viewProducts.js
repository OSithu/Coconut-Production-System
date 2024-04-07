import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ViewProducts = () => {
  const [allProducts, setAllItem] = useState([]);

  useEffect(() => {
    const getAllItems = async () => {
      await axios
        .get("http://localhost:8000/products")
        .then((res) => {
          setAllItem(res.data.existingProducts);
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
            setAllItem(allProducts.filter(products => products._id !==id));
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
    <div className="container">
      <div>
        <p>All Products</p>
        <table className="table">
          <thead>
            <tr>
              {/* <th scope="col">#</th> */}
              <th scope="col">productId</th>
              <th scope="col">productName</th>
              <th scope="col">quantity(kg or litre)</th>
              <th scope="col">category</th>
              <th scope="col">manufacturedDate</th>
              <th scope="col">expirationDate</th>
              <th scope="col">Re-orderLevel</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {allProducts.map((products, index) => (
              <tr key={products._id} className={products.quantity < products.reOrderLevel ? "table-danger" : ""}>
                <td>{products.productId}</td>
                <td>{products.productName}</td>
                <td>{products.quantity}
                {products.quantity < products.reOrderLevel && (
                  <td style={{ color: "red" }}>Quantity below reorder level</td>
                )}</td>
                <td>{products.category}</td>
                <td>{products.manufacturedDate}</td>
                <td>{products.expirationDate}</td>
                <td>{products.reOrderLevel}</td>
                <td>
                  <a
                    className="btn btn-warning"
                    href={`/editProduct/${products._id}`}
                  >
                    <i className="fas fa-edit"></i>&nbsp;Edit
                  </a>
                  &nbsp;
                  <a
                    className="btn btn-danger"
                    href="#"
                    onClick={() => handleDelete(products._id)}
                  >
                    <i className="far fa-trash-alt"></i>&nbsp;Delete
                  </a>
                </td>
                {/* {products.quantity < products.reOrderLevel && (
                  <td style={{ color: "red" }}>Quantity below reorder level</td>
                )} */}
              </tr>
            ))}
          </tbody>
        </table>

        <button className="btn btn-success">
          <a
            href="/addProduct"
            style={{ textDecoration: "none", color: "white" }}
          >
            Add New Product
          </a>
        </button>
        <button className="btn btn-success">
          <a
            href="/viewProductCnt"
            style={{ textDecoration: "none", color: "white" }}
          >
            Product Count
          </a>
        </button>
      </div>
    </div>
  );
};

export default ViewProducts;
