import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PlantationNav from './PlantationNav';

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
            <PlantationNav />
            &nbsp;
            <h2> Harvesting Schedules </h2>
            &nbsp;
            <Link to={`/addHvstSchedules`}>
                <button type="button" className="btn btn-success" style={{ float: "right" }}>
                    <i className="fa-solid fa-plus"></i>&nbsp;
                    New Schedule
                </button>
            </Link>

            <table className="table">
                <thead>
                    <tr>
                        <th scope = "col">Date</th>
                        <th scope = "col">Block</th>
                        <th scope = "col">Person In Charge</th>
                        <th scope = "col">Staff Member 01</th>
                        <th scope = "col">Staff Member 02</th>
                        <th scope = "col">Staff Member 03</th>
                        <th scope = "col">Assigned Date</th>
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
              <td>{schedule.staff01}</td>
              <td>{schedule.staff02}</td>
              <td>{schedule.staff03}</td>
              <td>{schedule.assignedDate}</td>
              <td>
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
    );
};

export default HarvestingSchedules;


