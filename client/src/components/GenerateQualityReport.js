import axios from "axios";
import React, { useEffect, useState , useRef } from "react";
import "./../stylesheets/disease.css"

//npm install react-to-print
import { useReactToPrint } from "react-to-print";

const GenerateQrecords = () => {

  const conponentPDF= useRef();
  const [allRecords, setAllRecords] = useState([]);


  useEffect(() => {

    const getAllRecords = async () => {

      await axios.get('http://localhost:8000/qualityrecords')
        .then((res) => {
          setAllRecords(res.data.existingQualityRecords);
          console.log('Status: ' + res.data.success);
          console.log(res.data.message);
        })
        .catch((err) => {
          if (err.response) {
            console.log(err.response.data.error);
          } else {
            console.log("Error occurred while processing your axios get request." + err.message);
          }
        });
    };

    getAllRecords();
  }, []);


//Implement PDF Download Function
const generatePDF = useReactToPrint({

    content: ()=>conponentPDF.current,
    documentTitle:"Quality Records",
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
              <h2 className="plantTopic">Quality Records</h2>
            </div>
  <div className="card-body">
    <div className="container" >
    <div style={{ marginTop: "20px" }}>
        
    <table className="table quality-records-table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">RecordID</th>
                  <th scope="col">ProductType</th>
                  <th scope="col">QualityCheckedDate</th>
                  <th scope="col">SpecialNotes</th>
                  <th scope="col">TestResult</th>
                </tr>
              </thead>

              <tbody>
                {allRecords.map((records, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{records.recordId}</td>
                    <td>{records.productType}</td>
                    <td>{records.qualityCheckedDate}</td>
                    <td>{records.specialNotes}</td>
                    <td>{records.testResult}</td>

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

export default GenerateQrecords;
