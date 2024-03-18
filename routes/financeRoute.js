const express = require('express');
const finance = require('../models/financeModels');

const router= express.Router();

//save posts

router.post('/post/save',(req,res)=>{

    let newPost = new finance(req.body);

    newPost.save((err) =>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:"Posts saved successfully"
        });
    });
});

module.exports = router;