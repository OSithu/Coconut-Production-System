import React,{ useState , useEffect} from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditEmployee = () => {

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

    const { id } = useParams();
    const navigate = useNavigate();

    
  // Function to format date to yyyy-mm-dd format
  const formatDate = (date) => {
    const d = new Date(date);
    let month = "" + (d.getMonth() + 1);
    let day = "" + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  };




    useEffect(()=>{
     
        const getOneRecord = async() => {
    
        await axios.get(`http://localhost:8000/view/${id}`)
        .then((res)=>{
            setfullName(res.data.employeerecord.fullName);
            setNIC(res.data.employeerecord.NIC);
            setdateOfBirth(formatDate(res.data.employeerecord.dateOfBirth));
            setgender(res.data.employeerecord.gender);
            setcontactNumber(res.data.employeerecord.contactNumber);  
            setcontactEmail(res.data.employeerecord.contactEmail);  
            setaddress(res.data.employeerecord.address);
            setjobTitle(res.data.employeerecord.jobTitle);
            setdepartment(res.data.employeerecord.department);
            setcontactNumber(res.data.employeerecord.contactNumber);  
            setstartDate(formatDate(res.data.employeerecord.startDate));  

          console.log('Status: ' + res.data.success);
        })
        .catch((err)=>{
          if(err.response){
              console.log(err.response.data.error);
          }else{
            console.log("Error Occured While Processing Your Axios Get Request. "+err.error);
          }
    
        })
    
        }
    
        getOneRecord();
    
      },[id])

      const updateData = async(e) =>{
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


            const confirmed = window.confirm("Are you sure you want to Update this items..?");
            if(confirmed){

            let updateRecord = {
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
            
            await axios.put(`http://localhost:8000/employee/update/${id}`,updateRecord)
            .then((res)=>{
                alert(res.data.message);
                console.log(res.data.message);
                navigate('/viewEmployee');
              })
              .catch((err)=>{
                if(err.response){
                    console.log(err.response.data.error);
                }else{
                  console.log("Error Occured While Processing Your Axios Get Request. "+err.error);
                }
          
              })
            }else{
                alert('Update cancelled!')
              }


      }







  return (
    <div>
         <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h1 className="card-title text-center">Edit Employee Details</h1>

    
    <form className="needs-validation" noValidate onSubmit={updateData}>
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
  </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EditEmployee