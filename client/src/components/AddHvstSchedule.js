import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PlantationNav from './PlantationNav';

const AddHvstSchedule = () => {
    const [date, setDate] = useState('');
    const [blockName, setBlockName] = useState('');
    const [inCharge, setInCharge] = useState('');
    const [staff01, setStaff01] = useState('');
    const [staff02, setStaff02] = useState('');
    const [staff03, setStaff03] = useState('');
    const [estStaff, setEstStaff] = useState([]);
    const [allBlocks, setAllBlocks] = useState([]);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
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
    }, []);

    const saveDetails = async (e) => {
        e.preventDefault();
        setErrors({}); // Clear previous errors

        let formValid = true;
        let errorsData = {};

        //check if the feilds are empty
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
            errorsData.date = "Required";
        } 
        //check if date is valid
        else if (new Date(date) < new Date()) {
            formValid = false;
            errorsData.date = "Date must be a future date";
        }
        if (!formValid) {
            setErrors(errorsData);
            return;
        }

        let newSchedule = {
            date: date,
            blockName: blockName,
            inCharge: inCharge,
            staff01: staff01,
            staff02: staff02,
            staff03: staff03
        }

        //add details to database
        axios.post("http://localhost:8000/hScedule/save", newSchedule)
            .then((res) => {
                alert(res.data.success);
                console.log(res.data.success);
                navigate(`/viewHvstSchedules`);
            })
            .catch((err) => {
                if (err.response) {
                    console.log(err.response.data.message);
                    alert(err.response.data.error)
                } else {
                    console.log("Error occurred while processing axios post request" + err.message);
                }
            });
    };

    return (
        <div>

            <PlantationNav />
            &nbsp;

            <div className="container text-center">
                <h2> Add New Schedule </h2>

                <form className="needs-validation" noValidate onSubmit={saveDetails}>
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
                                <option value=""> Select </option>
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

                    <button className="btn btn-success" type="submit" style={{ marginTop: '15px' }}>Submit</button>
                </form>
            </div>
        </div>
    );
};

export default AddHvstSchedule;
