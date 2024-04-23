import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditQualityRecords = () => {
  const [recordId, setRecordId] = useState("");
  const [productType, setProductType] = useState("");
  const [qualityCheckedDate, setQualityCheckedDate] = useState("")
  const [specialNotes, setSpecialNotes] = useState("");
  const [testResult, setTestResult] = useState("");
  const [formErrors, setFormErrors] = useState({});

  const { id } = useParams();
  const navigate = useNavigate();

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

  const validateForm = () => {
    const errors = {};

    if (!recordId.trim()) {
      errors.recordId = "Record Id is required";
    }

    if (!productType.trim()) {
      errors.productType = "Product type is required";
    }

    if (!qualityCheckedDate.trim()) {
      errors.qualityCheckedDate = "Quality checked date is required";
    } else {
      const today = new Date();
      const selectedDate = new Date(qualityCheckedDate);

      if (selectedDate > today) {
        errors.qualityCheckedDate = "Quality checked date cannot be a future date";
      }
    }

    if (!testResult.trim()) {
      errors.testResult = "Test result is required";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const UpdateRecord = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

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
            alert(res.data.success);
            console.log(res.data.message);
            navigate("/viewQualityRecord");
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
            className={`form-control ${formErrors.recordId && 'is-invalid'}`}
            name="recordId"
            //placeholder="Enter RecordID "
            onChange={(e) => setRecordId(e.target.value)}
            value={recordId}
            required
          />
          {formErrors.recordId && (
            <div className="invalid-feedback">{formErrors.recordId}</div>
          )}
        </div>

        {/* <div className="form-group" style={{ marginBottom: '15px' }}>
          <label style={{ marginBottom: '5px' }}>Product Type</label>
          <input type="text"
            className={`form-control ${formErrors.productType && 'is-invalid'}`}
            name="productType"
            //placeholder="Enter Product Type"
            onChange={(e) => setProductType(e.target.value)}
            value={productType}
            required
          />
          {formErrors.productType && (
            <div className="invalid-feedback">{formErrors.productType}</div>
          )}
        </div> */}

        {/* <div className="form-group" style={{ marginBottom: '15px' }}>
          <label style={{ marginBottom: '5px' }}>Product Type</label>
          <select
            className={`form-control ${formErrors.productType && 'is-invalid'}`}
            name="productType"
            onChange={(e) => setProductType(e.target.value)}
            value={productType}
          > */}
        {/* <option value="">Select Product Type</option> */}
        {/* <option value="Coconut Oil">Coconut Oil</option>
            <option value="Coconut Water">Coconut Water</option>
            <option value="Desiccated Coconut">Desiccated Coconut</option>
          </select>
          {formErrors.productType && (
            <div className="invalid-feedback">{formErrors.productType}</div>
          )}
        </div> */}

        <div className="form-group" style={{ marginBottom: '15px' }}>
          <label style={{ marginBottom: '5px' }}>Product Type</label>
          <select
            className={`form-control ${formErrors.productType && 'is-invalid'}`}
            name="productType"
            onChange={(e) => setProductType(e.target.value)}
            value={productType}
          >
            {/* <option value="" disabled selected>Select Product Type</option> */}
            <option value="Coconut Oil">Coconut Oil</option>
            <option value="Coconut Water">Coconut Water</option>
            <option value="Desiccated Coconut">Desiccated Coconut</option>
          </select>
          {formErrors.productType && (
            <div className="invalid-feedback">{formErrors.productType}</div>
          )}
        </div>


        {/* <div className="form-group" style={{ marginBottom: '15px' }}>
          <label style={{ marginBottom: '5px' }}>Quality Checked Date</label>
          <input
            type="date"
            className={`form-control ${formErrors.qualityCheckedDate && 'is-invalid'}`}
            name="qualityCheckedDate"
            //placeholder="Enter Quality Checked Date"
            onChange={(e) => setQualityCheckedDate(e.target.value)}
            value={qualityCheckedDate}
            required
          />
          {formErrors.qualityCheckedDate && (
            <div className="invalid-feedback">{formErrors.qualityCheckedDate}</div>
          )}
        </div> */}

        <div className="form-group" style={{ marginBottom: '15px' }}>
          <label style={{ marginBottom: '5px' }}>Quality Checked Date</label>
          <input type="Date"
            className={`form-control ${formErrors.qualityCheckedDate && 'is-invalid'}`}
            name="qualityCheckedDate"
            placeholder="Enter Quality Checked Date"
            onChange={(e) => setQualityCheckedDate(e.target.value)}
            value={qualityCheckedDate}
            required
            max={
              new Date().toISOString().split('T')[0]
            }
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
            required
          />
        </div>

        {/* <div className="form-group" style={{ marginBottom: '15px' }}>
          <label style={{ marginBottom: '5px' }}>Test Result</label>
          <input type="text"
            className={`form-control ${formErrors.testResult && 'is-invalid'}`}
            name="testResult"
            //placeholder="Enter Test Result"
            onChange={(e) => setTestResult(e.target.value)}
            value={testResult}
            required
          />
          {formErrors.testResult && (
            <div className="invalid-feedback">{formErrors.testResult}</div>
          )}
        </div> */}

        <div className="form-group" style={{ marginBottom: '15px' }}>
          <label style={{ marginBottom: '5px' }}>Test Result</label>
          <select
            className={`form-control ${formErrors.productType && 'is-invalid'}`}
            name="testResult"
            onChange={(e) => setTestResult(e.target.value)}
            value={testResult}
          >
            {/* <option value="">Select Product Type</option> */}
            <option value="Passed">Passed</option>
            <option value="Coconut Water">Failed</option>
          </select>
          {formErrors.testResult && (
            <div className="invalid-feedback">{formErrors.testResult}</div>
          )}
        </div>

        <button className="btn btn-success" type="submit" style={{ marginTop: '15px' }}>
          <i className="fas fa check-square"></i>&nbsp;Submit Record
        </button>

      </form>
    </div>
  );
};

export default EditQualityRecords;
