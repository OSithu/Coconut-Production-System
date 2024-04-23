import axios from "axios";
import React, { useState } from "react";


const CreateEmployee = () => {

    const [fullName,setfullName] = useState('');
    const [NIC,setNIC] = useState('');
    const [dateOfBirth,setdateOfBirth] = useState('');
    const [gender,setgender] = useState('');
    const [contactNumber,setcontactNumber] = useState('');
    const [contactEmail,setcontactEmail] = useState('');
    const [address,setaddress] = useState('');
    const [jobTitle,setjobTitle] = useState('');
    const [department,setdepartment] = useState('');
    const [startDate,setstartDate] = useState('');


    //Implementing sendDate function
    const sendData = async (e) => {
        e.preventDefault();
// Add date validation
    const today = new Date();

    const selectedDateObj = new Date(dateOfBirth);

    if (selectedDateObj > today) {
      alert("You cannot select a future date."); // if user selected future date display alert message
      return;
    }

    // Validate contact number
    if (contactNumber.length !== 10 || isNaN(contactNumber)) {
        alert("Contact number should have exactly 10 digits.");
        return;
    }

    
    // Validate startDate
    const selectedStartDate = new Date(startDate);
    const isSameDate = today.toDateString() === selectedStartDate.toDateString();
    if (!isSameDate) {
        alert("Start date should be today.");
        return;
    }
      

        try{
        let newRecord = {
            fullName:fullName,
            NIC:NIC,
            dateOfBirth:dateOfBirth,
            gender:gender,
            contactNumber:contactNumber,
            contactEmail:contactEmail,
            address:address,
            jobTitle:jobTitle,
            department:department,
            startDate:startDate,
        }
        
        await axios.post(`http://localhost:8000/employee/save`,newRecord)
        .then((res)=>{
            alert(res.data.message);
            console.log('Status '+res.data.success);
            console.log(res.data.message);
        })
        .catch((err)=>{
            if(err.response){
                console.log(err.response.data.error);
            }else{
              console.log("Error Occured While Processing Your Axios Post Request. "+err.error);
            }
        })

        //set state back to first state
        setfullName('');
        setNIC('');
        setdateOfBirth('');
        setgender('');
        setcontactNumber('');
        setcontactEmail('');
        setaddress('');
        setjobTitle('');
        setdepartment('');
        setstartDate('');

    }catch(err){
        console.log("SentData Function Failed ERROR: "+err.error);
    }


    }

    return (
        <div className="form">
          <h1>Create Post</h1>
          <form className="needs-validation" noValidate onSubmit={sendData}>
          <div className="form-group" style={{marginBottom:'15px'}}>
                  <label style={{marginBottom:'5px'}}>Full Name</label>
                  <input type="text"
                  className="form-control"
                  name="fullName"
                  placeholder="Enter Full Name"
                  onChange={(e) => setfullName(e.target.value)}
                  value={fullName}/>

  
              </div>

              <div className="form-group" style={{marginBottom:'15px'}}>
                  <label style={{marginBottom:'5px'}}>National Identity Card no</label>
                  <input type="text"
                  className="form-control"
                  name="NIC"
                  placeholder="Enter NIC NO"
                  onChange={(e) => setNIC(e.target.value)}
                  value={NIC}/>

  
              </div>
  
              <div className="form-group" style={{marginBottom:'15px'}}>
                  <label style={{marginBottom:'5px'}}>dateOfBirth</label>
                  <input type="date"
                  className="form-control"
                  name="dateOfBirth"
                  placeholder="Enter DOB"
                  onChange={(e) => setdateOfBirth(e.target.value)}
                  value={dateOfBirth}/>

  
              </div>
              <div className="form-group" style={{marginBottom:'15px'}}>
                    <label style={{marginBottom:'5px'}}>Gender</label>
                    <div>
                        <label>
                            <input type="radio" name="gender" value="Male" checked={gender === 'Male'} onChange={(e) => setgender(e.target.value)} /> Male
                        </label>
                        <label>
                            <input type="radio" name="gender" value="Female" checked={gender === 'Female'} onChange={(e) => setgender(e.target.value)} /> Female
                        </label>
                        <label>
                            <input type="radio" name="gender" value="Other" checked={gender === 'Other'} onChange={(e) => setgender(e.target.value)} /> Other
                        </label>
                    </div>
                </div>
  
              <div className="form-group" style={{marginBottom:'15px'}}>
                  <label style={{marginBottom:'5px'}}>contactNumber</label>
                  <input type="text"
                  className="form-control"
                  name="contactNumber"
                  placeholder="Enter contactNumber"
                  onChange={(e) => setcontactNumber(e.target.value)}
                  value={contactNumber}/>

  
              </div>
  
              <div className="form-group" style={{marginBottom:'15px'}}>
                  <label style={{marginBottom:'5px'}}>contactEmail</label>
                  <input type="text"
                  className="form-control"
                  name="contactEmail"
                  placeholder="Enter contactEmail"
                  onChange={(e) =>  setcontactEmail(e.target.value)}
                  value={contactEmail}/>

  
              </div>

              <div className="form-group" style={{marginBottom:'15px'}}>
                  <label style={{marginBottom:'5px'}}>address</label>
                  <input type="text"
                  className="form-control"
                  name="address"
                  placeholder="Enter address"
                  onChange={(e) =>  setaddress(e.target.value)}
                  value={address}/>

  
              </div>

              <div className="form-group" style={{marginBottom:'15px'}}>
    <label style={{marginBottom:'5px'}}>Job Title</label>
    <select
        className="form-control"
        name="jobTitle"
        onChange={(e) => setjobTitle(e.target.value)}
        value={jobTitle}
    >
        <option value="">Select Job Title</option>
        <option value="Manager">Manager</option>
        <option value="Labor">Labor</option>
        <option value="Agricultural Technician">Agricultural Technician</option>
        <option value="Quality Inspector">Quality Inspector</option>
        <option value="Accountant">Accountant</option>



    </select>
</div>

              

              <div className="form-group" style={{marginBottom:'15px'}}>
    <label style={{marginBottom:'5px'}}>Department</label>
    <select
        className="form-control"
        name="department"
        onChange={(e) => setdepartment(e.target.value)}
        value={department}
    >
        <option value="">Select Department</option>
        <option value="sales">Sales and Marketing </option>
        <option value="Finance">Finance and Accounting</option>
        <option value="HR">Human Resources</option>
        <option value="plantation">Plantation </option>
        <option value="Production ">Production </option>

    </select>
             </div>

              <div className="form-group" style={{marginBottom:'15px'}}>
                  <label style={{marginBottom:'5px'}}>startDate	</label>
                  <input type="date"
                  className="form-control"
                  name="startDate"
                  placeholder="Enter startDate"
                  onChange={(e) => setstartDate(e.target.value)}
                  value={startDate}/>

  
              </div>
  
              <button className="btn btn-success" type="submit" style={{marginTop:'15px'}}>
                      <i className="far fa-check-square"></i>
                      &nbsp; Save
              </button>
  
          </form>

        </div>
      )
  

};

export default CreateEmployee;
