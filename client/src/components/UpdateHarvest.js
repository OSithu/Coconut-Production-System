import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import PlantationNav from './PlantationNav';
import '../stylesheets/plantation.css';

const UpdateHarvest = () => {
    const [date, setDate] = useState('');
    const [blockName, setBlockName] = useState('');
    const [harvest, setHarvest] = useState('');

    // State variables for form errors
    const [errors, setErrors] = useState({
        date: '',
        blockName: '',
        harvest
    });

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
                const res = await axios.get(`http://localhost:8000/harvest/${id}`);
                const { harvest } = res.data;
                setDate(formatDate(harvest.date));
                setBlockName(harvest.blockName);
                setHarvest(harvest.harvest);
            } catch (err) {
                if (err.response) {
                    console.log(err.response.data.error);
                } else {
                    console.log("Error occurred while getting axios get request");
                }
            }
        };

        getRecord();
    }, [id]);

    const updateDetails = async (e) => {
        e.preventDefault();

        try {
            if (validateForm()) {
                let updatedRecord = {
                    date,
                    blockName,
                    harvest
                };

                const res = await axios.patch(`http://localhost:8000/harvest/update/${id}`, updatedRecord);
                alert(res.data.success);
                console.log(res.data.success);
                navigate(`/viewHarvest`);
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
            errorsData.blockName = "Block Name is required";
        }
        if (!harvest.trim()) {
            formValid = false;
            errorsData.harvest = "Collected Harvest is required";
        }
        if (!date.trim()) {
            formValid = false;
            errorsData.date = "Date is required";
        } else if (new Date(date) > new Date()) {
            formValid = false;
            errorsData.date = "Date cannot be a future date";
        }

        setErrors(errorsData);
        return formValid;
    };

    return (
        <div>
            <div className='plantHeader'>
                <PlantationNav />
            </div>
            &nbsp;
            <div className='plantBody'>
                <h1 className='plantTopic'>Edit Details</h1>
                &nbsp;
                &nbsp;
                <form className="needs-validation" noValidate onSubmit={updateDetails} id='plantForm2'>
                    <div class="row mb-3">
                        <label className="col-sm-2 col-form-label"> Date </label>
                        <div className="col-sm-10" id={'plantFormFeild'}>
                            <input type="date"
                                className={`form-control ${errors.date ? 'is-invalid' : ''}`}
                                name="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)} />
                            {errors.date && <div className="invalid-feedback">{errors.date}</div>}
                        </div></div>

                    <div class="row mb-3">
                        <label className="col-sm-2 col-form-label"> Block Name </label>
                        <div className="col-sm-10" id={'plantFormFeild'}>
                            <input
                                type="text"
                                className={`form-control ${errors.blockName ? 'is-invalid' : ''}`}
                                name="blockName"
                                placeholder="Enter Block Name"
                                value={blockName}
                                onChange={(e) => setBlockName(e.target.value)}
                            />
                            {errors.blockName && <div className="invalid-feedback">{errors.blockName}</div>}
                        </div>
                    </div>

                    <div class="row mb-3">
                        <label className="col-sm-2 col-form-label"> Collected Harvest </label>
                        <div className="col-sm-10" id={'plantFormFeild'}>
                            <input
                                type="number"
                                className={`form-control ${errors.harvest ? 'is-invalid' : ''}`}
                                name="harvest"
                                placeholder="Enter Collected Harvest"
                                min="1" max="500"
                                value={harvest}
                                onChange={(e) => setHarvest(e.target.value)}
                            />
                            {errors.harvest && <div className="invalid-feedback">{errors.harvest}</div>}
                        </div>
                    </div>

                    <button className="btn btn-success" type="submit" style={{ marginTop: '15px' }}>Submit</button>
                </form>
            </div>
        </div>
    );
};

export default UpdateHarvest;
