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

module.exports = router;

//get posts

router.get('/financeRecords',async(req,res)=>{
    finance.find().exec((err,financerecords)=>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:true,
            exsistingfinance:financerecords
        });
    });
});

//update finaceRoute

router.put('/financerecords/update/:id',async(req,res)=>{
    financeModels:findByIdAndUpdate(
        req.params.id,
        {
            $set:req.body
        },
        (err,financerecords)=>{
            if(err){
                return res.status(400).json({error:err});
            } 
            return res.status(200).json({
                success:"Updated Successfully",
            });
             }
    
    );
});