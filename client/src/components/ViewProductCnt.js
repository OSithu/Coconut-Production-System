import React, { Component } from "react";
import axios from "axios";
export default class ViewProductCnt extends Component {
  constructor(props) {
    super(props);

    this.state = {
      productCnt: [],
    };
  }

  componentDidMount() {
    this.retrieveProductCnt();
  }

  retrieveProductCnt() {
    axios.get("http://localhost:8000/productCnt").then((res) => {
      if (res.data.success) {
        this.setState({
          productCnt: res.data.existingProductCnt,
        });

        console.log(this.state.productCnt);
      }
    });
  }

  onDelete = (id) => {
    axios.delete(`http://localhost:8000/productCnt/delete/${id}`).then((res) => {
      alert("Deleted Successfully");
      this.retrieveProductCnt();
    });
  };
  render() {
    return (
      <div className="container">
        <div>
          <p>Product Count</p>
          <table className="table">
            <thead>
              <tr>
                {/* <th scope="col">#</th> */}
                <th scope="col">productId</th>
                <th scope="col">quantity(kg or litre)</th>
                <th scope="col">Date</th>
                <th scope="col">Description</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {this.state.productCnt.map((productCnt, index) => (
                <tr key={productCnt._id}>
                  {/* <th scope="row">{index + 1}</th> */}
                  <td>{productCnt.productId}</td>
                  <td>{productCnt.quantity}</td>
                  <td>{productCnt.Date}</td>
                  <td>{productCnt.Description}</td>
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
