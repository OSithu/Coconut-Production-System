const express = require("express");
const CustomerDetails = require("../models/customerposts");
const customerposts = require("../models/customerposts");

const router = express.Router();

//save posts
router.post("/cusDetails/save", async (req, res) => {
  try {
    let newCustomer = new CustomerDetails(req.body);

    await newCustomer.save();

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

// router.get('/cusDetails',(req,res)=>{
//   CustomerDetails.find().exec((err,cusDetails) =>{
//     if(err){
//       return res.status(400).json({
//         error:err
//       });
//     }
//     return res.status(200).json({
//       success: true,
//       existingRecords:cusDetails,
//     });
//   });
// });

//get posts
router.get("/cusDetails", async (req, res) => {
  try {
    const cusDetails = await CustomerDetails.find().exec();
    return res.status(200).json({
      success: true,
      existingRecords: cusDetails,
    });
  } catch (err) {
    return res.status(400).json({
      error: err.message,
    });
  }
});

//update posts
// router.put('/cusDetails/update/:id',(req,res)=>{
//   CustomerDetails.findByIdAndUpdate(
//     req.params.id,
//     {
//       $set: req.body,
//     },
//     (err, cusDetails) => {
//       if(err) {
//         return res.status(400).json({ error: err });
//       }

//       return res.status(200).json({
//         success: "Updated successfully",
//       });
//     }
//   );
// });

//update posts
router.put("/cusDetails/update/:id", async (req, res) => {
  try {
    await CustomerDetails.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    }).exec();

    return res.status(200).json({
      success: "Updated Successfully",
    });
  } catch (err) {
    return res.status(400).json({
      error: err.message,
    });
  }
});

//delete post
// router.delete("/cusDetails/delete/:id", (req, res) => {
//   CustomerDetails.findByIdAndDelete(req.params.id).exec(
//     (err, deletedRecords) => {
//       if (err)
//         return res.status(400).json({
//           message: "Delete unsuccessful",
//           err,
//         });
//       return res.json({
//         message: "Delete Successfull",
//         deletedRecords,
//       });
//     }
//   );
// });


//delete post
router.delete("/cusDetails/delete/:id", async (req, res) => {
  try {
    const deletedRecords = await CustomerDetails.findByIdAndDelete(req.params.id).exec();

    return res.json({
      message: "Delete Successfully",
      deletedRecords,
    });
  } catch (err) {
    return res.status(400).json({
      message: "Deleted unsuccessfully",
      error: err.message,
    });
    }
  });


module.exports = router;
