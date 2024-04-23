const express = require('express');
const Blocks = require('../models/blockModel');
const Trees = require('../models/treeModel')

const router = express.Router();

//create
router.post('/blocks/save',async (req,res)=>{
    //instantiation 
    try{
        // Check if treeID already exists in the database
    const existingBlock = await Blocks.findOne({ blockName: req.body.blockName });
    if (existingBlock) {
        return res.status(400).json({ error: "Block already exists" });
    }
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
  router.patch("/blocks/update/:id", async (req, res) => {
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

  router.delete("/blocks/delete/:id", async (req, res) => {
    try {
        // Find the block to delete
        const blockDelete = await Blocks.findByIdAndDelete(req.params.id).exec();
        
        // If block is found and deleted
        if (blockDelete) {
            // Delete treeDetails associated with the blockName
            await Trees.deleteMany({ blockName: blockDelete.blockName }).exec();
            
            return res.json({
                message: "Delete Successfully",
                blockDelete,
            });
        } else {
            return res.status(404).json({
                message: "Block not found",
            });
        }
    } catch (err) {
        return res.status(500).json({
            message: "Internal Server Error",
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

//get tree count
router.get("/blockCount", async (req, res) => {
  try {
      let count = await Blocks.countDocuments();
      return res.status(200).json({ success: true, count: count });
  } catch (err) {
      return res.status(400).json({ success: false, error: err.message });
  }
});


module.exports = router;