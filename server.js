//import express
const express = require('express');

//import mongoose
const mongoose = require('mongoose');

const app = express();

//declaring server running port
const port = 8000;
app.listen(port, () =>{
    console.log(`App is running on ${port}`);
});

//creating DB connection
const db_url = 'mongodb+srv://itpproject:bvS6Hoo0uVhIKL3v@atlascluster.ktimcix.mongodb.net/Jayakody_Koppara';
mongoose.connect(db_url)
.then(() =>{
    console.log('DB connected');
})
.catch((err) => console.log('DB connection error',err));


