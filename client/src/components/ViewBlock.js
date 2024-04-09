import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import PlantationNav from './PlantationNav'

const ViewBlock = () => {

    const [blockName, setBlockName] = useState('');
    const [area, setArea] = useState('');
    const [areaUnit, setAreaUnit] = useState('');
    const [treeCount, setTreeCount] = useState('');
    const [lastHarvested, setLastHarvested] = useState('');
    const [nextHarvesting, setNextHarvesting] = useState('');
    const [lastFertilized, setLastFertilized] = useState('');
    const [nextFertilization, setNextFertilization] = useState('');
    const [isEditable, setIsEditable] = useState(false);

    // State variables for form errors
    const [errors, setErrors] = useState({
        blockName: '',
        area: '',
        areaUnit: '',
        treeCount: '',
        lastHarvested: '',
        nextHarvesting: '',
        lastFertilized: '',
        nextFertilization: ''
    });

    const { id } = useParams();
    const navigate = useNavigate();

    // Function to format date to yyyy-mm-dd format
    const formatDate = (date) => {
        if (!date) return ''; // Return blank if date is null

        const d = new Date(date);
        let month = "" + (d.getMonth() + 1);
        let day = "" + d.getDate();
        const year = d.getFullYear();

        if (month.length < 2) month = "0" + month;
        if (day.length < 2) day = "0" + day;

        return [year, month, day].join("-");
    };


    useEffect(() => {

        const getBlock = async () => {

            await axios.get(`http://localhost:8000/blocks/${id}`)
                .then((res) => {
                    setBlockName(res.data.block.blockName);
                    setArea(res.data.block.area.value);
                    setAreaUnit(res.data.block.area.unit);
                    setTreeCount(res.data.block.treeCount);
                    setLastHarvested(formatDate(res.data.block.lastHarvested));
                    setNextHarvesting(formatDate(res.data.block.nextHarvesting));
                    setLastFertilized(formatDate(res.data.block.lastFertilized));
                    setNextFertilization(formatDate(res.data.block.nextFertilization));
                    console.log('Status : ' + res.data.success);

                })
                .catch((err) => {
                    if (err.response) {
                        console.log(err.response.data.error)
                    } else {
                        console.log("Error occurred while getting axios get request")
                    }
                })
        }

        getBlock();

    }, [id])

    const updateDetails = async (e) => {
        e.preventDefault();

        // Validate the form before submission
        if (validateForm()) {
            try {
                let updatedBlock = {
                    blockName: blockName,
                    area: {
                        value: area,
                        unit: areaUnit
                    },
                    treeCount: treeCount,
                    lastHarvested: lastHarvested,
                    nextHarvesting: nextHarvesting,
                    lastFertilized: lastFertilized,
                    nextFertilization: nextFertilization
                }
                await axios.patch(`http://localhost:8000/blocks/update/${id}`, updatedBlock)
                    .then((res) => {
                        alert(res.data.success);
                        console.log(res.data.success);
                        window.location.reload();
                    })
                    .catch((err) => {
                        if (err.response) {
                            console.log(err.response.data.error)
                        } else {
                            console.log("Error occurred while getting axios patch request")
                        }
                    })
            }
            catch (err) {
                console.log('update function failed')
            }
        }

    }

    const handleDelete = async (id) => {

        try {
            const confirm = window.confirm('Are you sure you want to delete?');

            if (confirm) {
                await axios.delete(`http://localhost:8000/blocks/delete/${id}`)
                    .then((res) => {
                        alert(res.data.message);
                        console.log(res.data.message);
                        navigate('/estateDetails');
                    })
                    .catch((err) => {
                        if (err.response) {
                            console.log(err.response.data.message);
                        } else {
                            console.log("Error occurred while processing your axios delete");
                        }
                    })
            } else {
                alert('Deletion Cancel');
            }
        }
        catch (err) {
            console.log('HandleDelete function failed! Error: ' + err.message);
        }
    }

    const handleAreaChange = (e) => {
        setArea(e.target.value);
    };

    const handleUnitChange = (e) => {
        setAreaUnit(e.target.value);
    };

    const handleEdit = () => {
        setIsEditable(true);
    };

    // Function to validate the form
    const validateForm = () => {
        let valid = true;
        let newErrors = { ...errors };

        if (!blockName.trim()) {
            newErrors.blockName = 'Block name is required';
            valid = false;
        }

        if (!area.toString().trim()) {
            newErrors.area = 'Area is required';
            valid = false;
        }

        if (!areaUnit.trim()) {
            newErrors.areaUnit = 'Unit is required';
            valid = false;
        }

        if (!treeCount.toString().trim()) {
            newErrors.treeCount = 'Tree Count is required';
            valid = false;
        }

        if (!lastHarvested.trim()) {
            valid = false;
            newErrors.lastHarvested = "Date is required";
        } else if (new Date(lastHarvested) > new Date()) {
            valid = false;
            newErrors.lastHarvested = "Date cannot be a future date";
        }

        if (!nextHarvesting.trim()) {
            valid = false;
            newErrors.nextHarvesting = "Date is required";
        } else if (new Date(nextHarvesting) < new Date()) {
            valid = false;
            newErrors.nextHarvesting = "Date must be a future date";
        }

        if (!lastFertilized.trim()) {
            valid = false;
            newErrors.lastFertilized = "Date is required";
        } else if (new Date(lastFertilized) > new Date()) {
            valid = false;
            newErrors.lastFertilized = "Date cannot be a future date";
        }

        if (!nextFertilization.trim()) {
            valid = false;
            newErrors.nextFertilization = "Date is required";
        } else if (new Date(nextFertilization) < new Date()) {
            valid = false;
            newErrors.nextFertilization = "Date must be a future date";
        }

        setErrors(newErrors);
        return valid;
    };

    return (
        <div>
            <PlantationNav />
            &nbsp;
            &nbsp;
            <form className="needs-validation" noValidate>
                <div class="container text-center">
                    <h2> Block {blockName} </h2>
                    &nbsp;
                    &nbsp;
                    <div class="row justify-content-md-center">
                        <div class="col">
                            <div class="row mb-3">
                                <label className="col-sm-2 col-form-label"> Block Name </label>
                                <div className="col-sm-10">
                                    <input type="text"
                                        class={`form-control ${errors.blockName && 'is-invalid'}`}
                                        name="blockName"
                                        value={blockName}
                                        onChange={(e) => setBlockName(e.target.value)}
                                        disabled={!isEditable} />
                                    {errors.blockName && <div className="invalid-feedback">{errors.blockName}</div>}
                                </div>
                            </div>

                            <div class="row mb-3">
                                <label className="col-sm-2 col-form-label"> Area </label>
                                <div className="col-sm-10">
                                    <div className="input-group">
                                        <input type="text"
                                            className={`form-control ${errors.area && 'is-invalid'}`}
                                            name="area"
                                            value={area}
                                            onChange={handleAreaChange}
                                            disabled={!isEditable} />
                                        <select
                                            className="form-select"
                                            name="unit"
                                            value={areaUnit}
                                            onChange={handleUnitChange}
                                            disabled={!isEditable}>
                                            <option value="">Select Unit</option>
                                            <option value="sqm">sqm</option>
                                            <option value="sqft">sqft</option>
                                            <option value="hectare">hectare</option>
                                            <option value="acre">acre</option>
                                        </select>
                                        {errors.area && <div className="invalid-feedback">{errors.area}</div>}
                                        {errors.areaUnit && <div className="invalid-feedback">{errors.areaUnit}</div>}
                                    </div>
                                </div>
                            </div>

                            <div class="row mb-3">
                                <label className="col-sm-2 col-form-label"> Tree Count </label>
                                <div className="col-sm-10">
                                    <input type="text"
                                        class={`form-control ${errors.treeCount && 'is-invalid'}`}
                                        name="treeCount"
                                        value={treeCount}
                                        onChange={(e) => setTreeCount(e.target.value)}
                                        disabled={!isEditable} />
                                    {errors.treeCount && <div className="invalid-feedback">{errors.treeCount}</div>}
                                </div>
                            </div>

                            <div class="row mb-3">
                                <label className="col-sm-2 col-form-label"> Last Harvested Date </label>
                                <div className="col-sm-10">
                                    <input type="date"
                                        class={`form-control ${errors.lastHarvested && 'is-invalid'}`}
                                        name="lastHarvested"
                                        value={lastHarvested}
                                        onChange={(e) => setLastHarvested(e.target.value)}
                                        disabled={!isEditable} />
                                    {errors.lastHarvested && <div className="invalid-feedback">{errors.lastHarvested}</div>}
                                </div>
                            </div>

                            <div class="row mb-3">
                                <label className="col-sm-2 col-form-label"> Next Harvesting Date </label>
                                <div className="col-sm-10">
                                    <input type="date"
                                        class={`form-control ${errors.nextHarvesting && 'is-invalid'}`}
                                        name="nextHarvesting"
                                        value={nextHarvesting}
                                        onChange={(e) => setNextHarvesting(e.target.value)}
                                        disabled={!isEditable} />
                                    {errors.nextHarvesting && <div className="invalid-feedback">{errors.nextHarvesting}</div>}
                                </div>
                            </div>

                            <div class="row mb-3">
                                <label className="col-sm-2 col-form-label"> Last Fertilized Date </label>
                                <div className="col-sm-10">
                                    <input type="date"
                                        class={`form-control ${errors.lastFertilized && 'is-invalid'}`}
                                        name="lastFertilized"
                                        value={lastFertilized}
                                        onChange={(e) => setLastFertilized(e.target.value)}
                                        disabled={!isEditable} />
                                    {errors.lastFertilized && <div className="invalid-feedback">{errors.lastFertilized}</div>}
                                </div>
                            </div>

                            <div class="row mb-3">
                                <label className="col-sm-2 col-form-label"> Next Fertilization Date </label>
                                <div className="col-sm-10">
                                    <input type="date"
                                        class={`form-control ${errors.nextFertilization && 'is-invalid'}`}
                                        name="nextFertilization"
                                        value={nextFertilization}
                                        onChange={(e) => setNextFertilization(e.target.value)}
                                        disabled={!isEditable} />
                                    {errors.nextFertilization && <div className="invalid-feedback">{errors.nextFertilization}</div>}
                                </div>
                            </div>

                            <button className="btn btn-success" type="submit" style={{ width: '220px' }} onClick={updateDetails} disabled={!isEditable}>
                                Save Changes
                            </button>
                        </div>
                        <div class="col col-lg-4">

                            <div class="d-grid gap-2 col-6 mx-auto">
                                <button className="btn btn-warning" type="button" onClick={handleEdit}>
                                    <i className='fas fa-edit'></i> &nbsp;
                                    Update
                                </button>

                                <button type="button" className='btn btn-danger' onClick={() => handleDelete(id)}>
                                    <i className='far fa-trash-alt'></i> &nbsp;
                                    Delete
                                </button>

                                <Link to={`/ViewTrees/${blockName}?blockName=${blockName}`}>
                                    <button type="button" className="btn btn-success" style={{ width: '220px' }}>
                                        <i className="fa-regular fa-eye"></i>&nbsp;
                                        View Tree Details
                                    </button>
                                </Link>
                            </div>

                        </div>
                    </div>
                </div>
            </form>



        </div>
    )
}

export default ViewBlock
