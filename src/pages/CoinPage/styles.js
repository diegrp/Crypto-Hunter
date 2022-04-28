import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  container:{
    display: "flex",
    [theme.breakpoints.down("md")]:{
      flexDirection: "column",
      alignItems: "center",
      borderRight: "none",
      borderBottom: "2px solid gray"
    }
  },
  sidebar:{
    display: "flex",
    width: "30%",
    [theme.breakpoints.down("md")]:{
      width: "100%",
      borderRight: "none",
      borderBottom: "2px solid gray"
    },
    flexDirection: "column",
    alignItems: "center",
    marginTop: 25,
    borderRight: "2px solid gray"
  },
  heading:{
    fontFamily: "Montserrat",
    fontWeight: "bold",
    marginBottom: 20
  },
  description:{
    width: "100%",
    fontFamily: "Montserrat",
    padding: "0px 25px 15px 25px",
    textAlign: "justify"
  },
  marketData:{
    width: "100%",
    alignSelf: "start",
    margin: "25px 0",
    padding: "0px 25px 0px 25px",
    [theme.breakpoints.down("md")]:{
      justifyContent: "space-around"
    },
    [theme.breakpoints.down("sm")]:{
      flexDirection: "column",
      alignItems: "center"
    },
    [theme.breakpoints.down("xs")]:{
      alignItems: "center"
    }
  }
}));