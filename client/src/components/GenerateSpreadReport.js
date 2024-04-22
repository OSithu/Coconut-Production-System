import axios from "axios";
import React, { useEffect, useState , useRef } from "react";
import "./../stylesheets/disease.css"

//npm install react-to-print
import { useReactToPrint } from "react-to-print";
import { BsSearch } from 'react-icons/bs';


const ViewSpread = () => {

  const conponentPDF= useRef();
  
  const [allRecords, setAllRecord] = useState([]);
  const [searchRecord, setSearchRecord] = useState('');


  useEffect(() => {
    const getAllRecords = async () => {
      await axios
        .get(`http://localhost:8000/records`)
        .then((res) => {
          setAllRecord(res.data.existingRecords);
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

    getAllRecords();
  }, []);


//Implement PDF Download Function

const generatePDF = useReactToPrint({

    content: ()=>conponentPDF.current,
    documentTitle:"UserData",
    onAfterPrint:()=>alert("Data Saved In PDF")

});



  //Implementing handleDelete Function

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this items..?"
    );
    if (confirmed) {
      await axios
        .delete(`http://localhost:8000/diseasespread/delete/${id}`)
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
      const filteredRecord = allRecords.filter(records =>
        records.treeID.toLowerCase().includes(searchRecord.toLowerCase())
      );

  return (
    <div>
      <h1 className='plantTopic'>Generate Report</h1>

      <div className="container">
        <div style={{ marginTop: "20px" }}>
          <div ref={conponentPDF} style={{width:"100%"}}>
          <table className="table" id='plantTable'>
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Tree ID</th>
                <th scope="col">Identify Date</th>
                <th scope="col">Disease</th>
                <th scope="col">Spread Level</th>
                <th scope="col">Special Notes</th>
              </tr>
            </thead>

            <tbody>
            { filteredRecord.map((records, index) => (
                <tr>
                  <td scope="row">{index + 1}</td>
                  <td>{records.treeID}</td>
                  <td>{records.identifyDate}</td>
                  <td>{records.disease}</td>
                  <td className={`spread-level ${records.spreadLevel}`}>
                    {records.spreadLevel}
                  </td>
                  <td>{records.specialNote}</td>
       
                </tr>
              ))}
            </tbody>
          </table>
          </div>

          <div className="d-grid d-md-flex justify-content-md-end mb-3">
          <button className="btn btn-success" onClick={generatePDF}>PDF</button>  </div> 

          </div>

         
        </div>
      </div>

  );
};

export default ViewSpread;
