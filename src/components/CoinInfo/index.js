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

  // Data e options, atributos para nosso component Line do chart js

  const data = {
    labels: historicData.map((coin) => {
      let date = new Date(coin[0]);
      let time = date.getHours() > 12 
      ? `${date.getHours() - 12}:${date.getMinutes()} PM` 
      : `${date.getHours()}:${date.getMinutes()} AM`
      return days === 1 ? time : date.toLocaleDateString();
    }),
    datasets:[{
      data: historicData.map((coin) => coin[1]),
      label: `Preço: ( ${days} ${days > 1 ? "dias" : "dia"} ) em ${currency}`,
      borderColor: "#EBBC1D"
    }]
  };

  const options = {
    elements:{
      point:{
        radius: 1
      }
    }
  };

  return(
    <ThemeProvider theme={darkTheme}>
      <div className={classes.container}>
        {!historicData ? (
          <CircularProgress
            style={{
              color: "gold"
            }}
            height={250}
            thickness={1}
          />
        ):(
          <>
            <Line data={data} options={options} />
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-around",
                marginTop: 20
              }}
            >
              {chartDays.map((day) => (
                <SelectButton
                  key={day.value}
                  onClick={() => setDays(day.value)}
                  selected={day.value === days}
                >
                  {day.label}
                </SelectButton>
              ))}
            </div>
          </>
        )}
      </div>
    </ThemeProvider>
  )
}