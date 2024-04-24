// import React, { Component } from 'react';
// import axios from 'axios';

// export default class viewFertilization extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       fertilization: []
//     };
//   }

//   componentDidMount() {
//     this.retrieveFertilizationRecords();
//   }

//   retrieveFertilizationRecords() {
//     axios.get("/fertilizationrec").then(res => {
//       if (res.data.success) {
//         this.setState({
//           fertilization: res.data.existingRecords
//         });
//       }
//     });
//   }

//   onDelete = (id) => {
//     axios.delete(`/fertilizationrec/delete/${id}`).then((res) => {
//       alert("Record Deleted Successfully");
//       this.retrieveFertilizationRecords();
//     })
//   }

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { BsSearch } from 'react-icons/bs';
import '../stylesheets/viewfertilization.css';

import {useReactToPrint} from "react-to-print";

const ViewFertilizationDetails = () => {
  const conponentPDF=useRef();
  const [allFertilization, setAllFertilization] = useState([]);
  const [searchFertilization, setSearchFertilization] = useState('');

  useEffect(() => {
    const getAllFertilization = async () => {
      await axios
        .get("http://localhost:8000/fertilizationrec")
        .then((res) => {
          setAllFertilization(res.data.existingRecords);
          console.log("Status: " + res.data.success);
          console.log(res.data.message);
        })
        .catch((err) => {
          if (err.response) {
            console.log(err.response.data.error);
          } else {
            console.log("Error occurred while processing your get request" + err.error);
          }
        });
    };

    getAllFertilization(); //call the function
  }, []);

  //implement pdf download function
  const generateReport = () => {
    const table = document.querySelector(".table");
    const content = table.outerHTML;
    const newWindow = window.open();
    newWindow.document.write(`
      <html>
        <head>
          <title> Fertilization Details </title>
          <style>
            img {
              height: 100px; 
              margin: 5px; 
            }
            .imgContainer {
              text-align: center;
            }
            h2 {
              text-align: center;
            }
            
            @media print {
              /* Hide buttons */
              button, a { display: none; }
              .action-col { display: none; }
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
          </style>
        </head>
        <body>
          <div class="reportHeader" >
            <div class="imgContainer">
              <img src="/images/logo.png" alt="Description of image">
            </div>
            <br/>
            <h2>Fertilization Details</h2>
            <hr />
          </div>
          ${content}
        </body>
      </html>
    `);
    newWindow.print();
    newWindow.close();
  };

  //implement the handleDelete function
  const handleDelete = async (id) => {

    try {
      const confirm = window.confirm('Are you sure you want to delete?');

      if (confirm) {
        await axios.delete(`http://localhost:8000/fertilizationrec/delete/${id}`)
          .then((res) => {
            alert(res.data.message);
            console.log(res.data.message);
            setAllFertilization(allFertilization.filter(fertilization => fertilization._id !== id));
          })
          .catch((err) => {
            if (err.response) {
              console.log(err.response.data.message);
            } else {
              console.log("Error occured while processing your axios delete"+err.message);
            }
          })
      } else {
        alert('Deletion Cancelled');
      }
    }
    catch (err) {
      console.log('HandleDelete function failed ! Error' + err.message);
    }
  }

    // Filter allFertilization based on searchFertilization
  const filteredFertilization = allFertilization.filter((fertilization) =>
    fertilization.TreeNo.toLowerCase().includes(searchFertilization.toLowerCase())||fertilization.TreeStage.toLowerCase().includes(searchFertilization.toLowerCase())||fertilization.FertilizationDate.toLowerCase().includes(searchFertilization.toLowerCase())
  );

  return (
    <div>
                  <div className="header">
        <div>
         
          <ul className="navbar">
          <div className="nav-left">
          <li>
              <a class="active" href="/fertilizationMain">
                Home
              </a>
            </li>
            <li>
              <a href="#">Fertilization Records</a>
            </li>
          </div>
            <div className="logo">
              <img src="./images/logo.png" className="image"></img>
            </div>
            <div className="nav-right">
            <li>
              <a href="#news">Fertilizers</a>
            </li>
            <li>
              <a href="#about">About</a>
            </li>
            </div>

          </ul>
        </div>
      </div>
      <br></br>
      <h1 className='plantTopic'>Fertilization Records</h1>
    <div className="f-container">
      
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by Tree No"
          value={searchFertilization}
          onChange={(e) => setSearchFertilization(e.target.value)}
        />
        <button className="btn btn-outline-secondary" type="button">
          <BsSearch />
        </button>
      </div>
      <button className="btn btn-success">
        <a
          href="/fertilizationsave"
          style={{ textDecoration: "none", color: "white" }}
        >
          Add Fertilization Record
        </a>
      </button>

      <div ref={conponentPDF} style={{width:"100%"}}>

      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
              <th scope="col" className="text-center">Tree No</th>
              <th scope="col" className="text-center">Tree Stage</th>
              <th scope="col" className="text-center">Date</th>
              <th scope="col" className="text-center">Urea(g)</th>
              <th scope="col" className="text-center">EppawalaRock<br></br>Phosphate(g)</th>
              <th scope="col" className="text-center">MuriateOf<br></br>Potasium(g)</th>
              <th scope="col" className="text-center">Dolamite(g)</th>
              <th className= "action-col" scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredFertilization.map((fertilization, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
               <td className="text-center">{fertilization.TreeNo}</td>
                <td className="text-center">{fertilization.TreeStage}</td>
                <td className="text-center">{new Date(fertilization.FertilizationDate).toLocaleDateString()}</td>
                <td className="text-center">{fertilization.UreaAmount}</td>
                <td className="text-center">{fertilization.EppawalaRockPhosphateAmount}</td>
                <td className="text-center">{fertilization.MuriateOfPotasiumAmount}</td>
                <td className="text-center">{fertilization.DolamiteAmount}</td>
            <td className= "action-col">
                <a className="btn btn-warning" href={`/fertilizationupdate/${fertilization._id}`}>
              <i className="fas fa-edit"></i>&nbsp;Update
            </a>
            &nbsp;
           <a className="btn btn-danger" href="#" onClick={() =>handleDelete(fertilization._id)}>
            <i className="fas fa-trash-alt"></i>&nbsp;Delete
           </a>

              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      <div className="d-grid d-md-flex justify-content-md-end mb-3">
      <button className="btn btn-success" onClick={ generateReport}>PDF</button>  </div>
    </div>
    </div>
    
    
  );
};

export default ViewFertilizationDetails;




