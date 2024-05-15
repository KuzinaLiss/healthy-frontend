import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

// Создаем асинхронный thunk для получения всех тренировок
export const fetchWorkouts = createAsyncThunk('workouts/fetchWorkouts', async () => {
    const {data} = await axios.get('/workouts');
    return data;
  }
);
// Создаем асинхронный thunk для удаления тренировки
export const fetchRemoveWorkout = createAsyncThunk('workouts/fetchRemoveWorkout', async (id) => {
        axios.delete(`/workouts/${id}`);
      
    }
   
);

const initialState = {
    items: [],
    status: "loading",
    error: null,
  };

// Создаем слайс для управления состоянием тренировок
const workoutSlice = createSlice({
  name: 'workouts',
  initialState,
  reducers: {},
  extraReducers: 
  //отлавливаем 3 состояния запроса
     (builder) => {
    // Загрузка тренировок
    builder.addCase(fetchWorkouts.pending, (state) => {
      state.items = [];
      state.status = "loading";
    });
    // Запрос выполнен успешно для тренировок
    builder.addCase(fetchWorkouts.fulfilled, (state, action) => {
      state.status = "loaded";
      state.items = action.payload;
    });
    // При запросе тренировок произошла ошибка
    builder.addCase(fetchWorkouts.rejected, (state) => {
      state.items = [];
      state.status = "error";
    });

     // Удаление тренировки
     builder.addCase(fetchRemoveWorkout.pending, (state, action) => {
        state.items = state.items.filter(obj =>obj._id !== action.meta.arg);
    });
   
  },
});

export default workoutSlice.reducer;

// Экспортируем селекторы для доступа к состоянию тренировок
export const workoutReducer = workoutSlice.reducer;
export const selectIsWorkoutLoaded = (state) =>
  state.workouts && state.workouts.status === "loaded";
export const selectWorkout = (state) => state.workouts.items;