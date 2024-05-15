import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchAuth = createAsyncThunk('auth/fetchAuth', async (params) =>{
    const{data} = await axios.post('/auth/login', params);
    return data;
});

export const fetchAuthMe = createAsyncThunk('auth/fetchAuthMe', async () =>{
    const{data} = await axios.get('/auth/me');
    return data;
});

export const fetchRegister = createAsyncThunk('auth/fetchRegister', async (params) =>{
    const{data} = await axios.post('/auth/Register', params);
    return data;
});


const initialState ={
    data: null,
    status: 'loading',
    role: 'user',
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state)=>{
            state.data = null;
           
        },
        setUserRole: (state, action) =>{
            state.role = action.payload;
        }
    },
    extraReducers: (builder) => {
        // Загрузка пользователя
        builder.addCase(fetchAuth.pending, (state) => {
            state.status = 'loading';
            state.data = null;
        });
        // Запрос выполнен успешно для пользователя
        builder.addCase(fetchAuth.fulfilled, (state, action) => {
            state.status = 'loaded';
            state.data = action.payload;
        });
        // При запросе пользователя произошла ошибка
        builder.addCase(fetchAuth.rejected, (state) => {
            state.status = 'error';
            state.data = null;
        });
         // Загрузка пользователя
         builder.addCase(fetchAuthMe.pending, (state) => {
            state.status = 'loading';
            state.data = null;
        });
        // Запрос выполнен успешно для пользователя
        builder.addCase(fetchAuthMe.fulfilled, (state, action) => {
            state.status = 'loaded';
            state.data = action.payload;
        });
        // При запросе пользователя произошла ошибка
        builder.addCase(fetchAuthMe.rejected, (state) => {
            state.status = 'error';
            state.data = null;
        });
        // Загрузка пользователя
        builder.addCase(fetchRegister.pending, (state) => {
            state.status = 'loading';
            state.data = null;
        });
        // Запрос выполнен успешно для пользователя
        builder.addCase(fetchRegister.fulfilled, (state, action) => {
            state.status = 'loaded';
            state.data = action.payload;
        });
        // При запросе пользователя произошла ошибка
        builder.addCase(fetchRegister.rejected, (state) => {
            state.status = 'error';
            state.data = null;
        });
    },
});

export const selectUserRole = (state) => state.auth.role;

export const {setUserRole} = authSlice.actions;

export const selectIsAuth = (state) => Boolean(state.auth.data);

export const authReducer = authSlice.reducer;

export const {logout} = authSlice.actions;
export const selectCurrentUserAvatarUrl = (state) => {
    // Проверяем наличие данных о пользователе и URL аватара
    if (state.auth.data && state.auth.data.avatarUrl) {
      return state.auth.data.avatarUrl; // Возвращаем URL аватара, если он есть
    } else {
      return undefined; // Возвращаем undefined, если данные отсутствуют
    }
  };