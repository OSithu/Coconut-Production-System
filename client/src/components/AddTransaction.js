// createFinanceDetails.js
import React, { Component } from 'react'
import axios from 'axios'

export default class AddTransaction extends Component {

 constructor(props){
    super(props);
    this.state={
        date:"",
        type:"",
        Description:"",
        Income:"",
        Expences:"",
        totalAmount:""

    }
 }

 handleInputChange = (e) =>{
    const {name,value} = e.target;

    this.setState({
        ...this.state,
        [name]:value
    })
 }

 onSubmit = (e) =>{
    e.preventDefault();

    const {date,type,Description,Income,Expences,totalAmount}=this.state;

    const data ={
        date:date,
        type:type,
        Description:Description,
        Income:Income,
        Expences:Expences,
        totalAmount:totalAmount
    }

    console.log(data)

    axios.post("http://localhost:8000/financeRecords/save",data).then((res)=>{
        if(res.data.success){
            this.setState(
                {
                    date:"",
                    type:"",
                    Description:"",
                    Income:"",
                    Expences:"",
                    totalAmount:""

                }
            )
        }
    })
 }




    render(){
        return(
           <div className = "col-md-8 mt-4 mx-auto">
            <h1 className = "h3 mb-3 font-weight-normal">Add New Transaction</h1>
            <form className = "needs-validation" noValidate>
                <div className = "form-group" style={{marginBottom:'15px'}}>
                    <label style = {{marginBottom:'5px'}}>Date</label>
                    <input type = 'date'
                    className = "form-control"
                    name="date"
                    placeholder="Date"
                    value = {this.state.date}
                    onChange={this.handleInputChange}/>
                </div>

                <div className = "form-group" style={{marginBottom:'15px'}}>
                    <label style = {{marginBottom:'5px'}}>Type</label>
                    <input type = 'text'
                    className = "form-control"
                    name="type"
                    placeholder="Enter type"
                    value = {this.state.type}
                    onChange={this.handleInputChange}/>
                </div>

                <div className = "form-group" style={{marginBottom:'15px'}}>
                    <label style = {{marginBottom:'5px'}}>Description</label>
                    <input type = 'text'
                    className = "form-control"
                    name="Description"
                    placeholder="Description"
                    value = {this.state.Description}
                    onChange={this.handleInputChange}/>
                </div>

                <div className = "form-group" style={{marginBottom:'15px'}}>
                    <label style = {{marginBottom:'5px'}}>Income</label>
                    <input type = 'number'
                    className = "form-control"
                    name="Income"
                    placeholder="Enter income"
                    value = {this.state.Income}
                    onChange={this.handleInputChange}/>
                </div>

                <div className = "form-group" style={{marginBottom:'15px'}}>
                    <label style = {{marginBottom:'5px'}}>Expences</label>
                    <input type = 'number'
                    className = "form-control"
                    name="Expences"
                    placeholder="Enter Expences"
                    value = {this.state.Expences}
                    onChange={this.handleInputChange}/>
                </div>

                <div className = "form-group" style={{marginBottom:'15px'}}>
                    <label style = {{marginBottom:'5px'}}>Total Amount</label>
                    <input type = 'number'
                    className = "form-control"
                    name="totalAmount"
                    placeholder="Enter TotalAmount"
                    value = {this.state.totalAmount}
                    onChange={this.handleInputChange}/>
                </div>

                <button className="btn btn-success" type="submit" style={{marginTop:'15px'}} onClick={this.onSubmit}>
                    <i className="far fa-check-square"></i>
                    &nbsp; Save
                </button>

            </form>
           </div>
        )
    }
}
