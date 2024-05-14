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


    const [errors, setErrors] = useState({});

    //Implementing sendDate function 
    const sendData = async (e) => {
        e.preventDefault();

      // Clear previous errors
      setErrors({});

      // Validation
      let formValid = true;
      let errorsData = {};

      if (!fullName.trim()) {
          formValid = false;
          errorsData.fullName = "Full name is required";
      }
      if (!NIC.trim()) {
          formValid = false;
          errorsData.NIC = "National ID no is required";
      }
      if (!dateOfBirth.trim()) {
          formValid = false;
          errorsData.dateOfBirth = "Date of Birth is required";
      }

      if (!gender.trim()) {
        formValid = false;
        errorsData.gender = "gender is required";
    }

    if (!contactNumber.trim()) {
      formValid = false;
      errorsData.
      contactNumber = "Contact number is required";
  }

  if (!contactEmail.trim()) {
    formValid = false;
    errorsData.
    contactNumber = "contact number is required";
}

if (!address.trim()) {
    formValid = false;
    errorsData.
    address = "Address is required";
}

if (!jobTitle.trim()) {
    formValid = false;
    errorsData.
    jobTitle = "job TItle is required";
}

if (!department.trim()) {
    formValid = false;
    errorsData.
    department = "Department is required";
}

if (!startDate.trim()) {
    formValid = false;
    errorsData.
    startDate = "startdate is required";
}

        // If form is not valid, set errors and return
        if (!formValid) {
          setErrors(errorsData);
          return;
      }

// validation fpt Birthday
   const today = new Date();
const oneYearAgo = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate()); // One year ago from today

const selectedDateObj = new Date(dateOfBirth);

