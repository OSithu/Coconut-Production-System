// import React,{ useEffect,useState } from "react";
// import axios from 'axios';
// import {Link} from 'react-router-dom'
// import FinanceNv from './FinanceNv'

// const ViewBudgetDetails = () => {

//   const [allDetails, setAllDetails] = useState([]);

//   useEffect(() => {

//     const getDetails = async () =>{

//       await axios.get(`http://localhost:8000/budgetRecords`)
//       .then((res) => {
//         setAllDetails(res.data.existingbudget);
//         console.log('Status:' +res.data.success);
//       })
//       .catch((err) =>{
//         if(err.reponese){
//           console.log(err.response.data.error)
//         }
//       })
//     }

//     getDetails();
// },[])

// const handleDelete = async (id) =>{

//   try{
//     const confirm = window.confirm('Are you sure you want to delete?');

//     if(confirm){
//       await axios.delete(`http://localhost:3000/budgetRecords/delete/${id}`)
//       .then((res) =>{
//         alert(res.data.message);
//         console.log(res.data.message);
//         setAllDetails(allDetails.filter(finance => finance._id != id));
//       })
//       .catch((err) =>{
//         if(err.responce){
//           console.log(err.responce.data.message);
//         }else{
//           console.log("Error occur while processing your axios delete");
//         }
//       })
//     }else{
//       alert('Deletion Cancel');
//     }
//     }
//     catch(err){
//       console.log('HandleDelete function failed! error'+ err.message);
//     }
//   }


// return (
//   <div>
//     <FinanceNv/>
//         <p>Budget Details</p>
//         <table className="table">
//          <thead>
//           <tr>
//              {/* <th scope="col">#</th> */}
//              <th scope="col">Month</th>
//              <th scope="col">Total Income</th>
//             <th scope="col">Total Expences</th>
//            <th scope="col">Profit/Loss</th>
//           </tr>
//         </thead>
//          <tbody>
//            {allDetails.map(budget => (
//             <tr key={budget._id}>
//               <td>{budget.month}</td>
//               <td>{budget.totalIncome}</td>
//               <td>{budget.totalExpences}</td>
//               <td>{budget.profitLoss}</td>
             
//               <td>
//                <Link to={`/editbudgetDetails/${budget._id}`}>
//                 <button type="button" className = "btn btn-warining">
//                   <i className = 'fas fa-edit'></i>&nbsp; Edit
//                 </button>
//                </Link>
//                 &nbsp;
//               <button type="button" className='btn btn-danger' onClick={()=> handleDelete(budget._id)}>
//               <i className="far fa-trash-alt"></i>&nbsp;Delete
//               </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//        </table>
//        <button className="btn btn-success"><a href="/AddBudgetDetails" style={{textDecoration:'none', color:'white'}}>Create New Post</a></button>
//       </div>

// )



// }

// export default ViewBudgetDetails;

import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import FinanceNv from './FinanceNv';
import { BsSearch } from 'react-icons/bs';

import "../stylesheets/viewBudgetDetails.css";

const ViewBudgetDetails = () => {
  const [allDetails, setAllDetails] = useState([]);
  const [searchBudget, setSearchBudget] = useState('');


  useEffect(() => {
    const getDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/budgetRecords`);
        setAllDetails(res.data.existingbudget);
        console.log('Status:', res.data.success);
      } catch (err) {
        console.error('Error fetching budget records:', err);
      }
    }
    getDetails();
  }, []);

  const handleDelete = async (id) => {
    try {
      const confirm = window.confirm('Are you sure you want to delete?');
      if (confirm) {
        await axios.delete(`http://localhost:3000/budgetRecords/delete/${id}`);
        setAllDetails(allDetails.filter(budget => budget._id !== id));
      }
    } catch (err) {
      console.error('Error deleting budget record:', err);
    }
  }
  

   //filter allCustomers based on searchCustomer
const filteredBudget = allDetails.filter(budget =>
  budget.month.toLowerCase().includes(searchBudget.toLowerCase())
  );

  const generateBudgetPDF = () => {
    const table = document.querySelector('.budget-table');
    const content = table.outerHTML;
    const newWindow = window.open();
    newWindow.document.write(`
    <html>
    <head>
      <title>Budget Details</title>
      <style>
        /* Add your print styles here */
        @media print {
          /* Hide buttons */
          button { display: none; }
          /* Apply table styles */

          table {
            width: 100%;
            border-collapse: collapse;
          }
          th, td {

          .budget-table {
            width: 100%;
            border-collapse: collapse;
          }
          .budget-table th, .budget-table td {

            border: 1px solid #000;
            padding: 8px;
            text-align: left;
          }
          th {
            background-color: #f2f2f2;
          }
        }
        .imgContainer img {
          max-width: 200px; 
          max-height: 100px; 
        }
        .reportHeader {
          text-align: center;
        }
        
        .imgContainer {
          margin: 0 auto; /* Center the image horizontally */
          display: inline-block; /* Ensure the container does not take up full width */
        }
      </style>
    </head>
    <body><div class="reportHeader" >
    <div class="imgContainer">
      <img src="/images/logo.png">
    </div>
    <br/>
    <h2>Monthly Budget Details</h2>
    <hr />
  </div>
          .budget-table th {
            background-color: #f2f2f2;
          }
        }
      </style>
    </head>
      ${content}
    </body>
  </html>
    `);
    newWindow.print();
    newWindow.close();
  };

  return (
    <div className="view-budget-details"> 
      <FinanceNv />
      <p className="budget-title">Budget Details</p>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by month"
          value={searchBudget}
          onChange={(e) => setSearchBudget(e.target.value)}
          />
          <button className="btn btn-outline-secondary" type="button">
            <BsSearch/>
          </button>
      </div>
      <button className="btn btn-success">
        <Link to="/AddBudgetDetails" style={{ textDecoration: 'none', color: 'white' }}>Create New Post</Link>
      </button>

      <div className="print-header" style={{ display: "none" }}>
            <img src="/images/logo.png" className='imageReport2' />
            <h1> Jayakody Koppara Stores </h1>
            <hr />
          </div>
      <table className="budget-table">

      <table className="table budget-table">

        <thead>
          <tr>
            <th>Month</th>
            <th>Total Income</th>
            <th>Total Expenses</th>
            <th>Total Amount</th>
            <th>Profit/Loss</th>
          </tr>
        </thead>
        <tbody>
          {allDetails.map(budget => (
            <tr key={budget._id}>
              <td>{budget.month}</td>
              <td>Rs.{String(budget.totalIncome)}</td> {/* Prepend "Rs" */}
              <td>Rs.{String(budget.totalExpences)}</td> {/* Prepend "Rs" */}
              <td>Rs.{String(budget.totalAAmount)}</td>
              <td>{budget.profitLoss}</td>
              <td>
                <Link to={`/editbudgetDetails/${budget._id}`}>
                  <button type="button" className="btn btn-warning">
                    <i className="fas fa-edit"></i>&nbsp; Edit
                  </button>
                </Link>
                &nbsp;
                <button type="button" className="btn btn-danger" onClick={() => handleDelete(budget._id)}>
                  <i className="far fa-trash-alt"></i>&nbsp;Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* <button className="btn btn-success">
        <Link to="/AddBudgetDetails" style={{ textDecoration: 'none', color: 'white' }}>Create New Post</Link>
      </button> */}
      <button className="btn btn-success" onClick={generateBudgetPDF}>Print PDF</button>
    </div>
  );
}

export default ViewBudgetDetails;
