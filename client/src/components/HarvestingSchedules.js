import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PlantationNav from './PlantationNav';
import '../stylesheets/plantation.css';

const HarvestingSchedules = () => {
    const [scheduleDetails, setScheduleDetails] = useState([]);

    useEffect(() => {
        const getAllSchedule = async () => {
            await axios(`http://localhost:8000/hScedule`)
                .then((res) => {
                    setScheduleDetails(res.data.existingSchedule);
                    console.log('Status : ' + res.data.success);
                })
                .catch((err) => {
                    if (err.response) {
                        console.log(err.response.data.error)
                    }
                })
        };
        getAllSchedule();
    }, []);

    const handleDelete = async (id) => {

        try {
            const confirm = window.confirm('Are you sure you want to delete?');

            if (confirm) {
                await axios.delete(`http://localhost:8000/hScedule/delete/${id}`)
                    .then((res) => {
                        alert(res.data.message);
                        console.log(res.data.message);
                        setScheduleDetails(scheduleDetails.filter(schedule => schedule._id !== id));
                    })
                    .catch((err) => {
                        if (err.response) {
                            console.log(err.response.data.message);
                        } else {
                            console.log("Error occured while processing your axios delete");
                        }
                    })
            } else {
                alert('Deletion Cancel');
            }
        }
        catch (err) {
            console.log('HandleDelete function failed ! Error' + err.message);
        }
    }

    return (
        <div>
            <div className='plantHeader'>
                <PlantationNav />
            </div>
            &nbsp;
            <div className='plantBody'>
                <h1 className='plantTopic'> Harvesting Schedules </h1>
                &nbsp;
                <Link to={`/addHvstSchedules`}>
                    <button type="button" className="btn btn-success" id='plantButton'>
                        <i className="fa-solid fa-plus"></i>&nbsp;
                        New Schedule
                    </button>
                </Link>

                <table className="table" id='plantTable'>
                    <thead>
                        <tr>
                            <th scope="col">Date</th>
                            <th scope="col">Block</th>
                            <th scope="col">Person In Charge</th>
                            <th scope="col">Assigned Date</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {scheduleDetails.map((schedule, index) => (
                            <tr key={index}>
                                {index === 0 || schedule.date !== scheduleDetails[index - 1].date ? (
                                    <td rowSpan={scheduleDetails.filter((h) => h.date === schedule.date).length}>{schedule.date}</td>
                                ) : null}
                                <td>{schedule.blockName}</td>
                                <td>{schedule.inCharge}</td>
                                <td>{schedule.assignedDate}</td>
                                <td>
                                    <Link to={`/viewHvstSchedule/${schedule._id}`}>
                                        <button type="button" className="btn btn-success">
                                            <i className='fa-regular fa-eye'></i>&nbsp; View Schedule
                                        </button>
                                    </Link>
                                    &nbsp;
                                    <Link to={`/updateHvstSchedules/${schedule._id}`}>
                                        <button type="button" className="btn btn-warning">
                                            <i className='fas fa-edit'></i>&nbsp; Edit
                                        </button>
                                    </Link>
                                    &nbsp;
                                    <button type="button" className='btn btn-danger' onClick={() => handleDelete(schedule._id)}>
                                        <i className='far fa-trash-alt'></i>&nbsp;Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default HarvestingSchedules;


