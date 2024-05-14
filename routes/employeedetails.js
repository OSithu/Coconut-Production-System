const express =  require('express');
const employeeDetails = require('../models/employeedetails');
const employeedetails = require('../models/employeedetails');


const router = express.Router();

//save post(employee details)
router.post('/employee/save',async(req,res)=>{
    try{

        // Check if NIC already exists
        const existingEmployee = await employeeDetails.findOne({ NIC: req.body.NIC }).exec();
        if (existingEmployee) {
            return res.status(400).json({ error: "NIC already exists" });
        }

    let newEmployee = new employeeDetails(req.body);

   //save records
   await newEmployee.save();

   // return success responde
   return res.status(200).json({
    success:"employee added successfully"
});
    }catch (err){
        return res.status(400).json({
            error:err.message
        });
        
    }
});


//get  Records
router.get('/view', async (req, res) => {
    try {
        const records = await employeeDetails.find().exec();
        return res.status(200).json({
            success: true,
            existingRecords: records
        });
    } catch (err) {
        return res.status(400).json({
            error: err.message
        });
    }
});

//Update Records
router.put('/employee/update/:id', async (req, res) => {
    try {
        await employeeDetails.findByIdAndUpdate(req.params.id, { $set: req.body }).exec();
        return res.status(200).json({
            success: "Record updated Successfully"
        });
    } catch (err) {
        return res.status(400).json({
            error: err.message
        });
    }
});

//Delete Records

router.delete('/employee/delete/:id', async (req, res) => {
    try {
        const deletedemployee = await employeeDetails.findByIdAndDelete(req.params.id).exec();
        return res.status(200).json({
            message: "Records deleted Successfully",
            deletedemployee: deletedemployee
        });
    } catch (err) {
        return res.status(400).json({
            error: err.message
        });
    }
});

//Get Specific Employee
router.get("/view/:id", async (req, res) => {
    try {
        let employeerecordID = req.params.id;
        let employeerecord = await employeeDetails.findById(employeerecordID);
        if (!employeerecord) {
            return res.status(404).json({ success: false, message: "Record not found" });
        }
        return res.status(200).json({ success: true, employeerecord });
    } catch (err) {
        return res.status(400).json({ success: false, error: err.message });
    }
});


// Get Employees by Department
router.get('/filter', async (req, res) => {
    try {
      const employees = await employeeDetails.find({}, { fullName: 1, department: 1, _id: 0 }).exec();
  
      // Group employees by department
      const employeesByDepartment = employees.reduce((acc, employee) => {
        const { department } = employee;
        if (!acc[department]) {
          acc[department] = [];
        }
        acc[department].push(employee);
        return acc;
      }, {});
  
      return res.status(200).json({ success: true, employeesByDepartment });
    } catch (err) {
      return res.status(400).json({ success: false, error: err.message });
    }
  });




module.exports = router;
