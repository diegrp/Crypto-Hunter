import { makeStyles, createTheme } from "@material-ui/core/styles";

export const useStyles = makeStyles(() => ({
  title:{
    flex: 1,
    fontFamily: "Montserrat",
    fontWeight: "bold",
    color: "gold",
    cursor: "pointer"
  }
}));

export const darkTheme = createTheme({
  palette:{
    primary:{
      main: "#fff"
    },
    type: "dark"
  }
});