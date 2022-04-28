import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(() => ({
  container:{
    fontFamily: "monospace",
    width: 350,
    height: "100%",
    padding: 25,
    display: "flex",
    flexDirection: "column"
  },
  profile:{
    flex: 1,
    height: "92%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 20
  },
  picture:{
    width: 200,
    height: 200,
    backgroundColor: "#EEBC1D",
    cursor: "pointer",
    objectFit: "contain"
  },
  logout:{
    width: "100%",
    height: "8%",
    backgroundColor: "#EEBC1D",
    marginTop: 20
  },
  watchlist:{
    flex: 1,
    width: "100%",
    backgroundColor: "grey",
    padding: 15,
    paddingTop: 10,
    borderRadius: 10,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 12,
    overflow: "scroll"
  },
  coin:{
    width: "100%",
    backgroundColor: "#EEBC1D",
    color: "black",
    padding: 10,
    borderRadius: 5,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    boxShadow: "0 0 3px black"
  }
}));