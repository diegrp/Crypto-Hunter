import React, { useState } from "react";
import { Box, TextField, Button } from "@material-ui/core";
import { auth } from "../../../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { CryptoState } from "../../../context/CryptoContext";

// Login Authentication

export const Login = ({ handleClose }) => {

  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");

  const { setAlert } = CryptoState();

  const handleChange = async () => {
    if(!email || !password){
      setAlert({
        open: true,
        type: "error",
        message: "Por favor, preencha todos os campos!"
      });
      return;
    }
    try{
      const result = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      setAlert({
        open: true,
        type: "success",
        message: `Logado com sucesso. Bem vindo, ${result.user.email}`
      });

      handleClose();

    }catch(error){
      setAlert({
        open: true,
        type: "error",
        message: error.message
      });
      return;
    }
  };

  return(
    <div>
      ...
    </div>
  )
}