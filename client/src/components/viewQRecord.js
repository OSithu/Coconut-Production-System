import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
//import { useReactToPrint } from "react-to-print";


import "../stylesheets/qualityRecords.css";

const ViewQRecord = () => {
    const componentPDF = useRef();

    const [recordId, setRecordId] = useState("");
    const [productType, setProductType] = useState("");
    const [qualityCheckedDate, setQualityCheckedDate] = useState("")
    const [specialNotes, setSpecialNotes] = useState("");
    const [testResult, setTestResult] = useState("");

    const { id } = useParams();

    const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        const year = date.getFullYear();
        let month = (1 + date.getMonth()).toString().padStart(2, "0");
        let day = date.getDate().toString().padStart(2, "0");

        return `${year}-${month}-${day}`;
    };

    useEffect(() => {
        const getOneRecord = async () => {
            await axios.get(`http://localhost:8000/qualityrecords/${id}`)
                .then((res) => {
                    setRecordId(res.data.records.recordId);
                    setProductType(res.data.records.productType);
                    setQualityCheckedDate(formatDate(res.data.records.qualityCheckedDate));
                    setSpecialNotes(res.data.records.specialNotes);
                    setTestResult(res.data.records.testResult);

                    console.log(res.data.message);
                })
                .catch((err) => {
                    if (err.response) {
                        console.log(err.response.data.error);
                    } else {
                        console.log("Error occured while processing your get request");
                    }
                });
        }

        getOneRecord();
    }, [id]);

    // const generatePDF = useReactToPrint({
    //     content: () => componentPDF.current,
    //     documentTitle: "",
    //     onAfterPrint: () => alert("Data saved in PDF")
    // });

    const generatePDF = () => {
        const table = document.querySelector('.reportForm2');
        const content = table.outerHTML;
        const newWindow = window.open();
        newWindow.document.write(`
          <html>
            <head>
              <title> Record Details </title>
              <style>
                img {
                  height: 100px; 
                  margin: 5px; 
                }
                .imgContainer {
                  text-align: center;
                }
                h1 {
                  text-align: center;
                }
                
                @media print {
                  /* Hide buttons */
                  button,a { display: none; }
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
            <div className="print-header" style={{ display: "none" }}>
            <img src="/images/logo.png" className='imageReport2' />
            <h1> Jayakody Koppara Stores </h1>
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
        <div>

            <div className="col-md-8 mt-4 mx-auto quality-records-container">
                <h1 className="h3 mb-3 font-weight-normal">Record Details</h1>

                <div style={{ marginTop: "20px" }}>
                    <div ref={componentPDF} style={{ width: "100%" }}>

                        <div className="print-header" style={{ display: "none" }}>
                            <img src="/images/logo.png" className='imageReport2' />
                            <h1> Jayakody Koppara Stores </h1>
                            <hr />
                        </div>
                        <div className="reportForm2">
                            <form className="needs-validation" noValidate>

                                <div className="form-group" style={{ marginBottom: '15px' }}>
                                    <label style={{ marginBottom: '5px' }}>Record ID</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="recordId"
                                        // placeholder="Enter RecordID "
                                        onChange={(e) => setRecordId(e.target.value)}
                                        value={recordId}
                                        disabled
                                    />
                                </div>

                                <div className="form-group" style={{ marginBottom: '15px' }}>
                                    <label style={{ marginBottom: '5px' }}>Product Type</label>
                                    <input type="text"
                                        className="form-control"
                                        name="productType"
                                        //placeholder="Enter Product Type"
                                        onChange={(e) => setProductType(e.target.value)}
                                        value={productType}
                                        disabled
                                    />
                                </div>

                                <div className="form-group" style={{ marginBottom: '15px' }}>
                                    <label style={{ marginBottom: '5px' }}>Quality Checked Date</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        name="qualityCheckedDate"
                                        //placeholder="Enter Quality Checked Date"
                                        onChange={(e) => setQualityCheckedDate(e.target.value)}
                                        value={qualityCheckedDate}
                                        disabled
                                    />
                                </div>

                                <div className="form-group" style={{ marginBottom: '15px' }}>
                                    <label style={{ marginBottom: '5px' }}>Special Notes</label>
                                    <input type="text"
                                        className="form-control"
                                        name="specialNotes"
                                        //placeholder="Enter Special Notes"
                                        onChange={(e) => setSpecialNotes(e.target.value)}
                                        value={specialNotes}
                                        disabled
                                    />
                                </div>

                                <div className="form-group" style={{ marginBottom: '15px' }}>
                                    <label style={{ marginBottom: '5px' }}>Test Result</label>
                                    <input type="text"
                                        className="form-control"
                                        name="testResult"
                                        //placeholder="Enter Test Result"
                                        onChange={(e) => setTestResult(e.target.value)}
                                        value={testResult}
                                        disabled
                                    />
                                </div>
                            </form>
                        </div>

                    </div>

                </div>


            </div>
            {/* <div className="d-grid d-md-flex justify-content-md-end mb-3">
                    <button className="btn btn-success border border-secondary" onClick={generatePDF}>Generate Report</button>
                </div> */}

            <div className="d-flex justify-content-center mt-3">
                <button className="btn btn-success border border-secondary" onClick={generatePDF}>Generate Report</button>
            </div>

        </div>
    );
};

export default ViewQRecord;
