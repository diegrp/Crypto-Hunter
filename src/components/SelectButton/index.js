import React from "react";
import { useStyles } from "./styles";

// SelectButton

export const SelectButton = ({ onClick, selected, children }) => {
  
  const classes = useStyles(selected);
  
  return(
    <span
      onClick={onClick}
      selected={selected}
      className={classes.selectbutton}
    >
      {children}
    </span>
  )
}