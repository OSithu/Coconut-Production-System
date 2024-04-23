import React, { useEffect, useState } from 'react';
import axios from 'axios';

import "../stylesheets/qualityRecords.css";

const CreateQualityRecords = () => {

  const [recordId, setRecordId] = useState('');
  const [productType, setProductType] = useState('');
  const [qualityCheckedDate, setQualityCheckedDate] = useState('');
  const [specialNotes, setSpecialNotes] = useState('');
  const [testResult, setTestResult] = useState('');
  const [errors, setErrors] = useState({});
  const [qProduct,setQProduct] = useState([]);
 
    useEffect(() => {
      const getqProduct = async () => {
        try{
          const res = await axios.get(`http://localhost:8000/qProduct}`);
          setQProduct(res.data.existingqProduct) ;
          console.log('Status :' +res.data.success);
        } catch(err) {
            if (err.response) {
              console.log(err.response.data.error)
            }
          }
        };
      
      getqProduct();
    }, []);

  const validateForm = () => {
    const errors = {};
    let isValid = true

    if (!recordId.trim()) {
      errors.recordId = 'Record Id is required';
      isValid = false;
    }

    if (!productType.trim()) {
      errors.productType = 'Product type  is required';
      isValid = false;
    }

    if (!qualityCheckedDate) {
      errors.qualityCheckedDate = 'Quality checked date is required';
      isValid = false;
    }
    //else {
    //   const currentDate = new Date();
    //   const checkedDate = new Date(qualityCheckedDate);

    //   if (checkedDate > currentDate) {
    //     errors.qualityCheckedDate = 'Quality checked date cannot be a future date';
    //     isValid = false;
    //   }
    // }


    if (!testResult.trim()) {
      errors.testResult = 'Test result is required';
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  }

  const sendData = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      let newQualityRecord = {
        recordId: recordId,
        productType: productType,
        qualityCheckedDate: qualityCheckedDate,
        specialNotes: specialNotes,
        testResult: testResult,
      }
      await axios.post('http://localhost:8000/qualityrecords/save', newQualityRecord)
        .then((res) => {
          alert(res.data.message);
          console.log('status' + res.data.success);
          console.log(res.data.message);
        })
        .catch((err) => {
          if (err.response) {
            console.log(err.response.data.message);
          } else {
            console.log("Error occured while processing your axios post request" + err.message);
          }
        })

      setRecordId('');
      setProductType();
      setQualityCheckedDate();
      setSpecialNotes();
      setTestResult();

    }
    catch (err) {
      console.log('sendData function failed! ERROR' + err.message)
    }
  }

  return (
    <div className="col-md-8 mt-4 mx-auto quality-records-container">
      <h1 className="h3 mb-3 font-weight-normal">Add New Record</h1>
      <form className="needs-validation" noValidate onSubmit={sendData}>

        <div className="form-group" style={{ marginBottom: '15px' }}>
          <label style={{ marginBottom: '5px' }}>Record ID</label>
          <input
            type="text"
            className={`form-control ${errors.recordId && 'is-invalid'}`}
            name="recordId"
            placeholder="Enter RecordID "
            onChange={(e) => setRecordId(e.target.value)}
            value={recordId}
            style={{ borderRadius: '5px', borderColor: errors.recordId ? 'red' : '' }}
          />
          {errors.recordId && <div className="invalid-feedback">{errors.recordId}</div>}
        </div>

        {/* <div className="form-group" style={{marginBottom:'15px'}}>
                            <label style={{marginBottom:'5px'}}>Product Type</label>
                            <input type="text"
                            className={`form-control ${errors.productType && 'is-invalid'}`}
                            name="productType"
                            placeholder="Enter Product Type"
                            onChange={(e) => setProductType(e.target.value)}
                            value={productType}
                            
                           />
                           {errors.productType && <div className="invalid-feedback">{errors.productType}</div>}
                        </div> */}

        {/* <div className="form-group" style={{ marginBottom: '15px' }}>
          <label style={{ marginBottom: '5px' }}>Product Type</label>
          <select
            className={`form-control ${errors.productType && 'is-invalid'}`}
            name="productType"
            onChange={(e) => setProductType(e.target.value)}
            value={productType}
          >
            <option value="">Select Product Type</option>
            <option value="Coconut Oil">Coconut Oil</option>
            <option value="Coconut Water">Coconut Water</option>
            <option value="Desiccated Coconut">Desiccated Coconut</option>
          </select>
          {errors.productType && (
            <div className="invalid-feedback">{errors.productType}</div>
          )}
        </div> */}

<div className="form-group" style={{ marginBottom: '15px' }}>
  <label style={{ marginBottom: '5px' }}>Product Type</label>
  <select
    className={`form-control ${errors.productType && 'is-invalid'}`}
    name="productType"
    onChange={(e) => setProductType(e.target.value)}
    value={productType}
  >
    <option value="" disabled selected>Select Product Type</option>
    <option value="Coconut Oil">Coconut Oil</option>
    <option value="Coconut Water">Coconut Water</option>
    <option value="Desiccated Coconut">Desiccated Coconut</option>
  </select>
  {errors.productType && (
    <div className="invalid-feedback">{errors.productType}</div>
  )}
</div>




        <div className="form-group" style={{ marginBottom: '15px' }}>
          <label style={{ marginBottom: '5px' }}>Quality Checked Date</label>
          <input type="Date"
            className={`form-control ${errors.qualityCheckedDate && 'is-invalid'}`}
            name="qualityCheckedDate"
            placeholder="Enter Quality Checked Date"
            onChange={(e) => setQualityCheckedDate(e.target.value)}
            value={qualityCheckedDate}
            max={
              new Date().toISOString().split('T')[0]
            }

          />
          {errors.qualityCheckedDate && <div className="invalid-feedback">{errors.qualityCheckedDate}</div>}
        </div>

        <div className="form-group" style={{ marginBottom: '15px' }}>
          <label style={{ marginBottom: '5px' }}>Special Notes</label>
          <input type="text"
            className="form-control"
            name="specialNotes"
            placeholder="Enter Special Notes"
            onChange={(e) => setSpecialNotes(e.target.value)}
            value={specialNotes}

          />
        </div>

        {/* <div className="form-group" style={{ marginBottom: '15px' }}>
          <label style={{ marginBottom: '5px' }}>Test Result</label>
          <input type="text"
            className={`form-control ${errors.testResult && 'is-invalid'}`}
            name="testResult"
            placeholder="Enter Test Result"
            onChange={(e) => setTestResult(e.target.value)}
            value={testResult}

          />
          {errors.testResult && <div className="invalid-feedback">{errors.testResult}</div>}
        </div> */}

        <div className="form-group" style={{ marginBottom: '15px' }}>
          <label style={{ marginBottom: '5px' }}>Test Result</label>
          <select
            className={`form-control ${errors.productType && 'is-invalid'}`}
            name="testResult"
            onChange={(e) => setTestResult(e.target.value)}
            value={testResult}
          >
            <option value=""disabled selected>Select Test Result</option>
            <option value="Passed">Passed</option>
            <option value="Coconut Water">Failed</option>
          </select>
          {errors.testResult && (
            <div className="invalid-feedback">{errors.testResult}</div>
          )}
        </div>


        <div className="d-flex justify-content-center mt-3">
            <button className="btn btn-success" type="submit" style={{ marginTop: '15px' }}>
                <i className="fas fa-check-square"></i>&nbsp;Save Record
            </button>
        </div>
      </form>
    </div>
  )
}

export default CreateQualityRecords;