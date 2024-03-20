import React, { Component } from 'react'
import axios from 'axios';

export default class createSpread extends Component {

    constructor(props){
        super(props);
        this.state={
            treeID:"",
            identifyDate:"",
            disease:"",
            spreadLevel:"",
            specialNote:""
        }
    }

    handleInputChange =(e)=>{
        const{name,value} = e.target;

        this.setState({
            ...this.state,
            [name]:value

        })
    }

    onSubmit = (e) =>{
        e.preventDefault();

        const {treeID,identifyDate,disease,spreadLevel,specialNote} = this.state;

        const data ={
            treeID:treeID,
            identifyDate:identifyDate,
            disease:disease,
            spreadLevel:spreadLevel,
            specialNote:specialNote
  
        }

        console.log(data)

        axios.post("http://localhost:8000/diseasespread/create",data).then((res)=>{
            if(res.data.success){
                this.setState({
                    treeID:"",
                    identifyDate:"",
                    disease:"",
                    spreadLevel:"",
                    specialNote:""

                }
                )
            }
        })

    }
  render() {
    return (
      <div>
        <h1>Create Post</h1>
        <form className="needs-validation" noValidate>
            <div className="form-group" style={{marginBottom:'15px'}}>
                <label style={{marginBottom:'5px'}}>Tree ID</label>
                <input type="text"
                className="form-control"
                name="treeID"
                placeholder="Enter Tree ID"
                value={this.state.treeID}
                onChange={this.handleInputChange}/>

            </div>

            <div className="form-group" style={{marginBottom:'15px'}}>
                <label style={{marginBottom:'5px'}}>Identify Date</label>
                <input type="date"
                className="form-control"
                name="identifyDate"
                placeholder="Enter Identify Date"
                value={this.state.identifyDate}
                onChange={this.handleInputChange}/>

            </div>

            <div className="form-group" style={{marginBottom:'15px'}}>
                <label style={{marginBottom:'5px'}}>Disease</label>
                <input type="text"
                className="form-control"
                name="disease"
                placeholder="Enter Disease"
                value={this.state.disease}
                onChange={this.handleInputChange}/>

            </div>

            <div className="form-group" style={{marginBottom:'15px'}}>
                <label style={{marginBottom:'5px'}}>Spread Level</label>
                <input type="text"
                className="form-control"
                name="spreadLevel"
                placeholder="Enter Spread Level"
                value={this.state.spreadLevel}
                onChange={this.handleInputChange}/>

            </div>

            <div className="form-group" style={{marginBottom:'15px'}}>
                <label style={{marginBottom:'5px'}}>Special Note</label>
                <input type="text"
                className="form-control"
                name="specialNote"
                placeholder="Enter Special Note"
                value={this.state.specialNote}
                onChange={this.handleInputChange}/>

            </div>

            <button className="btn btn-success" type="submit" style={{marginTop:'15px'}}onClick={this.onSubmit}>
                    <i className="far fa-check-square"></i>
                    &nbsp; Save
            </button>








        </form>










      </div>
    )
  }
}
