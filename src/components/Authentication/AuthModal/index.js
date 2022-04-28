import React, { useState } from "react";
import { 
  Modal, 
  Backdrop, 
  Fade, 
  Button, 
  AppBar, 
  Tabs, 
  Tab,
  Box 
} from '@material-ui/core';
import GoogleButton from "react-google-button";
import { CryptoState } from "../../../context/CryptoContext"; 
import { auth } from "../../../config/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { Login } from "../Login";
import { Signup } from "../Signup";
import { useStyles } from "./styles";

// Modal de Authentication

export const AuthModal = () => {

  const [ open, setOpen ] = useState(false);
  const [ value, setValue ] = useState(0);

  const { setAlert } = CryptoState();
  const classes = useStyles();

 // Abrir e fechar o modal de authentication

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = ( e, newValue ) => {
    setValue(newValue);
  };

  // Authentication via google

  const googleProvider = new GoogleAuthProvider();
  
  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider).then((result) => {
      setAlert({
        open: true,
        type: "success",
        message: `Logado com sucesso. Bem vindo, ${result.user.email}`
      });
    }).catch(error => {
      setAlert({
        open: true,
        type: "error",
        message: error.message
      });
    });
  };

  return (
    <div>
      ...
    </div>
  );
}