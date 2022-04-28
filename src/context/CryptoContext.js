import React, { 
  useState, 
  useEffect, 
  createContext, 
  useContext 
} from "react";
import { CoinList } from "../config/api";
import { auth, db } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import axios from "axios";

const CryptoApp = createContext();

const CryptoContext = ({ children }) => {

  // Lista de cryptomoedas
  const [ coins, setCoins ] = useState([]);
  // Estado de carregamento da cryptomoeda
  const [ loading, setLoading ] = useState(false);
  // Tipo da moeda
  const [ currency, setCurrency ] = useState("INR");
  // Símbolo da moeda
  const [ symbol, setSymbol ] = useState("₹");
  // Usuário authenticado
  const [ user, setUser ] = useState(null);
  // Mensagem de alerta em MUI
  const [ alert, setAlert ] = useState({
    open: true,
    type: "success",
    message: ""
  });
  // Lista de cryptomoedas favoritas
  const [ watchlist, setWatchlist ] = useState([]);

  useEffect(() => {
    if (currency === "INR") setSymbol("₹");
    else if (currency === "USD") setSymbol("$");
  },[currency]);

  // Recebe as tendência de todas as cryptos
  const fetchCoinList = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));
    setCoins(data);
    setLoading(false);
  };

  // Verifica se existe um usuário authenticado para efetuar login
  
  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) setUser(user);
      else setUser(null);
    });
  },[]);

  // Verifica se eu tenho novos items adicionados, dentro do meu watchlist para atualizar seu estado

  useEffect(() => {
    if(user){
      const coinRef = doc(db, "watchlist", user.uid);
      
      var unsubscribe = onSnapshot(coinRef, coin => {
        if(coin.exists()){
          setWatchlist(coin.data().coins);
        }else{
          console.log("No items in watchlist!");
        }
      });

      return () => {
        unsubscribe();
      }
    }
  },[user]);

  return(
    <CryptoApp.Provider value={{ 
      currency, 
      symbol, 
      setCurrency, 
      coins, 
      loading, 
      fetchCoinList,
      alert,
      setAlert,
      user,
      watchlist
    }}>
      {children}
    </CryptoApp.Provider>
  )
};

export default CryptoContext;

// Hook

export const CryptoState = () => {
  return useContext(CryptoApp);
};