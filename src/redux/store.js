import { configureStore } from "@reduxjs/toolkit";
import { postsReducer } from "./slices/posts";
import { authReducer } from "./slices/auth";
import { commentsReducer } from "./slices/comment";
import { productsReducer } from "./slices/products";
import { journalsReducer} from "./slices/journal";
import { workoutReducer } from "./slices/workout";

const store = configureStore({
  reducer: {
    posts: postsReducer,
    auth: authReducer,
    comments: commentsReducer,
    products: productsReducer,
    journals: journalsReducer,
    workout: workoutReducer,
  },
});

export default store;
