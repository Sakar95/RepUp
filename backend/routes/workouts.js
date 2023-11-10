const express = require('express')
const requireAuth = require('../middleware/requireAuth')
const router = express.Router()

const {
    workoutCreate,
    getWorkouts,
    getSingleWorkout,
    deleteWorkout,
    updateWorkout
} = require("../controllers/workoutController")

router.use(requireAuth)

router.get("/", getWorkouts)

router.get("/:id",getSingleWorkout)

router.post("/", workoutCreate)

router.delete("/:id", deleteWorkout)

router.patch("/:id",updateWorkout)

module.exports = router