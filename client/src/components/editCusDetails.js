import axios from "axios";
import React, { Component } from "react";

export default class editCusDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cusName: "",
      cusEmail: "",
      contactNumber: "",
      cusLocation: "",
      errors: {
        cusName: "",
        cusEmail: "",
        contactNumber: "",
        cusLocation: "",
      },
    };
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    let errors = this.state.errors;

    switch (name) {
      case "cusName":
        errors.cusName =
          value.length < 3
            ? "Customer name must be at least 3 characters long"
            : "";
        break;
      case "cusEmail":
        errors.cusEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          ? ""
          : "Email is not valid";
        break;
      case "contactNumber":
        errors.contactNumber = /^\d{10}$/.test(value)
          ? ""
          : "Phone number must be 10 digits";
        break;
      default:
        break;
    }

    this.setState({
      errors,
      [name]: value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const cusID = this.props.match.params.cusID;

    const { cusName, cusEmail, contactNumber, cusLocation, errors } =
      this.state;

    if (
      cusName &&
      cusEmail &&
      contactNumber &&
      cusLocation &&
      !errors.cusName &&
      !errors.cusEmail &&
      !errors.contactNumber &&
      !errors.cusLocation
    ) {
      const data = {
        cusName: cusName,
        cusEmail: cusEmail,
        contactNumber: contactNumber,
        cusLocation: cusLocation,
      };

      console.log(data);

      axios.put("http://localhost:8000/cusDetails/update", data).then((res) => {
        if (res.data.success) {
          alert("Details updated successfully");
          this.setState({
            cusName: "",
            cusEmail: "",
            contactNumber: "",
            cusLocation: "",
            errors: {
              cusName: "",
              cusEmail: "",
              contactNumber: "",
              cusLocation: "",
            },
          });
        }
      });
    } else {
      alert("Please fill in all fields correctly");
    }
  };

  componentDidMount() {
    const cusID = this.props.match.params.cusID;

    axios.get(`/cusDetails/${cusID}`).then((res) => {
      if (res.data.success) {
        this.setState({
          cusName: res.data.cusDetails.cusName,
          cusEmail: res.data.cusDetails.cusEmail,
          contactNumber: res.data.cusDetails.contactNumber,
          cusLocation: res.data.cusDetails.cusLocation,
        });

        console.log(this.state.cusDetails);
      }
    });
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="col-md-8 mt-4 mx-auto">
        <h1 className="h3 mb-3 font-weight-normal">Edit new customer detail</h1>
        <form className="needs-validation" noValidate>
          <div className="form-group" style={{ marginBottom: "15px" }}>
            <label style={{ marginBottom: "5px" }}>Customer name</label>
            <input
              type="text"
              className={`form-control ${errors.cusName ? "is-invalid" : ""}`}
              name="cusName"
              placeholder="Enter customer name"
              value={this.state.cusName}
              onChange={this.handleInputChange}
              required
            />
            {errors.cusName.length > 0 && (
              <div className="invalid-feedback">{errors.cusName}</div>
            )}
          </div>

          <div className="form-group" style={{ marginBottom: "15px" }}>
            <label style={{ marginBottom: "5px" }}>Customer email</label>
            <input
              type="text"
              className={`form-control ${errors.cusEmail ? "is-invalid" : ""}`}
              name="cusEmail"
              placeholder="Enter email address"
              value={this.state.cusEmail}
              onChange={this.handleInputChange}
              required
            />
            {errors.cusEmail.length > 0 && (
              <div className="invalid-feedback">{errors.cusEmail}</div>
            )}
          </div>

          <div className="form-group" style={{ marginBottom: "15px" }}>
            <label style={{ marginBottom: "5px" }}>
              Customer contact number
            </label>
            <input
              type="text"
              className={`form-control ${errors.cusPhone ? "is-invalid" : ""}`}
              name="contactNumber"
              placeholder="Enter contact number"
              value={this.state.contactNumber}
              onChange={this.handleInputChange}
              required
            />
            {errors.contactNumber.length > 0 && (
              <div className="invalid-feedback">{errors.contactNumber}</div>
            )}
          </div>

          <div className="form-group" style={{ marginBottom: "15px" }}>
            <label style={{ marginBottom: "5px" }}>Customer address</label>
            <input
              type="text"
              className={`form-control ${
                errors.cusLocation ? "is-invalid" : ""
              }`}
              name="cusLocation"
              placeholder="Enter customer address"
              value={this.state.cusLocation}
              onChange={this.handleInputChange}
              required
            />
            {errors.cusLocation.length > 0 && (
              <div className="invalid-feedback">{errors.cusLocation}</div>
            )}
          </div>

          <button
            className="btn btn-success"
            type="submit"
            style={{ marginTop: "15px" }}
            onClick={this.onSubmit}
          >
            <i className="far fa-check-square"></i>
            &nbsp;update
          </button>
        </form>
      </div>
    );
  }
}
