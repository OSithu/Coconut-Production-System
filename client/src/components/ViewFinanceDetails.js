// import React,{ useEffect, useState , useRef} from "react";
// import axios from 'axios';
// import {Link} from 'react-router-dom'
// import FinanceNv from "./FinanceNv";

// import { useReactToPrint } from "react-to-print";

// import "../stylesheets/viewFinanceDetails.css";
// import "../stylesheets/printFinance.css";

// const ViewFianceDetails = () => {

//   const componentPDF = useRef();

//   const [allDetails, setAllDetails] = useState([]);

//   useEffect(() => {

//     const getDetails = async () =>{

//       await axios.get(`http://localhost:8000/financeRecords`)
//       .then((res) => {
//         setAllDetails(res.data.existingfinance);
//         console.log('Status:' +res.data.success);
//       })
//       .catch((err) =>{
//         if(err.reponese){
//           console.log(err.response.data.error)
//         }
//       })
//     }

//     getDetails();
// },[]);

// const handleDelete = async (id) =>{

//   try{
//     const confirm = window.confirm('Are you sure you want to delete?');

//     if(confirm){
//       await axios.delete(`http://localhost:3000/financeRecords/delete/${id}`)
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

//   const currentDate =new Date().toLocaleDateString();

//   //Implement PDF download function

// const generatePDF = useReactToPrint({
//   content:() =>componentPDF.current,
//   documentTitle:"Financial_Report",
//   onAfterPrint: ()=>alert("Data Saved in PDF")

// });

// return (
//   <div>
//     <div className="view-finance-details">
//       <div className="print-header" style={{display:"none"}}>
//         <h1>Jayakody Koppara Stores</h1>
//         <hr/>
//       </div>
//     <FinanceNv/>
//         <p>All Financial Transactions</p>
//         <div ref={componentPDF} style={{width:"100%"}}></div>
//         <table className="table">
//          <thead>
//           <tr>
//              {/* <th scope="col">#</th> */}
//              <th scope="col">Date</th>
//              <th scope="col">Type</th>
//             <th scope="col">Description</th>
//            <th scope="col">Income</th>
//             <th scope="col">Expenses</th>
//                          <th scope="col">TotalAmount</th>
//           </tr>
//         </thead>
//          <tbody>
//            {allDetails.map(finance => (
//             <tr>
//               <td>{finance.date}</td>
//               <td>{finance.type}</td>
//               <td>{finance.Description}</td>
//               <td>{finance.Income}</td>
//               <td>{finance.Expenses}</td>
//               <td>{finance.totalAmount}</td>
//               <td>
//                <Link to={`/editFinanceDetails/${finance._id}`}>
//                 <button type="button" className = "btn btn-warining">
//                   <i className = 'fas fa-edit'></i>&nbsp; Edit
//                 </button>
//                </Link>
//                 &nbsp;
//               <button type="button" className='btn btn-danger' onClick={()=> handleDelete(finance._id)}>
//               <i className="far fa-trash-alt"></i>&nbsp;Delete
//               </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//        </table>
//        <div className="print-footer">
//         <hr/>
//         <p>Report Generated on {currentDate}</p>
//        </div>
      
//        <button className="btn btn-success"><a href="/createFinanceDetails" style={{textDecoration:'none', color:'white'}}>Create New Post</a></button>
//        <div className="d-grid d-md-flex justify-content-md-end mb-3">
//         <button className="btn btn-success" onClick={ generatePDF}>PDF</button>  </div>
//       </div>
//       </div>
      

// )



// }

// export default ViewFianceDetails;

import React, { useEffect, useState, useRef } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import FinanceNv from "./FinanceNv";
import { BsSearch } from 'react-icons/bs';

import { useReactToPrint } from "react-to-print";

import "../stylesheets/viewFinanceDetails.css";
import "../stylesheets/printFinance.css";

const ViewFianceDetails = () => {
  const componentPDF = useRef();
  const [allDetails, setAllDetails] = useState([]);
  const [searchFinance, setSearchFinance] = useState('');

  useEffect(() => {
    const getDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/financeRecords`);
        setAllDetails(res.data.existingfinance);
        console.log('Status:', res.data.success);
      } catch (err) {
        console.error('Error fetching finance records:', err);
      }
    }
    getDetails();
  }, []);

  const handleDelete = async (id) => {
    try {
      const confirm = window.confirm('Are you sure you want to delete?');
      if (confirm) {
        await axios.delete(`http://localhost:3000/financeRecords/delete/${id}`);
        setAllDetails(allDetails.filter(finance => finance._id !== id));
      }
    } catch (err) {
      console.error('Error deleting finance record:', err);
    }
  }

  //filter allCustomers based on searchCustomer
const filteredFinance = allDetails.filter(finance =>
  finance.type.toLowerCase().includes(searchFinance.toLowerCase())
  );

  const currentDate = new Date().toLocaleDateString();

  // const generatePDF = useReactToPrint({
  //   content: () => componentPDF.current,
  //   documentTitle: "Financial_Report",
  //   onAfterPrint: () => alert("Data Saved in PDF")
  // });

  const generatePDF = () => {
    const table = document.querySelector('.finance-table');
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
    <h2>Finance Details</h2>
    <hr />
  </div>

      ${content}
    </body>
  </html>
    `);
    newWindow.print();
    newWindow.close();
  };



  return (
    <div className="view-finance-details">
      <FinanceNv />
      <p className="finance-title">All Financial Transactions</p>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by type"
          value={searchFinance}
          onChange={(e) => setSearchFinance(e.target.value)}
          />
          <button className="btn btn-outline-secondary" type="button">
            <BsSearch/>
          </button>
      </div>
      <button className="btn btn-success"><a href="/createFinanceDetails" style={{textDecoration:'none', color:'white'}}>Create New Post</a></button>
      <div ref={componentPDF}>
      <div className="print-header" style={{ display: "none" }}>
            <img src="/images/logo.png" className='imageReport2' />
            <h1> Jayakody Koppara Stores </h1>
            <hr />
          </div>
        <table className="finance-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Type</th>
              <th>Description</th>
              <th>Income</th>
              <th>Expenses</th>
              <th>TotalAmount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredFinance.map((finance,index)=> (
              <tr key={index}>
                <td>{finance.date}</td>
                <td>{finance.type}</td>
                <td>{finance.Description}</td>
                <td>Rs.{String(finance.Income)}</td>
                <td>Rs.{String(finance.Expenses)}</td>
                <td>Rs.{String(finance.totalAmount)}</td>
                <td>
                  <Link to={`/editFinanceDetails/${finance._id}`}>
                    <button type="button" className="btn btn-warning">
                      <i className="fas fa-edit"></i>&nbsp; Edit
                    </button>
                  </Link>
                  &nbsp;
                  <button type="button" className="btn btn-danger" onClick={() => handleDelete(finance._id)}>
                    <i className="far fa-trash-alt"></i>&nbsp;Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* <div className="print-footer">
        <hr />
        <p>Report Generated on {currentDate}</p>
      </div> */}
      {/* <button className="btn btn-success"><a href="/createFinanceDetails" style={{textDecoration:'none', color:'white'}}>Create New Post</a></button> */}
      <button className="btn btn-success" onClick={generatePDF}>PDF</button>
    </div>
  );
}

export default ViewFianceDetails;

