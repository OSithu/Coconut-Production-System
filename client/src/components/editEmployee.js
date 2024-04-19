// import React, { Component } from 'react'
// import axios from 'axios'

// export default class editEmployee extends Component {

//     constructor(props){
//         super(props);
//         this.state={
//             fullName:"",
//             dateOfBirth:"",
//             gender:"",
//             contactNumber:"",
//             contactEmail:"",
//             address:"",
//             jobTitle:"",
//             department:"",
//             startDate:""
//         }
//     }

//     handleInputChange =(e) =>{
//         const{name,value} = e.target;

//         this.setState({
//             ...this.State,
//             [name]:value
//         })
//     }

//    onSubmit =(e) =>{

    

//     e.preventDefault();
//     const id = this.props.match.params.id;

//     const {fullName,dateOfBirth,gender,contactNumber,contactEmail,address,jobTitle,department,startDate} = this.state

//     const data ={

//         fullName:fullName,
//         dateOfBirth:dateOfBirth,
//         gender:gender,
//         contactNumber:contactNumber,
//         contactEmail:contactEmail,
//         address:address,
//         jobTitle:jobTitle,
//         department:department,
//         startDate:startDate,
//     }
//     console.log(data)

//     // axios.put(`/employee/update/${id}`,data).then((res) =>{
//     //     if(res.data.success){
//              alert("Post updated successfully")
//     //         this.setState(
//     //             {
//     //                 fullName:"",
//     //                 dateOfBirth:"",
//     //                 gender:"",
//     //                 contactNumber:"",
//     //                 contactEmail:"",
//     //                 address:"",
//     //                 jobTitle:"",
//     //                 department:"",
//     //                 startDate:"" 
//     //             }
//     //         )
//     //     }
//     //    })
//    } 

// componentDidMount(){
//     const id = this.props.match.params.id;

//     axios.put('/post/${id}').then((res) =>{
//         if(res.data.success){
//             this.setState({
//               fullName:res.data.existingRecords.fullName,
//               dateOfBirth:res.data.existingRecords.dateOfBirth,
//               gender:res.data.existingRecords.gender,
//               contactNumber:res.data.existingRecords.contactNumber,
//               contactEmail:res.data.existingRecords.contactEmail,
//               address:res.data.existingRecords.address,
//               jobTitle:res.data.existingRecords.jobTitle,
//               department:res.data.existingRecords.department,
//               startDate:res.data.existingRecords.startDate,
              

//             });

//             console.log(this.state.post);


//         }
//     });
// }


//   render() {
//     return (
//       <div>edit Employee</div>
//     )
//   }
// }


import React,{ useState , useEffect} from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditEmployee = () => {

    const [fullName,setfullName] = useState('');
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

    useEffect(()=>{

        const getOneRecord = async() => {
    
        await axios.get(`http://localhost:8000/view/${id}`)
        .then((res)=>{
            setfullName(res.data.employeerecord.fullName);
            setdateOfBirth(res.data.employeerecord.dateOfBirth);
            setgender(res.data.employeerecord.gender);
            setcontactNumber(res.data.employeerecord.contactNumber);  
            setcontactEmail(res.data.employeerecord.contactEmail);  
            setaddress(res.data.employeerecord.address);
            setjobTitle(res.data.employeerecord.jobTitle);
            setdepartment(res.data.employeerecord.department);
            setcontactNumber(res.data.employeerecord.contactNumber);  
            setstartDate(res.data.employeerecord.startDate);  

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

            const confirmed = window.confirm("Are you sure you want to Update this items..?");
            if(confirmed){

            let updateRecord = {
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
    <h1>Edit Record</h1>
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
                  <label style={{marginBottom:'5px'}}>dateOfBirth</label>
                  <input type="date"
                  className="form-control"
                  name="dateOfBirth"
                  placeholder="Enter DOB"
                  onChange={(e) => setdateOfBirth(e.target.value)}
                  value={dateOfBirth}/>

  
              </div>
  
              <div className="form-group" style={{marginBottom:'15px'}}>
                  <label style={{marginBottom:'5px'}}>gender</label>
                  <input type="text"
                  className="form-control"
                  name="gender"
                  placeholder="Enter Gender"
                  onChange={(e) => setgender(e.target.value)}
                  value={gender}/>

  
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
                  <label style={{marginBottom:'5px'}}>jobTitle</label>
                  <input type="text"
                  className="form-control"
                  name="jobTitle"
                  placeholder="Enter jobTitle"
                  onChange={(e) =>  setjobTitle(e.target.value)}
                  value={jobTitle}/>

  
              </div>

              <div className="form-group" style={{marginBottom:'15px'}}>
                  <label style={{marginBottom:'5px'}}>department</label>
                  <input type="text"
                  className="form-control"
                  name="department"
                  placeholder="Enter department"
                  onChange={(e) => setdepartment(e.target.value)}
                  value={department}/>

  
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
}

export default EditEmployee