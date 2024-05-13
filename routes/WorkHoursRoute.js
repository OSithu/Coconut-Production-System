const express = require('express');
const router = express.Router();

router.post('/workHours', (req, res) => {
  const { employeeName, date, attendingTime, leavingTime } = req.body;

  const attendingTimeObj = new Date(`1970-01-01T${attendingTime}:00`);
  const leavingTimeObj = new Date(`1970-01-01T${leavingTime}:00`);

  const totalWorkHours = (leavingTimeObj.getTime() - attendingTimeObj.getTime()) / (1000 * 60 * 60);

  res.json({ employeeName, date, totalWorkHours });
});

module.exports = router;