import React, { useState } from 'react';
import axios from 'axios';

const CreateQualityRecords = () => {

  const [recordId,setRecordId] =useState('');
  const [productType,setProductType] =useState('');
  const [qualityCheckedDate,setQualityCheckedDate] =useState('');
  const [specialNotes,setSpecialNotes] =useState('');
  const [testResult,setTestResult] =useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const errors = {};
    let isValid = true

  if(!recordId.trim()) {
    errors.recordId = 'Record Id is required';
    isValid = false;
  }

  if(!productType.trim()) {
    errors.productType = 'Product type  is required';
    isValid = false;
  }

  if (!qualityCheckedDate) {
    errors.qualityCheckedDate = 'Quality checked date is required';
    isValid = false;
  } else {
    const currentDate = new Date();
    const checkedDate = new Date(qualityCheckedDate);

    if (checkedDate > currentDate) {
      errors.qualityCheckedDate = 'Quality checked date cannot be a future date';
      isValid = false;
    }
  }


  if(!testResult.trim()) {
    errors.testResult = 'Test result is required';
    isValid = false;
  }

  setErrors(errors);
  return isValid;
}

  const sendData = async (e) => {
    e.preventDefault();

    if(!validateForm()){
      return;
    }

    try{
      let newQualityRecord = {
        recordId:recordId,
        productType:productType,
        qualityCheckedDate:qualityCheckedDate,
        specialNotes:specialNotes,
        testResult:testResult,
      }
      await axios.post('http://localhost:8000/qualityrecords/save',newQualityRecord)
      .then((res) => {
        alert(res.data.message);
        console.log('status' +res.data.success);
        console.log(res.data.message);
      })
      .catch((err) => {
        if(err.response){
          console.log(err.response.data.message);
        }else{
          console.log("Error occured while processing your axios post request" + err.message);
        }
      })

      setRecordId('');
      setProductType();
      setQualityCheckedDate();
      setSpecialNotes();
      setTestResult();

    }
    catch(err){
      console.log('sendData function failed! ERROR' + err.message)
    }
  }  

  return (
    <div className="col-md-8 mt-4 mx-auto">
      <h1 className="h3 mb-3 font-weight-normal">Add New Record</h1>
      <form className="needs-validation" noValidate onSubmit={sendData}>
    
                    <div className="form-group" style={{marginBottom:'15px'}}>
                            <label style={{marginBottom:'5px'}}>Record ID</label>
                            <input
                             type="text"
                             className={`form-control ${errors.recordId && 'is-invalid'}`}
                             name="recordId"
                             placeholder="Enter RecordID "
                             onChange={(e) => setRecordId(e.target.value)}
                             value={recordId}
                             style={{ borderRadius: '5px', borderColor: errors.recordId ? 'red' : '' }}
                             required
                            />
                            {errors.recordId && <div className="invalid-feedback">{errors.recordId}</div>}
                        </div>
    
                        <div className="form-group" style={{marginBottom:'15px'}}>
                            <label style={{marginBottom:'5px'}}>Product Type</label>
                            <input type="text"
                            className={`form-control ${errors.productType && 'is-invalid'}`}
                            name="productType"
                            placeholder="Enter Product Type"
                            onChange={(e) => setProductType(e.target.value)}
                            value={productType}
                            required
                           />
                           {errors.productType && <div className="invalid-feedback">{errors.productType}</div>}
                        </div>
    
                        <div className="form-group" style={{marginBottom:'15px'}}>
                            <label style={{marginBottom:'5px'}}>Quality Checked Date</label>
                            <input type="Date"
                            className={`form-control ${errors.qualityCheckedDate && 'is-invalid'}`}
                            name="qualityCheckedDate"
                            placeholder="Enter Quality Checked Date"
                            onChange={(e) => setQualityCheckedDate(e.target.value)}
                            value={qualityCheckedDate}
                            required
                           />
                           {errors.qualityCheckedDate && <div className="invalid-feedback">{errors.qualityCheckedDate}</div>}
                        </div>
    
                        <div className="form-group" style={{marginBottom:'15px'}}>
                            <label style={{marginBottom:'5px'}}>Special Notes</label>
                            <input type="text"
                            className="form-control"
                            name="specialNotes"
                            placeholder="Enter Special Notes"
                            onChange={(e) => setSpecialNotes(e.target.value)}
                             value={specialNotes}
                             required
                            />
                        </div>
    
                        <div className="form-group" style={{marginBottom:'15px'}}>
                            <label style={{marginBottom:'5px'}}>Test Result</label>
                            <input type="text"
                            className={`form-control ${errors.testResult && 'is-invalid'}`}
                            name="testResult"
                            placeholder="Enter Test Result"
                            onChange={(e) => setTestResult(e.target.value)}
                            value={testResult}
                            required
                           />
                           {errors.testResult && <div className="invalid-feedback">{errors.testResult}</div>}
                        </div>

                      <button className="btn btn-success" type="submit" style={{marginTop:'15px'}}>
                      <i className="fas fa check-square"></i>&nbsp;Save Record
                      </button>
      </form>
    </div>
    )
  }

export default CreateQualityRecords;