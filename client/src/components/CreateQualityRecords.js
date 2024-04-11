import React, { useState } from 'react';
import axios from 'axios';

const CreateQualityRecords = () => {

  const [recordId,setRecordId] =useState('');
  const [productType,setProductType] =useState('');
  const [qualityCheckedDate,setQualityCheckedDate] =useState('');
  const [specialNotes,setSpecialNotes] =useState('');
  const [testResult,setTestResult] =useState('');

  //implementing sendData function
  const sendData = async (e) => {
    e.preventDefault();

    //  if (!RecordId || !ProductType || !QualityCheckedDate || !SpecialNotes || !TestResult) {
    //    alert('Please fill in all fields');
    //   return;
    //  }

    //  // Validate QualityCheckedDate format (YYYY-MM-DD)
    //  if (!/^\d{4}-\d{2}-\d{2}$/.test(QualityCheckedDate)) {
    //   alert('Please enter a valid Quality Checked Date (YYYY-MM-DD)');
    //   return;
    // }

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
                             className="form-control"
                             name="recordId"
                             placeholder="Enter RecordID "
                             onChange={(e) => setRecordId(e.target.value)}
                             value={recordId}
                             required
                            />
                        </div>
    
                        <div className="form-group" style={{marginBottom:'15px'}}>
                            <label style={{marginBottom:'5px'}}>Product Type</label>
                            <input type="text"
                            className="form-control"
                            name="productType"
                            placeholder="Enter Product Type"
                            onChange={(e) => setProductType(e.target.value)}
                            value={productType}
                            required
                           />
                        </div>
    
                        <div className="form-group" style={{marginBottom:'15px'}}>
                            <label style={{marginBottom:'5px'}}>Quality Checked Date</label>
                            <input type="Date"
                            className="form-control"
                            name="qualityCheckedDate"
                            placeholder="Enter Quality Checked Date"
                            onChange={(e) => setQualityCheckedDate(e.target.value)}
                            value={qualityCheckedDate}
                            required
                           />
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
                            className="form-control"
                            name="testResult"
                            placeholder="Enter Test Result"
                            onChange={(e) => setTestResult(e.target.value)}
                            value={testResult}
                            required
                           />
                        </div>
    
    
                        <button className="btn btn-success" type="submit" style={{marginTop:'15px'}}>
                            <i className="far fa check-square"></i>
                            &nbsp: Save
                        </button>
      </form>
    </div>
    )
  }

export default CreateQualityRecords;