import React, { Component } from "react";
import axios from "axios";

export default class CreateProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: "",
      productName: "",
      quantity: "",
      category: "",
      manufacturedDate: "",
      expirationDate: "",
      reOrderLevel: "",
      errors: {}
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
      const {
        productId,
        productName,
        quantity,
        category,
        manufacturedDate,
        expirationDate,
        reOrderLevel,
      } = this.state;

      const data = {
        productId: productId,
        productName: productName,
        quantity: quantity,
        category: category,
        manufacturedDate: manufacturedDate,
        expirationDate: expirationDate,
        reOrderLevel: reOrderLevel,
      };

      console.log(data);

      axios.post("http://localhost:8000/products/save", data).then((res) => {
        if (res.data.success) {
          this.setState({
            productId: "",
            productName: "",
            quantity: "",
            category: "",
            manufacturedDate: "",
            expirationDate: "",
            reOrderLevel: "",
            errors: {}
          });
        }
      });
    }
  };

  validateForm = () => {
    const { productId, productName, quantity, category, manufacturedDate, expirationDate } = this.state;
    let errors = {};
    let isValid = true;

    if (!productId.trim()) {
      errors.productId = "Product ID is required";
      isValid = false;
    }

    if (!productName.trim()) {
      errors.productName = "Product Name is required";
      isValid = false;
    }

    if (!quantity.trim()) {
      errors.quantity = "Quantity is required";
      isValid = false;
    } else if (!/^\d+$/.test(quantity)) {
      errors.quantity = "Quantity should contain only numbers";
      isValid = false;
    }

    if (!category) {
      errors.category = "Category is required";
      isValid = false;
    }

    if (!manufacturedDate) {
      errors.manufacturedDate = "Manufactured Date is required";
      isValid = false;
    }

    if (!expirationDate) {
      errors.expirationDate = "Expiration Date is required";
      isValid = false;
    }

    this.setState({ errors });
    return isValid;
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="col-md-8 mt-4 mx-auto">
        <h1 className="h3 mb-3 font-weight-normal">Add new Product</h1>
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
            <label style={{ marginBottom: "5px" }}>Product Name</label>
            <input
              type="text"
              className={`form-control ${errors.productName && "is-invalid"}`}
              name="productName"
              placeholder="Enter Product Name"
              value={this.state.productName}
              onChange={this.handleInputChange}
              required
            />
            {errors.productName && (
              <div className="invalid-feedback">{errors.productName}</div>
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
            <label style={{ marginBottom: "5px" }}>Category</label>
            <select
              className={`form-control ${errors.category && "is-invalid"}`}
              name="category"
              value={this.state.category}
              onChange={this.handleInputChange}
              required
            >
              <option value="">Select a category</option>
              <option value="products">Products</option>
              <option value="by-products">By-products</option>
              <option value="agrochemicals">Agrochemicals</option>
            </select>
            {errors.category && (
              <div className="invalid-feedback">{errors.category}</div>
            )}
          </div>

          <div className="form-group" style={{ marginBottom: "15px" }}>
            <label style={{ marginBottom: "5px" }}>Manufactured Date</label>
            <input
              type="date"
              className={`form-control ${errors.manufacturedDate && "is-invalid"}`}
              name="manufacturedDate"
              placeholder="Enter the manufactured date"
              value={this.state.manufacturedDate}
              onChange={this.handleInputChange}
              required
            />
            {errors.manufacturedDate && (
              <div className="invalid-feedback">{errors.manufacturedDate}</div>
            )}
          </div>

          <div className="form-group" style={{ marginBottom: "15px" }}>
            <label style={{ marginBottom: "5px" }}>Expiration Date</label>
            <input
              type="date"
              className={`form-control ${errors.expirationDate && "is-invalid"}`}
              name="expirationDate"
              placeholder="Enter the expiration date"
              value={this.state.expirationDate}
              onChange={this.handleInputChange}
              required
            />
            {errors.expirationDate && (
              <div className="invalid-feedback">{errors.expirationDate}</div>
            )}
          </div>

          <div className="form-group" style={{ marginBottom: "15px" }}>
            <label style={{ marginBottom: "5px" }}>Re-order Level</label>
            <input
              type="text"
              className={`form-control ${errors.quantity && "is-invalid"}`}
              name="reOrderLevel"
              placeholder="Enter re-order level"
              value={this.state.reOrderLevel}
              onChange={this.handleInputChange}
              required
            />
            {errors.quantity && (
              <div className="invalid-feedback">{errors.reOrderLevel}</div>
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
