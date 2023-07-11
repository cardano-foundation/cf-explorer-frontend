import { Box, MenuItem, Select, alpha, styled } from "@mui/material";
import { Link } from "react-router-dom";

export const CustomSelect = styled(Select)`
  font-family: var(--font-family-text);
  background: ${(props) => props.theme.palette.background.paper};
  color: ${(props) => props.theme.palette.text.secondary};
  border-radius: 8px;
  border: 1px solid rgba(152, 162, 179, 0.5);
  height: 35px;
  & > div {
    padding: 7.5px 14px;
    cursor: pointer;
    font-weight: 400;
    text-align: left;
    font-size: 14px;
  }
  & > fieldset {
    top: 0;
    border: none !important;
  }
  & > svg {
    color: ${(props) => props.theme.palette.text.secondary};
    font-size: 20px;
  }
  & .MuiList-root {
    border-radius: 8px;
  }
`;

export const OptionSelect = styled(MenuItem)(({ theme }) => ({
  textAlign: "center",
  alignItems: "center",
  display: "flex",
  padding: "12px 16px",
  justifyContent: "space-between",
  height: "40px",
  cursor: "pointer",
  "&:hover": {
    background: theme.palette.green[200_10]
  }
}));

export const CustomLink = styled(Link)(({ theme }) => ({
  textAlign: "center",
  alignItems: "center",
  display: "flex",
  padding: "12px 16px",
  justifyContent: "space-between",
  height: "40px",
  cursor: "pointer",
  "&:hover": {
    background: theme.palette.green[200_10]
  }
}));
export const TokenButton = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  minWidth: 250,
  height: 38,
  borderRadius: theme.spacing(1),
  border: `1px solid ${alpha(theme.palette.grey[300], 0.5)}`
}));
