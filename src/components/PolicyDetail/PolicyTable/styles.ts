import { Box, styled } from "@mui/material";
import { Link } from "react-router-dom";

export const LinkComponent = styled(Link)(({ theme }) => ({
  color: `${theme.colorBlue} !important`,
  fontFamily:'Helvetica, monospace !important'
}));
export const TitleTab = styled(Box)<{ active: boolean }>(({ active }) => ({
  fontWeight: "bold",
  textTransform: "capitalize",
  fontFamily: '"Roboto", sans-serif',
  fontSize: "1.125rem",
  color: active ? "#000000" : "unset",
}));
