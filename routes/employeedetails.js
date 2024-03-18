const express =  require('express');
const employeeDetails = require('../models/employeedetails')

const router = express.Router();

//save post
router.post('/employee/save',(req,res)=>{

    let newEmployee = new employeeDetails(req.body);

    newEmployee.save((err) =>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:"employee added successfully"
        });
    });
});

module.exports = router;
