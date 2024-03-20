import React, { Component } from "react";
import axios from 'axios';
import PlantationNav from './PlantationNav';

export default class UpdateTrees extends Component {

    constructor(props) {
        super(props);
        this.state = {
            treeID: "",
            typeOfTree: "",
            plantedDate: "",
            blockName: "",
            specialNotes: ""
        }
    }
        
    componentDidMount = () => {
        this.getRecordById();
    }
        
    getRecordById() {
        axios.get('http://localhost:8000/trees/' + this.props.match.params.id)

        .then((res) => {
            this.setState({
                treeID: res.data.treeID,
                typeOfTree: res.data.typeOfTree,
                plantedDate: res.data.plantedDate,
                blockName: res.data.blockName,
                specialNotes: res.data.specialNotes,
            });
        })
        .catch((error) => {
            console.log(error);
        })
    }
        
    handleInputChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }
        
    onSubmit = (e) => {
        e.preventDefault();
        const { treeID, typeOfTree, plantedDate, blockName, specialNotes } = this.state;
        axios.put('http://localhost:8000/trees/update/' + this.props.match.params.id, {
            treeID: treeID,
            typeOfTree: typeOfTree,
            plantedDate: plantedDate,
            blockName: blockName,
            specialNotes: specialNotes
        })
        .then((res) => {
            console.log(res);
            this.props.history.push('/');
        })
        .catch((error) => {
            console.log(error);
        });
    }

    render() {
        return (
            <div className="col-md-8 mt-4 mx auto">
                <PlantationNav/>
                <h1 className="h3 mb-3 font-weight-normal"> Update Record </h1>
                <form className="needs-validation" noValidate>
                    <div class="form-group" style={{ marginBottom: '15px' }}>
                        <label style={{ marginBottom: '5px' }}> Tree ID </label>
                        <input type="text"
                            class="form-control"
                            name="treeID"
                            value={this.state.treeID}
                            onChange={this.handleInputChange} />
                    </div>

                    <div class="form-group" style={{ marginBottom: '15px' }}>
                        <label style={{ marginBottom: '5px' }}> Type of Tree </label>
                        <input type="text"
                            class="form-control"
                            name="typeOfTree"
                            value={this.state.typeOfTree}
                            onChange={this.handleInputChange} />
                    </div>

                    <div class="form-group" style={{ marginBottom: '15px' }}>
                        <label style={{ marginBottom: '5px' }}> Planted Date </label>
                        <input type="date"
                            class="form-control"
                            name="plantedDate"
                            value={this.state.plantedDate}
                            onChange={this.handleInputChange} />
                    </div>

                    <div class="form-group" style={{ marginBottom: '15px' }}>
                        <label style={{ marginBottom: '5px' }}> Block Name </label>
                        <input type="text"
                            class="form-control"
                            name="blockName"
                            value={this.state.blockName}
                            onChange={this.handleInputChange} />
                    </div>

                    <div class="form-group" style={{ marginBottom: '15px' }}>
                        <label style={{ marginBottom: '5px' }}>Special Notes</label>
                        <textarea class="form-control"
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
