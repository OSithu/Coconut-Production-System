import React, { Component } from 'react'
import axios from 'axios';


export default class App extends Component {
constructor(props){
  super(props);

  this.state ={
    Records:[]
  };
}

componentDidMount(){
  this.retrieveRecords();
}



retrieveRecords(){
  axios.get("http://localhost:8000/view").then(res =>{
    if(res.data.success){
      this.setState({
        Records:res.data.existingRecords
      });
console.log(this.state.Records);

    }
  });
}

  render() {
    return (
      <div>
        <p>Employee Details</p>
        <table class = "table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">fullName</th>
              <th scope="col">dateOfBirth</th>
              <th scope="col">gender</th>
              <th scope="col">contactNumber</th>
              <th scope="col">contactEmail</th>
              <th scope="col">address</th>
              <th scope="col">jobTitle</th>
              <th scope="col">department</th>
              <th scope="col">startDate</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
               {this.state.Records.map((Records,index)=>(
                  <tr>
                      <th scope="row"> {index+1}</th>
                      <td>{Records.fullName}</td> 
                      <td>{Records.dateOfBirth}</td>
                      <td>{Records.gender}</td>
                      <td>{Records.contactNumber}</td>
                      <td>{Records.contactEmail}</td>
                      <td>{Records.address}</td>
                      <td>{Records.jobTitle}</td>
                      <td>{Records.department}</td>
                      <td>{Records.startDate}</td>
                      <td>
                        <a className="btn btn-warning" href="/editEmp">
                          <i className="fas fa-edit"></i>&nbsp;Edit
                        </a>
                        &nbsp;
                        
                        <a className="btn btn-danger" href="#">
                          <i className="far fa-trash-alt"></i>&nbsp;Deleate
                        </a>




                      </td>


                  </tr>

               ))}

          </tbody>
        </table>
        <button className="btn btn-success">
          <a href="/addEmp" style={{ textDecoration: "none", color: "white" }}>
            Add Employee
          </a>
        </button>

      </div>
    )
  }
}
