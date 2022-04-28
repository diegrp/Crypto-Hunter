import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(() => ({
  carousel:{
    height: "50%",
    display: "flex",
    alignItems: "center"
  },
  carouselItem:{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    cursor: "pointer",
    color: "white",
    textTransform: "uppercase"
  }
}));