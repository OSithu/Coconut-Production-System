const express = require('express');
const router = express.Router();
const employeeDetails = require('../models/employeedetails');

// Salary calculation controller
const calculateSalary = async (req, res) => {
  const { basicSalary, allowances, deductions, monthlyBonus, tax, epf, etf, employeeName } = req.body;

  try {
    // Check if the provided employee name exists in the database
    const existingEmployee = await employeeDetails.findOne({ fullName: employeeName }).exec();
    if (!existingEmployee) {
      return res.status(404).json({ error: "Employee not found in the database" });
    }

    const calculatedSalary = basicSalary + allowances + monthlyBonus - tax - epf - etf;
    res.json({ salary: calculatedSalary });
  } catch (err) {
    // Handle any errors
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Define route
router.post('/calculate-salary', calculateSalary);

module.exports = router;
