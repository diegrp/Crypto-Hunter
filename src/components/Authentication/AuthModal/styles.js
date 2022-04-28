import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  modal:{
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper:{
    width: 400,
    backgroundColor: theme.palette.background.paper,
    color: "white",
    borderRadius: 10
  },
  google:{
    fontSize: 20,
    padding: 24,
    paddingTop: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    gap: 20
  }
}));