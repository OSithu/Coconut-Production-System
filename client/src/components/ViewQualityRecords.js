import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';

import { useReactToPrint } from "react-to-print"

const ViewQualityRecords = () => {
  const componentPDF = useRef();


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

  const generatePDF = useReactToPrint({
    content: () => componentPDF.current,
    documentTitle: "",
    onAfterPrint: () => alert("Data saved in PDF")
  });

  const handleDelete = async (id) => {

    try {
      const confirmed = window.confirm('Are you sure you want to delete this record?');
      if (confirmed) {
        await axios.delete(`http://localhost:8000/qualityrecords/delete/${id}`)
          .then((res) => {
            alert(res.data.message);
            console.log(res.data.message);
          })
          .catch((err) => {
            if (err.response) {
              console.log(err.response.data.message);
            } else {
              console.log("Error occured while processing your axios delete");
            }
          });
      } else {
        alert('Delete cancelled!');
      }
    } catch (err) {
      console.log('handleDelete function failed! ERROR' + err.message)
    }
  }

  return (
    <div className="container">
      <div>
        <h1>Quality Control Records</h1>

        <button className="btn btn-success">
          <a href="/addQualityRecord" style={{ textDecoration: 'none', color: 'white' }}>Add New Record</a>
        </button>

        <div style={{ marginTop: "20px" }}>
          <div ref={componentPDF} style={{ width: "100%" }}>

        <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">RecordID</th>
                <th scope="col">ProductType</th>
                <th scope="col">QualityCheckedDate</th>
                <th scope="col">SpecialNotes</th>
                <th scope="col">TestResult</th>
                <th scope="col">Action</th>
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
                  <td>

                    <div>
                      <a className="btn btn-secondary" href={`/viewQRecord/${records._id}`}>
                        <i className="fas fa-eye"></i>&nbsp;View Record
                      </a>
                    </div>
                    <div>
                      <a className="btn btn-warning" href={`/editQualityRecord/${records._id}`}>
                        <i className="fas fa-edit"></i>&nbsp;Update
                      </a>
                      &nbsp;
                      <a className="btn btn-danger" href="#" onClick={() => handleDelete(records._id)}>
                        <i className="fas fa-trash-alt"></i>&nbsp;Delete
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
          <div className="d-grid d-md-flex justify-content-md-end mb-3">
            <button className="btn btn-success" onClick={generatePDF}>PDF</button>
          </div>
        </div>
      </div>


    </div>
  )
};
export default ViewQualityRecords;
