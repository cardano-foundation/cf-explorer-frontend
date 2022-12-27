import { styled } from "@mui/material";
import { Link } from "react-router-dom";

export const LinkComponent = styled(Link)(({ theme }) => ({
  color: `${theme.colorBlue} !important`,
  fontFamily:'Helvetica, monospace !important'
}));
