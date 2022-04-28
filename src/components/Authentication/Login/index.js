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
    <Box
      p={3}
      style={{ display: "flex", flexDirection: "column", gap: "20px" }}
    >
      <TextField
        variant="outlined"
        type="email"
        placeholder="E-mail"
        value={email}
        onChange={({target}) => setEmail(target.value)}
        fullWidth
      />
      <TextField
        variant="outlined"
        type="password"
        placeholder="Senha"
        value={password}
        onChange={({target}) => setPassword(target.value)}
        fullWidth
      />
      <Button
        variant="contained"
        size="large"
        style={{
          width: "100%",
          height: 40,
          backgroundColor: "#EEBC1D"
        }}
        onClick={handleChange}
      >
        Logar
      </Button>
    </Box>
  )
}