import React, { useState } from 'react'
import axios from 'axios'
import PlantationNav from './PlantationNav';
import { useNavigate } from 'react-router-dom';

const AddBlock = () => {

    const [blockName, setBlockName] = useState('');
    const [areaValue, setAreaValue] = useState('');
    const [areaUnit, setAreaUnit] = useState('');
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

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
        if (!areaValue.trim()) {
            errorsData.area = 'Area is required';
            formValid = false;
        }
        if (!areaUnit.trim()) {
            errorsData.areaUnit = 'Unit is required';
            formValid = false;
        }
    
        // If form is not valid, set errors and return
        if (!formValid) {
            setErrors(errorsData);
            return;
        }
    
        let newBlock = {
            blockName: blockName,
            area: { value: areaValue , unit: areaUnit }
        }
    
        axios.post("http://localhost:8000/blocks/save", newBlock)
            .then((res) => {
                alert(res.data.success);
                console.log(res.data.success);
                navigate("/estateDetails")
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
        <div className="col-md-8 mt-4 mx auto">
                 <PlantationNav />
                 &nbsp;
                 <h1 className="h3 mb-3 font-weight-normal"> Add New Record </h1>
                 <form className="needs-validation" noValidate onSubmit={saveDetails}>

                     <div class="row mb-3">
                         <label className="col-sm-2 col-form-label"> Block Name </label>
                         <div className="col-sm-10">
                             <input type="text"
                                class={`form-control ${errors.blockName ? 'is-invalid' : ''}`}
                                name="blockName"
                                placeholder="Enter Block Name"
                                value={blockName}
                                onChange={(e) => setBlockName(e.target.value)} />
                            {errors.blockName && <div className="invalid-feedback">{errors.blockName}</div>}
                        </div>
                    </div>

                    <div class="row mb-3">
                        <label className="col-sm-2 col-form-label"> Area </label>
                        <div className="col-sm-8">
                        <input
                            type="text"
                            className={`form-control ${errors.area ? 'is-invalid' : ''}`}
                            name="area"
                            placeholder="Enter Area"
                            value={areaValue}
                            onChange={(e) => setAreaValue(e.target.value)}
                        />
                            {errors.area && <div className="invalid-feedback">{errors.area}</div>}

                            <select
                            className="form-select"
                            name="unit"
                            value={areaUnit}
                            onChange={(e) => setAreaUnit(e.target.value)}
                        >
                            <option value="">Select Unit</option>
                            <option value="sqm">sqm</option>
                            <option value="sqft">sqft</option>
                            <option value="hectare">hectare</option>
                            <option value="acre">acre</option>
                        </select>

                        </div>
                    </div>

                    <button className="btn btn-success" type="submit" style={{ marginTop: '15px' }}>Submit</button>
                </form>
            </div>
    )

}

export default AddBlock
