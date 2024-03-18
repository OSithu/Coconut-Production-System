const express = require ('express');
const CustomerDetails = require('../models/customerposts');

const router = express.Router();

//save posts
router.post('/post/save',(req,res)=>{
    let newCustomer = new CustomerDetails(req.body);

    newPost.save((err)=>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:"Details saved successfully"
        });
    });
});

module.exports = router;