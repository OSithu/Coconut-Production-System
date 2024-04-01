import React, { Component } from "react";
import axios from "axios";
export default class viewProducts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
    };
  }

  componentDidMount() {
    this.retrieveProducts();
  }

  retrieveProducts() {
    axios.get("http://localhost:8000/products").then((res) => {
      if (res.data.success) {
        this.setState({
          products: res.data.existingProducts,
        });

        console.log(this.state.products);
      }
    });
  }

  onDelete = (id) => {
    axios.delete(`http://localhost:8000/products/delete/${id}`).then((res) => {
      alert("Deleted Successfully");
      this.retrieveProducts();
    });
  };
  render() {
    return (
      <div className="container">
        <div>
          <p>All Products</p>
          <table className="table">
            <thead>
              <tr>
                {/* <th scope="col">#</th> */}
                <th scope="col">productId</th>
                <th scope="col">productName</th>
                <th scope="col">quantity(kg or litre)</th>
                <th scope="col">category</th>
                <th scope="col">manufacturedDate</th>
                <th scope="col">expirationDate</th>
                <th scope="col">Re-orderLevel</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {this.state.products.map((products, index) => (
                <tr key={products._id}>
                  {/* <th scope="row">{index + 1}</th> */}
                  <td>{products.productId}</td>
                  <td>{products.productName}</td>
                  <td>{products.quantity}</td>
                  <td>{products.category}</td>
                  <td>{products.manufacturedDate}</td>
                  <td>{products.expirationDate}</td>
                  <td>{products.reOrderLevel}</td>
                  <td>
                    <a
                      className="btn btn-warning"
                      href={`/editProduct/${products._id}`}
                    >
                      <i className="fas fa-edit"></i>&nbsp;Edit
                    </a>
                    &nbsp;
                    <a
                      className="btn btn-danger"
                      href="#"
                      onClick={() => this.onDelete(products._id)}
                    >
                      <i className="far fa-trash-alt"></i>&nbsp;Delete
                    </a>
                  </td>
                  {products.quantity < products.reOrderLevel && (
                    <td style={{ color: "red" }}>
                      Quantity below reorder level
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>

          <button className="btn btn-success">
            <a
              href="/addProduct"
              style={{ textDecoration: "none", color: "white" }}
            >
              Add New Product
            </a>
          </button>
        </div>
      </div>
    );
  }
}
