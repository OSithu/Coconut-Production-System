const express = require('express');
const Posts = require('../models/posts');

const router= express.Router();

//save posts

router.post('/post/save',(req,res)=>{

    let newPost = new Posts()
})