const bcrypt= require('bcrypt')
const User=require("../models/User")
const jwt=require('jsonwebtoken')

require('dotenv').config()

exports.register= async (req,res)=>{
    try {

        console.log("inside register")
        console.log(req.body)
        let {fullName, email, phone,password, role}=req.body;

        const existingUser= await User.findOne({email});

        console.log(existingUser)

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User Already Exists",
            })
        }
         
        //securing the password

        let hashedPassword;
        try {
            hashedPassword=await bcrypt.hash(password,10);
            console.log("hashedPassword",hashedPassword)
            password=hashedPassword;
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Error in hashing password",
            })
        }

        let user= await User.create({
            fullName,email,phone,password,role
        })

        console.log(user)

        return res.status(200).json({
            success : true,
            message : "User Created Successfully",
            data : user
        });
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            message: "User cannot be register,Please try again later",
        })
    }
}

exports.login= async (req,res) =>{
    try {
        const {email,password}=req.body;

        if(!email || !password){
            return res.status(400).json({
                success:false,
                message : "Please fill all the details carefully",
            })
        }

        // checking for registered user

        let user = await User.findOne({email})
        if(!user)
        {
            return res.status(401).json({
                success : false,
                message : "User does not exist",
            });
        }

        const payload = {
            email : user.email,
            id : user._id,
            role : user.role,
        };

        if(await bcrypt.compare(password,user.password)){
            let token = jwt.sign(payload,process.env.JWT_SECRET,{
                expiresIn:"2h",
            });

            user = user.toObject();
            user.token = token;
            user.password = undefined;

            res.status(200).json({
                success:true,
                token,
                user,
                message:"user logged in successfully"
            })
        }

        else {
            // password not matching
            return res.status(403).json({
                success : false,
                message : "Password is not matching",
            })
        }

    } 
    catch (error) {
        console.error(error)
        return res.status(500).json({
            success : false,
            message : "Login failed" 
        })
    }
}

exports.getAllUsers =async (req,res) =>{
    try {
        const users= await User.find();
        res.status(200).json({
            success:true,
            users,
            message:"User fetched successfully"
        });
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            message: "User cannot be shown",
        })
    }
}

exports.getUserDetails = async (req, res) => {
    try {
      const user = req.user;
      res.status(200).json({
        success: true,
        user: {
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Server error',
      });
    }
  };