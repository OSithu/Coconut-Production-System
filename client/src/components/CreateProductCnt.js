import React, { useState } from "react";
import axios from 'axios';
import updateProductQuantity from './ViewProductCnt';

const CreateProductCnt = () => {
  const [productId, setProductId] = useState('');
  const [quantity, setProductQty] = useState('');
  const [productDate, setProductDate] = useState('');
  const [description, setProductDesc] = useState('');

    //implementing sendData function
    const sendData = async (e) => {
      e.preventDefault();
  
      try {
        let newProductRecData = {
          productId: productId,
          quantity: quantity,
          productDate: productDate,
          description: description,
        };
  
        await axios
          .post("http://localhost:8000/productCnt/save", newProductRecData)
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
      setProductQty('');
      setProductDate('');
      setProductDesc('');
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
            <label style={{ marginBottom: "5px" }}>Quantity</label>
            <input
              type="text"
              className={`form-control`}
              name="quantity"
              placeholder="Enter added quantity"
              value={quantity}
              onChange={(e) => setProductQty(e.target.value)}
              required
            />
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

}

export default CreateProductCnt;