import React, { useState, useEffect } from "react";
import { TrendingCoins } from "../../../config/api";
import { CryptoState } from "../../../context/CryptoContext";
import { Link } from "react-router-dom";
import AliceCarousel from "react-alice-carousel";
import axios from "axios";
import { useStyles } from "./styles";

// Adicionar a virgula em algum tipo de tendência na crypto

export const numberWithCommas = ( x ) => {
  return x.toString().replace(/B(?=(\d{3})+(?!\d))/g, ",");
};

// Carousel trending coins

export const Carousel = () => {
  
  const [ trending, setTrendig ] = useState([]);
  const { currency, symbol } = CryptoState();
  const classes = useStyles();

  /* Pega a tendencia de uma determinada crypto pelo tipo da moeda */

  useEffect(() => {
    const fetchTrendingCoin = async () => {
      const { data } = await axios.get(TrendingCoins(currency));
      setTrendig(data);
    }
    fetchTrendingCoin();
  },[currency]);

  return(
    <div>
      ...
    </div>
  )
}