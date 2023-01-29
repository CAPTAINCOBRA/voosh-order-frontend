import React, { Fragment } from "react";
import "./FormInput.scss";
import { InputGroup, FormControl, Form } from "react-bootstrap";

const FormInput = React.forwardRef((props, ref) => {
  const {
    name,
    value,
    type,
    onChange,
    placeholder,
    className,
    label,
    readOnly,
    size,
    isInvalid,
    onBlur,
    onFocus,
    dataTip,
    dataPlace,
    dataClass,
  } = props;

  return (
    <Fragment>
      <InputGroup className="mb-3">
        <Form.Label className="IndexLabel">{label}</Form.Label>
        <FormControl
          autoComplete="off"
          placeholder={placeholder}
          type={type}
          name={name}
          data-tip={dataTip}
          data-place={dataPlace ? dataPlace : "top"}
          data-class={dataClass}
          value={value}
          disabled={readOnly}
          onChange={onChange}
          className={`${className} InputFieldFocus`}
          size={size}
          isInvalid={isInvalid}
          onBlur={onBlur}
          onFocus={onFocus}
          ref={ref}
        />
      </InputGroup>
    </Fragment>
  );
});

export default FormInput;
