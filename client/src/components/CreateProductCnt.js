import React, { Component } from "react";
import axios from "axios";

export default class CreateProductCnt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: "",
      quantity: "",
      Date: "",
      Description: "",
      errors: {},
    };
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    if (this.validateForm()) {
      const { productId, quantity, Date, Description } = this.state;

      const data = {
        productId: productId,
        quantity: quantity,
        Date: Date,
        Description: Description,
      };

      console.log(data);

      axios.post("http://localhost:8000/productCnt/save", data).then((res) => {
        if (res.data.success) {
          this.setState({
            productId: "",
            quantity: "",
            Date: "",
            Description: "",
            errors: {},
          });
        }
      });
    }
  };

  validateForm = () => {
    const { productId, quantity, Date, Description } = this.state;
    let errors = {};
    let isValid = true;

    if (!productId.trim()) {
      errors.productId = "Product ID is required";
      isValid = false;
    }

    if (!quantity.trim()) {
      errors.quantity = "Quantity is required";
      isValid = false;
    } else if (!/^\d+$/.test(quantity)) {
      errors.quantity = "Quantity should contain only numbers";
      isValid = false;
    }

    if (!Date) {
      errors.Date = "Date is required";
      isValid = false;
    }

    if (!Description) {
      errors.Description = "Description is required";
      isValid = false;
    }

    this.setState({ errors });
    return isValid;
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="col-md-5 mt-5 mx-auto">
        <h1 className="h3 mb-4 font-weight-normal">
          Add new Product Count Record
        </h1>
        <form className="needs-validation" noValidate onSubmit={this.onSubmit}>
          <div className="form-group" style={{ marginBottom: "15px" }}>
            <label style={{ marginBottom: "5px" }}>Product ID</label>
            <input
              type="text"
              className={`form-control ${errors.productId && "is-invalid"}`}
              name="productId"
              placeholder="Enter Product Id"
              value={this.state.productId}
              onChange={this.handleInputChange}
              required
            />
            {errors.productId && (
              <div className="invalid-feedback">{errors.productId}</div>
            )}
          </div>

          <div className="form-group" style={{ marginBottom: "15px" }}>
            <label style={{ marginBottom: "5px" }}>Quantity</label>
            <input
              type="text"
              className={`form-control ${errors.quantity && "is-invalid"}`}
              name="quantity"
              placeholder="Enter added quantity"
              value={this.state.quantity}
              onChange={this.handleInputChange}
              required
            />
            {errors.quantity && (
              <div className="invalid-feedback">{errors.quantity}</div>
            )}
          </div>

          <div className="form-group" style={{ marginBottom: "15px" }}>
            <label style={{ marginBottom: "5px" }}>Date</label>
            <input
              type="date"
              className={`form-control ${errors.Date && "is-invalid"}`}
              name="Date"
              placeholder="Enter the date"
              value={this.state.Date}
              onChange={this.handleInputChange}
              required
            />
            {errors.Date && (
              <div className="invalid-feedback">{errors.Date}</div>
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
                  name="Description"
                  value="increment"
                  checked={this.state.Description === "increment"}
                  onChange={this.handleInputChange}
                />
                &nbsp;Increment
              </label>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <label>
                <input
                  type="radio"
                  name="Description"
                  value="decrement"
                  checked={this.state.Description === "decrement"}
                  onChange={this.handleInputChange}
                />
                &nbsp;Decrement
              </label>
            </div>
            {errors.Description && (
              <div className="invalid-feedback">{errors.Description}</div>
            )}
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
}
