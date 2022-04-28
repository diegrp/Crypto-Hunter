import { AppRouter } from "./router/router";
import CryptoContext from "./context/CryptoContext";
import { useStyles } from "./App.styles";

// App Final

const App = () => {

  const classes = useStyles();

  return(
    <main className={classes.App}>
      <CryptoContext>
        <AppRouter/>
      </CryptoContext>
    </main>
  )
}

export default App;