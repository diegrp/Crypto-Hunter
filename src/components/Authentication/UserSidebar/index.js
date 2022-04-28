import React, { useState } from "react";
import { Drawer, Button, Avatar } from "@material-ui/core";
import { auth, db } from "../../../config/firebase";
import { CryptoState } from "../../../context/CryptoContext";
import { signOut } from "firebase/auth";
import { AiFillDelete } from "react-icons/ai";
import { numberWithCommas } from "../../Banner/Carousel";
import { doc, setDoc } from "firebase/firestore";
import { useStyles } from "./styles";
/* eslint-disable array-callback-return */

// UserSidebar

export const UserSidebar = () => {

  const [ state, setState ] = useState({
    right: false,
  });

  const classes = useStyles();

  const { 
    setAlert, 
    user, 
    coins, 
    watchlist, 
    symbol 
  } = CryptoState();

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  // Remover item adicionado da minha lista

  const removeFromWatchlist = async ( coin ) => {
    
    const coinRef = doc(db, "watchlist", user.uid);

    try{
      
      await setDoc(coinRef, 
        { coins: watchlist.filter((watch) => watch !== coin.id) },
        { merge: "true" }
      );

      setAlert({
        open: true,
        type: "success",
        message: `${coin.name}, removido da sua lista de favoritos!`
      });

    }catch(error){
      setAlert({
        open: true,
        type: "error",
        message: error.message
      });
    }
  };

  // Logout no Sidebar Auth

  const logout = () => {
    signOut(auth);

    setAlert({
      open: true,
      type: "success",
      message: `Deslogado com successo!`
    });

    toggleDrawer();
  };

  return (
    <div>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Avatar
            onClick={toggleDrawer(anchor, true)}
            style={{
              width: 38,
              height: 38,
              backgroundColor: "#EEBC1D",
              marginLeft: 15,
              cursor: "pointer",
            }}
            src={user.photoURL}
            alt={user.displayName || user.email}
          />
          <Drawer 
            anchor={anchor} 
            open={state[anchor]} 
            onClose={toggleDrawer(anchor, false)}
          >
            <div className={classes.container}>
              <div className={classes.profile}>
                <Avatar
                  className={classes.picture}
                  src={user.photoURL}
                  alt={user.displayName || user.email}
                />
                <span
                  style={{
                    width: "100%",
                    fontSize: 25,
                    fontWeight: "bold",
                    textAlign: "center",
                    wordBreak: "break-word"
                  }}
                >
                  {user.displayName || user.email}
                </span>
                <div className={classes.watchlist}>
                  <span style={{ fontSize: 15, textShadow: "0 0 5px black" }}>
                    Lista de Favoritos
                  </span>
                  {coins.map((coin) => {
                    if(watchlist.includes(coin?.id)){
                      return(
                        <div key={coin.id} className={classes.coin}>
                          <span>{coin.name}</span>
                          <span style={{ display: "flex", gap: 8 }}>
                            {symbol}
                            {numberWithCommas(coin.current_price.toFixed(2))}
                            {/* Deletar item adicionado na minha lista */}
                            <AiFillDelete
                              size={16}
                              style={{ cursor: "pointer" }}
                              onClick={() => removeFromWatchlist(coin)}
                            />
                          </span>
                        </div>
                      )
                    }
                  })}
                </div>
              </div>
              {/* Deslogar do meu sidebar */}
              <Button
                variant="contained"
                className={classes.logout}
                onClick={logout}
              >
                Sair
              </Button>
            </div>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}