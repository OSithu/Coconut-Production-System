import React, { useEffect, useState } from "react";
import axios from "axios";

const CreateProductCnt = () => {
  const [productId, setProductId] = useState("");
  const [productIds, setProductIds] = useState([]);
  const [quantity, setProductQty] = useState("");
  const [quantityUnit, setProductQtyUnit] = useState("");
  const [productDate, setProductDate] = useState("");
  const [description, setProductDesc] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
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

    getProductIds();
  }, []);

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!productId) {
      errors.productId = "Please select a product ID.";
      isValid = false;
    }

    if (!quantity) {
      errors.quantity = "Please enter quantity.";
      isValid = false;
    }

    if (!quantityUnit) {
      errors.quantityUnit = "Please select a quantity unit.";
      isValid = false;
    }

    if (!productDate) {
      errors.productDate = "Please enter a date.";
      isValid = false;
    }

    if (!description) {
      errors.description = "Please select an action description.";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const sendData = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    try {
      let newProductRecData = {
        productId: productId,
        quantity: quantity,
        quantityUnit: quantityUnit,
        productDate: productDate,
        description: description,
      };

      const res = await axios.post(
        "http://localhost:8000/productCnt/save",
        newProductRecData
      );

      // if (res.data.error) {
      //   setError(res.data.error);
      //   return;
      // }

      alert(res.data.success);
      console.log(res.data.success);

      if (description === "Incremented") {
        // Call updateProductQuantity to add quantity
        await axios.put(
          `http://localhost:8000/products/updateQuantity/${productId}`,
          {
            quantity: +quantity,
          }
        );
      } else if (description === "Decremented") {
        // Call updateProductQuantity to subtract quantity
        await axios.put(
          `http://localhost:8000/products/updateQuantity/${productId}`,
          {
            quantity: -quantity,
          }
        );
      } else {
        console.error("Invalid description:", description);
        return; // Exit the function if description is invalid
      }

      // Display success message
      alert("Product quantity updated successfully.");

      // Reset the form fields
      setProductId("");
      setProductQty("");
      setProductQtyUnit("");
      setProductDate("");
      setProductDesc("");
    } catch (error) {
      console.error("Error occurred while updating product quantity:", error);
      alert("Failed to update product quantity. Please try again.");
    }
  };

  return (
    <div className="col-md-5 mt-5 mx-auto">
      <div
        className="card"
        style={{
          backgroundColor: "rgba(217, 255, 242, 0.6)",
          borderRadius: "10px",
          marginTop: "110px",
          marginBottom: "20px",
        }}
      >
        <h1
          className="h3 mb-4 font-weight-normal"
          style={{ textAlign: "center", marginTop: "10px" }}
        >
          Add new Product Count Record
        </h1>
        <form
          className="needs-validation"
          style={{ marginLeft: "10px", marginRight: "10px" }}
          noValidate
          onSubmit={sendData}
        >
          <div className="form-group" style={{ marginBottom: "15px" }}>
            <label style={{ marginBottom: "5px" }}>Product ID</label>
            <select
              className={`form-control ${errors.productId && "is-invalid"}`}
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
            {errors.productId && (
              <div className="invalid-feedback">{errors.productId}</div>
            )}
          </div>

          <div className="form-group" style={{ marginBottom: "15px" }}>
            <label className="col-sm-2 col-form-label">
              {" "}
              Available Quantity{" "}
            </label>
            <div className="col-sm-8">
              <input
                type="text"
                className={`form-control ${errors.quantity && "is-invalid"}`}
                name="quantity"
                placeholder="Enter Quantity"
                value={quantity}
                onChange={(e) => setProductQty(e.target.value)}
              />
              {errors.quantity && (
                <div className="invalid-feedback">{errors.quantity}</div>
              )}
              <select
                className={`form-select ${errors.quantityUnit && "is-invalid"}`}
                name="quantityUnit"
                value={quantityUnit}
                onChange={(e) => setProductQtyUnit(e.target.value)}
              >
                <option value=""> Select Unit </option>
                <option value="packets"> packets </option>
                <option value="bottles"> bottles </option>
                <option value="g"> g </option>
                <option value="litre"> litre </option>
              </select>
              {errors.quantityUnit && (
                <div className="invalid-feedback">{errors.quantityUnit}</div>
              )}
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: "15px" }}>
            <label style={{ marginBottom: "5px" }}>Date</label>
            <input
              type="date"
              className={`form-control ${errors.productDate && "is-invalid"}`}
              name="productDate"
              placeholder="Enter the date"
              value={productDate}
              onChange={(e) => setProductDate(e.target.value)}
              required
            />
            {errors.productDate && (
              <div className="invalid-feedback">{errors.productDate}</div>
            )}
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
            {errors.description && (
              <div className="invalid-feedback">{errors.description}</div>
            )}
          </div>

          <button
            className="btn btn-success"
            type="submit"
            style={{ marginTop: "9px", marginBottom: "15px" }}
          >
            <i className="far fa-check-square"></i>
            &nbsp;Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProductCnt;
