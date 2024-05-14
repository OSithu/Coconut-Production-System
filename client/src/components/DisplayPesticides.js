import axios from "axios";
import React, { useEffect, useState , useRef } from "react";
import "./../stylesheets/disease.css"

//npm install react-to-print
import { useReactToPrint } from "react-to-print";
import { BsSearch } from 'react-icons/bs';


const DisplayPesticides = () => {

  const conponentPDF= useRef();
  
  const [allPesticides, setAllPesticide] = useState([]);
  const [searchPesticide, setSearchPesticide] = useState('');


  useEffect(() => {
    const getAllPesticides = async () => {
      await axios
        .get(`http://localhost:8000/pestcides`)
        .then((res) => {
          setAllPesticide(res.data.existingPestcides);
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

    getAllPesticides();
  }, []);


//Implement PDF Download Function

const generatePDF = useReactToPrint({

    content: ()=>conponentPDF.current,
    documentTitle:"Pesticides Report",
    onAfterPrint:()=>alert("Data Saved In PDF")

});



  //Implementing handleDelete Function

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this Pesticides..?"
    );
    if (confirmed) {
      await axios
        .delete(`http://localhost:8000/pestcide/delete/${id}`)
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
      const filteredPestcide = allPesticides.filter(pestcide =>
        pestcide.pestName.toLowerCase().includes(searchPesticide.toLowerCase())
      );

       // Add a unit to quantity 
  const getUnit = (pestType) => {
    return pestType === 'Liquid Formulations' ? 'ml' : 'g';
  };


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
            <a href="/pestfinder">Pest Finder</a>
            </li>
            </div>

          </ul>
        </div>
      </div>
      <br></br>
      <h1 className='plantTopic'>Pestcides Details</h1>
      {/* search */}
     <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by Tree No"
          value={searchPesticide}
          onChange={(e) => setSearchPesticide(e.target.value)}
        />
        <button className="btn btn-outline-secondary" type="button">
          <BsSearch />
        </button>
      </div>
      <div className="container">
        <button className="btn btn-success">
          <a
            href="/addPesticides" 
            style={{ textDecoration: "none", color: "white" }}
          >
            Add New Pestcide
          </a>
        </button>

        <div style={{ marginTop: "20px" }}>
          
          <table className="table" id='plantTable' >
            <thead>
              <tr>
                <th scope="col">#</th>  
                <th scope="col">Pestcide Name</th>
                <th scope="col">Disease Name</th>
                <th scope="col">Pestcide Type</th>
                <th scope="col">Quantity</th>
                <th scope="col">Method</th>
                <th scope="col">Guidelines</th>
                <th scope="col">Precautions</th>
                <th scope="col">Action</th>
              </tr>
            </thead>

            <tbody>
            { filteredPestcide.map((pestcide, index) => (
                <tr>
                  <td scope="row">{index + 1}</td>
                  <td>{pestcide.pestName}</td>
                  <td>{pestcide.disease}</td>
                  <td>{pestcide.pestType}</td>
                  <td>{pestcide.quantity + " " + getUnit(pestcide.pestType)}</td>                 
                  <td>{pestcide.method}</td>
                  <td>{pestcide.guidelines}</td>
                  <td>{pestcide.precautions}</td>
                  <td>
                    <a
                      className="btn btn-warning"
                      href={`/updatePesticides/${pestcide._id}`}  /*pathhh*/
                    >
                      <i className="fas fa-edit"></i>&nbsp;Edit
                    </a>
                    &nbsp;
                    <a
                      className="btn btn-danger"
                      href="#"
                      onClick={() => handleDelete(pestcide._id)}
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

export default DisplayPesticides;
