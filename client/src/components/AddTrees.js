import React, { useState }from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import PlantationNav from './PlantationNav';

const AddTrees = () => {
    const [treeID , setTreeID] = useState('');
    const [typeOfTree , setTypeOfTree] = useState('');
    const [plantedDate , setPlantedDate] = useState('');
    const [blockName , setBlockName] = useState('');
    const [specialNotes , setSpecialNotes] = useState('');
    const [errors, setErrors] = useState({});

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
        } else if (new Date(plantedDate) > new Date()) {
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

        axios.post("http://localhost:8000/tree/save", newTree)
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
    <div className="col-md-8 mt-4 mx auto">

        <PlantationNav/>

                 <h1 className="h3 mb-3 font-weight-normal"> Add New Record </h1>
                 <form className="needs-validation" noValidate onSubmit={saveDetails}>
                     <div class="form-group" style={{ marginBottom: '15px' }}>
                         <label style={{ marginBottom: '5px' }}> Tree ID </label>
                         <input type="text"
                             className={`form-control ${errors.treeID ? 'is-invalid' : ''}`}
                             name="treeID"
                             placeholder="Enter Tree ID"
                             value={treeID}
                             onChange={(e) => setTreeID(e.target.value)}/>
                        {errors.treeID && <div className="invalid-feedback">{errors.treeID}</div>}
                     </div>

                     <div class="form-group" style={{ marginBottom: '15px' }}>
                         <label style={{ marginBottom: '5px' }}> Type of Tree </label>
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

                     <div class="form-group" style={{ marginBottom: '15px' }}>
                         <label style={{ marginBottom: '5px' }}> Planted Date </label>
                         <input type="date"
                             className={`form-control ${errors.plantedDate ? 'is-invalid' : ''}`}
                             name="plantedDate"
                             value={plantedDate}
                             onChange={(e) => setPlantedDate(e.target.value)}/>
                             {errors.plantedDate && <div className="invalid-feedback">{errors.plantedDate}</div>}
                     </div>

                     <div className="form-group" style={{ marginBottom: '15px' }}>
                    <label style={{ marginBottom: '5px' }}> Block Name </label>
                    <input
                        type="text"
                        className={`form-control ${errors.blockName ? 'is-invalid' : ''}`}
                        name="blockName"
                        placeholder="Enter Block Name"
                        value={blockName}
                        onChange={(e) => setBlockName(e.target.value)}
                        disabled // Disable user input if you want to prevent changes
                    />
                    {errors.blockName && <div className="invalid-feedback">{errors.blockName}</div>}
                </div>

                     <div class="form-group" style={{ marginBottom: '15px' }}>
                         <label style={{ marginBottom: '5px' }}>Special Notes</label>
                         <textarea class="form-control"
                             placeholder="Mention if there are any"
                             name="specialNotes"
                             value={specialNotes}
                             onChange={(e) => setSpecialNotes(e.target.value)}>
                         </textarea>

                     </div>

                     <button className="btn btn-success" type="submit" style={{ marginTop: '15px' }}>Submit</button>
                 </form>
             </div>
  )
}

export default AddTrees