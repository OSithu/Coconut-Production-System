import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditQualityRecords = () => {
  const [recordId, setRecordId] = useState("");
  const [productType, setProductType] = useState("");
  const [qualityCheckedDate, setQualityCheckedDate] = useState("")
  const [specialNotes, setSpecialNotes] = useState("");
  const [testResult, setTestResult] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const year = date.getFullYear();
    let month = (1 + date.getMonth()).toString().padStart(2, "0");
    let day = date.getDate().toString().padStart(2, "0");
  
    return `${year}-${month}-${day}`; // Remove the space after year
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

  const UpdateRecord = async (e) => {
    e.preventDefault();

    try {
      const confirmed = window.confirm("Are you sure you want to update this record?");
      if (confirmed) {
        let updatedQualityRecord = {
          recordId: recordId,
          productType: productType,
          qualityCheckedDate: qualityCheckedDate,
          specialNotes: specialNotes,
          testResult: testResult,
        };
        await axios.put(`http://localhost:8000/qualityrecords/update/${id}`, updatedQualityRecord)

          .then((res) => {
            alert(res.data.message);
            console.log(res.data.message);
            navigate("/viewQualityRecords");
          })
          .catch((err) => {
            if (err.response) {
              console.log(err.response.data.message);
            } else {
              console.log("Error occurred while processing your axios put request" + err.message);
            }
          });
      } else {
        alert('Update canceled!');
      }
    } catch (err) {
      console.log("Update Failed!", err.message);
    }
  }

  return (
    <div className="col-md-8 mt-4 mx-auto">
      <h1 className="h3 mb-3 font-weight-normal">Update Record</h1>
      <form className="needs-validation" noValidate onSubmit={UpdateRecord}>

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
          <label style={{ marginBottom: '5px' }}>Quality Checked Date</label>
          <input
            type="date"
            className="form-control"
            name="qualityCheckedDate"
            placeholder="Enter Quality Checked Date"
            onChange={(e) => setQualityCheckedDate(e.target.value)}
            value={qualityCheckedDate}
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

        <div className="form-group" style={{ marginBottom: '15px' }}>
          <label style={{ marginBottom: '5px' }}>Test Result</label>
          <input type="text"
            className="form-control"
            name="testResult"
            placeholder="Enter Test Result"
            onChange={(e) => setTestResult(e.target.value)}
            value={testResult}
            required
          />
        </div>


        <button className="btn btn-success" type="submit" style={{ marginTop: '15px' }}>
          {/* <i className="far fa check-square"></i> */}
          &nbsp: Save
        </button>
      </form>
    </div>
  );
};

export default EditQualityRecords;
