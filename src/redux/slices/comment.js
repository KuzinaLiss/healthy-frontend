import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

// Создание асинхронного Thunk для получения продуктов
export const fetchComments = createAsyncThunk(
    'comments/fetchComments',
    async (postId) => {
      try {
        const { data } = await axios.get(`/posts/${postId}/comments`);
        return data;
      } catch (error) {
        throw new Error(error.response ? error.response.data : error.message);
      }
    }
  );

const initialState = {
  items: [],
  status: "loading",
  error: null,
};

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  //отлавливаем 3 состояния запроса
  extraReducers: (builder) => {
    // Загрузка продуктов
    builder.addCase(fetchComments.pending, (state) => {
      state.items = [];
      state.status = "loading";
    });
    // Запрос выполнен успешно для продуктов
    builder.addCase(fetchComments.fulfilled, (state, action) => {
      state.status = "loaded";
      state.items = action.payload;
    });
    // При запросе продуктов произошла ошибка
    builder.addCase(fetchComments.rejected, (state) => {
      state.items = [];
      state.status = "error";
    });
  },
});

export const commentsReducer = commentsSlice.reducer;
export const selectIsCommentsLoaded = (state) =>
    state.comments && state.comments.status === "loaded";
export const selectComments = (state) => state.comments.items;
