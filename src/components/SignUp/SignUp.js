import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Form, Button } from "react-bootstrap";
import FormInput from "../common/FormInput/FormInput";
import "./SignUp.scss";
import cx from "classnames";
import { checkValidity } from "../../utilityApi/utility";
import * as actions from "../../redux/Users/userActions";
import { useNavigate } from "react-router-dom";

const initialState = {
  SignUpFormData: {
    name: {
      type: "text",
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
      placeholder: "Username",
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
    userInfo: {
      type: "text",
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
      placeholder: "Info",
    },
  },
  formIsValid: false,
};

const SignUp = () => {
  const [state, updateState] = useState(initialState);
  const dispatch = useDispatch();
  const { SignUpFormData, formIsValid } = state;
  const navigate = useNavigate();

  const SignUpHandler = () => {
    const SignUpData = {};
    for (let formElementIdentifier in SignUpFormData) {
      SignUpData[formElementIdentifier] =
        SignUpFormData[formElementIdentifier].value;
    }

    dispatch(actions.signUpUser(SignUpData));
    // if (redirectSignIn) navigate("/sign-in");
    navigate("/sign-in");
  };

  const inputChangedHandler = (event, inputIdentifier) => {
    const updatedSignUpForm = {
      ...SignUpFormData,
    };
    const updatedFormElement = {
      ...updatedSignUpForm[inputIdentifier],
    };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.touched = true;
    updatedSignUpForm[inputIdentifier] = updatedFormElement;

    let formIsValid = true;
    for (let inputIdentifier in updatedSignUpForm) {
      formIsValid = updatedSignUpForm[inputIdentifier].valid && formIsValid;
    }
    updateState({
      SignUpFormData: updatedSignUpForm,
      formIsValid: formIsValid,
    });
  };

  const SignUpFormArray = [];
  for (let key in SignUpFormData) {
    SignUpFormArray.push({
      id: key,
      config: SignUpFormData[key],
    });
  }

  let SignUpForm = (
    <Form
      className={"SignUpForm"}
      onSubmit={(event) => {
        event.preventDefault();
        SignUpHandler(false);
      }}
    >
      <h3 className="text-center">
        <strong>SignUp</strong>
      </h3>

      {SignUpFormArray.map((formElement) => (
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
          className="mt-3 SignUpButton"
        >
          SignUp
        </Button>

        <Button
          variant="success"
          type="button"
          className="mt-3 SignUpButton"
          onClick={() => navigate("/sign-in")}
        >
          SignIn
        </Button>
      </div>
    </Form>
  );

  return <div className="SignUpFormContainer">{SignUpForm}</div>;
};

export default SignUp;
