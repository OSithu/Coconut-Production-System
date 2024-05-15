import React, { useState } from 'react';
import axios from 'axios';
import "../stylesheets/wh.css"

function App() {
  const [employeeName, setEmployeeName] = useState('');
  const [date, setDate] = useState('');
  const [attendingTime, setAttendingTime] = useState('');
  const [leavingTime, setLeavingTime] = useState('');
  const [totalWorkHours, setTotalWorkHours] = useState(0);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/workHours', {
        employeeName,
        date,
        attendingTime,
        leavingTime,
      });
      setTotalWorkHours(response.data.totalWorkHours);
      setError(''); // Reset error message on successful submission
    } catch (err) {
      console.error(err);
      setError('Invalid employee name'); // Set error message if request fails
    }
  };

  return (
    <div> <div className="header">
    <div>
     
      <ul className="navbar">
      <div className="nav-left">
      <li>
          <a class="active" href="#home">
            Home
          </a>
        </li>
        <li>
          <a href="/viewEmployees">Employee Details</a>
        </li>
        <li>
          <a href="/ViewTaskShedule">Work Schedule</a>
        </li>
       
      </div>
        <div className="logo">
          <img src="./images/logo.png" className="image"></img>
        </div>
        <div className="nav-right">
        <li>
          <a href="/filter">Departments</a>
        </li>
        <li>
          <a href="/salcal">Salary Calculator</a>
        </li>
        <li>
          <a href="/whcal">Work Hour</a>
        </li>
        </div>

      </ul>
    </div>
  </div>
  <br></br>
    <div className="work-hours-calculator">
      <h1>Work Hours Calculator</h1>
      {error && <div className="error">{error}</div>} {/* Display error message */}
      <form onSubmit={handleSubmit} className="work-hours-form">
        <div className="form-group">
          <label htmlFor="employeeName">Employee Name:</label>
          <input
            type="text"
            id="employeeName"
            value={employeeName}
            onChange={(e) => setEmployeeName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            max={new Date().toISOString().split('T')[0]}
            min={new Date().toISOString().split('T')[0]}
          />
        </div>
        <div className="form-group">
          <label htmlFor="attendingTime">Attending Time:</label>
          <input
            type="time"
            id="attendingTime"
            value={attendingTime}
            onChange={(e) => setAttendingTime(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="leavingTime">Leaving Time:</label>
          <input
            type="time"
            id="leavingTime"
            value={leavingTime}
            onChange={(e) => setLeavingTime(e.target.value)}
            required
            min={attendingTime} // Set the minimum value to attendingTime
          />
        </div>
        <button type="submit" className="btn">
          Calculate
        </button>
      </form>
      {totalWorkHours > 0 && (
        <div className="work-hours-result">
          <h2>Result</h2>
          <p>Employee Name: {employeeName}</p>
          <p>Date: {date}</p>
          <p>Total Work Hours: {totalWorkHours}</p>
        </div>
      )}
    </div>
    </div>
  );
}

export default App;
