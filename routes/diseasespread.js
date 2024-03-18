const express = require('express');

// Import our user model
const Spread_Records = require('../models/diseasespread');

const router = express.Router();

//Create Spread Record

router.post('/diseasespread/create', async (req, res) => {
    try {
        // Create a new Records instance
        let newSpread = new Spread_Records(req.body);

        // Save the new Records
        await newSpread.save();

        // Return success response
        return res.status(200).json({
            success: "Spread Record saved Successfully"
        });
    } catch (err) {
        // Return error response 
        return res.status(400).json({
            error: err.message
        });
    }
});

module.exports = router;
