const express = require('express');
const trees = require('../models/treeModel');

const router = express.Router();

//save details
router.post('/tree/save',(req,res)=>{
    let newTree = new trees(req.body);
    newTree.save((err) =>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success: "Details saved successfully"
        });
    });
});

module.exports = router;