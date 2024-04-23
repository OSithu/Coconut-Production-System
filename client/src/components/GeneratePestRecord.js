import axios from "axios";
import React, { useEffect, useState , useRef } from "react";
import "./../stylesheets/disease.css"

//npm install react-to-print
import { useReactToPrint } from "react-to-print";



const ViewPestRecords = () => {

  const conponentPDF= useRef();
  
  const [allPestRecords, setAllPestRecord] = useState([]);


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


  return (
    <div>
     

      <div className="card" ref={conponentPDF} style={{ width: "100%" }}>
      <div className="reportlogo">
              <img src="./images/logo.png" className="imageReport"></img>
              <br></br>
              <h1 className="plantTopic">Jayakody Koppara Stores</h1>
              <br></br>
              <h2 className="plantTopic">Pest Add Records</h2>
            </div>
  <div className="card-body">
    <div className="container" >
    <div style={{ marginTop: "20px" }}>
        
          <table className="table" id='plantTable'>
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Tree ID</th>
                <th scope="col">Pest Add Date</th>
                <th scope="col">Pest Name</th>
                <th scope="col">Pest Type</th>
                <th scope="col">Quantity</th>
              </tr>
            </thead>

            <tbody>
            { allPestRecords.map((pestrecords, index) => (
                <tr>
                  <td scope="row">{index + 1}</td>
                  <td>{pestrecords.treeID}</td>
                  <td>{formatDate(pestrecords.pestDate)}</td>
                  <td>{pestrecords.pestName}</td>
                  <td>{pestrecords.pestType}</td>
                  <td>{pestrecords.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
    </div>
  </div>
</div>

<br></br>
      <div className="d-flex justify-content-center mb-3">
        <button className="btn btn-success" onClick={generatePDF}>
        <i class="fa fa-download"> </i> &nbsp; Download                       
        </button>
      </div>
    </div>
  );
};

export default ViewPestRecords;
