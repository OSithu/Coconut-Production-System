const express = require('express');
const trees = require('../models/treeModel');

const router = express.Router();

router.post('/tree/save',async (req,res)=>{
    //instantiation 
    try{
        let newTree = new trees(req.body);
        await newTree.save();
        return res.status(200).json({
        success:"Details saved successfully."
    });

    }catch(err){
        return res.status(400).json({
                error:err.message
            });
    }
}); 


module.exports = router;