const express = require('express');
const router = express.Router();
const Reminder = require('../models/reminder');

router.get('/',async(req,res)=>{
    try{
        const reminders = await reminder.find().sort({created_at: -1});
        res.json(reminders);
    }catch(err){
        res.status(500).json({message:err.message});
    }
});

module.exports= router;