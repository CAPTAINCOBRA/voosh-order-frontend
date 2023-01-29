import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button } from "react-bootstrap";
import FormInput from "../common/FormInput/FormInput";
import "./SignIn.scss";
import cx from "classnames";
import * as actions from "../../redux/Users/userActions";
import { useNavigate } from "react-router-dom";

import { checkValidity } from "../../utilityApi/utility";

const initialState = {
  SignInFormData: {
    phone: {
      type: "text",
      value: "",
      validation: {
        required: true,
        minLength: 10,
        maxLength: 10,
      },
      valid: false,
      touched: false,
      placeholder: "Mobile Number",
    },
    password: {
      type: "password",
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
      placeholder: "Password",
    },
  },
  formIsValid: false,
};

const SignIn = () => {
  const [state, updateState] = useState(initialState);
  const dispatch = useDispatch();
  const { SignInFormData, formIsValid } = state;
  const navigate = useNavigate();
  const { redirectHome } = useSelector((state) => state.user);

  useEffect(() => {
    if (redirectHome) navigate("/");
  }, [redirectHome]);

  useEffect(() => {
    localStorage.getItem("userdetails") && navigate("/");
  }, []);

  const SignInHandler = () => {
    const SignInData = {};
    for (let formElementIdentifier in SignInFormData) {
      SignInData[formElementIdentifier] =
        SignInFormData[formElementIdentifier].value;
    }

    dispatch(actions.signInUser(SignInData));
  };

  const inputChangedHandler = (event, inputIdentifier) => {
    const updatedSignInForm = {
      ...SignInFormData,
    };
    const updatedFormElement = {
      ...updatedSignInForm[inputIdentifier],
    };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.touched = true;
    updatedSignInForm[inputIdentifier] = updatedFormElement;

    let formIsValid = true;
    for (let inputIdentifier in updatedSignInForm) {
      formIsValid = updatedSignInForm[inputIdentifier].valid && formIsValid;
    }
    updateState({
      SignInFormData: updatedSignInForm,
      formIsValid: formIsValid,
    });
  };

  const SignInFormArray = [];
  for (let key in SignInFormData) {
    SignInFormArray.push({
      id: key,
      config: SignInFormData[key],
    });
  }

  let SignInForm = (
    <Form
      className={"SignInForm"}
      onSubmit={(event) => {
        event.preventDefault();
        SignInHandler(false);
      }}
    >
      <h3 className="text-center">
        <strong>SignIn</strong>
      </h3>

      {SignInFormArray.map((formElement) => (
        <Form.Group key={formElement.id}>
          <FormInput
            type={formElement.config.type}
            value={formElement.config.value}
            onChange={(event) => inputChangedHandler(event, formElement.id)}
            placeholder={formElement.config.placeholder}
            label={formElement.config.label}
            name={formElement.id}
            maxLength={formElement.config.validation.maxLength}
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
      <div className="d-flex">
        <Button
          variant="primary"
          type="submit"
          disabled={!formIsValid}
          className="mt-3 SignInButton"
        >
          SignIn
        </Button>

        <Button
          variant="success"
          type="button"
          className="mt-3 SignInButton"
          onClick={() => {
            navigate("/sign-up");
          }}
        >
          SignUp
        </Button>
      </div>
    </Form>
  );

  return <div className="SignInFormContainer">{SignInForm}</div>;
};

export default SignIn;
