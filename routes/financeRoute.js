const express = require("express");
const finance = require('../models/financeModels');

const router = express.Router();

//save posts
router.post("/financeRecords/save", async (req, res) => {
  try {
    let newTransaction = new finance(req.body);

    await newTransaction.save();

    return res.status(200).json({
      success: "Details saved successfully",
    });
  } catch (err) {
    return res.status(400).json({
      error: err,
    });
  }
});



//get posts

// router.get('/financeRecords',async(req,res)=>{
//     finance.find().exec((err,financerecords)=>{
//         if(err){
//             return res.status(400).json({
//                 error:err
//             });
//         }
//         return res.status(200).json({
//             success:true,
//             exsistingfinance:financerecords
//         });
//     });
// });

router.get("/financeRecords", async (req, res) => {
    try {
      const financerecords = await finance.find().exec();
  
      return res.status(200).json({
        success: true,
        existingfinance: financerecords,
      });
    } catch (err) {
      return res.status(400).json({
        error: err.message,
      });
    }
  });

//get a specific post

// router.get("/financeRecords/:id",(req,res)=>{

//     let recordId = req.params.id;

//     finance.findById(recordId,(err,post)=>{
//         if(err){
//             return res.status(400).json({success:false,err});
//         }
//         returnres.status(200).json({
//             success:true,
//             post
//         });
//     });
// });

//Get Specific Post
router.get("/financeRecords/:id", async (req, res) => {
    try {
        let financerecordID = req.params.id;
        let financerecord = await finance.findById(financerecordID);
        if (!financerecord) {
            return res.status(404).json({ success: false, message: "Record not found" });
        }
        return res.status(200).json({ success: true, financerecord });
    } catch (err) {
        return res.status(400).json({ success: false, error: err.message });
    }
});


//update finaceRoute

// router.put('/financerecords/update/:id',async(req,res)=>{
//     financeModels:findByIdAndUpdate(
//         req.params.id,
//         {
//             $set:req.body
//         },
//         (err,financerecords)=>{
//             if(err){
//                 return res.status(400).json({error:err});
//             } 
//             return res.status(200).json({
//                 success:"Updated Successfully",
//             });
//              }
    
//     );
// });


router.put("/financerecords/update/:id", async (req, res) => {
    try {
      await finance.findByIdAndUpdate(req.params.id, { $set: req.body }).exec();
  
      return res.status(200).json({
        success: "Updated Successfully",
      });
    } catch (err) {
      return res.status(400).json({
        error: err.message,
      });
    }
  });

  //delete

  router.delete("/financerecords/delete/:id", async (req, res) => {
    try {
      const deletedRecord = await finance.findByIdAndDelete(
        req.params.id
      ).exec();
  
      return res.json({
        message: "Delete Successfully",
        deletedRecord,
      });
    } catch (err) {
      return res.status(400).json({
        message: "Deleted unsuccessfully",
        error: err.message,
      });
    }
  });

  module.exports = router;