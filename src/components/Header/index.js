import React from "react";
import { 
  ThemeProvider, 
  AppBar, 
  Container, 
  Toolbar, 
  Typography,
  Select,
  MenuItem 
} from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { CryptoState } from "../../context/CryptoContext";
import { UserSidebar } from "../Authentication/UserSidebar";
import { AuthModal } from "../Authentication/AuthModal";
import { useStyles, darkTheme } from "./styles";

// Header

export const Header = () => {

  const { currency, setCurrency, user } = CryptoState();
  const classes = useStyles();
  const navigate = useNavigate();

  return(
    <div>
      ...
    </div>
  )
}