const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const validator = require("validator")
const Schema = mongoose.Schema



const userSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    
    },
    isVerified: {
        type: Boolean,
        default: false,
      },
      verificationToken: {
        type: String,
      },

})

// Static signup method

userSchema.statics.signup = async function (name,email,password){

    if(!email || !password || !name) {
        throw Error('All the fields are required')
    }
    if(!validator.isEmail(email)){
        throw Error('Not a valid Email')
    }
    if(!validator.isStrongPassword(password)){
        throw Error('Enter a strong password')
    }

    const exist = await this.findOne({email})
    if(exist){
        throw Error('email Alreday in Use')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password,salt)

    const user = await this.create({name,email, password:hash})

    return user
}

// login static method

userSchema.statics.login = async function(name,email,password){
    if(!email || !password || !name) {
        throw Error('All the fields are required')
    }
    if(!validator.isEmail(email)){
        throw Error('Not a valid Email')
    }
    if(!validator.isStrongPassword(password)){
        throw Error('Enter a strong password')
    }

    const user = await this.findOne({email})
    if(!user){
        throw Error('User not found')
    }
    const match = await bcrypt.compare(password,user.password)
    if(name != user.name || !match){
        throw Error('Enter valid credentials')
    }
     
    return user

}


module.exports=mongoose.model("User",userSchema)

