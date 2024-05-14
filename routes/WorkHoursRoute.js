const express = require('express');
const router = express.Router();
const employeeDetails = require('../models/employeedetails');

router.post('/workHours', async (req, res) => {
  try {
    const { employeeName, date, attendingTime, leavingTime } = req.body;

    // Check if the provided employee name exists in the database
    const existingEmployee = await employeeDetails.findOne({ fullName: employeeName }).exec();
    if (!existingEmployee) {
      return res.status(404).json({ error: "Employee not found in the database" });
    }

    const attendingTimeObj = new Date(`1970-01-01T${attendingTime}:00`);
    const leavingTimeObj = new Date(`1970-01-01T${leavingTime}:00`);

    const totalWorkHours = (leavingTimeObj.getTime() - attendingTimeObj.getTime()) / (1000 * 60 * 60);

    res.json({ employeeName, date, totalWorkHours });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

module.exports = router;
