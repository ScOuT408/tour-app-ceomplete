import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/users/userSlice";
import tourReducer from "./features/tours/tourSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    tour: tourReducer,
  },
});

export default store;
