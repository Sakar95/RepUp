
import { useWorkoutContext } from '../hook/useWorkoutContext';
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { FaTrash } from 'react-icons/fa';
import { useAuthContext } from '../hook/useAuthContext';

const Card = ({ exercise, load, reps, date, id }) => {
  const { dispatch } = useWorkoutContext();
  const {user} = useAuthContext()

  const handleDelete = async () => {
    if(!user){
      return 
    }
    try {
      const response = await fetch("/api/workouts/" + id, {
        method: "DELETE",
        headers:{
          'Authorization': `Bearer ${user.token}`
        }
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: 'DELETE_WORKOUT', payload: { _id: id } });
      }
    } catch (error) {
      console.error("Error deleting workout:", error);
    }
  };

  return (
    <div className="bg-gray-300 shadow-lg shadow-black rounded-md p-4 w-2/3 ml-20 m-4 relative">
      <h2 className="text-xl font-semibold text-blue-500">{exercise}</h2>
      <div className="my-2">
        <p>Load: {load} kg</p>
        <p>Reps: {reps}</p>
      </div>
      <p className="font-bold">{formatDistanceToNow(new Date(date), { addSuffix: true })}</p>
      <button className="absolute top-4 right-2 p-1 text-red-600 hover:scale-125 duration-300" onClick={handleDelete}><FaTrash/></button>
    </div>
  );
};

export default Card;

