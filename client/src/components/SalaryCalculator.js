import React, { useState } from 'react';
import axios from 'axios';
import "../stylesheets/SalaryCalculator.css"

function SalaryCalculator() {
  const [formData, setFormData] = useState({
    employeeName: '',
    month: '',
    basicSalary: '',
    allowances: '',
    deductions: '',
    monthlyBonus: '',
    tax: '',
    epf: '',
    etf: '',
  });
  const [calculatedSalary, setCalculatedSalary] = useState(0);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:8000/calculate-salary`, formData);
      setCalculatedSalary(response.data.salary);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div><div className="header">
    <div>
     
      <ul className="navbar">
      <div className="nav-left">
      <li>
          <a class="active" href="#home">
            Home
          </a>
        </li>
        <li>
          <a href="#news">Employee Details</a>
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
    <div className="salary-calculator-container">
      <h2>Salary Calculator</h2>
      <form onSubmit={handleSubmit} className="salary-calculator-form">
        <div className="form-group">
          <h3>Employee Name</h3>
          <input
            type="text"
            name="employeeName"
            placeholder="Enter Employee Name"
            value={formData.employeeName}
            onChange={handleInputChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
  <h3>Month</h3>
  <select
    name="month"
    value={formData.month}
    onChange={handleInputChange}
    required
    className="form-input"
  >
    
    <option value="January">January</option>
    <option value="February">February</option>
    <option value="March">March</option>
    <option value="April">April</option>
    <option value="May">May</option>
    <option value="June">June</option>
    <option value="July">July</option>
    <option value="September">September</option>
    <option value="November">November</option>
    <option value="December">December</option>
    
  </select>
</div>
        <div className="form-group">
          <h3>Basic Salary</h3>
          <input
            type="number"
            name="basicSalary"
            placeholder="Enter Basic Salary"
            value={formData.basicSalary}
            onChange={handleInputChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <h3>Allowances</h3>
          <input
            type="number"
            name="allowances"
            placeholder="Enter Allowances"
            value={formData.allowances}
            onChange={handleInputChange}
            required
            max={formData.basicSalary} // Set max attribute dynamically

            className="form-input"
          />
     {formData.monthlyBonus > formData.basicSalary && (
    <p className="error-message">Monthly bonus cannot exceed basic salary.</p>
     )}

        </div>
        <div className="form-group">
          <h3>Deductions</h3>
          <input
            type="number"
            name="deductions"
            placeholder="Enter Deductions"
            value={formData.deductions}
            onChange={handleInputChange}
            required
            max={formData.basicSalary} // Set max attribute dynamically

            className="form-input"
          />
          {formData.monthlyBonus > formData.basicSalary && (
    <p className="error-message">Monthly bonus cannot exceed basic salary.</p>
     )}
        </div>
        <div className="form-group">
          <h3>Monthly Bonus</h3>
          <input
            type="number"
            name="monthlyBonus"
            placeholder="Enter Monthly Bonus"
            value={formData.monthlyBonus}
            onChange={handleInputChange}
            required
            max={formData.basicSalary} // Set max attribute dynamically

            className="form-input"
          />
          {formData.monthlyBonus > formData.basicSalary && (
    <p className="error-message">Monthly bonus cannot exceed basic salary.</p>
     )}
        </div>
        <div className="form-group">
          <h3>Tax</h3>
          <input
            type="number"
            name="tax"
            placeholder="Enter Tax"
            value={formData.tax}
            onChange={handleInputChange}
            required
            max={formData.basicSalary} // Set max attribute dynamically

            className="form-input"
          />
          {formData.monthlyBonus > formData.basicSalary && (
    <p className="error-message">Monthly bonus cannot exceed basic salary.</p>
     )}
        </div>
        <div className="form-group">
          <h3>EPF</h3>
          <input
            type="number"
            name="epf"
            placeholder="Enter EPF"
            value={formData.epf}
            onChange={handleInputChange}
            required
            max={formData.basicSalary} // Set max attribute dynamically

            className="form-input"
          />
          {formData.monthlyBonus > formData.basicSalary && (
    <p className="error-message">Monthly bonus cannot exceed basic salary.</p>
     )}
        </div>
        <div className="form-group">
          <h3>ETF</h3>
          <input
            type="number"
            name="etf"
            placeholder="Enter ETF"
            value={formData.etf}
            onChange={handleInputChange}
            required
            max={formData.basicSalary} // Set max attribute dynamically

            className="form-input"
          />
          {formData.monthlyBonus > formData.basicSalary && (
    <p className="error-message">Monthly bonus cannot exceed basic salary.</p>
     )}
        </div>
        <button type="submit" className="form-button">
          Calculate Salary
        </button>
      </form>
      {calculatedSalary > 0 && (
        <div className="salary-calculator-result">
          <p>Employee Name: {formData.employeeName}</p>
          <p>Month: {formData.month}</p>
          <p>Calculated Salary: {calculatedSalary}</p>
        </div>
      )}
    </div>
    </div>
  );
}

export default SalaryCalculator;