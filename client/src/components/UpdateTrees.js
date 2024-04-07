import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'

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

            await axios.get(`http://localhost:8000/trees/${id}`)
                .then((res) => {
                    setTreeID(res.data.tree.treeID);
                    setTypeOfTree(res.data.tree.typeOfTree);
                    setPlantedDate(formatDate(res.data.tree.plantedDate));
                    setBlockName(res.data.tree.blockName);
                    setSpecialNotes(res.data.tree.specialNotes);
                    console.log('Status : ' + res.data.success);

                })
                .catch((err) => {
                    if (err.response) {
                        console.log(err.response.data.error)
                    } else {
                        console.log("Error occured while getting axios get request")
                    }
                })
        }

        getTree();

    }, [id])

    const updateDetails = async (e) => {
        e.preventDefault();

        try {
            const confirm = window.confirm('Are you sure you want to update?');

            if (confirm) {

                let updatedTree = {
                    treeID: treeID,
                    typeOfTree: typeOfTree,
                    plantedDate: plantedDate,
                    blockName: blockName,
                    specialNotes: specialNotes
                }
                await axios.patch(`http://localhost:8000/trees/update/${id}`, updatedTree)
                    .then((res) => {
                        alert(res.data.success);
                        console.log(res.data.success);
                        navigate('/ViewTrees');
                    })
                    .catch((err) => {
                        if (err.response) {
                            console.log(err.response.data.error)
                        } else {
                            console.log("Error occured while getting axios patch request")
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

    return (
        <form className="needs-validation" noValidate onSubmit={updateDetails}>
            <div class="form-group" style={{ marginBottom: '15px' }}>
                <label style={{ marginBottom: '5px' }}> Tree ID </label>
                <input type="text"
                    class={`form-control`}
                    name="treeID"
                    placeholder="Enter Tree ID"
                    value={treeID}
                    onChange={(e) => setTreeID(e.target.value)} />
            </div>

            <div class="form-group" style={{ marginBottom: '15px' }}>
                <label style={{ marginBottom: '5px' }}> Type of Tree </label>
                <input type="text"
                    class={`form-control`}
                    name="typeOfTree"
                    placeholder="Enter Tree Type"
                    value={typeOfTree}
                    onChange={(e) => setTypeOfTree(e.target.value)} />
            </div>

            <div class="form-group" style={{ marginBottom: '15px' }}>
                <label style={{ marginBottom: '5px' }}> Planted Date </label>
                <input type="date"
                    class={`form-control`}
                    name="plantedDate"
                    value={plantedDate}
                    onChange={(e) => setPlantedDate(e.target.value)} />
            </div>

            <div class="form-group" style={{ marginBottom: '15px' }}>
                <label style={{ marginBottom: '5px' }}> Block Name </label>
                <input type="text"
                    class={`form-control`}
                    name="blockName"
                    placeholder="Enter Block Name"
                    value={blockName}
                    onChange={(e) => setBlockName(e.target.value)} />
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

            <button className="btn btn-success" type="submit" style={{ marginTop: '15px' }}>Update</button>
        </form>
    )
}

export default UpdateTrees