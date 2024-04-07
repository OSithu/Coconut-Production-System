const express = require('express');
const Blocks = require('../models/blockModel');

const router = express.Router();

//create
router.post('/blocks/save',async (req,res)=>{
    //instantiation 
    try{
        let newBlock = new Blocks(req.body);
        await newBlock.save();
        return res.status(200).json({
        success:"Details saved successfully."
    });

    }catch(err){
        return res.status(400).json({
                error:err.message
            });
    }
}); 

//read
router.get("/blocks", async (req, res) => {
  try {
      const blocks = await Blocks.find().exec();

      const formattedBlock = blocks.map(block => ({
        ...block.toObject(),
        lastHarvested: block.lastHarvested?.toISOString()?.split('T')[0], // Extracting only the date part
        nextHarvesting: block.nextHarvesting?.toISOString()?.split('T')[0],
        lastFertilized: block.lastFertilized?.toISOString()?.split('T')[0],
        nextFertilization: block.nextFertilization?.toISOString()?.split('T')[0]
      }));
  
      return res.status(200).json({
        success: true,
        existingBlocks: formattedBlock,
      });
    } catch (err) {
      return res.status(400).json({
        error: err.message,
      });
    }
});

  //update
  router.put("/blocks/update/:id", async (req, res) => {
    try {
      await Blocks.findByIdAndUpdate(req.params.id, { $set: req.body }).exec();
  
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
  router.delete("/blocks/delete/:id", async (req, res) => {
    try {
      const blockDelete = await Blocks.findByIdAndDelete(req.params.id).exec();
  
      return res.json({
        message: "Delete Successfully",
        blockDelete,
      });
    } catch (err) {
      return res.status(400).json({
        message: "Unsuccessfull",
        error: err.message,
      });
    }
  });

  //get a secific record

  router.get("/blocks/:id", async (req, res) => {
    try {
        let blockID = req.params.id;
        let block = await Blocks.findById(blockID);
        if (!block) {
            return res.status(404).json({ success: false, message: "Details not found" });
        }
        return res.status(200).json({ success: true, block });
    } catch (err) {
        return res.status(400).json({ success: false, error: err.message });
    }
});


module.exports = router;