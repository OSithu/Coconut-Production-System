import React, { useState } from 'react'
import axios from 'axios'
import PlantationNav from './PlantationNav';

const AddHarvest = () => {
    const [date, setDate] = useState('');
    const [blockName, setBlockName] = useState('');
    const [harvest, setHarvest] = useState('');
    const [errors, setErrors] = useState({});

    const saveDetails = async (e) => {
        e.preventDefault();

        // Clear previous errors
        setErrors({});

        // Validation
        let formValid = true;
        let errorsData = {};

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
        // If form is not valid, set errors and return
        if (!formValid) {
            setErrors(errorsData);
            return;
        }

        let newRecord = {
            date: date,
            blockName: blockName,
            harvest: harvest
        }

        axios.post("http://localhost:8000/harvest/save", newRecord)
        .then((res) => {
            alert(res.data.success);
            console.log(res.data.success);
            window.location.reload();
        })
        .catch((err) => {
            if(err.response){
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
            &nbsp;
            <div class="container text-center">
            <h2> Add New Record </h2>
                 <form className="needs-validation" noValidate onSubmit={saveDetails}>
                 <div class="row mb-3">
                 <label className="col-sm-2 col-form-label"> Date </label>
                 <div className="col-sm-10">
                         <input type="date"
                             className={`form-control ${errors.date ? 'is-invalid' : ''}`}
                             name="date"
                             value={date}
                             onChange={(e) => setDate(e.target.value)}/>
                        {errors.date && <div className="invalid-feedback">{errors.date}</div>}
                     </div></div>

                     <div class="row mb-3">
                 <label className="col-sm-2 col-form-label"> Block Name </label>
                 <div className="col-sm-10">
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
                 <div className="col-sm-10">
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
    )
}

export default AddHarvest





