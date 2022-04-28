import React, { useState, useEffect } from "react";
import { ThemeProvider, CircularProgress } from "@material-ui/core";
import { Line } from "react-chartjs-2";
import { CryptoState } from "../../context/CryptoContext";
import { HistoricalChart } from "../../config/api";
import { chartDays } from "../../config/data/data";
import { SelectButton } from "../../components/SelectButton";
import axios from "axios";
import { useStyles, darkTheme } from "./styles";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Informações das Cryptos

export const CoinInfo = ({ coin }) => {

  const [ historicData, setHistoricData ] = useState([]);
  const [ days, setDays ] = useState(1);

  const { currency } = CryptoState();
  const classes = useStyles();

  // Recupera os dados para a montagem do nosso chart se utilizando do id da crypto, dias e o tipo da moeda

  useEffect(() => {
    const fetchHistoricData = async () => {
      const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
      setHistoricData(data.prices);
    }
    fetchHistoricData();
  },[coin, days, currency]);

  return(
    <div>
      ...
    </div>
  )
}