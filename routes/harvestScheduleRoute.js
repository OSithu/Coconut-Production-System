const express = require('express');
const Schedule = require('../models/harvestScheduleModel');
const Staff = require('../models/employeedetails');
const nodemailer = require('nodemailer');

const router = express.Router();

// Function to send emails to assigned employees
async function sendEmailToEmployees(scheduleId) {
    try {
        // Retrieve harvesting schedule details
        const schedule = await Schedule.findById(scheduleId);

        // Retrieve email addresses of assigned employees
        const employees = await Staff.find({
            $or: [
                { fullName: schedule.inCharge },
                { fullName: schedule.staff01 },
                { fullName: schedule.staff02 },
                { fullName: schedule.staff03 }
            ]
        });

        // Compose email content
        const emailContent = `Hello,\n\nYou have been assigned for the harvesting schedule on ${schedule.date} in block ${schedule.blockName}.`;

        // Set up email transporter
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'jayakodykoppara@gmail.com',
                pass: 'nbnc qiai vagz ppba'
            },
            tls: {
                rejectUnauthorized: false
            }
        });
        
        // Send emails to assigned employees
        employees.forEach(employee => {
            transporter.sendMail({
                from: 'jayakodykoppara@gmail.com',
                to: employee.contactEmail,
                subject: 'Harvesting Schedule Assignment',
                text: emailContent
            }, (error, info) => {
                if (error) {
                    console.log('Error sending email:', error);
                } else {
                    console.log('Email sent:', info.response);
                }
            });
        });

        console.log('Emails sent successfully to assigned employees.');
    } catch (error) {
        console.log('Error:', error);
    }
}

// create
router.post('/hScedule/save', async (req, res) => {
    try {
        let newSchedule = new Schedule(req.body);
        newSchedule.assignedDate = new Date();
        await newSchedule.save();

        // Send emails to assigned employees
        await sendEmailToEmployees(newSchedule._id);

        return res.status(200).json({
            success: "Details saved successfully."
        });
    }
    catch (err) {
        return res.status(400).json({
            error: err.message
        });
    }
});

//read
router.get("/hScedule", async (req, res) => {
    try {
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
    catch (err) {
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
router.delete("/hScedule/delete/:id", async (req, res) => {
    try {
        const scheduleDelete = await Schedule.findByIdAndDelete(req.params.id).exec();
        return res.json({
            message: "Successfully Deleted",
            scheduleDelete,
        });
    }
    catch (err) {
        return req.status(400).json({
            message: "Unsuccessfull",
            error: err.message
        });
    }
});

//get a specific scheduke using id
router.get("/hScedule/:id", async (req, res) => {
    try {
        let scheduleID = req.params.id;
        let schedule = await Schedule.findById(scheduleID);
        if (!schedule) {
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
    catch (err) {
        return res.status(400).json({
            success: false,
            error: err.message
        });
    }
});

//get estate Staff details
router.get("/estStaff", async (req, res) => {
    try {
        const estStaff = await Staff.find({ department: "plantation" }).exec();
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