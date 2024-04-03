import React, { Component } from "react";
import axios from "axios";

export default class viewCusDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cusDetails: [],
    };
  }

  componentDidMount() {
    this.retrieveDetails();
  }

  retrieveDetails() {
    axios.get("http://localhost:8000/cusDetails").then((res) => {
      if (res.data.success) {
        this.setState({
          cusDetails: res.data.existingRecords,
        });

        console.log(this.state.cusDetails);
      }
    });
  }

  onDelete = (id) => {
    axios
      .delete(`http://localhost:8000/cusDetails/delete/${id}`)
      .then((res) => {
        alert("Deleted Successfully");
        this.retrieveDetails();
      });
  };

  render() {
    return (
      <div className="container">
        <p>All Customer Details</p>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">cusName</th>
              <th scope="col">cusEmail</th>
              <th scope="col">contactNumber</th>
              <th scope="col">cusLocation</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.cusDetails.map((cusDetails, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{cusDetails.cusName}</td>
                <td>{cusDetails.cusEmail}</td>
                <td>{cusDetails.contactNumber}</td>
                <td>{cusDetails.cusLocation}</td>
                <td>
                  <a
                    className="btn btn-warning"
                    href={`/editCus/${cusDetails._id}`}
                  >
                    <i className="fas fa-edit"></i>&nbsp;Edit
                  </a>
                  &nbsp;
                  <a
                    className="btn btn-danger"
                    href="#"
                    onClick={() => this.onDelete(cusDetails._id)}
                  >
                    <i className="far fa-trash-alt"></i>&nbsp;Delete
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="btn btn-success">
          <a href="/addCus" style={{ textDecoration: "none", color: "white" }}>
            Add Customer
          </a>
        </button>

        <button className="btn btn-success">
          <a
            href="/addOrder"
            style={{ textDecoration: "none", color: "white" }}
          >
            Order
          </a>
        </button>
      </div>
    );
  }
}
