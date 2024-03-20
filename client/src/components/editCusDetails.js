import axios from 'axios';
import React, { Component } from 'react'

export default class editCusDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cusName: "",
            cusEmail: "",
            cusPhone: "",
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
    const cusID = this.props.match.params.cusID;

    const {
        cusName,
        cusEmail,
        cusPhone,
    } = this.state;

    const data = {
        cusName:cusName,
        cusEmail:cusEmail,
        cusPhone:cusPhone,
    };

    console.log(data);

    axios.put(`/cusDetails/update/${cusID}`, data).then((res) => {
      if (res.data.success) {
        alert("Customer detail updated successfully")
        this.setState({
            cusName: "",
            cusEmail: "",
            cusPhone: ""
        });
      }
    });
  };

    componentDidMount(){

        const cusID = this.props.match.params.cusID;

        axios.get(`/cusDetails/${cusID}`).then((res) =>{
            if(res.data.success){
                this.setState({
                    cusName:res.data.cusDetails.cusName,
                    cusEmail:res.data.cusDetails.cusEmail,
                    cusPhone:res.data.cusDetails.cusPhone,
                });

                console.log(this.state.cusDetails);
            }
        });
    }


    render() {
        return (
          <div className="col-md-8 mt-4 mx-auto">
            <h1 className="h3 mb-3 font-weight-normal">Edit customer details</h1>
            <form className="needs-validation" noValidate>
              <div className="form-group" style={{ marginBottom: "15px" }}>
                <label style={{ marginBottom: "5px" }}>Customer name</label>
                <input
                  type="text"
                  className="form-control"
                  name="cusName"
                  placeholder="Enter customer name"
                  value={this.state.cusName}
                  onChange={this.handleInputChange}
                  required
                />
              </div>
    
              <div className="form-group" style={{ marginBottom: "15px" }}>
                <label style={{ marginBottom: "5px" }}>Customer email</label>
                <input
                  type="text"
                  className="form-control"
                  name="cusEmail"
                  placeholder="Enter email address"
                  value={this.state.cusEmail}
                  onChange={this.handleInputChange}
                  required
                />
              </div>
    
              <div className="form-group" style={{ marginBottom: "15px" }}>
                <label style={{ marginBottom: "5px" }}>Customer contact number</label>
                <input
                  type="text"
                  className="form-control"
                  name="cusPhone"
                  placeholder="Enter contact number"
                  value={this.state.cusPhone}
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