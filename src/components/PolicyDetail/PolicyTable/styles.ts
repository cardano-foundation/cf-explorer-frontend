import { Box, styled } from "@mui/material";
import { Link } from "react-router-dom";

export const LinkComponent = styled(Link)(({ theme }) => ({
  color: `${theme.linkColor} !important`,
}));
export const TitleTab = styled(Box)<{ active: boolean }>(({ active, theme }) => ({
  fontWeight: "bold",
  textTransform: "capitalize",
  fontFamily: '"Roboto", sans-serif',
  fontSize: "1.125rem",
  color: active ? theme.textColorBold : "unset",
}));
