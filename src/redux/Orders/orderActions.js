import { userSliceAction } from "../Users/userSlice";
import { orderSliceAction } from "../Orders/orderSlice";
import axios from "axios";
import Toast from "../../components/common/Toast/Toast";
import { ToastSuccess, ToastError } from "../../utilityApi/utility";

export const createOrder = (order, token, userId) => {
  return async (dispatch, getState) => {
    dispatch(userSliceAction.updateState({ key: "loader", value: true }));
    try {
      const { data } = await axios.post(
        // `http://localhost:8000/api/order/create/${userId}`,
        `${process.env.REACT_APP_API_URL}/api/order/create/${userId}`,
        order,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(getAllOrders(token, userId));

      const msg = <Toast err={false} msg="Order created Successfully!" />;
      ToastSuccess(msg);

      dispatch(userSliceAction.updateState({ key: "loader", value: false }));
    } catch (error) {
      dispatch(userSliceAction.updateState({ key: "loader", value: false }));
      console.log(error);
      const msg = <Toast err={true} msg="Unable to Create order!" />;
      ToastError(msg);
    }
  };
};

export const fetchAllOrdersForUser = (token, userId) => {
  return async (dispatch, getState) => {
    dispatch(userSliceAction.updateState({ key: "loader", value: true }));
    try {
      const { data } = await axios.get(
        // `http://localhost:8000/api/order/all/${userId}`,
        `${process.env.REACT_APP_API_URL}/api/order/all/${userId}`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(userSliceAction.updateState({ key: "allOrders", value: data }));
      dispatch(userSliceAction.updateState({ key: "loader", value: false }));
    } catch (error) {
      dispatch(userSliceAction.updateState({ key: "loader", value: false }));
      console.log(error);
      const msg = <Toast err={true} msg="Unable to fetch orders!" />;
      ToastError(msg);
    }
  };
};

export const getAllOrders = (token, userId) => {
  return async (dispatch, getState) => {
    dispatch(userSliceAction.updateState({ key: "loader", value: true }));
    try {
      const { data } = await axios.get(
        // `http://localhost:8000/api/order/all/${userId}`,
        `${process.env.REACT_APP_API_URL}/api/order/all/${userId}`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(orderSliceAction.updateState({ key: "allOrders", value: data }));
      dispatch(userSliceAction.updateState({ key: "loader", value: false }));
    } catch (error) {
      dispatch(userSliceAction.updateState({ key: "loader", value: false }));
      console.log(error);
      const msg = <Toast err={true} msg="Unable to fetch orders!" />;
      ToastError(msg);
    }
  };
};
