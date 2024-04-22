import React, { useState } from "react";
import axios from "axios";


const CreateProductCnt = () => {
  const [productId, setProductId] = useState("");
  const [quantity, setProductQty] = useState("");
  const [quantityUnit, setProductQtyUnit] = useState("");
  const [productDate, setProductDate] = useState("");
  const [description, setProductDesc] = useState("");
  // const [error, setError] = useState("");

  const sendData = async (e) => {
    e.preventDefault();
  
    try {

      let newProductRecData = {
        productId: productId,
        quantity: quantity,
        quantityUnit: quantityUnit,
        productDate: productDate,
        description: description,
      };
  
      const res = await axios.post("http://localhost:8000/productCnt/save", newProductRecData);
  
      // if (res.data.error) {
      //   setError(res.data.error);
      //   return; 
      // }

      alert(res.data.success);
      console.log(res.data.success);
  
      if (description === 'Incremented') {
        // Call updateProductQuantity to add quantity
        await axios.put(`http://localhost:8000/products/updateQuantity/${productId}`, {
          quantity: +quantity
        });
      } else if (description === 'Decremented') {
        // Call updateProductQuantity to subtract quantity
        await axios.put(`http://localhost:8000/products/updateQuantity/${productId}`, {
          quantity: -quantity
        });
      } else {
        console.error('Invalid description:', description);
        return; // Exit the function if description is invalid
      }
  
      // Display success message
      alert('Product quantity updated successfully.');
  
      // Reset the form fields
      setProductId('');
      setProductQty('');
      setProductQtyUnit('');
      setProductDate('');
      setProductDesc('');
    } catch (error) {
      console.error("Error occurred while updating product quantity:", error);
      alert("Failed to update product quantity. Please try again.");
    }
  };

  return (
    <div className="col-md-5 mt-5 mx-auto">
      <h1 className="h3 mb-4 font-weight-normal">
        Add new Product Count Record
      </h1>
      <form className="needs-validation" noValidate onSubmit={sendData}>
        <div className="form-group" style={{ marginBottom: "15px" }}>
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
        </div>

        <div className="form-group" style={{ marginBottom: "15px" }}>
          <label className="col-sm-2 col-form-label"> Available Quantity </label>
          <div className="col-sm-8">
            <input
              type="text"
              className={`form-control`}
              name="quantity"
              placeholder="Enter Quantity"
              value={quantity}
              onChange={(e) => setProductQty(e.target.value)}
            />

            <select
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
            </select>
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
          &nbsp;Save
        </button>
      </form>
    </div>
  );
};

export default CreateProductCnt;
