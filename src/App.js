import React, { useEffect, useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import SignUp from "./components/SignUp/SignUp";
import SignIn from "./components/SignIn/SignIn";
import Home from "./components/Home/Home";
import OrdersList from "./components/OrdersList/OrdersList";
import { orderSliceAction } from "./redux/Orders/orderSlice";
import { userSliceAction } from "./redux/Users/userSlice";
import { useDispatch } from "react-redux";
import Loader from "./components/common/Loader/Loader";
import { useSelector } from "react-redux";
import { ToastContainer, Slide } from "react-toastify";
import * as actionsO from "./redux/Orders/orderActions";
import Protected from "./components/Protected/Protected";

function App() {
  const dispatch = useDispatch();
  const { loader } = useSelector((state) => state.user);
  const [isSignedIn, setIsSignedIn] = useState(
    localStorage.getItem("userdetails") ? true : false
  );

  useEffect(() => {
    if (localStorage.getItem("userdetails")) {
      let userdetails = localStorage.getItem("userdetails");
      let orders = JSON.parse(userdetails).user.orders;
      dispatch(
        userSliceAction.updateState({
          key: "userdetails",
          value: JSON.parse(userdetails),
        })
      );
      dispatch(
        orderSliceAction.updateState({
          key: "allOrders",
          value: orders,
        })
      );
      setIsSignedIn(true);

      let token = JSON.parse(localStorage.getItem("userdetails")).token;
      let userId = JSON.parse(localStorage.getItem("userdetails")).user._id;
      dispatch(actionsO.getAllOrders(token, userId));
    } else {
      // setIsSignedIn(false);
    }
  }, []);

  return (
    <div className="App">
      {loader && <Loader backdrop={true} />}
      <ToastContainer transition={Slide} />
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        {/* <Route path="/orders" element={<OrdersList />} /> */}
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route
          path="/"
          element={
            <Protected isSignedIn={localStorage.getItem("userdetails")}>
              <Home />
            </Protected>
          }
        />
        <Route
          path="/orders"
          element={
            <Protected isSignedIn={localStorage.getItem("userdetails")}>
              <OrdersList />
            </Protected>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
