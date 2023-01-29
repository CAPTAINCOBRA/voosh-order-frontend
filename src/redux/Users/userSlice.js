import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userdetails: {},
  // serverUrl: "http://localhost:8000/api/coupons",
  userOrderValue: 0,
  userOrders: [],
  loader: false,
  redirectHome: false,
  redirectSignIn: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateState: (state, action) => {
      const { key, value } = action.payload;
      return {
        ...state,
        [key]: value,
      };
    },
  },
});

export const userSliceAction = userSlice.actions;
export default userSlice;
