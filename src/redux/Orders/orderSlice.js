import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orderdetails: {},
  allOrders: [],
  // serverUrl: "http://localhost:8000/api/coupons",
  allOrderValue: 0,
  discountValue: "",
  loader: false,
};

const orderSlice = createSlice({
  name: "order",
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

export const orderSliceAction = orderSlice.actions;
export default orderSlice;
