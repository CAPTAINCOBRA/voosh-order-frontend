import { configureStore } from "@reduxjs/toolkit";

import userSlice from "../redux/Users/userSlice";
import orderSlice from "../redux/Orders/orderSlice";

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    order: orderSlice.reducer,
  },
});
