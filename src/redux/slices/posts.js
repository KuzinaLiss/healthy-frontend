import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchPost = createAsyncThunk('posts/fetchPosts', async () => {
    const{data} = await axios.get('/posts');
    return data;
});

export const fetchTags = createAsyncThunk('posts/fetchTags', async () => {
    const{data} = await axios.get('/tags');
    return data;
});


export const fetchRemovePosts = createAsyncThunk('posts/fetchRemovePosts', async (id) => 
     axios.delete(`/posts/${id}`),
  
);

const initialState = {
    posts: {
        items: [],
        status: 'loading',
    },
    tags: {
        items: [],
        status: 'loading',
    },

};

const postsSliice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    //отлавливаем 3 состояния запроса
    extraReducers: (builder) => {
        // Загрузка постов
        builder.addCase(fetchPost.pending, (state) => {
            state.posts.items = [];
            state.posts.status = 'loading';
        });
        // Запрос выполнен успешно для постов
        builder.addCase(fetchPost.fulfilled, (state, action) => {
            state.posts.items = action.payload;
            state.posts.status = 'loaded';
        });
        // При запросе постов произошла ошибка
        builder.addCase(fetchPost.rejected, (state) => {
            state.posts.items = [];
            state.posts.status = 'error';
        });

       // Загрузка тэгов
        builder.addCase(fetchTags.pending, (state) => {
            state.tags.items = [];
            state.tags.status = 'loading';
        });
        // Запрос выполнен успешно для тэгов
        builder.addCase(fetchTags.fulfilled, (state, action) => {
            state.tags.items = action.payload;
            state.tags.status = 'loaded';
        });
        // При запросе тэгов произошла ошибка
        builder.addCase(fetchTags.rejected, (state) => {
            state.tags.items = [];
            state.tags.status = 'error';
        });


        // Удаление статьи
        builder.addCase(fetchRemovePosts.pending, (state, action) => {
            state.posts.items = state.posts.items.filter(obj =>obj._id !== action.meta.arg);
        });
       
      
    },
});

export const postsReducer = postsSliice.reducer;
export const selectIsPosts = (state) => state.posts.status === 'loaded';