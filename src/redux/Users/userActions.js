import { userSliceAction } from "./userSlice";
import axios from "axios";
import Toast from "../../components/common/Toast/Toast";
import { ToastSuccess, ToastError } from "../../utilityApi/utility";

export const signInUser = (user) => {
  return async (dispatch, getState) => {
    dispatch(userSliceAction.updateState({ key: "loader", value: true }));
    try {
      const { data } = await axios.post(
        // "http://localhost:8000/api/login-user",
        `${process.env.REACT_APP_API_URL}/api/login-user`,
        user
      );
      dispatch(
        userSliceAction.updateState({ key: "userdetails", value: data })
      );
      dispatch(userSliceAction.updateState({ key: "loader", value: false }));
      localStorage.setItem("userdetails", JSON.stringify(data));
      dispatch(
        userSliceAction.updateState({ key: "redirectHome", value: true })
      );
      dispatch(
        userSliceAction.updateState({ key: "redirectSignIn", value: false })
      );

      const msg = <Toast err={false} msg="Signed in Successfully!" />;
      ToastSuccess(msg);
    } catch (error) {
      dispatch(userSliceAction.updateState({ key: "loader", value: false }));
      console.log(error);
      const msg = <Toast err={true} msg="Invalid Credentials!" />;
      ToastError(msg);
    }
  };
};

export const logOutUser = () => {
  return async (dispatch, getState) => {
    dispatch(userSliceAction.updateState({ key: "loader", value: true }));
    try {
      //   const { data } = await axios.get("http://localhost:8000/api/logout");
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/logout`
      );
      dispatch(userSliceAction.updateState({ key: "loader", value: false }));
      dispatch(
        userSliceAction.updateState({ key: "redirectHome", value: false })
      );
      dispatch(
        userSliceAction.updateState({ key: "redirectSignIn", value: true })
      );

      const msg = <Toast err={false} msg="Signed out Successfully!" />;
      ToastSuccess(msg);
    } catch (error) {
      dispatch(userSliceAction.updateState({ key: "loader", value: false }));
      console.log(error);
      const msg = <Toast err={true} msg="Error Signing out!" />;
      ToastError(msg);
    }
  };
};

export const signUpUser = (user) => {
  return async (dispatch, getState) => {
    dispatch(userSliceAction.updateState({ key: "loader", value: true }));
    try {
      const { data } = await axios.post(
        // "http://localhost:8000/api/add-user",
        `${process.env.REACT_APP_API_URL}/api/add-user`,
        user
      );

      if (data.err) {
        dispatch(userSliceAction.updateState({ key: "loader", value: false }));
        const msg = <Toast err={true} msg={data.err} />;
        ToastError(msg);
        return;
      } else {
        dispatch(userSliceAction.updateState({ key: "loader", value: false }));
        dispatch(
          userSliceAction.updateState({ key: "redirectSignIn", value: true })
        );
      }

      const msg = (
        <Toast err={false} msg="Signed up Successfully! Login to continue. " />
      );
      ToastSuccess(msg);
    } catch (error) {
      dispatch(userSliceAction.updateState({ key: "loader", value: false }));
      console.log(error);
      const msg = <Toast err={true} msg="Error Signing up!" />;
      ToastError(msg);
    }
  };
};
