require('dotenv').config()
const express = require("express")
const mongoose= require("mongoose")

const workoutRoutes = require("./routes/workouts")
const userRoutes = require("./routes/userRoutes")
const app =express()
app.use(express.json())

app.use((req,res,next)=>{
    console.log(req.path,req.method)
    next()
})

app.use('/api/workouts',workoutRoutes)
app.use('/api/user',userRoutes)


async function run(){
    try{
        mongoose.connect(process.env.MONGO_URL)
        app.listen(process.env.PORT,()=>{
            console.log("Connected to db Listening on port ",process.env.PORT)
        })
    }catch(e){
        console.log(e.message)
    }
}
run()
