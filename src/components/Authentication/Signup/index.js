import React, { useState } from "react";
import { Box, TextField, Button } from "@material-ui/core";
import { auth } from "../../../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { CryptoState } from "../../../context/CryptoContext";

// Signup Authentication

export const Signup = ({ handleClose }) => {

  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ confirmPassword, setConfirmPassword ] = useState("");

  const { setAlert } = CryptoState();

  const handleChange = async () => {
    if(password !== confirmPassword){
      setAlert({
        open: true,
        type: "error",
        message: "As senhas não coincidem!"
      });
    };
    try{

      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      setAlert({
        open: true,
        type: "success",
        message: `Conta criada com sucesso. Bem vindo, ${result.user.email}`
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
      <TextField
        variant="outlined"
        type="password"
        placeholder="Confirme sua senha"
        value={confirmPassword}
        onChange={({target}) => setConfirmPassword(target.value)}
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
        Criar conta
      </Button>
    </Box>
  )
}