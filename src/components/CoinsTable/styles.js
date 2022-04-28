import { makeStyles, createTheme } from "@material-ui/core/styles";

export const useStyles = makeStyles(() => ({
  row:{
    fontFamily: "Montserrat",
    backgroundColor: "#14161a",
    cursor: "pointer",
    "&:hover":{
      backgroundColor: "#131111"
    }  
  },
  pagination:{
    "& .MuiPaginationItem-root":{
      color: "gold"
    }
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