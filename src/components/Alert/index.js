import React from "react";
import { Snackbar } from "@material-ui/core";
import { CryptoState } from "../../context/CryptoContext";
import MuiAlert from "@material-ui/lab/Alert";

// Alert MUI

export const Alert = () => {

  const { alert, setAlert } = CryptoState();

  const handleClose = ( e, reason ) => {
    if(reason === "clickaway"){
      return;
    }
    setAlert({ open: false });
  };

  return(
    <Snackbar
      open={alert.open}
      autoHideDuration={3000}
      onClose={handleClose}
    >
      <MuiAlert
        variant="filled"
        elevation={10}
        severity={alert.type}
        onClose={handleClose}
      >
        {alert.message}
      </MuiAlert>
    </Snackbar>
  )
}