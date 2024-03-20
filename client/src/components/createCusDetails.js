import React, { Component } from 'react';
import axios from 'axios';

export default class CreateCusDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cusName: '',
            cusEmail: '',
            cusPhone: '',
            errors: {
                cusName: '',
                cusEmail: '',
                cusPhone: ''
            }
        };
    }

    handleInputChange = (e) => {
        const { name, value } = e.target;
        let errors = this.state.errors;

        switch (name) {
            case 'cusName':
                errors.cusName = value.length < 3 ? 'Customer name must be at least 3 characters long' : '';
                break;
            case 'cusEmail':
                errors.cusEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : 'Email is not valid';
                break;
            case 'cusPhone':
                errors.cusPhone = /^\d{10}$/.test(value) ? '' : 'Phone number must be 10 digits';
                break;
            default:
                break;
        }

        this.setState({
            errors,
            [name]: value
        });
    };

    onSubmit = (e) => {
        e.preventDefault();

        const { cusName, cusEmail, cusPhone, errors } = this.state;

        if (cusName && cusEmail && cusPhone && !errors.cusName && !errors.cusEmail && !errors.cusPhone) {
            const data = {
                cusName: cusName,
                cusEmail: cusEmail,
                cusPhone: cusPhone,
            };

            axios.post("http://localhost:8000/cusDetails/save", data).then((res) => {
                if (res.data.success) {
                    this.setState({
                        cusName: '',
                        cusEmail: '',
                        cusPhone: '',
                        errors: {
                            cusName: '',
                            cusEmail: '',
                            cusPhone: ''
                        }
                    });
                }
            });
        } else {
            alert('Please fill in all fields correctly');
        }
    };

    render() {
        const { errors } = this.state;

        return (
            <div className="col-md-8 mt-4 mx-auto">
                <h1 className="h3 mb-3 font-weight-normal">Add new customer detail</h1>
                <form className="needs-validation" noValidate>
                    <div className="form-group" style={{ marginBottom: "15px" }}>
                        <label style={{ marginBottom: "5px" }}>Customer name</label>
                        <input
                            type="text"
                            className={`form-control ${errors.cusName ? 'is-invalid' : ''}`}
                            name="cusName"
                            placeholder="Enter customer name"
                            value={this.state.cusName}
                            onChange={this.handleInputChange}
                            required
                        />
                        {errors.cusName.length > 0 &&
                            <div className='invalid-feedback'>{errors.cusName}</div>}
                    </div>

                    <div className="form-group" style={{ marginBottom: "15px" }}>
                        <label style={{ marginBottom: "5px" }}>Customer email</label>
                        <input
                            type="text"
                            className={`form-control ${errors.cusEmail ? 'is-invalid' : ''}`}
                            name="cusEmail"
                            placeholder="Enter email address"
                            value={this.state.cusEmail}
                            onChange={this.handleInputChange}
                            required
                        />
                        {errors.cusEmail.length > 0 &&
                            <div className='invalid-feedback'>{errors.cusEmail}</div>}
                    </div>

                    <div className="form-group" style={{ marginBottom: "15px" }}>
                        <label style={{ marginBottom: "5px" }}>Customer contact number</label>
                        <input
                            type="text"
                            className={`form-control ${errors.cusPhone ? 'is-invalid' : ''}`}
                            name="cusPhone"
                            placeholder="Enter contact number"
                            value={this.state.cusPhone}
                            onChange={this.handleInputChange}
                            required
                        />
                        {errors.cusPhone.length > 0 &&
                            <div className='invalid-feedback'>{errors.cusPhone}</div>}
                    </div>

                    <button
                        className="btn btn-success"
                        type="submit"
                        style={{ marginTop: "15px" }}
                        onClick={this.onSubmit}
                    >
                        <i className="far fa-check-square"></i>
                        &nbsp;Save
                    </button>
                </form>
            </div>
        );
    }
}
