import React from "react";
import Toast from "./Toast";

export default function ToastError({ open, handleClose, errorMessage }) {
  return (
    <Toast
      open={open}
      handleClose={handleClose}
      autoHideDuration={3000}
      message={errorMessage}
      severity="error"
      sx={{ backgroundColor: "#F9NC60" }}
    />
  );
}
