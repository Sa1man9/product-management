const express = require('express')
const router= express.Router();

const { auth,isAdmin } =require('../middleware/auth');

const {register,login,getAllUsers,getUserDetails}=require("../controller/Auth");

router.post("/register",register);
router.post("/login",login);
router.get('/getAllUser',auth,getAllUsers);
router.get('/me', auth, getUserDetails);

module.exports=router