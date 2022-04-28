import React from "react";
import { Container, Typography } from "@material-ui/core";
import { Carousel } from "./Carousel"; 
import { useStyles } from "./styles";

// Banner

export const Banner = () => {

  const classes = useStyles();

  return(
    <div className={classes.banner}>
      <Container className={classes.bannerContent}>
        <div className={classes.tagline}>
          <Typography
            variant="h2"
            style={{
              fontFamily: "Montserrat",
              fontWeight: "bold",
              marginBottom: 15
            }}
          >
           Escolha sua Cryptomoeda
          </Typography>
          <Typography
            variant="subtitle2"
            style={{
              fontFamily: "Montserrat",
              color: "darkgrey",
              textTransform: "capitalize"
            }}
          >
            Obtenha todas as informações sobre sua cryptomoeda favorita!
          </Typography>
        </div>
        {/* Alice Carousel com trending coins */}
        <Carousel/>
      </Container>
    </div>
  )
}