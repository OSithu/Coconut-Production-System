import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import PlantationNav from './PlantationNav';

const UpdateHvstSchedule = () => {

  const [date, setDate] = useState('');
    const [blockName, setBlockName] = useState('');
    const [inCharge, setInCharge] = useState('');
    const [staff01, setStaff01] = useState('');
    const [staff02, setStaff02] = useState('');
    const [staff03, setStaff03] = useState('');
    const [estStaff, setEstStaff] = useState([]);
    const [allBlocks, setAllBlocks] = useState([]);
    const [errors, setErrors] = useState({});

    const { id } = useParams();
    const navigate = useNavigate();

    // Function to format date to yyyy-mm-dd format
    const formatDate = (date) => {
        const d = new Date(date);
        let month = "" + (d.getMonth() + 1);
        let day = "" + d.getDate();
        const year = d.getFullYear();

        if (month.length < 2) month = "0" + month;
        if (day.length < 2) day = "0" + day;

        return [year, month, day].join("-");
    };

    useEffect(() => {
      const getRecord = async () => {
          try {
              const res = await axios.get(`http://localhost:8000/hScedule/${id}`);
              const { schedule } = res.data;
              setDate(formatDate(schedule.date));
              setBlockName(schedule.blockName);
              setInCharge(schedule.inCharge);
              setStaff01(schedule.staff01);
              setStaff02(schedule.staff02);
              setStaff03(schedule.staff03);
              
          } catch (err) {
              if (err.response) {
                  console.log(err.response.data.error);
              } else {
                  console.log("Error occurred while getting axios get request");
              }
          }
      };

      const getAllBlocks = async () => {
        try {
            const res = await axios.get(`http://localhost:8000/blocks`);
            const formattedBlocks = res.data.existingBlocks.map(block => ({
                ...block,
                area: `${block.area.value} ${block.area.unit}`
            }));
            setAllBlocks(formattedBlocks);
            console.log('Status : ' + res.data.success);
        } catch (err) {
            if (err.response) {
                console.log(err.response.data.error);
            }
        }
    }

    const getEstStaff = async () => {
        try {
            const res = await axios.get(`http://localhost:8000/estStaff`);
            setEstStaff(res.data.existingStaff);
            console.log('Status : ' + res.data.success);
        } catch (err) {
            if (err.response) {
                console.log(err.response.data.error)
            }
        }
    };

    getAllBlocks();
    getEstStaff();

      getRecord();
  }, [id]);

  const updateDetails = async (e) => {
    e.preventDefault();

    try {
        if (validateForm()) {
            let updatedRecord = {
                date,
                blockName,
                inCharge,
                staff01,
                staff02,
                staff03
            };

            const res = await axios.patch(`http://localhost:8000/hScedule/update/${id}`, updatedRecord);
            alert(res.data.success);
            console.log(res.data.success);
            navigate(`/viewHvstSchedules`);
        }
    } catch (err) {
        console.log('Update function failed:', err);
    }
};

// Function to validate the form
const validateForm = () => {
    let formValid = true;
    let errorsData = { ...errors };

    if (!blockName.trim()) {
        formValid = false;
        errorsData.blockName = "Required";
    }
    if (!inCharge.trim()) {
        formValid = false;
        errorsData.inCharge = "Required";
    }
    if (!date.trim()) {
        formValid = false;
        errorsData.date = "Date is required";
    } else if (new Date(date) < new Date()) {
        formValid = false;
        errorsData.date = "Date must be a future date";
    }

    setErrors(errorsData);
    return formValid;
};

  return (
    <div>
            <PlantationNav />
            <div className="container text-center">
                <h2> Update Schedule </h2>
                <form className="needs-validation" noValidate onSubmit={updateDetails}>
                    <div className="row mb-3">
                        <label className="col-sm-2 col-form-label"> Date </label>
                        <div className="col-sm-10">
                            <input type="date"
                                className={`form-control ${errors.date ? 'is-invalid' : ''}`}
                                name="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)} />
                            {errors.date && <div className="invalid-feedback">{errors.date}</div>}
                        </div>
                    </div>

                    <div className="row mb-3">
                        <label className="col-sm-2 col-form-label"> Block Name </label>
                        <div className="col-sm-10">
                            <select
                                className={`form-control ${errors.blockName ? 'is-invalid' : ''}`}
                                name="blockName"
                                value={blockName}
                                onChange={(e) => setBlockName(e.target.value)}>
                                <option value="">Select Type</option>
                                {allBlocks.map(blocks => (
                                    <option key={blocks.blockName} value={blocks.blockName}>{blocks.blockName}</option>
                                ))}
                            </select>
                            {errors.blockName && <div className="invalid-feedback">{errors.blockName}</div>}
                        </div>
                    </div>

                    <div className="row mb-3">
                        <label className="col-sm-2 col-form-label"> Person In Charge </label>
                        <div className="col-sm-10">
                            <select
                                className={`form-control ${errors.inCharge ? 'is-invalid' : ''}`}
                                name="inCharge"
                                value={inCharge}
                                onChange={(e) => setInCharge(e.target.value)}>
                                <option value="">Select</option>
                                {estStaff.map((inCharge, index) => (
                                    <option key={index} value={inCharge.fullName}>{inCharge.fullName}</option>
                                ))}
                            </select>
                            {errors.inCharge && <div className="invalid-feedback">{errors.inCharge}</div>}
                        </div>
                    </div>

                    <div className="row mb-3">
                        <label className="col-sm-2 col-form-label"> Staff Member 01 </label>
                        <div className="col-sm-10">
                            <select
                                className={`form-control`}
                                name="staff01"
                                value={staff01}
                                onChange={(e) => setStaff01(e.target.value)}>
                                <option value="">Select</option>
                                {estStaff.map((staff1, index) => (
                                    <option key={index} value={staff1.fullName}>{staff1.fullName}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="row mb-3">
                        <label className="col-sm-2 col-form-label"> Staff Member 02 </label>
                        <div className="col-sm-10">
                            <select
                                className={`form-control`}
                                name="staff02"
                                value={staff02}
                                onChange={(e) => setStaff02(e.target.value)}>
                                <option value="">Select</option>
                                {estStaff.map((staff2, index) => (
                                    <option key={index} value={staff2.fullName}>{staff2.fullName}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="row mb-3">
                        <label className="col-sm-2 col-form-label"> Staff Member 03 </label>
                        <div className="col-sm-10">
                            <select
                                className={`form-control`}
                                name="staff03"
                                value={staff03}
                                onChange={(e) => setStaff03(e.target.value)}>
                                <option value="">Select</option>
                                {estStaff.map((staff3, index) => (
                                    <option key={index} value={staff3.fullName}>{staff3.fullName}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <button className="btn btn-success" type="submit" style={{ marginTop: '15px' }}>Update</button>
                </form>
            </div>
        </div>
  )
}

export default UpdateHvstSchedule