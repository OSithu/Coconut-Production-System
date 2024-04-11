import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ViewProductCnt = () => {
  const [allProductRecords, setAllRecords] = useState([]);

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

  return (
    <div className="container">
      <div>
        <p>Product Records</p>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">productId</th>
              <th scope="col">quantity(kg or litre)</th>
              <th scope="col">Date</th>
              <th scope="col">Description</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {allProductRecords.map((productCnt, index) => (
              <tr key={productCnt._id}>
                <td>
                  {/* <a href={`/productCnt/${productCnt._id}`} style ={{textDecoration: 'none'}}>
                    {productCnt.productId}
                  </a> */}
                  <Link
                    to={`/productCnt/${productCnt._id}`}
                    style={{ textDecoration: "none" }}
                  >
                    {productCnt.productId}
                  </Link>
                </td>
                {/* <td>{productCnt.productId}</td> */}
                <td>{productCnt.quantity}</td>
                <td>{productCnt.productDate}</td>
                <td>{productCnt.description}</td>
                <td>
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

        <button className="btn btn-success">
          <a
            href="/addProductCnt"
            style={{ textDecoration: "none", color: "white" }}
          >
            Add New Product Record
          </a>
        </button>
      </div>
    </div>
  );
};

export default ViewProductCnt;
