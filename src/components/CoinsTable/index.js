import React, { useState, useEffect } from "react";
import { CryptoState } from "../../context/CryptoContext";
import { useNavigate } from "react-router-dom";
import { numberWithCommas } from "../Banner/Carousel";
import { 
  ThemeProvider, 
  Container, 
  Typography, 
  TextField, 
  LinearProgress, 
  TableContainer, 
  Table, 
  TableRow, 
  TableCell, 
  TableHead, 
  TableBody 
} from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import { useStyles, darkTheme } from "./styles";

// Tabela com as crypto

export const CoinsTable = () => {

  const [ page, setPage ] = useState(1);
  const [ search, setSearch ] = useState("");

  const { 
     currency,
     symbol, 
     fetchCoinList, 
     coins, 
     loading 
  } = CryptoState();
  const navigate = useNavigate();
  const classes = useStyles();

  /* Recebe as crytos pelo tipo da moeda, e faz verificações de loading no carregamento */

  useEffect(() => {
    fetchCoinList();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[currency]);

  /* Procura em minha lista de crypto que esteja de acrodo com o nome ou symbol, através do search pelo textfield */
  
  const handleSearch = ( ) => {
    return coins.filter((coin) => (
      coin.name.toLowerCase().includes(search) ||
      coin.symbol.toLowerCase().includes(search)
    ));
  }

  return(
   <div>
     ...
   </div> 
  )
}