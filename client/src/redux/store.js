import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./state";

const store = configureStore({
    reducer: {
      user: userReducer, // add other reducers here if needed
    },
  });
  
  export default store;