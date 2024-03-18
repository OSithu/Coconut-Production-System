const express =  require('express');
const employeeDetails = require('../models/employeedetails');
const employeedetails = require('../models/employeedetails');

const router = express.Router();

//save post
router.post('/employee/save',async(req,res)=>{
    try{

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


//View Spread Records
router.get('employee/view', async (req, res) => {
    try {
        const records = await employeedetails.find().exec();
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


     

module.exports = router;
