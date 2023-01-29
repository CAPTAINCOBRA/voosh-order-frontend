import { toast } from "react-toastify";

export const checkValidity = (value, rules) => {
  let isValid = true;
  if (!rules) {
    return true;
  }
  if (rules.required) {
    isValid = value.trim() !== "" && isValid;
  }
  if (rules.minLength) {
    isValid = value.length >= rules.minLength && isValid;
  }
  if (rules.maxLength) {
    isValid = value.length <= rules.maxLength && isValid;
  }
  return isValid;
};

export const isAuthenticated = () => {
  if (typeof window == "undefined") {
    return false;
  }
  if (localStorage.getItem("userdetails")) {
    let userdetails = JSON.parse(localStorage.getItem("userdetails"));
    // return userdetails.token;
    return userdetails;
    //The token is set using authenticate method when onSubmit method of signin uses authenticate for returned data
    //   return JSON.parse(localStorage.getItem("jwt")); //We are returning whatever that jwt value is. In the frontend, we'll again check if the token matches and only then return true
  } else {
    return false;
  }
};

export const ToastSuccess = (msg) => {
  toast.success(msg, {
    className: "ToastSucc Toast",
    position: "bottom-left",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export const ToastError = (msg) => {
  toast.error(msg, {
    className: "ToastErr Toast",
    position: "bottom-left",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};
