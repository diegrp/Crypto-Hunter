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
      ...
    </div>
  );
}