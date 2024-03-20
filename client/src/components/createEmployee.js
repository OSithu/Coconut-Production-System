import React, { Component } from 'react'
import axios from 'axios'
export default class createEmployee extends Component {

    constructor(props){
        super(props);
        this.state={
            fullName:"",
            dateOfBirth:"",
            gender:"",
            contactNumber:"",
            contactEmail:"",
            address:"",
            jobTitle:"",
            department:"",
            startDate:""
        }
    }

    handleInputChange =(e) =>{
        const{name,value} = e.target;

        this.setState({
            ...this.State,
            [name]:value
        })
    }

   onSubmit =(e) =>{

    e.preventDefault();

    const {fullName,dateOfBirth,gender,contactNumber,contactEmail,address,jobTitle,department,startDate} = this.state

    const data ={

        fullName:fullName,
        dateOfBirth:dateOfBirth,
        gender:gender,
        contactNumber:contactNumber,
        contactEmail:contactEmail,
        address:address,
        jobTitle:jobTitle,
        department:department,
        startDate:startDate,
    }
    console.log(data)

     axios.post("http://localhost:8000/employee/save",data).then((res) =>{
        if(res.data.success){
           this.setState(
                 {
                     fullName:"",
                    dateOfBirth:"",
                     gender:"",
                    contactNumber:"",
                   contactEmail:"",
                    address:"",
                    jobTitle:"",
                    department:"",
                    startDate:""
               }
          )
       }
     })
   }

  


  render() {
    return (
        <div>
          <h1>Create Employee</h1>
          <form className="needs-validation" noValidate>
              <div className="form-group" style={{marginBottom:'15px'}}>
                  <label style={{marginBottom:'5px'}}>Full Name</label>
                  <input type="text"
                  className="form-control"
                  name="fullName"
                  placeholder="Enter Full Name"
                  value={this.state.treeID}
                  onChange={this.handleInputChange}/>
  
              </div>
  
              <div className="form-group" style={{marginBottom:'15px'}}>
                  <label style={{marginBottom:'5px'}}>dateOfBirth</label>
                  <input type="date"
                  className="form-control"
                  name="dateOfBirth"
                  placeholder="Enter DOB"
                  value={this.state.dateOfBirth}
                  onChange={this.handleInputChange}/>
  
              </div>
  
              <div className="form-group" style={{marginBottom:'15px'}}>
                  <label style={{marginBottom:'5px'}}>gender</label>
                  <input type="text"
                  className="form-control"
                  name="gender"
                  placeholder="Enter Gender"
                  value={this.state.gender}
                  onChange={this.handleInputChange}/>
  
              </div>
  
              <div className="form-group" style={{marginBottom:'15px'}}>
                  <label style={{marginBottom:'5px'}}>contactNumber</label>
                  <input type="text"
                  className="form-control"
                  name="contactNumber"
                  placeholder="Enter contactNumber"
                  value={this.state.contactNumber}
                  onChange={this.handleInputChange}/>
  
              </div>
  
              <div className="form-group" style={{marginBottom:'15px'}}>
                  <label style={{marginBottom:'5px'}}>contactEmail</label>
                  <input type="text"
                  className="form-control"
                  name="contactEmail"
                  placeholder="Enter contactEmail"
                  value={this.state.contactEmail}
                  onChange={this.handleInputChange}/>
  
              </div>

              <div className="form-group" style={{marginBottom:'15px'}}>
                  <label style={{marginBottom:'5px'}}>address</label>
                  <input type="text"
                  className="form-control"
                  name="address"
                  placeholder="Enter address"
                  value={this.state.address}
                  onChange={this.handleInputChange}/>
  
              </div>

              <div className="form-group" style={{marginBottom:'15px'}}>
                  <label style={{marginBottom:'5px'}}>jobTitle</label>
                  <input type="text"
                  className="form-control"
                  name="jobTitle"
                  placeholder="Enter jobTitle"
                  value={this.state.jobTitle}
                  onChange={this.handleInputChange}/>
  
              </div>

              <div className="form-group" style={{marginBottom:'15px'}}>
                  <label style={{marginBottom:'5px'}}>department</label>
                  <input type="text"
                  className="form-control"
                  name="department"
                  placeholder="Enter department"
                  value={this.state.department}
                  onChange={this.handleInputChange}/>
  
              </div>

              <div className="form-group" style={{marginBottom:'15px'}}>
                  <label style={{marginBottom:'5px'}}>startDate	</label>
                  <input type="date"
                  className="form-control"
                  name="startDate"
                  placeholder="Enter startDate"
                  value={this.state.startDate}
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
