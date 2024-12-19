import React, { useEffect, useState } from 'react';
import { getWorkouts } from '../services/workoutService';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../context/GlobalContext';

function DashboardPage() {
  const { workouts, setWorkouts } = useGlobalContext();
  const navigate = useNavigate();
  // Fetch workouts on component mount and update workouts on token change or login/logout
  useEffect(() => {
    const fetchWorkouts = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }
      console.log('start fetching');

      const workoutsData = await getWorkouts(token);
      setWorkouts(workoutsData);
    };

    fetchWorkouts();
  }, [navigate]);
  return (
    <div>
      <button
        onClick={() => {
          getWorkouts();
        }}
      >
        getworkouts
      </button>
      {workouts?.map((workout) => (
        <div>{workout.name}</div>
      ))}
    </div>
  );
}

export default DashboardPage;
