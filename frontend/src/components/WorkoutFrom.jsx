import { React, useState } from 'react';
import { useWorkoutContext } from '../hook/useWorkoutContext';
import { useAuthContext } from '../hook/useAuthContext';

export default function WorkoutFrom() {
  const { user } = useAuthContext();
  const { dispatch } = useWorkoutContext();
  const [title, setTitle] = useState('');
  const [reps, setReps] = useState('');
  const [load, setLoad] = useState('');
  const [error, setError] = useState(null);
  const [list, setList] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setError('You must be logged in');
      return;
    }
    const workout = { title, reps, load };
    const response = await fetch('/api/workouts', {
      method: 'POST',
      body: JSON.stringify(workout),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`,
      },
    });
    const jsonData = await response.json();
    if (!response.ok) {
      setError(jsonData.error);
      setList(jsonData.list);
    }
    if (response.ok) {
      setError(null);
      setList([]);
      setTitle('');
      setReps('');
      setLoad('');
      dispatch({ type: 'CREATE_WORKOUT', payload: jsonData });
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-gray-600 shadow-lg shadow-black rounded-md p-4 w-2/3 m-auto font-mono">
      <h3 className="text-xl font-bold mb-2 font-mono flex justify-center text-blue-300">Create a new workout</h3>
      <hr className="mb-2" />
      <label className="block mb-2">Exercise Title:</label>
      <input
        placeholder='Enter here'
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={list && list.includes('title') ? 'border-2 border-red-400 w-full rounded p-2 mb-2' : 'w-full border border-gray-300 rounded p-2 mb-2'}
      />
      <label className="block mb-2">Load (kg):</label>
      <input
        placeholder='Enter here'
        type="number"
        onChange={(e) => setLoad(e.target.value)}
        value={load}
        className={list && list.includes('load') ? 'border-2 border-red-400 w-full rounded p-2 mb-2' : 'w-full border border-gray-300 rounded p-2 mb-2'}
      />
      <label className="block mb-2">Reps:</label>
      <input
        placeholder='Enter here'
        type="number"
        onChange={(e) => setReps(e.target.value)}
        value={reps}
        className={list && list.includes('reps') ? 'border-2 border-red-400 w-full rounded p-2 mb-2' : 'w-full border border-gray-300 rounded p-2 mb-2'}
      />
      <div className="flex justify-center"> {/* Flex container to center the button */}
        <button
          type="submit"
          className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-800  duration-100"
        >
          Add
        </button>
      </div>

      {error && <div className="mt-2">{error}</div>}
    </form>
  );
}
