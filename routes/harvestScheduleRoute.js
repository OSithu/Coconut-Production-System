const express = require('express');
const Schedule = require('../models/harvestScheduleModel');
const Staff = require('../models/employeedetails')

const router = express.Router();

//create
router.post('/hScedule/save', async (req,res)=>{
    try{
        let newSchedule = new Schedule(req.body);
        newSchedule.assignedDate = new Date();
        await newSchedule.save();
        return res.status(200).json({
            success: "Details saved successfully."
        });
    }
    catch(err){
        return res.status(400).json({
            error: err.message
        });
    }
});

//read
router.get("/hScedule", async(req,res) => {
    try{
        const schedule = await Schedule.find().exec();

        const formattedSchedule = schedule.map(schedule => ({
            ...schedule.toObject(),
            date: schedule.date?.toISOString()?.split('T')[0],
            assignedDate: schedule.assignedDate?.toISOString()?.split('T')[0]
        }));

        return res.status(200).json({
            success: true,
            existingSchedule: formattedSchedule,
        });
    }
    catch(err) {
        return res.status(400).json({
            error: err.message,
        });
    }
});

//update
router.patch("/hScedule/update/:id", async (req, res) => {
    try {
        // Modify the request body to set the assigned date as the current date
        req.body.assignedDate = new Date();

        await Schedule.findByIdAndUpdate(req.params.id, { $set: req.body }).exec();
        return res.status(200).json({
            success: "Successfully Updated"
        });
    } catch (err) {
        return res.status(400).json({
            error: err.message
        });
    }
});


//delete
router.delete("/hScedule/delete/:id", async(req, res) => {
    try{
        const scheduleDelete = await Schedule.findByIdAndDelete(req.params.id).exec();
        return res.json({
            message: "Successfully Deleted",
            scheduleDelete,
        });
    }
    catch(err){
        return req.status(400).json({
            message: "Unsuccessfull",
            error: err.message
        });
    }
});

//get a specific record
router.get("/hScedule/:id", async (req,res) => {
    try{
        let scheduleID = req.params.id;
        let schedule = await Schedule.findById(scheduleID);
        if(!schedule){
            return res.status(404).json({
                success: false,
                message: "Record not found"
            })
        }
        return res.status(200).json({
            success: true,
            schedule
        })
    }
    catch(err){
        return res.status(400).json({
            success: false,
            error : err.message
        });
    }
});

//get a specific record
router.get("/estStaff", async (req,res) => {
try {
    const estStaff = await Staff.find({ department: "sales" }).exec();
    return res.status(200).json({
        success: true,
        existingStaff: estStaff
    });
} catch (err) {
    return res.status(400).json({
        error: err.message
    });
}
});

module.exports = router;