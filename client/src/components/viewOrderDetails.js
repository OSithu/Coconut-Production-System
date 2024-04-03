import React, { Component } from "react";
import axios from "axios";

export default class viewOrderDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      orderDetails: [],
    };
  }

  componentDidMount() {
    this.retrieveDetails();
  }

  retrieveDetails() {
    axios.get("http://localhost:8000/orderDetails").then((res) => {
      if (res.data.success) {
        this.setState({
          orderDetails: res.data.existingRecords,
        });

        console.log(this.state.orderDetails);
      }
    });
  }

  onDelete = (id) => {
    axios
      .delete(`http://localhost:8000/orderDetails/delete/${id}`)
      .then((res) => {
        alert("Deleted Successfully");
        this.retrieveDetails();
      });
  };

  render() {
    return (
      <div className="container">
        <p>All Order Details</p>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">orderName</th>
              <th scope="col">quantity</th>
              <th scope="col">orderDate</th>
            </tr>
          </thead>
          <tbody>
            {this.state.orderDetails.map((orderDetails, index) => (
              <tr key={index}>
                <th scope="row">OR{index + 1}</th>
                <td>{orderDetails.orderName}</td>
                <td>{orderDetails.quantity}</td>
                <td>{orderDetails.orderDate}</td>
                <td>
                  <a
                    className="btn btn-warning"
                    href={`/editOrder/${orderDetails._id}`}
                  >
                    <i className="fas fa-edit"></i>&nbsp;Edit
                  </a>
                  &nbsp;
                  <a
                    className="btn btn-danger"
                    href="#"
                    onClick={() => this.onDelete(orderDetails._id)}
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
            href="/addOrder"
            style={{ textDecoration: "none", color: "white" }}
          >
            Add Order
          </a>
        </button>
      </div>
    );
  }
}
