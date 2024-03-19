const express =  require('express');
const employeeDetails = require('../models/employeedetails');


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





module.exports = router;






     

module.exports = router;
