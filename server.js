//import express
const express = require('express');

//import mongoose
const mongoose = require('mongoose');

//import bodyParser-json file format convert to java script obj
const bodyParser=require('body-parser');

const app = express();

//import routes
const routefertilization = require('./routes/fertilizationroutes');

//app middleware
app.use(bodyParser.json());

//route middleware
app.use(routefertilization);

//declaring server running port
const port = 8000;
app.listen(port, () =>{
    console.log(`App is running on ${port}`);
});

//creating DB connection
const db_url = 'mongodb+srv://itpproject:bvS6Hoo0uVhIKL3v@atlascluster.ktimcix.mongodb.net/';
mongoose.connect(db_url,{
    useNewUrlParser:true,
    useUniFiedTopology:true
})
.then(() =>{
    console.log('DB connected');
})
.catch((err) => console.log('DB connection error',err));


