const express = require("express");
const router = express.Router();
const CustomerDetails = require("../models/customerposts");

// Save customer details
router.post("/cusDetails/save", async (req, res) => {
  try {
    let newCustomer = new CustomerDetails(req.body);

    await newCustomer.save();

    return res.status(200).json({ success: "Details saved successfully" });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

// Get all customer details
router.get("/cusDetails", async (req, res) => {
  try {
    const cusDetails = await CustomerDetails.find().exec();
    return res.status(200).json({ success: true, existingRecords: cusDetails });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

// Update customer details by ID
router.put("/cusDetails/update/:id", async (req, res) => {
  try {
    await CustomerDetails.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    }).exec();
    return res.status(200).json({ success: "Updated Successfully" });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

// Delete customer details by ID
router.delete("/cusDetails/delete/:id", async (req, res) => {
  try {
    const deletedRecords = await CustomerDetails.findByIdAndDelete(
      req.params.id
    ).exec();
    return res.json({ message: "Delete Successfully", deletedRecords });
  } catch (err) {
    return res
      .status(400)
      .json({ message: "Deleted unsuccessfully", error: err.message });
  }
});

//Get Specific customer details by ID
router.get("/cusDetails/:id", async (req, res) => {
  try {
    let cusID = req.params.id;
    let cusDetails = await CustomerDetails.findById(cusID);
    if (!cusDetails) {
      return res
        .status(404)
        .json({ success: false, message: "Record not found" });
    }
    return res.status(200).json({ success: true, cusDetails });
  } catch (err) {
    return res.status(400).json({ success: false, error: err.message });
  }
});

// Login route
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if user exists
    const user = await CustomerDetails.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if password matches
    if (password !== user.password) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Redirect user based on role
    let redirectUrl;
    if (user.userRole === "admin") {
      return res.json({ redirectTo: "/dashboard" }); // Assuming '/adminView' is your admin dashboard route
    } else if (user.userRole === "Customer") {
      return res.json({ redirectTo: `/ViewItems/${user.username}` }); // Assuming '/customerDashboard' is your customer dashboard route
    } else {
      return res.status(403).json({ message: "Unauthorized role" });
    }

    // If everything is fine, send success response with redirect URL
    res.status(200).json({ message: "Login successful", redirectUrl });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

//get details using username
router.get("/cusID/:username", async (req, res) => {
  try {
    let username = req.params.username;
    let cusDetails = await CustomerDetails.findOne({ username: username });
    if (!cusDetails) {
      return res
        .status(404)
        .json({ success: false, message: "Record not found" });
    }
    // Extract the _id from cusDetails
    const userDetails = cusDetails.toObject();
    return res.status(200).json({ success: true, userDetails });
  } catch (err) {
    return res.status(400).json({ success: false, error: err.message });
  }
});

//update customer details by username
router.put("/custDetails/update/:username", async (req, res) => {
  try {
    const { username } = req.params;

    await CustomerDetails.findOneAndUpdate({ username: username }, { $set: req.body }).exec();
    return res.status(200).json({ success: "Updated Successfully" });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

//delete details using username
router.delete("/custDetails/delete/:username", async (req, res) => {
  try {
    const { username } = req.params;

    const deletedRecords = await CustomerDetails.findOneAndDelete({ username: username }).exec();

    if (!deletedRecords) {
      return res.status(404).json({ message: "Record not found" });
    }
    return res.json({ message: "Delete Successfully", deletedRecords });
  } catch (err) {

    return res.status(400).json({ message: "Deleted unsuccessfully", error: err.message });
  }
});

module.exports = router;
