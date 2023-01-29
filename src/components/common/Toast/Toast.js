import React, { Fragment } from "react";
import "./Toast.scss";

const CustomToast = (props) => {
  const { msg } = props;

  return (
    <Fragment>
      <div className="Text">{msg}</div>
    </Fragment>
  );
};

export default CustomToast;
