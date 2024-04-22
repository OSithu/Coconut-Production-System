const express =  require('express');
const taskSheduleRoute = require('../models/taskSheduleModel');



const router = express.Router();

//save post
router.post('/Shedule/save',async(req,res)=>{
    try{

    let newShedule = new taskSheduleRoute(req.body);

   //save records
   await newShedule.save();

   // return success responde
   return res.status(200).json({
    success:"Shedule added successfully"
});
    }catch (err){
        return res.status(400).json({
            error:err.message
        });
        
    }
});


//get  Records
router.get('/viewShedule', async (req, res) => {
    try {
        const records = await taskSheduleRoute.find().exec();
        return res.status(200).json({
            success: true,
            existingShedule: records
        });
    } catch (err) {
        return res.status(400).json({
            error: err.message
        });
    }
});

//Update Records
router.put('/Shedule/update/:id', async (req, res) => {
    try {
        await taskSheduleRoute.findByIdAndUpdate(req.params.id, { $set: req.body }).exec();
        return res.status(200).json({
            success: "Shedule updated Successfully"
        });
    } catch (err) {
        return res.status(400).json({
            error: err.message
        });
    }
});

//Delete Records

router.delete('/Shedule/delete/:id', async (req, res) => {
    try {
        const deleteShedule = await taskSheduleRoute.findByIdAndDelete(req.params.id).exec();
        return res.status(200).json({
            message: "Shedule deleted Successfully",
            deleteShedule: deleteShedule
        });
    } catch (err) {
        return res.status(400).json({
            error: err.message
        });
    }
});

//Get Specific Employee
router.get("/viewShedule/:id", async (req, res) => {
    try {
        let SheduleID = req.params.id;
        let Shedule = await taskSheduleRoute.findById(SheduleID);
        if (!Shedule) {
            return res.status(404).json({ success: false, message: "Shedule not found" });
        }
        return res.status(200).json({ success: true, Shedule });
    } catch (err) {
        return res.status(400).json({ success: false, error: err.message });
    }
});


module.exports = router;
