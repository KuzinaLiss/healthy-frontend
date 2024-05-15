import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

// Создание асинхронного Thunk для получения продуктов
export const fetchjournals = createAsyncThunk(
  "journals/fetchjournals",
  async () => {
    const { data } = await axios.get("/journals");
    return data;
  }
);

const initialState = {
  items: [],
  status: "loading",
  error: null,
};

const journalsSlice = createSlice({
  name: "journals",
  initialState,
  reducers: {},
  //отлавливаем 3 состояния запроса
  extraReducers: (builder) => {
    // Загрузка продуктов
    builder.addCase(fetchjournals.pending, (state) => {
      state.items = [];
      state.status = "loading";
    });
    // Запрос выполнен успешно для продуктов
    builder.addCase(fetchjournals.fulfilled, (state, action) => {
      state.status = "loaded";
      state.items = action.payload;
    });
    // При запросе продуктов произошла ошибка
    builder.addCase(fetchjournals.rejected, (state) => {
      state.items = [];
      state.status = "error";
    });
  },
});

export const journalsReducer = journalsSlice.reducer;
export const selectIsjournalsLoaded = (state) =>
  state.journals.status === "loaded";
export const selectjournals = (state) => state.journals.items;
