import axios from "axios";
import React, { useEffect, useState , useRef } from "react";
import "./../stylesheets/disease.css"

//npm install react-to-print
import { useReactToPrint } from "react-to-print";
import { BsSearch } from 'react-icons/bs';


const ViewSpread = () => {

  const conponentPDF= useRef();
  
  const [allDiseases, setAllDisease] = useState([]);
  const [searchDisease, setSearchDisease] = useState('');


  useEffect(() => {
    const getAllDiseases = async () => {
      await axios
        .get(`http://localhost:8000/diseases`)
        .then((res) => {
          setAllDisease(res.data.existingDiseases);
          console.log("Status: " + res.data.success);
        })
        .catch((err) => {
          if (err.response) {
            console.log(err.response.data.error);
          } else {
            console.log(
              "Error Occured While Processing Your Axios Get Request. " +
                err.error
            );
          }
        });
    };

    getAllDiseases();
  }, []);


//Implement PDF Download Function

const generatePDF = useReactToPrint({

    content: ()=>conponentPDF.current,
    documentTitle:"Disease Report",
    onAfterPrint:()=>alert("Data Saved In PDF")

});



  //Implementing handleDelete Function

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this Disease..?"
    );
    if (confirmed) {
      await axios
        .delete(`http://localhost:8000/disease/delete/${id}`)
        .then((res) => {
          alert(res.data.message);
          console.log(res.data.message);
        })
        .catch((err) => {
          if (err.response) {
            console.log(err.response.data.error);
          } else {
            console.log(
              "Error Occured While Processing Your Axios Delete Request. " +
                err.error
            );
          }
        });
    } else {
      alert("Delete cancelled!");
    }
  };

      // Filter allRecords based on searchFertilization
      const filteredDisease = allDiseases.filter(disease =>
        disease.diseaseName.toLowerCase().includes(searchDisease.toLowerCase())
      );


  return (
    <div>
            <div className="header">
        <div>
         
          <ul className="navbar">
          <div className="nav-left">
          <li>
              <a class="active" href="#home">
                Home
              </a>
            </li>
            <li>
              <a href="/viewDisease">Spread Records</a>
            </li>
            <li>
              <a href="/viewPestRecords">Pest Records</a>
            </li>
           
          </div>
            <div className="logo">
              <img src="./images/logo.png" className="image"></img>
            </div>
            <div className="nav-right">
            <li>
            <a href="/displayDiseases">Diseases</a>
            </li>
            <li>
            <a href="/displayPesticides">Pesticides</a>
            </li>
            <li>
         
              <a href="#contact">Pest Finder</a>
            </li>
            </div>

          </ul>
        </div>
      </div>
      <br></br>
      <h1 className='plantTopic'>Diseases Details</h1>
      {/* search */}
     <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by Tree No"
          value={searchDisease}
          onChange={(e) => setSearchDisease(e.target.value)}
        />
        <button className="btn btn-outline-secondary" type="button">
          <BsSearch />
        </button>
      </div>
      <div className="container">
        <button className="btn btn-success">
          <a
            href="/addDisease" 
            style={{ textDecoration: "none", color: "white" }}
          >
            Add New Disease
          </a>
        </button>

        <div style={{ marginTop: "20px" }}>
          
          <table className="table" id='plantTable'>
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Disease Name</th>
                <th scope="col">Disease Type</th>
                <th scope="col">Symptoms</th>
                <th scope="col">Preventive Measures</th>
                <th scope="col">Stages</th>
                <th scope="col">Special Notes</th>
                <th scope="col">Action</th>
              </tr>
            </thead>

            <tbody>
            { filteredDisease.map((disease, index) => (
                <tr>
                  <td scope="row">{index + 1}</td>
                  <td>{disease.diseaseName}</td>
                  <td>{disease.diseaseType}</td>
                  <td>{disease.symptoms}</td>
                  <td>{disease.preventiveMeasures}</td>
                  <td className={`stage-level ${disease.stages}`}>
                    {disease.stages}</td>
                  <td>{disease.specialnotes}</td>
                  <td>
                    <a
                      className="btn btn-warning"
                      href={`/updateDiseases/${disease._id}`}  /*pathhh*/
                    >
                      <i className="fas fa-edit"></i>&nbsp;Edit
                    </a>
                    &nbsp;
                    <a
                      className="btn btn-danger"
                      href="#"
                      onClick={() => handleDelete(disease._id)}
                    >
                      <i className="fas fa-trash-alt"></i>&nbsp;Delete
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        

          <div className="d-grid d-md-flex justify-content-md-end mb-3">
          <button className="btn btn-success">
          <a
            href="/spreadReport" /*pathhh*/
            style={{ textDecoration: "none", color: "white" }}
          >
            <i class="fa-regular fa-file-pdf"></i>&nbsp; Generate Report
          </a>
        </button>  </div> 

          </div>

         
        </div>
      </div>

  );
};

export default ViewSpread;
