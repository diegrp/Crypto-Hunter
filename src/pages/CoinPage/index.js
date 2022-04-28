import React, { useState, useEffect } from "react";
import { 
  LinearProgress, 
  Typography, 
  Button 
} from "@material-ui/core";
import { numberWithCommas } from "../../components/Banner/Carousel";
import { CoinInfo } from "../../components/CoinInfo";
import { useParams } from "react-router-dom";
import { SingleCoin } from "../../config/api";
import { db } from "../../config/firebase";
import { doc, setDoc } from "firebase/firestore";
import { CryptoState } from "../../context/CryptoContext";
import axios from "axios";
import { useStyles } from "./styles";

// Coin Page

export const CoinPage = () => {

  const [ coin, setCoin ] = useState();

  const { id } = useParams();
  const { 
    currency, 
    symbol,
    user,
    setAlert,
    watchlist 
  } = CryptoState();
  const classes = useStyles();

  // Recebe dados da crypto pelo id com useParams

  useEffect(() => {
    const fetchSingleCoin = async () => {
      const { data } = await axios.get(SingleCoin(id));
      setCoin(data);
    }
    fetchSingleCoin();
  },[id]);

  const inWatchlist = watchlist.includes(coin?.id);

  const addToWatchlist = async ( ) => {

    const coinRef = doc(db, "watchlist", user.uid);

    try{

      await setDoc(coinRef, 
        { coins: inWatchlist ? [ coin.id ] : [ ...watchlist, coin.id ] }
      );  

      setAlert({
        open: true,
        type: "success",
        message: `${coin.name}, adicionado em sua lista de favoritos!`
      });
    }catch(error){
      setAlert({
        open: true,
        type: "error",
        message: error.message
      });
    }
  };

  const removeFromWatchlist = async ( ) => {
    
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

  if (!coin) return <LinearProgress style={{ backgroundColor:"gold" }} />

  return(
    <div>
      ...
    </div>
  )
}