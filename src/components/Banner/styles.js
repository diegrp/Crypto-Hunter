import Image from "../../images/banner.jpg";
import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(() => ({
  banner:{
    backgroundImage: `url(${Image})`
  },
  bannerContent:{
    display: "flex",
    height: 400,
    flexDirection: "column",
    justifyContent: "space-around"
  },
  tagline:{
    height: "40%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center"
  }
}));