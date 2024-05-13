import React, { useState } from 'react';
import axios from 'axios';

function SalaryCalculator() {
  const [formData, setFormData] = useState({
    employeeName: '',
    month: '',
    basicSalary: 0,
    allowances: 0,
    deductions: 0,
    monthlyBonus: 0,
    tax: 0,
    epf: 0,
    etf: 0,
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
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="employeeName"
          placeholder="Employee Name"
          value={formData.employeeName}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="month"
          placeholder="Month"
          value={formData.month}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="basicSalary"
          placeholder="Basic Salary"
          value={formData.basicSalary}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="allowances"
          placeholder="Allowances"
          value={formData.allowances}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="deductions"
          placeholder="Deductions"
          value={formData.deductions}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="monthlyBonus"
          placeholder="Monthly Bonus"
          value={formData.monthlyBonus}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="tax"
          placeholder="Tax"
          value={formData.tax}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="epf"
          placeholder="EPF"
          value={formData.epf}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="etf"
          placeholder="ETF"
          value={formData.etf}
          onChange={handleInputChange}
          required
        />
        <button type="submit">Calculate Salary</button>
      </form>
      {calculatedSalary > 0 && (
        <div>
          <p>Employee Name: {formData.employeeName}</p>
          <p>Month: {formData.month}</p>
          <p>Calculated Salary: {calculatedSalary}</p>
        </div>
      )}
    </div>
  );
}

export default SalaryCalculator;