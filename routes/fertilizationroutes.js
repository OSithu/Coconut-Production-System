const express = require('express');
const fertilization = require('../models/fertilizationModel');
const Trees = require('../models/treeModel');
const nodemailer = require('nodemailer');

// Send requests 
const router = express.Router();

// Function to mark fertilization as completed and send reminder email
async function sendReminderEmail(TreeNo,UreaAmount,EppawalaRockPhosphateAmount,MuriateOfPotasiumAmount,DolamiteAmount) {
    try {
        // Mark fertilization as completed in the database
        await fertilization.updateMany({ TreeNo: TreeNo,UreaAmount:UreaAmount,EppawalaRockPhosphateAmount:EppawalaRockPhosphateAmount, MuriateOfPotasiumAmount:MuriateOfPotasiumAmount,DolamiteAmount:DolamiteAmount }, { $set: { completed: true } });

        // Set up nodemailer transporter (you need to provide your email service credentials)
        let transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'jayakodykoppara@gmail.com', // your email
                pass: 'nbnc qiai vagz ppba'
            }
        });

        // Email content
        let mailOptions = {
            from: 'jayakodykoppara@gmail.com',
            to: 'nimsidinara@gmail.com', // recipient email
            subject: 'Fertilization Record',
            // text: `Reminder: Tree with ID ${TreeNo} needs fertilization.`
            html: `
        <html>
            <head>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                    }
                    .container {
                        max-width: 600px;
                        margin: auto;
                        padding: 20px;
                        border: 1px solid #000000;
                        border-radius: 10px;
                    }
                    h1 {
                        color: #013220;
                    }
                    p {
                        margin-bottom: 10px;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>Fertilization Reminder</h1>
                    <p>Dear Mr.Perera,</p>
                    <p>This is a message that the tree with ID <strong>${TreeNo}</strong> is fertilized.</p>
                    <p>This is the fertilization Amounts that used for:${TreeNo}</p>
                    <ul>
                        <li><strong>Urea Amount:</strong> ${UreaAmount}g</li>
                        <li><strong>Eppawala Rock Phosphate:</strong>  ${EppawalaRockPhosphateAmount}g</li>
                        <li><strong>Muriate Of Potasium:</strong> ${MuriateOfPotasiumAmount}g</li>
                        <li><strong>Dolomite:</strong>  ${DolamiteAmount}g</li>
                    </ul>
                    <p>Thank you.</p>
                    <h4>fertilization Manager</h4><br>
                    <h4>Jayakody Koppara</h4>
                </div>
            </body>
        </html>`
        };

        // Send email
        await transporter.sendMail(mailOptions);

    } catch (err) {
        console.error('Error sending reminder email:', err);
    }
}

// Save Fertilization records
router.post('/fertilizationrec/save', async (req, res) => {
    try {
        // Check if the tree ID exists in the Trees collection
        const existingTree = await Trees.findOne({ treeID: req.body.TreeNo })
        if (!existingTree) {
            return res.status(400).json({ error: "TreeID is not available in database" })
        }

        // Create a new fertilization record
        let newFertilizationRecord = new fertilization(req.body);
        await newFertilizationRecord.save();

        // Extract fertilization amounts from req.body
        const { UreaAmount, EppawalaRockPhosphateAmount, MuriateOfPotasiumAmount, DolamiteAmount } = req.body;

        // Send reminder email
        await sendReminderEmail(req.body.TreeNo, UreaAmount, EppawalaRockPhosphateAmount, MuriateOfPotasiumAmount, DolamiteAmount);

        return res.status(200).json({
            success: "Details saved successfully!!."
        });

    } catch (err) {
        return res.status(400).json({
            error: err.message
        });
    }
});

    
//View Fertilization Records
router.get('/fertilizationrec', async (req, res) => {
    try {
        const fertilizationrecords = await fertilization.find().exec();
        return res.status(200).json({
            success: true,
            existingRecords: fertilizationrecords
        });
    } catch (err) {
        return res.status(400).json({
            error: err.message
        });
    }
}); 

//Get Specific Record
router.get("/fertilizationrec/:id", async (req, res) => {
    try {
        let fertilizationId = req.params.id;
        let record = await fertilization.findById(fertilizationId);
        if (!record) {
            return res.status(404).json({ success: false, message: "Record not found" });
        }
        return res.status(200).json({ success: true, record });
    } catch (err) {
        return res.status(400).json({ success: false, error: err.message });
    }
});


//Update fertilization Records

router.put('/fertilizationrec/update/:id', async (req, res) => {
    

    try {
        const existingTree = await Trees.findOne({treeID: req.body.TreeNo})
        if(!existingTree){
            return res.status(400).json({ error: "TreeID is not available in database"})
        }
        await fertilization.findByIdAndUpdate(req.params.id, { $set: req.body }).exec();

        return res.status(200).json({

            success: "Record updated Successfully"

        });

    } catch (err) {

        return res.status(400).json({

            error: err.message

        });

    }

});

//Delete fertilization Records
 
router.delete('/fertilizationrec/delete/:id', async (req, res) => {
    try {
        const deletedfertilizationRecords = await fertilization.findByIdAndDelete(req.params.id).exec();
        return res.status(200).json({
            message: "Records deleted Successfully",
            deletedRecords: deletedfertilizationRecords
        });
    } catch (err) {
        return res.status(400).json({
            error: err.message
        });
    }
});
 
module.exports =router;