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

        try {
            const confirm = window.confirm('Are you sure you want to update?');

            if (confirm) {

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
            } else {
                alert('Update Cancel');
            }
        }
        catch (err) {
            console.log('update function failed')
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

    return (
        <div>
            <PlantationNav />
            <form className="needs-validation" noValidate>
                <div class="form-group" style={{ marginBottom: '15px' }}>
                    <label style={{ marginBottom: '5px' }}> Block Name </label>
                    <input type="text"
                        class={`form-control`}
                        name="blockName"
                        value={blockName}
                        onChange={(e) => setBlockName(e.target.value)}
                        disabled={!isEditable} />
                </div>

                <div className="form-group" style={{ marginBottom: '15px' }}>
                    <label style={{ marginBottom: '5px' }}> Area </label>
                    <div className="input-group">
                        <input type="text"
                            className={`form-control`}
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
                    </div>
                </div>

                <div class="form-group" style={{ marginBottom: '15px' }}>
                    <label style={{ marginBottom: '5px' }}> Tree Count </label>
                    <input type="text"
                        class={`form-control`}
                        name="treeCount"
                        value={treeCount}
                        onChange={(e) => setTreeCount(e.target.value)}
                        disabled={!isEditable} />
                </div>

                <div class="form-group" style={{ marginBottom: '15px' }}>
                    <label style={{ marginBottom: '5px' }}> Last Harvested Date </label>
                    <input type="date"
                        class={`form-control`}
                        name="lastHarvested"
                        value={lastHarvested}
                        onChange={(e) => setLastHarvested(e.target.value)}
                        disabled={!isEditable} />
                </div>

                <div class="form-group" style={{ marginBottom: '15px' }}>
                    <label style={{ marginBottom: '5px' }}> nextHarvesting Date </label>
                    <input type="date"
                        class={`form-control`}
                        name="nextHarvesting"
                        value={nextHarvesting}
                        onChange={(e) => setNextHarvesting(e.target.value)}
                        disabled={!isEditable} />
                </div>

                <div class="form-group" style={{ marginBottom: '15px' }}>
                    <label style={{ marginBottom: '5px' }}> lastFertilized Date </label>
                    <input type="date"
                        class={`form-control`}
                        name="lastFertilized"
                        value={lastHarvested}
                        onChange={(e) => setLastFertilized(e.target.value)}
                        disabled={!isEditable} />
                </div>

                <div class="form-group" style={{ marginBottom: '15px' }}>
                    <label style={{ marginBottom: '5px' }}> nextFertilization Date </label>
                    <input type="date"
                        class={`form-control`}
                        name="nextFertilization"
                        value={nextFertilization}
                        onChange={(e) => setNextFertilization(e.target.value)}
                        disabled={!isEditable} />
                </div>

                <button className="btn btn-success" type="button" style={{ marginTop: '15px' }} onClick={handleEdit}>Update</button>
                <button className="btn btn-success" type="submit" style={{ marginTop: '15px' }} onClick={updateDetails} disabled={!isEditable}>Save Changes</button>
                <button type="button" className='btn btn-danger' onClick={() => handleDelete(id)}>
                    <i className='far fa-trash-alt'></i> Delete
                </button>
            </form>

            <Link to={`/ViewTrees/${blockName}?blockName=${blockName}`}>
                <button type="button" className="btn btn-warning">
                    <i className='fas fa-edit'></i>  View Tree Details
                </button>
            </Link>

        </div>
    )
}

export default ViewBlock
