//import express
const express = require("express");

//import mongoose
const mongoose = require("mongoose");

//import bodyParser-json file format convert to java script obj
const bodyParser = require("body-parser");

//import cors
const cors = require('cors');

const app = express();

//import routes
const routefertilization = require("./routes/fertilizationroutes");
const treeRoute = require("./routes/treeRoute");
const productRoute = require("./routes/productRoute");
const spreadRoute = require("./routes/diseasespread");
const qualityRoutes = require("./routes/qualitycontrolRoutes");
const financeRoute = require("./routes/financeRoute");
const cusRoutes = require('./routes/customerroutes');
const employeeRoutes =  require('./routes/employeedetails');
const ordRoutes = require("./routes/orderRoute");
const productCntRoute = require("./routes/productCntRoute");
const blockRoute = require("./routes/blockRoute");
const harvestRoute = require("./routes/harvestRoute");
const harvestScheduleRoute = require("./routes/harvestScheduleRoute");
const budgetRoute = require("./routes/budgetRoute");
const pestRecordRoute = require("./routes/pestRecordsRoute");
const taskSheduleRoute = require("./routes/taskSheduleRoute");
const reminderRoute = require("./routes/remindrRoute");
const pesticidesRoute = require("./routes/pesticidesRoute");
const diseaseRoute = require("./routes/diseaseRoute");
const salaryRoutes = require('./routes/salaryRoutes');
const workhours = require('./routes/WorkHoursRoute');



//app middleware
app.use(bodyParser.json());
app.use(cors());

//route middleware
app.use(routefertilization);
app.use(treeRoute);
app.use(productRoute);
app.use(spreadRoute);
app.use(qualityRoutes);
app.use(financeRoute);
app.use(cusRoutes);
app.use(employeeRoutes);
app.use(ordRoutes);
app.use(productCntRoute);
app.use(blockRoute);
app.use(harvestRoute);
app.use(harvestScheduleRoute);
app.use(budgetRoute);
app.use(pestRecordRoute);
app.use(taskSheduleRoute);
app.use(pesticidesRoute);
app.use(diseaseRoute);
app.use(salaryRoutes);
app.use(workhours);



//declaring server running port
const port = 8000;
app.listen(port, () => {
  console.log(`App is running on ${port}`);
});

//creating DB connection
const db_url =
  "mongodb+srv://itpproject:bvS6Hoo0uVhIKL3v@atlascluster.ktimcix.mongodb.net/CoconutProduction";
mongoose.connect(db_url, {
    useNewUrlParser: true,
    useUniFiedTopology: true,
})
.then(() => {
   console.log("DB connected");
})