import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(() => ({
  selectbutton:(selected) => ({
    width: "22%",
    fontFamily: "Montserrat",
    padding: "10px 20px",
    border: "1px solid gold",
    borderRadius: 5,
    cursor: "pointer",
    backgroundColor: selected ? "gold" : "",
    color: selected ? "black" : "",
    fontWeight: selected ? "700" : "500",
    "&:hover":{
      backgroundColor: "gold",
      color: "black"
    },
    display: "flex",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center"
  })
}));