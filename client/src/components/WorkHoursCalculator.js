import React, { useState } from 'react';
import axios from 'axios';

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
    <div>
      <h1>Work Hours Calculator</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Employee Name:
          <input
            type="text"
            value={employeeName}
            onChange={(e) => setEmployeeName(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Date:
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Attending Time:
          <input
            type="time"
            value={attendingTime}
            onChange={(e) => setAttendingTime(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Leaving Time:
          <input
            type="time"
            value={leavingTime}
            onChange={(e) => setLeavingTime(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Calculate</button>
      </form>
      {totalWorkHours > 0 && (
        <div>
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