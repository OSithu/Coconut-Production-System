// const express = require('express');
// const router = express.Router();

// // Salary calculation controller
// const calculateSalary = (req, res) => {
//   const { basicSalary, allowances, deductions } = req.body;
//   const calculatedSalary = basicSalary + allowances - deductions;
//   res.json({ salary: calculatedSalary });
// };

// // Define route
// router.post('/calculate-salary', calculateSalary);

// module.exports = router;

const express = require('express');
const router = express.Router();

// Salary calculation controller
const calculateSalary = (req, res) => {
  const { basicSalary, allowances, deductions, monthlyBonus, tax, epf, etf } = req.body;
  const calculatedSalary = basicSalary + allowances + monthlyBonus - tax - epf - etf;
  res.json({ salary: calculatedSalary });
};

// Define route
router.post('/calculate-salary', calculateSalary);

module.exports = router;