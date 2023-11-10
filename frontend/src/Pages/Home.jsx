import { useEffect, React } from 'react'
import Card from '../components/Card'
import WorkoutFrom from '../components/WorkoutFrom'
import { useWorkoutContext } from '../hook/useWorkoutContext'
import NoWorkout from '../components/NoWorkout'
import { useAuthContext } from "../hook/useAuthContext"
// import NavBar from '../components/Navbar'

export default function Home() {
  const { workouts, dispatch } = useWorkoutContext()
  const { user } = useAuthContext()
  // const [workouts,setWorkouts]=useState(null)
  useEffect(() => {
    const fetchWorkout = async () => {
      const response = await fetch('/api/workouts', {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
      const json = await response.json()
      if (response.ok) {
        dispatch({ type: 'SET_WORKOUT', payload: json })
        // setWorkouts(json)
      }
    }

    if (user) {
      fetchWorkout()
    }
    // fetchWorkout()
  }, [dispatch, user])

  return (
    <>
      {/* <NavBar/> */}
      <div className="data mt-20 flex ">
        <div className="flex-1">

          <WorkoutFrom />

        </div>
        <div className="flex-1">

          {
            Array.isArray(workouts) && workouts.length > 0 ? (workouts.map(workout => (
              <Card
                exercise={workout.title}
                load={workout.load}
                reps={workout.reps}
                date={workout.createdAt}
                id={workout._id}
                key={workout._id}
              />
            ))) : <NoWorkout />
          }
        </div>
        
      </div>
    </>

  )
}

