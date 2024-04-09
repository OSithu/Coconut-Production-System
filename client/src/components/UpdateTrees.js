import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import PlantationNav from './PlantationNav';

const UpdateTrees = () => {
    const [treeID, setTreeID] = useState('');
    const [typeOfTree, setTypeOfTree] = useState('');
    const [plantedDate, setPlantedDate] = useState('');
    const [blockName, setBlockName] = useState('');
    const [specialNotes, setSpecialNotes] = useState('');

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
        const getTree = async () => {
            try {
                const res = await axios.get(`http://localhost:8000/trees/${id}`);
                const { tree } = res.data;
                setTreeID(tree.treeID);
                setTypeOfTree(tree.typeOfTree);
                setPlantedDate(formatDate(tree.plantedDate));
                setBlockName(tree.blockName);
                setSpecialNotes(tree.specialNotes);
            } catch (err) {
                if (err.response) {
                    console.log(err.response.data.error);
                } else {
                    console.log("Error occurred while getting axios get request");
                }
            }
        };

        getTree();
    }, [id]);

    const updateDetails = async (e) => {
        e.preventDefault();

        try {
            const confirm = window.confirm('Are you sure you want to update?');

            if (confirm) {
                const updatedTree = {
                    treeID,
                    typeOfTree,
                    plantedDate,
                    blockName,
                    specialNotes
                };

                const res = await axios.patch(`http://localhost:8000/trees/update/${id}`, updatedTree);
                alert(res.data.success);
                console.log(res.data.success);
                navigate(`/ViewTrees/${blockName}?blockName=${blockName}`);
            } else {
                alert('Update Cancel');
            }
        } catch (err) {
            console.log('Update function failed:', err);
        }
    };

    return (
        <div>
            <PlantationNav />

            <div className="container text-center">
                <h2>Edit Details</h2>
                &nbsp;
                    &nbsp;
                <form className="needs-validation" noValidate onSubmit={updateDetails}>
                    <div className="row justify-content-md-center">
                        <div className="col">
                            <div className="row mb-3">
                                <label className="col-sm-2 col-form-label">Tree ID</label>
                                <div className="col-sm-10">
                                    <input type="text"
                                        className="form-control"
                                        name="treeID"
                                        placeholder="Enter Tree ID"
                                        value={treeID}
                                        onChange={(e) => setTreeID(e.target.value)} />
                                </div>
                            </div>

                            <div className="row mb-3">
                                <label className="col-sm-2 col-form-label">Type of Tree</label>
                                <div className="col-sm-10">
                                    <input type="text"
                                        className="form-control"
                                        name="typeOfTree"
                                        placeholder="Enter Tree Type"
                                        value={typeOfTree}
                                        onChange={(e) => setTypeOfTree(e.target.value)} />
                                </div>
                            </div>

                            <div className="row mb-3">
                                <label className="col-sm-2 col-form-label">Planted Date</label>
                                <div className="col-sm-10">
                                    <input type="date"
                                        className="form-control"
                                        name="plantedDate"
                                        value={plantedDate}
                                        onChange={(e) => setPlantedDate(e.target.value)} />
                                </div>
                            </div>

                            <div className="row mb-3">
                                <label className="col-sm-2 col-form-label">Block Name</label>
                                <div className="col-sm-10">
                                    <input type="text"
                                        className="form-control"
                                        name="blockName"
                                        placeholder="Enter Block Name"
                                        value={blockName}
                                        onChange={(e) => setBlockName(e.target.value)} />
                                </div>
                            </div>

                            <div className="row mb-3">
                                <label className="col-sm-2 col-form-label">Special Notes</label>
                                <div className="col-sm-10">
                                    <textarea className="form-control"
                                        placeholder="Mention if there are any"
                                        name="specialNotes"
                                        value={specialNotes}
                                        onChange={(e) => setSpecialNotes(e.target.value)}>
                                    </textarea>
                                </div>
                            </div>

                            <button className="btn btn-success" type="submit" style={{ width: '220px' }}>Update</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateTrees;
