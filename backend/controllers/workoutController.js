const Workout = require("../models/workoutModel")
const mongoose=require("mongoose")

// to get all the workouts
const getWorkouts = async (req, res) => {
    const user_id = req.user._id
    try {
        const workouts = await Workout.find({user_id}).sort({ createdAt: -1 })
        res.status(200).json(workouts)
    } catch (e) {
        res.status(404).json({ error: e.message })
    }
}

// to create a workout
const workoutCreate = async (req, res) => {
    const { title, reps, load } = req.body

    const list = []
    if(!title){
        list.push('title')
    }
    if(!reps){
        list.push('reps')
    }
    if(!load){
        list.push('load')
    }

    if(list.length>0){
        return res.status(400).json({error:"Fill all the required fields",list})
    }

    
    try {
        const user_id = req.user._id
        const workout = new Workout({ title, reps, load,user_id})
        await workout.save()
        res.status(200).json(workout)
    } catch (e) {
        res.status(400).json({ error: e.message})
        // res.status(400).json({error:"Fill all the required fields",list})
    }
}

// to get a single workout
const getSingleWorkout= async (req,res)=>{
        const { id }=req.params

        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({error:"NO such Workout"})
        }
        const workout=await Workout.findById(id)
        if(!workout) {
            return res.status(404).json({ error: "No Such workout" })
        }
        res.status(200).json(workout)
    
}

// to delete a workout
const deleteWorkout= async (req,res)=>{
    const { id }=req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"NO such Workout"})
    }
    const workout =  await Workout.deleteOne({_id:id})

    if(!workout){
        return res.status(404).json({error:"NO such Workout"})
    }
    res.status(200).json(workout)

}

// to update a workout
const updateWorkout= async(req,res)=>{
    const { id }=req.params

        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({error:"NO such Workout"})
        }
        const workout=await Workout.findOneAndUpdate({_id:id},{
            ...req.body
        })
        if(!workout) {
            return res.status(404).json({ error: "No Such workout" })
        }
        res.status(200).json(workout)
    
}

module.exports = {
    workoutCreate,
    getWorkouts,
    getSingleWorkout,
    deleteWorkout,
    updateWorkout
}
