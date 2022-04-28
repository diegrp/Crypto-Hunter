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

  // Meus items do Alice Carousel

  const items = trending.map((coin) => {

    const profit = coin?.price_change_percentage_24h >= 0;

    return(
      <Link
        to={`coins/${coin.id}`}
        className={classes.carouselItem}
      >
        <img
          src={coin?.image}
          alt={coin.name}
          height={80}
          style={{ marginBottom: 20 }}
        />
        <span>
          {coin?.symbol}
          &nbsp;
          <span
            style={{
              color: profit > 0 ? "rgb(14, 203, 129)" : "red",
              fontWeight: 500
            }}
          >
            {profit && "+"}
            {coin?.price_change_percentage_24h?.toFixed(2)}%
          </span>
        </span>
        <span
          style={{
            fontSize: 22,
            fontWeight: 500
          }}
        >
          {symbol}{" "}
          {numberWithCommas(coin?.current_price.toFixed(2))}
        </span>
      </Link>
    )
  });

  // Reponsive do Alice Carousel
   
  const responsive = {
    0:{
      items: 2
    },
    512:{
      items: 4
    }
  };

  return(
    <div className={classes.carousel}>
      <AliceCarousel
        mouseTracking
        infinite
        autoPlay
        animationDuration={1500}
        autoPlayInterval={1000}
        disableButtonsControls
        disableDotsControls
        responsive={responsive}
        items={items}
      />
    </div>  
  )
}