import React, { useState } from "react";
import axios from "axios";

const CreateProducts = () => {
  const [productId, setProductId] = useState("");
  const [productName, setProductName] = useState("");
  const [productImage, setProductImage] = useState(null);
  const [quantity, setProductQty] = useState("");
  const [quantityUnit, setProductQtyUnit] = useState("");
  const [category, setProductCategory] = useState("");
  const [manufacturedDate, setProductMD] = useState("");
  const [expirationDate, setProductED] = useState("");
  const [reOrderLevel, setProductROL] = useState("");
  const [priceValue, setProductPriceValue] = useState("");
  const [priceUnit, setProductPriceUnit] = useState("");
  const [formErrors, setFormErrors] = useState({});

  //validating form details
  const validateForm = () => {
    const errors = {};
    let formIsValid = true;

    if (!productId.trim()) {
      errors.productId = "Product ID is required";
      formIsValid = false;
    }

    if (!productName.trim()) {
      errors.productName = "Product Name is required";
      formIsValid = false;
    }

    if (!productImage) {
      errors.productImage = "Product Image is required";
      formIsValid = false;
    }

    // if (!quantity.trim()) {
    //   errors.quantity = "Quantity is required";
    //   formIsValid = false;
    // } else if (isNaN(quantity)) {
    //   errors.quantity = "Quantity must be a number";
    //   formIsValid = false;
    // }

    if (!category.trim()) {
      errors.category = "Category is required";
      formIsValid = false;
    }

    if (!manufacturedDate) {
      errors.manufacturedDate = "Manufactured Date is required";
      formIsValid = false;
    } else {
      const currentDate = new Date();
      const selectedDate = new Date(manufacturedDate);
      if (selectedDate > currentDate) {
        errors.manufacturedDate = "Manufactured Date cannot be a future date";
        formIsValid = false;
      }
    }

    if (!expirationDate) {
      errors.expirationDate = "Expiration Date is required";
      formIsValid = false;
    }

    if (manufacturedDate && expirationDate) {
      const manufactured = new Date(manufacturedDate);
      const expiration = new Date(expirationDate);

      if (expiration < manufactured) {
        errors.expirationDate =
          "Expiration Date cannot be before Manufactured Date";
        formIsValid = false;
      }
    }

    if (!reOrderLevel.trim()) {
      errors.reOrderLevel = "Re-order Level is required";
      formIsValid = false;
    } else if (isNaN(reOrderLevel)) {
      errors.reOrderLevel = "Re-order Level must be a number";
      formIsValid = false;
    }

    // if (!price.trim()) {
    //   errors.price = "Price is required";
    //   formIsValid = false;
    // } else if (isNaN(price)) {
    //   errors.reOrderLevel = "Price must be a number";
    //   formIsValid = false;
    // }

    setFormErrors(errors);
    return formIsValid;
  };

  const sendData = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      let newProductData = new FormData();
      newProductData.append("productId", productId);
      newProductData.append("productName", productName);
      newProductData.append("quantity", quantity);
      newProductData.append("quantityUnit", quantityUnit);
      newProductData.append("category", category);
      newProductData.append("manufacturedDate", manufacturedDate);
      newProductData.append("expirationDate", expirationDate);
      newProductData.append("reOrderLevel", reOrderLevel);
      newProductData.append("productImage", productImage);
      //newProductData.append("price", JSON.stringify({ value: priceValue, unit: priceUnit }));

      // Set price value and unit
      if (priceUnit !== "-") {
        newProductData.append(
          "price",
          JSON.stringify({ value: priceValue, unit: priceUnit })
        );
      } else {
        // If price unit is "-", set price value as "-" and leave price unit empty
        newProductData.append(
          "price",
          JSON.stringify({ value: "", unit: "-" })
        );
      }

      await axios.post("http://localhost:8000/products/save", newProductData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Product saved successfully");
    } catch (error) {
      console.error(
        "Error occurred while processing axios post request:",
        error
      );
      if (error.response && error.response.data && error.response.data.error) {
        alert(error.response.data.error);
      } else {
        alert("Failed to save product");
      }
    }

    //set state back to first state
    setProductId("");
    setProductName("");
    setProductQty("");
    setProductCategory("");
    setProductMD("");
    setProductED("");
    setProductROL("");
    setProductImage(null);
    setProductPriceValue("");
    setProductPriceUnit("");
  };

  return (
    <div className="col-md-8 mt-4 mx-auto">
      <div
        className="card"
        style={{
          backgroundColor: "rgba(217, 255, 242, 0.6)",
          borderRadius: "10px",
          marginTop: "20px",
          marginBottom: "20px",
        }}
      >
        <h1
          className="h3 mb-3 font-weight-normal"
          style={{ textAlign: "center", marginTop: "10px" }}
        >
          Add new Product
        </h1>
        <form
          className="needs-validation"
          style={{ marginLeft: "10px", marginRight: "10px" }}
          noValidate
          onSubmit={sendData}
        >
          <div className="form-group" style={{ marginBottom: "15px" }}>
            <label style={{ marginBottom: "5px" }}>Product ID</label>
            <input
              type="text"
              className={`form-control ${formErrors.productId && "is-invalid"}`}
              name="productId"
              placeholder="Enter Product Id"
              onChange={(e) => setProductId(e.target.value)}
              value={productId}
              required
            />
            {formErrors.productId && (
              <div className="invalid-feedback">{formErrors.productId}</div>
            )}
          </div>

          <div className="form-group" style={{ marginBottom: "15px" }}>
            <label style={{ marginBottom: "5px" }}>Product Name</label>
            <input
              type="text"
              className={`form-control ${
                formErrors.productName && "is-invalid"
              }`}
              name="productName"
              placeholder="Enter Product Name"
              onChange={(e) => setProductName(e.target.value)}
              value={productName}
              required
            />
            {formErrors.productName && (
              <div className="invalid-feedback">{formErrors.productName}</div>
            )}
          </div>

          <div className="form-group" style={{ marginBottom: "15px" }}>
            <label style={{ marginBottom: "5px" }}>Product Image: </label>
            <input
              type="file"
              className={`form-control ${
                formErrors.productImage && "is-invalid"
              }`}
              name="productImage"
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  setProductImage(e.target.files[0]);
                }
              }}
              required
            />
            {formErrors.productImage && (
              <div className="invalid-feedback">{formErrors.productImage}</div>
            )}
          </div>

          <div className="form-group" style={{ marginBottom: "15px" }}>
            <label className="col-sm-2 col-form-label">
              {" "}
              Product Unit{" "}
            </label>
            <div className="col-sm-8">
              {/* <input
                type="text"
                className={`form-control ${
                  formErrors.quantity && "is-invalid"
                }`}
                name="quantity"
                placeholder="Enter Quantity"
                value={quantity}
                onChange={(e) => setProductQty(e.target.value)}
              />
              {formErrors.quantity && (
                <div className="invalid-feedback">{formErrors.quantity}</div>
              )} */}

              <select
                className="form-select"
                name="quantityUnit"
                value={quantityUnit}
                onChange={(e) => setProductQtyUnit(e.target.value)}
              >
                <option value=""> Select Unit </option>
                <option value="coconuts"> coconuts </option>
                <option value="husks"> husks </option>
                <option value="kg"> kg </option>
                <option value="packets"> packets </option>
                <option value="bottles"> bottles </option>
                <option value="g"> g </option>
                <option value="litre"> litre </option>
              </select>
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: "15px" }}>
            <label className="col-sm-2 col-form-label"> Unit Price </label>
            <div className="col-sm-8">
              <select
                className="form-select"
                name="unit"
                value={priceUnit}
                onChange={(e) => setProductPriceUnit(e.target.value)}
              >
                <option value=""> Select Unit </option>
                <option value="Rs."> Rs. </option>
                <option value="-"> - </option>
              </select>

              <input
                type="text"
                className={`form-control `}
                name="price"
                placeholder="Enter Unit Price"
                value={priceValue}
                onChange={(e) => setProductPriceValue(e.target.value)}
                disabled={priceUnit === "-"}
              />
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: "15px" }}>
            <label style={{ marginBottom: "5px" }}>Category</label>
            <select
              className={`form-control ${formErrors.category && "is-invalid"} `}
              name="category"
              value={category}
              onChange={(e) => setProductCategory(e.target.value)}
              required
            >
              <option value="">Select a category</option>
              <option value="Products">Products</option>
              <option value="By-products">By-products</option>
              <option value="Agrochemicals">Agrochemicals</option>
            </select>
            {formErrors.category && (
              <div className="invalid-feedback">{formErrors.category}</div>
            )}
          </div>

          <div className="form-group" style={{ marginBottom: "15px" }}>
            <label style={{ marginBottom: "5px" }}>Manufactured Date</label>
            <input
              type="date"
              className={`form-control ${
                formErrors.manufacturedDate && "is-invalid"
              } `}
              name="manufacturedDate"
              placeholder="Enter the manufactured date"
              value={manufacturedDate}
              max={
                new Date().toISOString().split('T')[0]
              }
              onChange={(e) => setProductMD(e.target.value)}
              required
            />
            {formErrors.manufacturedDate && (
              <div className="invalid-feedback">
                {formErrors.manufacturedDate}
              </div>
            )}
          </div>

          <div className="form-group" style={{ marginBottom: "15px" }}>
            <label style={{ marginBottom: "5px" }}>Expiration Date</label>
            <input
              type="date"
              className={`form-control ${
                formErrors.expirationDate && "is-invalid"
              } `}
              name="expirationDate"
              placeholder="Enter the expiration date"
              value={expirationDate}
              onChange={(e) => setProductED(e.target.value)}
              required
            />
            {formErrors.expirationDate && (
              <div className="invalid-feedback">
                {formErrors.expirationDate}
              </div>
            )}
          </div>

          <div className="form-group" style={{ marginBottom: "15px" }}>
            <label style={{ marginBottom: "5px" }}>Re-order Level</label>
            <input
              type="text"
              className={`form-control ${
                formErrors.reOrderLevel && "is-invalid"
              } `}
              name="reOrderLevel"
              placeholder="Enter re-order level"
              value={reOrderLevel}
              onChange={(e) => setProductROL(e.target.value)}
              required
            />
            {formErrors.reOrderLevel && (
              <div className="invalid-feedback">{formErrors.reOrderLevel}</div>
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

export default CreateProducts;
