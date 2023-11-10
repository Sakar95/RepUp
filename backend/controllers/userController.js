const User = require("../models/userModel")
require('dotenv').config()
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")


const createToken=(_id)=>{
    return jwt.sign({_id},process.env.SECRET,{expiresIn:'3d'})
 }


// signUp
const usersignUp = async (req,res)=>{
    const {name,email,password} = req.body

    try{
        const user = await  User.signup(name,email,password)
        const token = await createToken(user._id)
        res.status(200).json({name,email,token})
    }catch(e){
        res.status(400).json({error:e.message})
    }
    // res.json({mssg: "Succesfully signUp"})
    
}

// login
const userlogin = async (req,res) =>{
    const {name,email,password} = req.body
    try{
        const user = await  User.login(name,email,password)
        const token = await createToken(user._id)
        res.status(200).json({name,email,token})
    }catch(e){
        res.status(400).json({error:e.message})
    }
    // res.json({mssg:"SignUp"})
}


module.exports = {
    userlogin,
    usersignUp
}


