const express = require("express");
const OrderDetails = require("../models/orderModel");
const orderModel = require("../models/orderModel");

const router = express.Router();

//save posts
router.post("/orderDetails/save", async (req, res) => {
  try {
    let newOrder = new OrderDetails(req.body);

    await newOrder.save();

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
router.get("/orderDetails", async (req, res) => {
  try {
    const orderDetails = await OrderDetails.find().exec();
    return res.status(200).json({
      success: true,
      existingRecords: orderDetails,
    });
  } catch (err) {
    return res.status(400).json({
      error: err.message,
    });
  }
});

//update posts
router.put("/orderDetails/update/:id", async (req, res) => {
  try {
    await OrderDetails.findByIdAndUpdate(req.params.id, {
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
router.delete("/orderDetails/delete/:id", async (req, res) => {
  try {
    const deletedRecords = await OrderDetails.findByIdAndDelete(req.params.id).exec();

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

//Get Specific Post
router.get("/orderDetails/:id", async (req, res) => {
    try {
        let orderID = req.params.id;
        let orderDetails = await OrderDetails.findById(orderID);
        if (!OrderDetails) {
            return res.status(404).json({ success: false, message: "Record not found" });
        }
        return res.status(200).json({ success: true, orderDetails });
    } catch (err) {
        return res.status(400).json({ success: false, error: err.message });
    }
});


module.exports = router;