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
    <ThemeProvider theme={darkTheme}>
      <AppBar color="transparent" position="static">
        <Container>
          <Toolbar>
            {/* Title Logo */}
            <Typography
              variant="h5"
              onClick={() => navigate("/")}
              className={classes.title}
            > 
              Crypto Hunter
            </Typography> 
            {/* Select Crypto Currency */}
            <Select
              style={{
                width: 100,
                height: 40,
                marginRight: 15
              }}
              value={currency}
              onChange={({target}) => setCurrency(target.value)} 
            >
              <MenuItem value={"INR"}>INR</MenuItem>
              <MenuItem value={"USD"}>USD</MenuItem>
            </Select>
            { user ? <UserSidebar/> : <AuthModal/> } 
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  )
}