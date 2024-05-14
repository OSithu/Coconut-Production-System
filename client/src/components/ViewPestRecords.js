import axios from "axios";
import React, { useEffect, useState , useRef } from "react";
import "./../stylesheets/disease.css"

//npm install react-to-print
import { useReactToPrint } from "react-to-print";
import { BsSearch } from 'react-icons/bs';


const ViewPestRecords = () => {

  const conponentPDF= useRef();
  
  const [allPestRecords, setAllPestRecord] = useState([]);
  const [searchPestRecord, setSearchPestRecord] = useState('');


  useEffect(() => {
    const getAllPestRecords = async () => {
      await axios
        .get(`http://localhost:8000/pestrecords`)
        .then((res) => {
          setAllPestRecord(res.data.existingPestAddRecords);
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

    getAllPestRecords();
  }, []);

  //Remove Time in Identify Date Part
function formatDate(pestDate) {
  const date = new Date(pestDate);
  return date.toISOString().split('T')[0]; 
}


//Implement PDF Download Function

const generatePDF = useReactToPrint({

    content: ()=>conponentPDF.current,
    documentTitle:"Pest Records",
    onAfterPrint:()=>alert("Data Saved In PDF")

});



  //Implementing handleDelete Function

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this items..?"
    );
    if (confirmed) {
      await axios
        .delete(`http://localhost:8000/pestrecord/delete/${id}`)
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

      // Filter allPestRecords based on searchFertilization
      const filteredPestRecord = allPestRecords.filter(pestrecords =>
        pestrecords.treeID.toLowerCase().includes(searchPestRecord.toLowerCase())
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
              <a href="#home">
                Home
              </a>
            </li>
            <li>
              <a href="/viewDisease">Spread Records</a>
            </li>
            <li>
              <a class="active" href="/viewPestRecords">Pest Records</a>
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
      <h1 className='plantTopic'>Pest Records</h1>
      {/* search */}
     <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by Tree No"
          value={searchPestRecord}
          onChange={(e) => setSearchPestRecord(e.target.value)}
        />
        <button className="btn btn-outline-secondary" type="button">
          <BsSearch />
        </button>
      </div>
      <div className="container">
        <button className="btn btn-success">
          <a
            href="/createPestRecords"
            style={{ textDecoration: "none", color: "white" }}
          >
            Add New Records
          </a>
        </button>

        <div style={{ marginTop: "20px" }}>
          <div ref={conponentPDF} style={{width:"100%"}}>
          <table className="table" id='plantTable'>
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Tree ID</th>
                <th scope="col">Pest Add Date</th>
                <th scope="col">Pest Name</th>
                <th scope="col">Pest Type</th>
                <th scope="col">Quantity</th>
                <th scope="col">Action</th>
              </tr>
            </thead>

            <tbody>
            { filteredPestRecord.map((pestrecords, index) => (
                <tr>
                  <td scope="row">{index + 1}</td>
                  <td>{pestrecords.treeID}</td>
                  <td>{formatDate(pestrecords.pestDate)}</td>
                  <td>{pestrecords.pestName}</td>
                  <td>{pestrecords.pestType}</td>
                  <td>{pestrecords.quantity + " " + getUnit(pestrecords.pestType)}</td>                 
                   <td>
                    <a
                      className="btn btn-warning"
                      href={`/editDisease/${pestrecords._id}`}
                    >
                      <i className="fas fa-edit"></i>&nbsp;Edit
                    </a>
                    &nbsp;
                    <a
                      className="btn btn-danger"
                      href="#"
                      onClick={() => handleDelete(pestrecords._id)}
                    >
                      <i className="fas fa-trash-alt"></i>&nbsp;Delete
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>

          <div className="d-grid d-md-flex justify-content-md-end mb-3">
          <button className="btn btn-success">
          <a
            href="/pestReport"
            style={{ textDecoration: "none", color: "white" }}
          >
            <i class="fa-regular fa-file-pdf"></i>&nbsp; Generate PDF
          </a>
        </button>  </div> 

          </div>

         
        </div>
      </div>

  );
};

export default ViewPestRecords;
