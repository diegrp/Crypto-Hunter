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
    <section className={classes.container}>
      <div className={classes.sidebar}>
        {/* Image, name e description */}
        <img
          src={coin?.image.large}
          alt={coin.name}
          height={200}
          style={{ marginBottom: 20 }}
        />
        <Typography variant="h3" className={classes.heading}>
          {coin?.name}
        </Typography>
        <Typography variant="subtitle1" className={classes.description}>
          {coin?.description.en.split(". ")[0].replace(/<[^>]*>/, "")}
        </Typography>
        {/* Rank, Current Price e Market Cap */}
        <div className={classes.marketData}>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Rank:
            </Typography>
            &nbsp; &nbsp;
            <Typography variant="h5" style={{ fontWeight: 500 }}>
              {numberWithCommas(coin?.market_cap_rank)}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Preço Atual:
            </Typography>
            &nbsp; &nbsp;
            <Typography variant="h5" style={{ fontWeight: 500 }}>
              {symbol}{" "}
              {numberWithCommas(coin?.market_data.current_price[currency.toLowerCase()])}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Market Cap:
            </Typography>
            &nbsp; &nbsp;
            <Typography variant="h5" style={{ fontWeight: 500 }}>
              {symbol}{" "}
              {numberWithCommas(coin?.market_data.market_cap[currency.toLowerCase()]
                .toString().slice(0, -6)
              )}
            </Typography>
          </span>
          {user && (
            <Button
              variant="contained"
              style={{
                width: "100%",
                height: 40,
                backgroundColor: inWatchlist ? "#FF0000" : "#EEBC1D"
              }}
                onClick={ inWatchlist ? removeFromWatchlist : addToWatchlist }
              >
                { inWatchlist ? "Remover da minha lista" : "Adicionar na minha lista" }
            </Button>
          )}
        </div>
      </div>
      {/* Chart js */}
      <CoinInfo coin={coin} />
    </section>
  )
}