import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import "./../stylesheets/disease.css";

//npm install react-to-print
import { useReactToPrint } from "react-to-print";

const ViewSpread = () => {
  const conponentPDF = useRef();

  const [allRecords, setAllRecord] = useState([]);

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
    content: () => conponentPDF.current,
    documentTitle: "Spread Records",
    onAfterPrint: () => alert("Data Saved In PDF"),
  });

  return (
    <div>
     

      <div className="card" ref={conponentPDF} style={{ width: "100%" }}>
      <div className="reportlogo">
              <img src="./images/logo.png" className="imageReport"></img>
              <br></br>
              <h1 className="plantTopic">Jayakody Koppara Stores</h1>
              <br></br>
              <h2 className="plantTopic">Disease Spread Records</h2>
            </div>
  <div className="card-body">
    <div className="container" >
      <div style={{ marginTop: "20px" }}>
        <div>
          <table className="table" id="plantTable">
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
              {allRecords.map((records, index) => (
                <tr key={index}>
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

export default ViewSpread;
