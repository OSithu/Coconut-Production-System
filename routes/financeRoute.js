const express = require("express");
const finance = require('../models/financeModels');
const nodemailer = require('nodemailer');

const router = express.Router();

//save posts
router.post("/financeRecords/save", async (req, res) => {
  try {
    let newTransaction = new finance(req.body);

    await newTransaction.save();

    return res.status(200).json({
      success: "Details saved successfully",
    });
  } catch (err) {
    return res.status(400).json({
      error: err,
    });
  }
});



//get posts

// router.get('/financeRecords',async(req,res)=>{
//     finance.find().exec((err,financerecords)=>{
//         if(err){
//             return res.status(400).json({
//                 error:err
//             });
//         }
//         return res.status(200).json({
//             success:true,
//             exsistingfinance:financerecords
//         });
//     });
// });

router.get("/financeRecords", async (req, res) => {
    try {
      const financerecords = await finance.find().exec();
  
      return res.status(200).json({
        success: true,
        existingfinance: financerecords,
      });
    } catch (err) {
      return res.status(400).json({
        error: err.message,
      });
    }
  });

//get a specific post

// router.get("/financeRecords/:id",(req,res)=>{

//     let recordId = req.params.id;

//     finance.findById(recordId,(err,post)=>{
//         if(err){
//             return res.status(400).json({success:false,err});
//         }
//         returnres.status(200).json({
//             success:true,
//             post
//         });
//     });
// });

//Get Specific Post
router.get("/financeRecords/:id", async (req, res) => {
    try {
        let financerecordID = req.params.id;
        let financerecord = await finance.findById(financerecordID);
        if (!financerecord) {
            return res.status(404).json({ success: false, message: "Record not found" });
        }
        return res.status(200).json({ success: true, financerecord });
    } catch (err) {
        return res.status(400).json({ success: false, error: err.message });
    }
});


//update finaceRoute

// router.put('/financerecords/update/:id',async(req,res)=>{
//     financeModels:findByIdAndUpdate(
//         req.params.id,
//         {
//             $set:req.body
//         },
//         (err,financerecords)=>{
//             if(err){
//                 return res.status(400).json({error:err});
//             } 
//             return res.status(200).json({
//                 success:"Updated Successfully",
//             });
//              }
    
//     );
// });


router.put("/financerecords/update/:id", async (req, res) => {
    try {
      await finance.findByIdAndUpdate(req.params.id, { $set: req.body }).exec();
  
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

  router.delete("/financerecords/delete/:id", async (req, res) => {
    try {
      const deletedRecord = await finance.findByIdAndDelete(
        req.params.id
      ).exec();
  
      return res.json({
        message: "Delete Successfully",
        deletedRecord,
      });
    } catch (err) {
      return res.status(400).json({
        message: "Deleted unsuccessfully",
        error: err.message,
      });
    }
  });

// Function to send emails to assigned employees
async function assignInvoiceEmail() {
  try {

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;

      // Compose email content
      const emailContent = `Hello,\n\nThis is to remind that youhave to submit the invoice details for the transactions conducted during this month.Please ensure that all necessary invoice documentation is included with your submission.\n The deadline for submitting the invoice details is 25th of ${currentMonth}\nThank you\n\nFinance manager\nJayakody Koppara Stores`;

      // Set up email transporter
      const transporter = nodemailer.createTransport({
          service: 'Gmail',
          auth: {
              user: 'jayakodykoppara@gmail.com',
              pass: 'nbnc qiai vagz ppba'
          },
          tls: {
              rejectUnauthorized: false
          }
      });
      
      // Send emails to assigned employees
      transporter.sendMail({
        from: 'jayakodykoppara@gmail.com',
        to: 'sanathJayasooriya51@gmail.com',
        subject: `Reminder: Submission of invoice details for ${currentMonth} Transactions`,
        text: emailContent
    }, (error, info) => {
        if (error) {
            console.log('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });

      console.log('Emails sent successfully to assigned employees.');
  } catch (error) {
      console.log('Error:', error);
  }
}

// router.post("/sendemail", async (req, res) => {
//   try {

//     await assignInvoiceEmail();

//     return res.status(200).json({
//       success: "Email sent successfully",
//     });
//   } catch (err) {
//     return res.status(400).json({
//       error: err,
//     });
//   }
// });

router.post('/send-email', async (req, res) => {
  try {
      await assignInvoiceEmail();
      res.status(200).json({ success: true });
  } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ success: false, error: 'Failed to send email.' });
  }
});


  module.exports = router;