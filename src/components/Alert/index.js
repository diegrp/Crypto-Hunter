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
    <div>
      ...
    </div>
  )
}