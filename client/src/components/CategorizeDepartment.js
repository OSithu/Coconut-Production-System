import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EmployeesByDepartment = () => {
  const [employeesByDepartment, setEmployeesByDepartment] = useState({});

  useEffect(() => {
    const fetchEmployeesByDepartment = async () => {
      try {
        const response = await axios.get('http://localhost:8000/filter');
        setEmployeesByDepartment(response.data.employeesByDepartment);
      } catch (err) {
        console.error(err);
      }
    };

    fetchEmployeesByDepartment();
  }, []);

  // Add the styles from PestFinder component
  const styles = {
    container: {
      maxWidth: '800px',
      margin: '0 auto',
      padding: '20px',
      backgroundColor: 'rgba(255, 255, 255, 0.7)',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    heading: {
      textAlign: 'center',
      color: '#333',
      marginBottom: '20px',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginBottom: '20px',
    },
    input: {
      padding: '10px',
      fontSize: '16px',
      borderRadius: '4px',
      border: '1px solid #ccc',
      marginBottom: '10px',
      width: '300px',
    },
    button: {
      padding: '10px 20px',
      fontSize: '16px',
      backgroundColor: '#4caf50',
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
    },
    error: {
      color: '#ff0000',
      marginBottom: '20px',
    },
    pesticide: {
      backgroundColor: '#fff',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      marginBottom: '20px',
    },
  };

  return (
    <div>           <div className="header">
    <div>
     
      <ul className="navbar">
      <div className="nav-left">
      <li>
          <a class="active" href="#home">
            Home
          </a>
        </li>
        <li>
          <a href="/viewEmployee">Employee Details</a>
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
    <div style={styles.container}>
      <h1 style={styles.heading}>Employees by Department</h1>
      {Object.keys(employeesByDepartment).map((department) => (
        <div key={department} style={{ marginBottom: '20px' }}>
          <h1 style={{ color: 'green' }}>{department}</h1>
          <ul>
            {employeesByDepartment[department].map((employee) => (
              <li key={employee.fullName} style={{ marginLeft: '20px' , fontSize:'35px'}}>{employee.fullName}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
    </div>
  );
};

export default EmployeesByDepartment;
