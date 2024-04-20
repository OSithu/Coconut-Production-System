import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const ViewQRecord = () => {
  const [recordId, setRecordId] = useState("");
  const [productType, setProductType] = useState("");
  const [specialNotes, setSpecialNotes] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();
  
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

  return (
    <div className="col-md-8 mt-4 mx-auto">
      <h1 className="h3 mb-3 font-weight-normal">Record Details</h1>
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
            required
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
            required
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
            required
          />
        </div>
      </form>
    </div>
  );
};

export default ViewQRecord;
