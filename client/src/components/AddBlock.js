import React, { Component } from "react";
import axios from 'axios';
import PlantationNav from './PlantationNav';

export default class AddBlock extends Component {

    constructor(props) {
        super(props);
        this.state = {
            blockName: "",
            area: {
                value: '',
                unit: ''
            },
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
            errors.blockName = 'Block Name is required';
        }
        if (!area.value.trim()) {
            errors.area = 'Area is required';
        }
        if (!treeCount.trim()) {
            errors.treeCount = 'Tree Count is required';
        }
    
        // Update state with errors
        this.setState({ errors });
    
        // If errors object is empty, form is valid
        return Object.keys(errors).length === 0;
    }
       


    handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'area') {
            this.setState(prevState => ({
                area: {
                    ...prevState.area,
                    value: value
                }
            }));
        } else if (name === 'unit') {
            this.setState(prevState => ({
                area: {
                    ...prevState.area,
                    unit: value
                }
            }));
        } else {
            this.setState({ [name]: value });
        }
    };
    
    

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
                            errors: {}
                        }
                    )
                    window.location.reload();
                }
            })
        }
    }

    render() {
        const { errors } = this.state;
        return (
            <div className="col-md-8 mt-4 mx auto">
                <PlantationNav />
                &nbsp;
                <h1 className="h3 mb-3 font-weight-normal"> Add New Record </h1>
                <form className="needs-validation" noValidate>

                    <div class="row mb-3">
                        <label className="col-sm-2 col-form-label"> Block Name </label>
                        <div className="col-sm-10">
                            <input type="text"
                                class={`form-control ${errors.blockName ? 'is-invalid' : ''}`}
                                name="blockName"
                                placeholder="Enter Block Name"
                                value={this.state.blockName}
                                onChange={this.handleInputChange} />
                            {errors.blockName && <div className="invalid-feedback">{errors.blockName}</div>}
                        </div>
                    </div>

                    <div class="row mb-3">
                        <label className="col-sm-2 col-form-label"> Area </label>
                        <div className="col-sm-8">
                            <input type="text"
                                class={`form-control ${errors.area ? 'is-invalid' : ''}`}
                                name="area"
                                placeholder="Enter Area"
                                value={this.state.area.value}
                                onChange={this.handleInputChange} />
                            {errors.area && <div className="invalid-feedback">{errors.area}</div>}
                            <div className="col-sm-2">
                                <select
                                    className="form-select"
                                    name="unit"
                                    value={this.state.area.unit}
                                    onChange={this.handleInputChange}
                                >
                                    <option value="">Select Unit</option>
                                    <option value="sqm">sqm</option>
                                    <option value="sqft">sqft</option>
                                    <option value="hectare">hectare</option>
                                    <option value="acre">acre</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div class="row mb-3">
                        <label className="col-sm-2 col-form-label"> Tree Count </label>
                        <div className="col-sm-10">
                            <input type="text"
                                class={`form-control ${errors.treeCount ? 'is-invalid' : ''}`}
                                name="treeCount"
                                placeholder="Enter Tree Count"
                                value={this.state.treeCount}
                                onChange={this.handleInputChange} />
                            {errors.treeCount && <div className="invalid-feedback">{errors.treeCount}</div>}
                        </div>
                    </div>

                    <button className="btn btn-success" type="submit" style={{ marginTop: '15px' }} onClick={this.onSubmit}>Submit</button>
                </form>
            </div>
        )
    }
}