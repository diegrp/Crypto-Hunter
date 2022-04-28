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
    <ThemeProvider theme={darkTheme}>
      <Container style={{ textAlign: "center" }}>
        <Typography
          variant="h4"
          style={{
            fontFamily: "Montserrat",
            fontWeight: "bold",
            margin: 18,
            paddingTop: 15
          }}
        >        
          Encontre sua cryptomoeda favorita
        </Typography>
        <TextField
          variant="outlined"
          style={{
            width: "100%",
            marginBottom: 20
          }}
          label="Procure a crypto pelo nome ou seu símbolo..."
          value={search}
          onChange={({target}) => setSearch(target.value)}
        />
        {loading ? (
          <LinearProgress style={{ backgroundColor: "gold" }}/>
        ):(
          <>
            <TableContainer>
              <Table>
                {/* Cabeçário da tabela, vai ter nossa: Coin, Price, Change 24h e Market Cap */}
                <TableHead style={{ backgroundColor: "#EEBC1D" }}>
                  <TableRow>
                    {["Moeda", "Preço", "Mudança em 24h", "Market Cap"].map((head) => (
                      <TableCell
                        key={head}
                        style={{
                          fontFamily: "Montserrat",
                          fontWeight: 700,
                          color: "black"
                        }}
                        // Alinha o head da tabela, conforme o nome
                        align={ head === "Moeda" ? "inherit" : "right" }
                      >
                        {head}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {handleSearch()
                    // Quantidade de items por página, através do slice
                    .slice((page - 1) * 10, (page - 1) * 10 + 10)
                    .map((row) => {
                    
                    const profit = row?.price_change_percentage_24h > 0;

                    return(
                      <TableRow
                        key={row.id}
                        className={classes.row}
                        onClick={() => navigate(`coins/${row.id}`)}
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          style={{
                            display: "flex",
                            gap: 15
                          }}
                        >
                          {/* Imagem da crypto */}
                          <img
                            src={row?.image}
                            alt={row.name}
                            height={50}
                            style={{ marginBottom: 10 }}
                          />
                          {/* symbol e name */}
                          <div style={{ display: "flex", flexDirection: "column" }}>
                            <span  style={{ fontSize: 22, textTransform: "uppercase" }}>
                              {row?.symbol}
                            </span>
                            <span style={{ color: "darkgrey" }}>
                              {row.name}
                            </span>
                          </div>
                        </TableCell>
                        {/* Preço atual da crypto */}
                        <TableCell align="right">
                          {symbol}{" "}
                          {numberWithCommas(row?.current_price.toFixed(2))}
                        </TableCell>
                        {/* Alteração da porcentagem da crypto em 24h */}
                        <TableCell
                          align="right"
                          style={{
                            color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                            fontWeight: 500
                          }}
                        >
                          {profit && "+"}
                          {row?.price_change_percentage_24h.toFixed(2)}%
                        </TableCell>
                        {/* Market cap da crypto */}
                        <TableCell align="right">
                          {symbol}{" "}
                          {numberWithCommas(row?.market_cap.toString().slice(0, -6))}
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            {/* Numeração das páginas */}
            <Pagination
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                padding: 20
              }}
              count={parseInt((handleSearch().length / 10).toFixed(0))}
              classes={{ ul: classes.pagination }}
              onChange={( _, value ) => {
                setPage(value);
                window.scroll(0, 450);
              }}
            />
          </>
        )}
      </Container>
    </ThemeProvider>
  )
}