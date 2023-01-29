import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";

const Loader = ({ backdrop }) => {
  return (
    <Backdrop
      sx={{ zIndex: 5000 }}
      open={true}
      className="Height100vh"
      invisible={!backdrop}
    >
      <div className="ContentLoader">
        <CircularProgress
          sx={backdrop ? { color: "#fff" } : { color: "primary" }}
        />
      </div>
    </Backdrop>
  );
};

export default Loader;
