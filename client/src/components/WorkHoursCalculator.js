import React, { useState } from 'react';
import axios from 'axios';
import '../stylesheets/wh.css';

function App() {
  const [employeeName, setEmployeeName] = useState('');
  const [date, setDate] = useState('');
  const [attendingTime, setAttendingTime] = useState('');
  const [leavingTime, setLeavingTime] = useState('');
  const [totalWorkHours, setTotalWorkHours] = useState(0);

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
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="app">
      <h1>Work Hours Calculator</h1>
      <form onSubmit={handleSubmit} className="form">
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
          />
        </div>
        <button type="submit" className="btn">
          Calculate
        </button>
      </form>
      {totalWorkHours > 0 && (
        <div className="result">
          <h2>Result</h2>
          <p>Employee Name: {employeeName}</p>
          <p>Date: {date}</p>
          <p>Total Work Hours: {totalWorkHours}</p>
        </div>
      )}
    </div>
  );
}

export default App;