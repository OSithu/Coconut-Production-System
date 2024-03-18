//import express
const express = require("express");

//import mongoose
const mongoose = require("mongoose");

//import bodyParser-json file format convert to java script obj
const bodyParser = require("body-parser");

const app = express();

//import routes
const routefertilization = require("./routes/fertilizationroutes");
const treeRoute = require("./routes/treeRoute");
const productRoute = require("./routes/productRoute");
const spreadRoute = require("./routes/diseasespread");
const qualityRoutes = require("./routes/qualitycontrolRoutes");
const financeRoute = require("./routes/financeRoute");
const cusRoutes = require('./routes/customerroutes');

//app middleware
app.use(bodyParser.json());

//route middleware
app.use(routefertilization);
app.use(treeRoute);
app.use(productRoute);
app.use(spreadRoute);
app.use(qualityRoutes);
app.use(financeRoute);
app.use(cusRoutes);

//declaring server running port
const port = 8000;
app.listen(port, () => {
  console.log(`App is running on ${port}`);
});

//creating DB connection
const db_url =
  "mongodb+srv://itpproject:bvS6Hoo0uVhIKL3v@atlascluster.ktimcix.mongodb.net/CoconutProduction";
mongoose
  .connect(db_url, {
    useNewUrlParser: true,
    useUniFiedTopology: true,
  })
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => console.log("DB connection error", err));


  //import cors
  const cors = require('cors');

  //cors middleware
  app.use(cors());
