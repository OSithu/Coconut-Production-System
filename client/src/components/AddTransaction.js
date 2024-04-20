// // createFinanceDetails.js
// import React, { Component } from 'react'
// import axios from 'axios'

// export default class AddTransaction extends Component {

//  constructor(props){
//     super(props);
//     this.state={
//         date:"",
//         type:"",
//         Description:"",
//         Income:"",
//         Expences:"",
//         totalAmount:""

//     }
//  }

//  handleInputChange = (e) =>{
//     const {name,value} = e.target;

//     this.setState({
//         ...this.state,
//         [name]:value
//     })
//  }

//  onSubmit = (e) =>{
//     e.preventDefault();

//     const {date,type,Description,Income,Expences,totalAmount}=this.state;

//     const data ={
//         date:date,
//         type:type,
//         Description:Description,
//         Income:Income,
//         Expences:Expences,
//         totalAmount:totalAmount
//     }

//     console.log(data)

//     axios.post("http://localhost:8000/financeRecords/save",data).then((res)=>{
//         if(res.data.success){
//             this.setState(
//                 {
//                     date:"",
//                     type:"",
//                     Description:"",
//                     Income:"",
//                     Expences:"",
//                     totalAmount:""

//                 }
//             )
//         }
//     })
//  }




//     render(){
//         return(
//            <div className = "col-md-8 mt-4 mx-auto">
//             <h1 className = "h3 mb-3 font-weight-normal">Add New Transaction</h1>
//             <form className = "needs-validation" noValidate>
//                 <div className = "form-group" style={{marginBottom:'15px'}}>
//                     <label style = {{marginBottom:'5px'}}>Date</label>
//                     <input type = 'date'
//                     className = "form-control"
//                     name="date"
//                     placeholder="Date"
//                     value = {this.state.date}
//                     onChange={this.handleInputChange}/>
//                 </div>

//                 <div className = "form-group" style={{marginBottom:'15px'}}>
//                     <label style = {{marginBottom:'5px'}}>Type</label>
//                     <input type = 'text'
//                     className = "form-control"
//                     name="type"
//                     placeholder="Enter type"
//                     value = {this.state.type}
//                     onChange={this.handleInputChange}/>
//                 </div>

//                 <div className = "form-group" style={{marginBottom:'15px'}}>
//                     <label style = {{marginBottom:'5px'}}>Description</label>
//                     <input type = 'text'
//                     className = "form-control"
//                     name="Description"
//                     placeholder="Description"
//                     value = {this.state.Description}
//                     onChange={this.handleInputChange}/>
//                 </div>

//                 <div className = "form-group" style={{marginBottom:'15px'}}>
//                     <label style = {{marginBottom:'5px'}}>Income</label>
//                     <input type = 'number'
//                     className = "form-control"
//                     name="Income"
//                     placeholder="Enter income"
//                     value = {this.state.Income}
//                     onChange={this.handleInputChange}/>
//                 </div>

//                 <div className = "form-group" style={{marginBottom:'15px'}}>
//                     <label style = {{marginBottom:'5px'}}>Expences</label>
//                     <input type = 'number'
//                     className = "form-control"
//                     name="Expences"
//                     placeholder="Enter Expences"
//                     value = {this.state.Expences}
//                     onChange={this.handleInputChange}/>
//                 </div>

//                 <div className = "form-group" style={{marginBottom:'15px'}}>
//                     <label style = {{marginBottom:'5px'}}>Total Amount</label>
//                     <input type = 'number'
//                     className = "form-control"
//                     name="totalAmount"
//                     placeholder="Enter TotalAmount"
//                     value = {this.state.totalAmount}
//                     onChange={this.handleInputChange}/>
//                 </div>

//                 <button className="btn btn-success" type="submit" style={{marginTop:'15px'}} onClick={this.onSubmit}>
//                     <i className="far fa-check-square"></i>
//                     &nbsp; Save
//                 </button>

//             </form>
//            </div>
//         )
//     }
// }

import React, { useState } from "react";
import axios from 'axios';
import '../stylesheets/finance.css'

const AddTransaction = () => {

    const [date, setDate] = useState('');
    const [type, setType] = useState('');
    const [Description, setDescription] = useState('');
    const [Income, setIncome] = useState('');
    const [Expences, setExpences] = useState('');
    const [totalAmount, setTotalAmount] = useState('');

    // Implementing send data function
    const sendData = async (e) => {
        e.preventDefault();

        try {
            let newTransaction = {
                date: date,
                type: type,
                Description: Description,
                Income: Income,
                Expences: Expences,
                totalAmount: totalAmount,
            };

            await axios.post(`http://localhost:8000/financeRecords/save`, newTransaction)
                .then((res) => {
                    alert(res.data.success);
                    console.log('status: ' + res.data.status);
                    console.log(res.data.success);
                })
                .catch((err) => {
                    if (err.response) {
                        console.log(err.response.data.error);
                    } else {
                        console.log("Error occurred while processing your axios get request" + err.error);
                    }
                });
        } catch (err) {
            console.log('sendData function failed! ERROR:' + err.error);
        }

        // Set state back to initial state
        setDate('');
        setType('');
        setDescription('');
        setIncome('');
        setExpences('');
        setTotalAmount('');
    };

    return (
        <div className="col-md-8 mt-4 mx-auto">
            <h1 className="h3 mb-3 font-weight-normal">Add New Transaction</h1>
            <div className="financepage-background">
                <div className="col-md-8 mt-4 mx-auto">
            <form className="finance-form needs-validation" noValidate>
                <div className="form-group" style={{ marginBottom: '15px' }}>
                    <label style={{ marginBottom: '5px' }}>Date</label>
                    <input
                        type='date'
                        className="form-control"
                        name="date"
                        placeholder="Date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </div>

                <div className="form-group" style={{ marginBottom: '15px' }}>
                    <label style={{ marginBottom: '5px' }}>Type</label>
                    <input
                        type='text'
                        className="form-control"
                        name="type"
                        placeholder="Enter type"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                    />
                </div>

                <div className="form-group" style={{ marginBottom: '15px' }}>
                    <label style={{ marginBottom: '5px' }}>Description</label>
                    <input
                        type='text'
                        className="form-control"
                        name="Description"
                        placeholder="Description"
                        value={Description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                <div className="form-group" style={{ marginBottom: '15px' }}>
                    <label style={{ marginBottom: '5px' }}>Income</label>
                    <input
                        type='number'
                        className="form-control"
                        name="Income"
                        placeholder="Enter income"
                        value={Income}
                        onChange={(e) => setIncome(e.target.value)}
                    />
                </div>

                <div className="form-group" style={{ marginBottom: '15px' }}>
                    <label style={{ marginBottom: '5px' }}>Expenses</label>
                    <input
                        type='number'
                        className="form-control"
                        name="Expenses"
                        placeholder="Enter Expenses"
                        value={Expences}
                        onChange={(e) => setExpences(e.target.value)}
                    />
                </div>

                <div className="form-group" style={{ marginBottom: '15px' }}>
                    <label style={{ marginBottom: '5px' }}>Total Amount</label>
                    <input
                        type='number'
                        className="form-control"
                        name="totalAmount"
                        placeholder="Enter TotalAmount"
                        value={totalAmount}
                        onChange={(e) => setTotalAmount(e.target.value)}
                    />
                </div>

                <button className="btn btn-success" type="submit" style={{ marginTop: '15px' }} onClick={sendData}>
                    <i className="far fa-check-square"></i>
                    &nbsp; Save
                </button>
            </form>
        </div>
        </div>
            </div>
    );
};

export default AddTransaction;
