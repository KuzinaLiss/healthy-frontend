import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

// Создание асинхронного Thunk для получения продуктов
export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
    const { data } = await axios.get("/products");
    return data;
  }
);

const initialState = {
  items: [],
  status: "loading",
  error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  //отлавливаем 3 состояния запроса
  extraReducers: (builder) => {
    // Загрузка продуктов
    builder.addCase(fetchProducts.pending, (state) => {
      state.items = [];
      state.status = "loading";
    });
    // Запрос выполнен успешно для продуктов
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.status = "loaded";
      state.items = action.payload;
    });
    // При запросе продуктов произошла ошибка
    builder.addCase(fetchProducts.rejected, (state) => {
      state.items = [];
      state.status = "error";
    });
  },
});

export const productsReducer = productsSlice.reducer;
export const selectIsProductsLoaded = (state) =>
  state.products.status === "loaded";
export const selectProducts = (state) => state.products.items;
