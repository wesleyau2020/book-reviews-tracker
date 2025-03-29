import React from "react";
import Alert from "@mui/material/Alert";

const ErrorAlert = ({
  message = "Error! Please contact the system administrator.",
}) => {
  return <Alert severity="error">{message}</Alert>;
};

export default ErrorAlert;