if (selectedDateObj > today || selectedDateObj < oneYearAgo) {
  alert("Please select a date within the past year."); // Display alert message if the selected date is in the future or more than one year ago
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

    // Validation after dateOfBirth validation
if (!NIC.trim()) {
  formValid = false;
  errorsData.NIC = "National ID no is required";
} else if (!/^\d{12}$/.test(NIC) && !/^\d{9}[V]$/.test(NIC)) {
  formValid = false;
  errorsData.NIC = "NIC should have either 12 digits or 9 digits followed by 'V'";
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

      } catch (err) {
        if (err.response) {
            if (err.response.status === 400 && err.response.data.error === "NIC already exists") {
                alert("NIC already exists. Employee cannot be added.");
            } else {
                console.log(err.response.data.error);
            }
        } else {
            console.log("Error Occured While Processing Your Axios Post Request. " + err.error);
        }
    }


    }

    return (

        <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h1 className="card-title text-center">Add Employee Details</h1>

        <div className="form">
          
          <form className="needs-validation" noValidate onSubmit={sendData}>
          <div className="form-group" style={{marginBottom:'15px'}}>
                  <label style={{marginBottom:'5px'}}>Full Name</label>
                  <input type="text"
                    className={`form-control ${errors.fullName ? 'is-invalid' : ''}`}
                    name="fullName"
                  placeholder="Enter Full Name"
                  onChange={(e) => setfullName(e.target.value)}
                  value={fullName}/>
                                    {errors.fullName && <div className="invalid-feedback">{errors.fullName}</div>}


  
              </div>

              <div className="form-group" style={{marginBottom:'15px'}}>
                  <label style={{marginBottom:'5px'}}>National Identity Card no</label>
                  <input type="text"
                    className={`form-control ${errors.NIC ? 'is-invalid' : ''}`}
                    name="NIC"
                  placeholder="Enter NIC NO"
                  onChange={(e) => setNIC(e.target.value)}
                  value={NIC}/>
                  {errors.NIC && <div className="invalid-feedback">{errors.NIC}</div>}

  
              </div>
  
              <div className="form-group" style={{marginBottom:'15px'}}>
                  <label style={{marginBottom:'5px'}}>dateOfBirth</label>
                  <input type="date"
                    className={`form-control ${errors.dateOfBirth ? 'is-invalid' : ''}`}
                    name="dateOfBirth"
                  placeholder="Enter DOB"
                  onChange={(e) => setdateOfBirth(e.target.value)}
                  max={new Date(new Date().getFullYear() - 15, new Date().getMonth(), new Date().getDate()).toISOString().split('T')[0]}
                  value={dateOfBirth}/>
                  
                                    {errors.dateOfBirth && <div className="invalid-feedback">{errors.dateOfBirth}</div>}


  
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
                    className={`form-control ${errors.contactNumber ? 'is-invalid' : ''}`}
                    name="contactNumber"
                  placeholder="Enter contactNumber"
                  onChange={(e) => setcontactNumber(e.target.value)}
                  value={contactNumber}/>
                                          {errors.contactNumber && <div className="invalid-feedback">{errors.contactNumber}</div>}


  
              </div>

  
              <div className="form-group" style={{marginBottom:'15px'}}>
                  <label style={{marginBottom:'5px'}}>contactEmail</label>
                  <input type="text"
                    className={`form-control ${errors.contactEmail ? 'is-invalid' : ''}`}
                    name="contactEmail"
                  placeholder="Enter contactEmail"
                  onChange={(e) =>  setcontactEmail(e.target.value)}
                  value={contactEmail}/>
                 {errors.contactEmail && <div className="invalid-feedback">{errors.contactEmail}</div>}


  
              </div>

              <div className="form-group" style={{marginBottom:'15px'}}>
                  <label style={{marginBottom:'5px'}}>address</label>
                  <input type="text"
                    className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                    name="address"
                  placeholder="Enter address"
                  onChange={(e) =>  setaddress(e.target.value)}
                  value={address}/>
                 {errors.address && <div className="invalid-feedback">{errors.address}</div>}


  
              </div>

              <div className="form-group" style={{marginBottom:'15px'}}>
    <label style={{marginBottom:'5px'}}>Job Title</label>
    <select
                     className={`form-control ${errors.jobTitle ? 'is-invalid' : ''}`}
                     name="jobTitle"
        onChange={(e) => setjobTitle(e.target.value)}
        value={jobTitle}
    >
        <option value="">Select Job Title</option>
        <option value="Employee Manager">Manager</option>
        <option value="Labor">Labor</option>
        <option value="Agricultural Technician">Agricultural Technician</option>
        <option value="Product Manager">Product Manager</option>
        <option value="Customer and Sales Manager">Customer and Sales Manager</option>
        <option value="Quality Control Manager">Quality Control Managern</option>
        <option value="Disease Control Manaager">Disease Control Manaager</option>
        <option value="Plantation Manager">Plantation Manager</option>
        <option value="Accountant">Accountant</option>



    </select>
    {errors.jobTitle && <div className="invalid-feedback">{errors.jobTitle}</div>}

</div>

              

              <div className="form-group" style={{marginBottom:'15px'}}>
    <label style={{marginBottom:'5px'}}>Department</label>
    <select
                     className={`form-control ${errors.department ? 'is-invalid' : ''}`}
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
    {errors.department && <div className="invalid-feedback">{errors.department}</div>}

             </div>

              <div className="form-group" style={{marginBottom:'15px'}}>
                  <label style={{marginBottom:'5px'}}>startDate	</label>
                  <input type="date"
                    className={`form-control ${errors.startDate ? 'is-invalid' : ''}`}
                    name="startDate"
                  placeholder="Enter startDate"
                  onChange={(e) => setstartDate(e.target.value)}
                  value={startDate}/>

                {errors.startDate && <div className="invalid-feedback">{errors.startDate}</div>}


  
              </div>
  
              <button className="btn btn-success" type="submit" style={{marginTop:'15px'}}>
                      <i className="far fa-check-square"></i>
                      &nbsp; Save
              </button>
  
          </form>
          </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default CreateEmployee;
