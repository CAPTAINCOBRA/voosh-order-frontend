import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button } from "react-bootstrap";
import cx from "classnames";
import FormInput from "../common/FormInput/FormInput";
import { useNavigate } from "react-router-dom";
import { checkValidity, isAuthenticated } from "../../utilityApi/utility";
import * as actionsO from "../../redux/Orders/orderActions";
import Header from "../Header/Header";

import "./Home.scss";

const initialState = {
  OrderFormData: {
    productName: {
      type: "text",
      value: "",
      validation: {
        required: true,
        // minLength: 10,
        // maxLength: 10,
      },
      valid: false,
      touched: false,
      placeholder: "Product Name",
    },
    amount: {
      type: "text",
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
      placeholder: "Amount",
    },
    address: {
      type: "text",
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
      placeholder: "Address",
    },
  },
  formIsValid: false,
};

const Home = () => {
  const [state, updateState] = useState(initialState);
  const dispatch = useDispatch();
  const { OrderFormData, formIsValid } = state;
  const navigate = useNavigate();
  const { userdetails } = useSelector((state) => state.user);
  const { redirectSignIn } = useSelector((state) => state.user);

  //   useEffect(() => {
  //     if (localStorage.getItem("userdetails")) {
  //       let userdetails = localStorage.getItem("userdetails");
  //       dispatch(
  //         userSliceAction.updateState({
  //           key: "userdetails",
  //           value: JSON.parse(userdetails),
  //         })
  //       );
  //     }
  //   }, []);

  useEffect(() => {
    if (redirectSignIn) {
      navigate("/sign-in");
    }
  }, [redirectSignIn]);

  const CreateOrderHandler = () => {
    const OrderData = {};
    for (let formElementIdentifier in OrderFormData) {
      OrderData[formElementIdentifier] =
        OrderFormData[formElementIdentifier].value;
    }
    OrderData["transaction_id"] = Math.floor(Math.random() * 1000000000);
    OrderData["status"] = "Received";
    OrderData["user"] = userdetails.user._id;

    let token = isAuthenticated() && isAuthenticated().token;
    let userId = isAuthenticated() && isAuthenticated().user._id;

    dispatch(actionsO.createOrder(OrderData, token, userId));
  };

  const inputChangedHandler = (event, inputIdentifier) => {
    const updatedOrderForm = {
      ...OrderFormData,
    };
    const updatedFormElement = {
      ...updatedOrderForm[inputIdentifier],
    };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.touched = true;
    updatedOrderForm[inputIdentifier] = updatedFormElement;

    let formIsValid = true;
    for (let inputIdentifier in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
    }
    updateState({
      OrderFormData: updatedOrderForm,
      formIsValid: formIsValid,
    });
  };

  const OrderFormArray = [];
  for (let key in OrderFormData) {
    OrderFormArray.push({
      id: key,
      config: OrderFormData[key],
    });
  }

  let OrderForm = (
    <Form
      className={"OrderForm"}
      onSubmit={(event) => {
        event.preventDefault();
        CreateOrderHandler();
      }}
    >
      <h3 className="text-center">
        <strong>Create Order</strong>
      </h3>

      {OrderFormArray.map((formElement) => (
        <Form.Group key={formElement.id}>
          <FormInput
            type={formElement.config.type}
            value={formElement.config.value}
            onChange={(event) => inputChangedHandler(event, formElement.id)}
            placeholder={formElement.config.placeholder}
            label={formElement.config.label}
            name={formElement.id}
            // maxLength={formElement.config?.validation?.maxLength}
            className={
              !formElement.config.valid &&
              formElement.config.validation &&
              formElement.config.touched
                ? cx("InvalidField", "form-control")
                : "form-control mt-1"
            }
          />
        </Form.Group>
      ))}
      <Button
        variant="primary"
        type="submit"
        disabled={!formIsValid}
        className="mt-3 SignInButton"
      >
        Create Order
      </Button>
    </Form>
  );

  return (
    <div>
      <Header userdetails={userdetails} />

      <div className="OrderFormContainer">{OrderForm}</div>
    </div>
  );
};

export default Home;
