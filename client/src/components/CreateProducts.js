import React, { useState } from "react";
import axios from 'axios';

const CreateProducts = () => {
  const [productId, setProductId] = useState('');
  const [productName, setProductName] = useState('');
  const [quantity, setProductQty] = useState('');
  const [category, setProductCategory] = useState('');
  const [manufacturedDate, setProductMD] = useState('');
  const [expirationDate, setProductED] = useState('');
  const [reOrderLevel, setProductROL] = useState('');

  //implementing sendData function
  const sendData = async (e) => {
    e.preventDefault();

    try {
      let newProductData = {
        productId: productId,
        productName: productName,
        quantity: quantity,
        category: category,
        manufacturedDate: manufacturedDate,
        expirationDate: expirationDate,
        reOrderLevel: reOrderLevel,
      };

      await axios
        .post("http://localhost:8000/products/save", newProductData)
        .then((res) => {
          alert(res.data.success);
          console.log(res.data.success);
        })
        .catch((err) => {
          if (err.response) {
            console.log(err.response.data.error);
          } else {
            console.log(
              "Error occured while processing axios post request. " + err.error
            );
          }
        });
    } catch (error) {
      console.log("sendData function failed! ERROR: " + error.error);
    }

    //set state back to first state
    setProductId('');
    setProductName('');
    setProductQty('');
    setProductCategory('');
    setProductMD('');
    setProductED('');
    setProductROL('');
  };

  return (
    <div className="col-md-8 mt-4 mx-auto">
      <h1 className="h3 mb-3 font-weight-normal">Add new Product</h1>
      <form className="needs-validation" noValidate onSubmit={sendData}>
        <div className="form-group" style={{ marginBottom: "15px" }}>
          <label style={{ marginBottom: "5px" }}>Product ID</label>
          <input
            type="text"
            className={`form-control `}
            name="productId"
            placeholder="Enter Product Id"
            onChange={(e) => setProductId(e.target.value)}
            value={productId}
            required
          />
          {/* {errors.productId && (
              <div className="invalid-feedback">{errors.productId}</div>
            )} */}
        </div>

        <div className="form-group" style={{ marginBottom: "15px" }}>
          <label style={{ marginBottom: "5px" }}>Product Name</label>
          <input
            type="text"
            className={`form-control `}
            name="productName"
            placeholder="Enter Product Name"
            onChange={(e) => setProductName(e.target.value)}
            value={productName}
            required
          />
          {/* {errors.productName && (
              <div className="invalid-feedback">{errors.productName}</div>
            )} */}
        </div>

        <div className="form-group" style={{ marginBottom: "15px" }}>
          <label style={{ marginBottom: "5px" }}>Quantity</label>
          <input
            type="text"
            className={`form-control `}
            name="quantity"
            placeholder="Enter added quantity"
            value={quantity}
            onChange={(e) => setProductQty(e.target.value)}
            required
          />
          {/* {errors.quantity && (
              <div className="invalid-feedback">{errors.quantity}</div>
            )} */}
        </div>

        <div className="form-group" style={{ marginBottom: "15px" }}>
          <label style={{ marginBottom: "5px" }}>Category</label>
          <select
            className={`form-control `}
            name="category"
            value={category}
            onChange={(e) => setProductCategory(e.target.value)}
            required
          >
            <option value="">Select a category</option>
            <option value="products">Products</option>
            <option value="by-products">By-products</option>
            <option value="agrochemicals">Agrochemicals</option>
          </select>
          {/* {errors.category && (
              <div className="invalid-feedback">{errors.category}</div>
            )} */}
        </div>

        <div className="form-group" style={{ marginBottom: "15px" }}>
          <label style={{ marginBottom: "5px" }}>Manufactured Date</label>
          <input
            type="date"
            className={`form-control `}
            name="manufacturedDate"
            placeholder="Enter the manufactured date"
            value={manufacturedDate}
            onChange={(e) => setProductMD(e.target.value)}
            required
          />
          {/* {errors.manufacturedDate && (
              <div className="invalid-feedback">{errors.manufacturedDate}</div>
            )} */}
        </div>

        <div className="form-group" style={{ marginBottom: "15px" }}>
          <label style={{ marginBottom: "5px" }}>Expiration Date</label>
          <input
            type="date"
            className={`form-control `}
            name="expirationDate"
            placeholder="Enter the expiration date"
            value={expirationDate}
            onChange={(e) => setProductED(e.target.value)}
            required
          />
          {/* {errors.expirationDate && (
              <div className="invalid-feedback">{errors.expirationDate}</div>
            )} */}
        </div>

        <div className="form-group" style={{ marginBottom: "15px" }}>
          <label style={{ marginBottom: "5px" }}>Re-order Level</label>
          <input
            type="text"
            className={`form-control`}
            name="reOrderLevel"
            placeholder="Enter re-order level"
            value={reOrderLevel}
            onChange={(e) => setProductROL(e.target.value)}
            required
          />
          {/* {errors.quantity && (
              <div className="invalid-feedback">{errors.reOrderLevel}</div>
            )} */}
        </div>

        <button
          className="btn btn-success"
          type="submit"
          style={{ marginTop: "15px" }}
        >
          <i className="far fa-check-square"></i>
          &nbsp;Save
        </button>
      </form>
    </div>
  );
};

export default CreateProducts;
