import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";

const ViewQRecord = () => {
    const componentPDF = useRef();

    const [recordId, setRecordId] = useState("");
    const [productType, setProductType] = useState("");
    const [specialNotes, setSpecialNotes] = useState("");

    const { id } = useParams();

    useEffect(() => {
        const getOneRecord = async () => {
            await axios.get(`http://localhost:8000/qualityrecords/${id}`)
                .then((res) => {
                    setRecordId(res.data.records.recordId);
                    setProductType(res.data.records.productType);
                    setSpecialNotes(res.data.records.specialNotes);

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

    const generatePDF = useReactToPrint({
        content: () => componentPDF.current,
        documentTitle: "",
        onAfterPrint: () => alert("Data saved in PDF")
    });

    return (

        <div className="col-md-8 mt-4 mx-auto">
            <h1 className="h3 mb-3 font-weight-normal">Record Details</h1>

            <div style={{ marginTop: "20px" }}>
                <div ref={componentPDF} style={{ width: "100%" }}>

                    <form className="needs-validation" noValidate>

                        <div className="form-group" style={{ marginBottom: '15px' }}>
                            <label style={{ marginBottom: '5px' }}>Record ID</label>
                            <input
                                type="text"
                                className="form-control"
                                name="recordId"
                                placeholder="Enter RecordID "
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
                                placeholder="Enter Product Type"
                                onChange={(e) => setProductType(e.target.value)}
                                value={productType}
                                disabled
                            />
                        </div>

                        <div className="form-group" style={{ marginBottom: '15px' }}>
                            <label style={{ marginBottom: '5px' }}>Special Notes</label>
                            <input type="text"
                                className="form-control"
                                name="specialNotes"
                                placeholder="Enter Special Notes"
                                onChange={(e) => setSpecialNotes(e.target.value)}
                                value={specialNotes}
                                disabled
                            />
                        </div>
                    </form>
                </div>
                <div className="d-grid d-md-flex justify-content-md-end mb-3">
                    <button className="btn btn-light border border-secondary" onClick={generatePDF}>Generate Report</button>
                </div>

            </div>
        </div>
    );
};

export default ViewQRecord;
