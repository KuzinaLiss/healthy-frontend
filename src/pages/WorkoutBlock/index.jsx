import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWorkouts, selectIsWorkoutLoaded } from "../../redux/slices/workout";
import { Block } from "../Block/Block";
import Grid from "@mui/material/Grid";
import styles from "./Workout.module.scss";
import { useParams } from 'react-router-dom';

export const WorkoutBlock = () => {
  const dispatch = useDispatch();
  const isLoaded = useSelector((state) => state.workout.status);
  const workouts = useSelector((state) => state.workout.items);
  const [filteredWorkouts, setFilteredWorkouts] = useState([]);
  const { selectedCategory, selectedDifficulty } = useParams();

  useEffect(() => {
    dispatch(fetchWorkouts());
  }, []);

  useEffect(() => {
    if (selectedCategory && selectedDifficulty) {
      // Фильтруем тренировки по выбранной категории и уровню сложности
      const filtered = workouts.filter(workout => 
        workout.category === selectedCategory && workout.difficulty === selectedDifficulty
      );
      setFilteredWorkouts(filtered);
    }
  }, [workouts, selectedCategory, selectedDifficulty]);

  return (
    <Grid container spacing={3} className={styles.gridWork}>
      { !isLoaded && [...Array(6)].map((_, index) => (
        <Grid key={index} item xs={4}>
          <Block isLoading={true} />
        </Grid>
      ))}
      { isLoaded === 'loaded' && filteredWorkouts.map((workout) => (
        <Grid key={workout._id} item xs={4}>
          <Block {...workout} />
        </Grid>
      ))}
    </Grid>
  );
};
