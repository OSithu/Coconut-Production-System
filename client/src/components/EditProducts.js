import React, { Component } from "react";
import axios from "axios";

export default class EditProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: "",
      productName: "",
      quantity: "",
      category: "",
      manufacturedDate: "",
      expiredDate: "",
    };
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      ...this.state,
      [name]: value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const id = this.props.match.params.id;

    const {
      productId,
      productName,
      quantity,
      category,
      manufacturedDate,
      expirationDate,
    } = this.state;

    const data = {
      productId: productId,
      productName: productName,
      quantity: quantity,
      category: category,
      manufacturedDate: manufacturedDate,
      expirationDate: expirationDate,
    };

    console.log(data);

    axios
      .put(`http://localhost:8000/products/update/${id}`, data)
      .then((res) => {
        if (res.data.success) {
          alert("Post Updated Successfully");
          this.setState({
            productId: "",
            productName: "",
            quantity: "",
            category: "",
            manufacturedDate: "",
            expiredDate: "",
          });
        }
      });
  };

  componentDidMount() {
    const { id } = this.props.match.params;
  
    axios.get(`http://localhost:8000/products/${id}`).then((res) => {
      if (res.data.success) {
        const product = res.data.product;
  
        // Update state with fetched product data
        this.setState({
          productId: product.productId,
          productName: product.productName,
          quantity: product.quantity,
          category: product.category,
          manufacturedDate: product.manufacturedDate,
          expirationDate: product.expirationDate,
        });
      }
    });
  }
  
  

  render() {
    return (
      <div className="col-md-8 mt-4 mx-auto">
        <h1 className="h3 mb-3 font-weight-normal">Edit Product</h1>
        <form className="needs-validation" noValidate>
          <div className="form-group" style={{ marginBottom: "15px" }}>
            <label style={{ marginBottom: "5px" }}>Product ID</label>
            <input
              type="text"
              className="form-control"
              name="productId"
              placeholder="Enter Product Id"
              value={this.state.productId}
              onChange={this.handleInputChange}
              required
            />
          </div>

          <div className="form-group" style={{ marginBottom: "15px" }}>
            <label style={{ marginBottom: "5px" }}>Product Name</label>
            <input
              type="text"
              className="form-control"
              name="productName"
              placeholder="Enter Product Name"
              value={this.state.productName}
              onChange={this.handleInputChange}
              required
            />
          </div>

          <div className="form-group" style={{ marginBottom: "15px" }}>
            <label style={{ marginBottom: "5px" }}>Quantity</label>
            <input
              type="text"
              className="form-control"
              name="quantity"
              placeholder="Enter added quantity"
              value={this.state.quantity}
              onChange={this.handleInputChange}
              required
            />
          </div>

          <div className="form-group" style={{ marginBottom: "15px" }}>
            <label style={{ marginBottom: "5px" }}>Category</label>
            <select
              className="form-control"
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
          </div>

          <div className="form-group" style={{ marginBottom: "15px" }}>
            <label style={{ marginBottom: "5px" }}>Manufactured Date</label>
            <input
              type="date"
              className="form-control"
              name="manufacturedDate"
              placeholder="Enter the manufactured date"
              value={this.state.manufacturedDate}
              onChange={this.handleInputChange}
              required
            />
          </div>

          <div className="form-group" style={{ marginBottom: "15px" }}>
            <label style={{ marginBottom: "5px" }}>Expiration Date</label>
            <input
              type="date"
              className="form-control"
              name="expirationDate"
              placeholder="Enter the expiration date"
              value={this.state.expirationDate}
              onChange={this.handleInputChange}
              required
            />
          </div>

          <button
            className="btn btn-success"
            type="submit"
            style={{ marginTop: "15px" }}
            onClick={this.onSubmit}
          >
            <i className="far fa-check-square"></i>
            &nbsp;Update
          </button>
        </form>
      </div>
    );
  }
}