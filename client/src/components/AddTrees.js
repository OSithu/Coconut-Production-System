import React, { Component } from "react";
import axios from 'axios';
import PlantationNav from './PlantationNav';

export default class AddTrees extends Component {

    constructor(props) {
        super(props);
        this.state = {
            treeID: "",
            typeOfTree: "",
            plantedDate: "",
            blockName: "",
            specialNotes: "",
            errors: {}
        }
    }

    validateForm = () => {
        const { treeID, typeOfTree, plantedDate, blockName } = this.state;
        const errors = {};

        // Check if required fields are empty
        if (!treeID.trim()) {
            errors.treeID = 'Tree ID is required';
        }
        if (!typeOfTree.trim()) {
            errors.typeOfTree = 'Type of Tree is required';
        }
        if (!plantedDate) {
            errors.plantedDate = 'Planted Date is required';
        }
        if (!blockName.trim()) {
            errors.blockName = 'Block Name is required';
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
        const { treeID, typeOfTree, plantedDate, blockName, specialNotes } = this.state;
        const data = {
            treeID: treeID,
            typeOfTree: typeOfTree,
            plantedDate: plantedDate,
            blockName: blockName,
            specialNotes: specialNotes
        }

        console.log(data)

        axios.post("http://localhost:8000/tree/save", data).then((res) => {
            if (res.data.success) {
                this.setState(
                    {
                        treeID: "",
                        typeOfTree: "",
                        plantedDate: "",
                        blockName: "",
                        specialNotes: "",
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
                        <label style={{ marginBottom: '5px' }}> Tree ID </label>
                        <input type="text"
                            class={`form-control ${errors.treeID ? 'is-invalid' : ''}`}
                            name="treeID"
                            placeholder="Enter Tree ID"
                            value={this.state.treeID}
                            onChange={this.handleInputChange} />
                            {errors.treeID && <div className="invalid-feedback">{errors.treeID}</div>}
                    </div>

                    <div class="form-group" style={{ marginBottom: '15px' }}>
                        <label style={{ marginBottom: '5px' }}> Type of Tree </label>
                        <input type="text"
                            class={`form-control ${errors.typeOfTree ? 'is-invalid' : ''}`}
                            name="typeOfTree"
                            placeholder="Enter Tree Type"
                            value={this.state.typeOfTree}
                            onChange={this.handleInputChange} />
                            {errors.typeOfTree && <div className="invalid-feedback">{errors.typeOfTree}</div>}
                    </div>

                    <div class="form-group" style={{ marginBottom: '15px' }}>
                        <label style={{ marginBottom: '5px' }}> Planted Date </label>
                        <input type="date"
                            class={`form-control ${errors.plantedDate ? 'is-invalid' : ''}`}
                            name="plantedDate"
                            value={this.state.plantedDate}
                            onChange={this.handleInputChange} />
                            {errors.plantedDate && <div className="invalid-feedback">{errors.plantedDate}</div>}
                    </div>

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
                        <label style={{ marginBottom: '5px' }}>Special Notes</label>
                        <textarea class="form-control"
                            placeholder="Mention if there are any"
                            name="specialNotes"
                            value={this.state.specialNotes}
                            onChange={this.handleInputChange}>
                        </textarea>

                    </div>

                    <button className="btn btn-success" type="submit" style={{ marginTop: '15px' }} onClick={this.onSubmit}>Submit</button>
                </form>
            </div>
        )
    }
}