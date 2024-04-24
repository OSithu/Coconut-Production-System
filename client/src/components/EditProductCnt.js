import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditProductCnt = () => {
  const [productId, setProductId] = useState("");
  const [productIds, setProductIds] = useState([]);
  const [quantity, setProductQty] = useState("");
  const [quantityUnit, setProductQtyUnit] = useState("");
  const [productDate, setProductDate] = useState("");
  const [description, setProductDesc] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  // Function to format ISO 8601 date to yyyy-mm-dd format
  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const year = date.getFullYear();
    let month = (1 + date.getMonth()).toString().padStart(2, "0");
    let day = date.getDate().toString().padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    const getOneProductRecord = async () => {
      await axios
        .get(`http://localhost:8000/productCnt/${id}`)
        .then((res) => {
          console.log("API Response Date:", res.data.productCnt.productDate);
          setProductId(res.data.productCnt.productId);
          setProductQty(res.data.productCnt.quantity);
          setProductQtyUnit(res.data.productCnt.quantityUnit);
          setProductDate(formatDate(res.data.productCnt.productDate));
          setProductDesc(res.data.productCnt.description);
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
    const getProductIds = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/productsDet`);
        setProductIds(res.data.existingProducts);
        console.log("Status : " + res.data.success);
      } catch (err) {
        if (err.response) {
          console.log(err.response.data.error);
        }
      }
    };

    getOneProductRecord();
    getProductIds();
  }, [id]);

  const updateData = async (e) => {
    e.preventDefault();

    try {
      const confirmed = window.confirm(
        "Are you sure you want to update this product?"
      );
      if (confirmed) {
        let updatedProductData = {
          productId: productId,
          quantity: quantity,
          quantityUnit: quantityUnit,
          productDate: productDate,
          description: description,
        };

        const res = await axios.put(
          `http://localhost:8000/productCnt/update/${id}`,
          updatedProductData
        );

        if (description === "Incremented") {
          await axios.put(
            `http://localhost:8000/products/updateQuantity/${productId}`,
            {
              quantity: +quantity,
              existedQuantity: updatedProductData.quantity,
            }
          );
        } else if (description === "Decremented") {
          await axios.put(
            `http://localhost:8000/products/updateQuantity/${productId}`,
            {
              quantity: -quantity,
              existedQuantity: updatedProductData.quantity,
            }
          );
        } else {
          console.error("Invalid description:", description);
          return;
        }

        // Display success message
        alert("Product quantity updated successfully.");

        alert(res.data.success);
        console.log(res.data.success);
        navigate("/viewProductCnt");
      } else {
        alert("Update cancelled!");
      }
    } catch (err) {
      console.log("Update failed!");
      alert("Failed to update product. Please try again.");
    }
  };

  return (
    <div className="col-md-5 mt-5 mx-auto">
      <div
        className="card"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.7)",
          borderRadius: "10px",
          marginTop: "110px",
          marginBottom: "20px",
        }}
      >
        <h1
          className="h3 mb-4 font-weight-normal"
          style={{ textAlign: "center", marginTop: "10px" }}
        >
          Update Product Count Record
        </h1>
        <form
          className="needs-validation"
          style={{ marginLeft: "10px", marginRight: "10px" }}
          noValidate
          onSubmit={updateData}
        >
          {/* <div className="form-group" style={{ marginBottom: "15px" }}>
          <label style={{ marginBottom: "5px" }}>Product ID</label>
          <input
            type="text"
            className={`form-control`}
            name="productId"
            placeholder="Enter Product Id"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            required
          />
        </div> */}
          <div className="form-group" style={{ marginBottom: "15px" }}>
            <label style={{ marginBottom: "5px" }}>Product ID</label>
            <select
              className={`form-control`}
              name="productId"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
            >
              <option value="">Select Product ID</option>
              {productIds.map((productId, index) => (
                <option key={index} value={productId.productId}>
                  {productId.productId}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group" style={{ marginBottom: "15px" }}>
            <label className="col-sm-2 col-form-label">
              {" "}
              Available Quantity{" "}
            </label>
            <div className="col-sm-8">
              <input
                type="text"
                className={`form-control`}
                name="quantity"
                placeholder="Enter Quantity"
                value={quantity}
                onChange={(e) => setProductQty(e.target.value)}
              />

              {/* <select
              className="form-select"
              name="quantityUnit"
              value={quantityUnit}
              onChange={(e) => setProductQtyUnit(e.target.value)}
            >
              <option value=""> Select Unit </option>
              <option value="packets"> packets </option>
              <option value="bottles"> bottles </option>
              <option value="g"> g </option>
              <option value="litre"> litre </option>
            </select> */}
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: "15px" }}>
            <label style={{ marginBottom: "5px" }}>Date</label>
            <input
              type="date"
              className={`form-control`}
              name="productDate"
              placeholder="Enter the date"
              value={productDate}
              onChange={(e) => setProductDate(e.target.value)}
              required
            />
          </div>

          <div
            className="form-group"
            style={{
              marginBottom: "15px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div>
              <label style={{ marginRight: "10px" }}>
                <input
                  type="radio"
                  name="description"
                  value="Incremented"
                  checked={description === "Incremented"}
                  onChange={(e) => setProductDesc(e.target.value)}
                />
                &nbsp;Increment
              </label>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <label>
                <input
                  type="radio"
                  name="description"
                  value="Decremented"
                  checked={description === "Decremented"}
                  onChange={(e) => setProductDesc(e.target.value)}
                />
                &nbsp;Decrement
              </label>
            </div>
          </div>

          <button
            className="btn btn-success"
            type="submit"
            style={{ marginTop: "15px" }}
          >
            <i className="far fa-check-square"></i>
            &nbsp;Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProductCnt;
