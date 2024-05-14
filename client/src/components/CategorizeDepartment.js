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

  return (
    <div>
      <h1>Employees by Department</h1>
      {Object.keys(employeesByDepartment).map((department) => (
        <div key={department}>
          <h2>{department}</h2>
          <ul>
            {employeesByDepartment[department].map((employee) => (
              <li key={employee.fullName}>{employee.fullName}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default EmployeesByDepartment;