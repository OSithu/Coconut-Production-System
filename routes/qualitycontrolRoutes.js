const express = require("express");
const qcmposts = require('../models/qcmposts');

const router = express.Router();

//save posts
router.post("/qualityrecords/save", async (req, res) => {
  try {
    let newRecord = new qcmposts(req.body);

    await newRecord.save();

    return res.status(200).json({
      success: "Details saved successfully",
    });
  } catch (err) {
    return res.status(400).json({
      error: err.message
    });
  }
});

//get posts
router.get("/qrecords", async (req, res) => {
  try {
    const qualityrecords = await qcmposts.find().exec();

    return res.status(200).json({
      success: true,
      existingPosts: qualityrecords
    });
  } catch (err) {
    return res.status(400).json({
      error: err.message
    });
  }
});

//get a specific post

router.get("/qrecords/:id",(req,res)=> {

  let recordId = req.params.id;
  
  qcmposts.findById(recordId,(err,records) => {
    if(err){
       return res.status(400).json({success:false,err});
    }
    return res.status(200).json({
      success:true,
      records
    });
  });
  
});
  
  

//update posts
router.put("/qualityrecords/update/:id",async (req, res) => {
  try{
    await qcmposts.findByIdAndUpdate(req.params.id,{ $set: req.body}).exec();

    return res.status(200).json({
      success: "Updated Successfully",
    });
  }catch(err){
        return res.status(400).json({
           error: err.message,
        });
  }
});

//delete posts

router.delete("/qualityrecords/delete/:id",async (req, res) => {
  try{
    const deletedRecord = await qcmposts.findByIdAndRemove(req.params.id).exec();

    return res.json({
      message:"Delete Successfull",
      deletedRecord
    });
  }catch(err){
    if(err) return res.status(400).json({
      message:"Delete unsuccessfull",
      error:err.message,
    });
  }
});

module.exports = router;
