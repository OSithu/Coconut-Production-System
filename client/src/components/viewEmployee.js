// import React, { Component, useState, useEffect } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';

// const ViewEmployee = () => {
//   const [allEmployee, setAllEmployee] = useState([]);

//   useEffect(() => {
//     const getAllEmployee = async () => {
//       try {
//         const res = await axios.get('http://localhost:8000/view');
//         setAllEmployee(res.data.existingRecords);
//         console.log('success', res.data.success);
//       } catch (err) {
//         if (err.response) {
//           console.log(err.response.data.message);
//         } else {
//           console.log("Error occurred while processing your axios get request", err.message);
//         }
//       }
//     };
    
//     getAllEmployee();
//   }, []);

//   return null; // This component doesn't render anything directly
// };

// class App extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       Records: []
//     };
//   }

//   componentDidMount() {
//     this.retrieveRecords();
//   }



//   render() {
//     return (
//       <div>
//         <p>Employee Details</p>
//         <table className="table">
//           <thead>
//             <tr>
              // <th scope="col">#</th>
              // <th scope="col">fullName</th>
              // <th scope="col">dateOfBirth</th>
              // <th scope="col">gender</th>
              // <th scope="col">contactNumber</th>
              // <th scope="col">contactEmail</th>
              // <th scope="col">address</th>
              // <th scope="col">jobTitle</th>
              // <th scope="col">department</th>
              // <th scope="col">startDate</th>
              // <th scope="col">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {this.state.Records.map((Records, index) => (
//               <tr key={index}>
                // <th scope="row">{index + 1}</th>
                // <td>{Records.fullName}</td>
                // <td>{Records.dateOfBirth}</td>
                // <td>{Records.gender}</td>
                // <td>{Records.contactNumber}</td>
                // <td>{Records.contactEmail}</td>
                // <td>{Records.address}</td>
                // <td>{Records.jobTitle}</td>
                // <td>{Records.department}</td>
                // <td>{Records.startDate}</td>
//                 <td>
//                   <a className="btn btn-warning" href="/editEmp">
//                     <i className="fas fa-edit"></i>&nbsp;Edit
//                   </a>
//                   &nbsp;
//                   <a className="btn btn-danger" href="#">
//                     <i className="far fa-trash-alt"></i>&nbsp;Delete
//                   </a>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         <button className="btn btn-success">
//           <Link to="/addEmp" style={{ textDecoration: "none", color: "white" }}>
//             Add Employee
//           </Link>
//         </button>
//       </div>
//     );
  
// }

// export default App;

import axios from "axios";
import React, { useEffect, useState } from "react";

const ViewEmployee = () => {

  const[ allEmployee, setAllEmployee ] = useState([]);

  useEffect(()=>{

    const getAllEmployee = async() => {

    await axios.get(`http://localhost:8000/view`)
    .then((res)=>{
      setAllEmployee(res.data.existingRecords);
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

    getAllEmployee();

  },[])

  //Implementing handleDelete Function

  const handleDelete =async(id) => {

    const confirmed = window.confirm("Are you sure you want to delete this items..?");
    if(confirmed){

      await axios.delete(`http://localhost:8000/employee/delete/${id}`)
      .then((res)=>{
        alert(res.data.message);
        console.log(res.data.message);
      })
      .catch((err)=>{
  
        if(err.response){
          console.log(err.response.data.error);
      }else{
        console.log("Error Occured While Processing Your Axios Delete Request. "+err.error);
      }
  
      })
  

    }else{
      alert('Delete cancelled!')
    }


  }

  return(
    <div>
    <p>All Records</p>
    <table class="table">
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
  {allEmployee.map((records,index)=>(
          <tr>
              <th scope="row">{index + 1}</th>
                <td>{records.fullName}</td>
                <td>{records.dateOfBirth}</td>
                <td>{records.gender}</td>
                <td>{records.contactNumber}</td>
                <td>{records.contactEmail}</td>
                <td>{records.address}</td>
                <td>{records.jobTitle}</td>
                <td>{records.department}</td>
                <td>{records.startDate}</td>
            <td>
              <a className="btn btn-warning" href={`/editEmp/${records._id}`}>
                  <i className="fas fa-edit"></i>&nbsp;Edit
              </a>
                &nbsp;
              <a className="btn btn-danger" href="#" onClick={()=>handleDelete(records._id)} >
                  <i className="fas fa-trash-alt"></i>&nbsp;Delete
              </a>  
            </td>
          </tr>


  ))}
</tbody>

    </table>
    <button className="btn btn-success"><a href="/addEmp" style={{textDecoration:'none',color:'white'}}>Add New Records</a></button>
  </div>
  )

}

export default ViewEmployee;