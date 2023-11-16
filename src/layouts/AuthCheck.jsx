import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Toast from "../components/common/Toast";
import { useEffectOnce } from "../hooks/useEffectOnce";
import Button from "@mui/material/Button";

export default function AuthCheck() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const auth = window.localStorage.getItem("token");

  useEffectOnce(() => {
    if (!auth) {
      setOpen(true);
    }
  });

  const handleOk = () => {
    navigate("/users/login", { replace: true });
  };

  const handleClose = (event, reason) => {
    if (reason !== "clickaway") {
      setOpen(false);
      navigate(-1);
    }
  };

  return (
    <>
      <Toast
        open={open}
        severity="info"
        handleOk={handleOk}
        handleClose={handleClose}
        message="This service requires login. Redirecting to the login page."
      >
        <Button color="inherit" size="small" onClick={handleOk}>
          OKAY
        </Button>
        <Button color="inherit" size="small" onClick={handleClose}>
          NO THANKS
        </Button>
      </Toast>
      {auth && <Outlet />}
    </>
  );
}
