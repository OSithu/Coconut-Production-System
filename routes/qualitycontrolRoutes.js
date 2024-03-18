const express = require('express');
const qcmposts = require('../models/qcmposts');

const router = express.Router();

//save posts
router.post('/qualityrecords/save',(req,res)=>{

    let newRecord = new qcmposts(req,body);

    newRecord.save((err) =>{
        if(err){
            return res.status(400 ).json({
                error:err
            });
        }
        return res.status(200).json({
            success:"Saved successfully"
        });
    });

});

module.exports = router;
