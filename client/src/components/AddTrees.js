import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import PlantationNav from './PlantationNav';
import '../stylesheets/plantation.css';

const AddTrees = () => {
    const [treeID, setTreeID] = useState('');
    const [typeOfTree, setTypeOfTree] = useState('');
    const [plantedDate, setPlantedDate] = useState('');
    const [blockName, setBlockName] = useState('');
    const [specialNotes, setSpecialNotes] = useState('');
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();
    const location = useLocation();

    // Extract blockName from URL query parameters
    const queryParams = new URLSearchParams(location.search);
    const blockNameFromQuery = queryParams.get('blockName');

    // Set blockName state with blockName from query
    useState(() => {
        if (blockNameFromQuery) {
            setBlockName(blockNameFromQuery);
        }
    }, [blockNameFromQuery]);

    const saveDetails = async (e) => {
        e.preventDefault();

        // Clear previous errors
        setErrors({});

        // Validation
        let formValid = true;
        let errorsData = {};

        if (!treeID.trim()) {
            formValid = false;
            errorsData.treeID = "Tree ID is required";
        }
        if (!typeOfTree.trim()) {
            formValid = false;
            errorsData.typeOfTree = "Type of Tree is required";
        }
        if (!plantedDate.trim()) {
            formValid = false;
            errorsData.plantedDate = "Planted Date is required";
        }
        //check if date is valid
        else if (new Date(plantedDate) > new Date()) {
            formValid = false;
            errorsData.plantedDate = "Planted Date cannot be a future date";
        }
        if (!blockName.trim()) {
            formValid = false;
            errorsData.blockName = "Block Name is required";
        }

        // If form is not valid, set errors and return
        if (!formValid) {
            setErrors(errorsData);
            return;
        }

        let newTree = {
            treeID: treeID,
            typeOfTree: typeOfTree,
            plantedDate: plantedDate,
            blockName: blockName,
            specialNotes: specialNotes
        };

        //add details to database
        axios.post("http://localhost:8000/tree/save", newTree)
            .then((res) => {
                alert(res.data.success);
                console.log(res.data.success);
                navigate(`/ViewTrees/${blockName}?blockName=${blockName}`);
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

        <div className='plantBody'>

            <div>
                <div className='plantHeader'>
                    <PlantationNav />
                </div>
                <div className='plantBody'>
                    <div className="container text-center">
                        <h1 className='plantTopic'>Add Details</h1>
                        &nbsp;
                        &nbsp;
                        <form className="needs-validation" noValidate onSubmit={saveDetails} id='plantForm2'>

                            <div className="row mb-3">
                                <label className="col-sm-2 col-form-label">Tree ID</label>
                                <div className="col-sm-10" id={'plantFormFeild'}>
                                    <input type="text"
                                        className={`form-control ${errors.treeID ? 'is-invalid' : ''}`}
                                        name="treeID"
                                        placeholder="Enter Tree ID"
                                        value={treeID}
                                        onChange={(e) => setTreeID(e.target.value)}
                                        style={{ marginBottom: '15px' }} />
                                    {errors.treeID && <div className="invalid-feedback">{errors.treeID}</div>}
                                </div>
                            </div>


                            <div className="row mb-3">
                                <label className="col-sm-2 col-form-label">Type of Tree</label>
                                <div className="col-sm-10" id={'plantFormFeild'}>
                                    <select
                                        className="form-select"
                                        name="unit"
                                        value={typeOfTree}
                                        onChange={(e) => setTypeOfTree(e.target.value)}
                                    >
                                        <option value="">Select Type</option>
                                        <option value="CRIC 60">CRIC 60</option>
                                        <option value="CRIC 65">CRIC 65</option>
                                        <option value="CRISL 98">CRISL 98</option>
                                    </select>
                                    {errors.typeOfTree && <div className="invalid-feedback">{errors.typeOfTree}</div>}
                                </div>
                            </div>

                            <div className="row mb-3">
                                <label className="col-sm-2 col-form-label">Planted Date</label>
                                <div className="col-sm-10" id={'plantFormFeild'}>
                                    <input type="date"
                                        className={`form-control ${errors.plantedDate ? 'is-invalid' : ''}`}
                                        name="plantedDate"
                                        value={plantedDate}
                                        onChange={(e) => setPlantedDate(e.target.value)} />
                                    {errors.plantedDate && <div className="invalid-feedback">{errors.plantedDate}</div>}
                                </div>

                            </div>


                            <div className="row mb-3">
                                <label className="col-sm-2 col-form-label">Block Name</label>
                                <div className="col-sm-10" id={'plantFormFeild'}>
                                    <input
                                        type="text"
                                        className={`form-control ${errors.blockName ? 'is-invalid' : ''}`}
                                        name="blockName"
                                        placeholder="Enter Block Name"
                                        value={blockName}
                                        onChange={(e) => setBlockName(e.target.value)}
                                        disabled />
                                    {errors.blockName && <div className="invalid-feedback">{errors.blockName}</div>}
                                </div>
                            </div>

                            <div className="row mb-3">
                                <label className="col-sm-2 col-form-label">Special Notes</label>
                                <div className="col-sm-10" id={'plantFormFeild'}>
                                    <textarea class="form-control"
                                        placeholder="Mention if there are any"
                                        name="specialNotes"
                                        value={specialNotes}
                                        onChange={(e) => setSpecialNotes(e.target.value)}>
                                    </textarea>

                                </div>
                            </div>

                            <button className="btn btn-success" type="submit">Submit</button>
                        </form >
                    </div>
                </div></div></div>

    )
}

export default AddTrees