import React, { Component } from "react";
import axios from 'axios';
import PlantationNav from './PlantationNav';

export default class AddBlock extends Component {

    constructor(props) {
        super(props);
        this.state = {
            blockName: "",
            area: "",
            treeCount: "",
            lastHarvested: "",
            nextHarvesting: "",
            lastFertilized: "",
            nextFertilization: "",
            errors: {}
        }
    }

    validateForm = () => {
        const { blockName, area, treeCount } = this.state;
        const errors = {};

        // Check if required fields are empty
        if (!blockName.trim()) {
            errors.blockName = 'Tree ID is required';
        }
        if (!area.trim()) {
            errors.area = 'Type of Tree is required';
        }
        if (!treeCount) {
            errors.treeCount = 'Planted Date is required';
        }

        // Update state with errors
        this.setState({ errors });

        // If errors object is empty, form is valid
        return Object.keys(errors).length === 0;
    }


    handleInputChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            ...this.state,
            [name]: value
        })
    }

    onSubmit = (e) => {
        e.preventDefault();
        if (this.validateForm()) {
        const { blockName, area, treeCount } = this.state;
        const data = {
            blockName: blockName,
            area: area,
            treeCount: treeCount
        }

        console.log(data)

        axios.post("http://localhost:8000/blocks/save", data).then((res) => {
            if (res.data.success) {
                this.setState(
                    {
                        blockName: "",
                        area: "",
                        treeCount: "",
                        errors:{}
                    }
                )
            }
        })
    }
    }

    render() {
        const { errors } = this.state;
        return (
            <div className="col-md-8 mt-4 mx auto">
                <PlantationNav/>
            &nbsp;
                <h1 className="h3 mb-3 font-weight-normal"> Add New Record </h1>
                <form className="needs-validation" noValidate>
                    <div class="form-group" style={{ marginBottom: '15px' }}>
                        <label style={{ marginBottom: '5px' }}> Block Name </label>
                        <input type="text"
                            class={`form-control ${errors.blockName ? 'is-invalid' : ''}`}
                            name="blockName"
                            placeholder="Enter Block Name"
                            value={this.state.blockName}
                            onChange={this.handleInputChange} />
                            {errors.blockName && <div className="invalid-feedback">{errors.blockName}</div>}
                    </div>

                    <div class="form-group" style={{ marginBottom: '15px' }}>
                        <label style={{ marginBottom: '5px' }}> Area </label>
                        <input type="text"
                            class={`form-control ${errors.area ? 'is-invalid' : ''}`}
                            name="area"
                            placeholder="Enter Area"
                            value={this.state.area}
                            onChange={this.handleInputChange} />
                            {errors.area && <div className="invalid-feedback">{errors.area}</div>}
                    </div>

                    <div class="form-group" style={{ marginBottom: '15px' }}>
                        <label style={{ marginBottom: '5px' }}> Number of Trees </label>
                        <input type="text"
                            class={`form-control ${errors.treeCount ? 'is-invalid' : ''}`}
                            name="treeCount"
                            value={this.state.treeCount}
                            onChange={this.handleInputChange} />
                            {errors.treeCount && <div className="invalid-feedback">{errors.treeCount}</div>}
                    </div>

                    <button className="btn btn-success" type="submit" style={{ marginTop: '15px' }} onClick={this.onSubmit}>Submit</button>
                </form>
            </div>
        )
    }
}