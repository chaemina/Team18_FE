import React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#5A906E",
      backgroundColor: "#F2F7F5",
    },
    secondary: {
      main: "#F9BC60",
    },
  },
});
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Toast({
  open,
  handleClose,
  handleOk,
  message,
  severity,
  children,
  autoHideDuration,
  sx,
}) {
  return (
    <ThemeProvider theme={theme}>
      <Snackbar
        open={open}
        autoHideDuration={autoHideDuration || 5000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleClose}
          severity={severity}
          sx={
            sx || {
              width: "100%",
              bgcolor: (theme) => theme.palette.primary.main,
            }
          }
          action={<>{children}</>}
        >
          {message}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}
