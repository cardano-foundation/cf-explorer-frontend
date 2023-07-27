import { Box, MenuItem, Select, alpha, styled } from "@mui/material";
import { Link } from "react-router-dom";

export const Img = styled("img")(() => ({
  display: "flex",
  alignItems: "center"
}));

export const Icon = styled("img")(() => ({
  paddingRight: "10px",
  width: "35px"
}));

export const CustomSelect = styled(Select)`
  font-family: var(--font-family-text);
  background: ${(props) => props.theme.palette.background.paper};
  color: ${(props) => props.theme.palette.text.secondary};
  border-radius: 8px;
  border: 1px solid rgba(152, 162, 179, 0.5);
  min-width: 250px;
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

export const TokenLink = styled(Link)(({ theme }) => ({
  margin: "0px 4px",
  textTransform: "uppercase",
  borderRadius: "2px",
  padding: "2px 10px",
  backgroundColor: alpha(theme.palette.secondary.light, 0.2),
  color: `${theme.palette.secondary.light} !important`,
  fontSize: "var(--font-size-text)",
  lineHeight: "1.5rem",
  fontWeight: "bold",
  display: "inline",
  whiteSpace: "nowrap"
}));

export const StyledSelect = styled(Select)(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  borderRadius: 8,
  height: 35,
  width: "100%",
  maxWidth: 280,
  [theme.breakpoints.down("sm")]: {
    marginTop: 15
  }
}));

export const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  height: 40,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  "&.Mui-selected": {
    backgroundColor: theme.palette.background.paper
  }
}));

export const TokenButton = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  minWidth: 250,
  height: 38,
  borderRadius: theme.spacing(1),
  border: `1px solid ${alpha(theme.palette.secondary.light, 0.5)}`
}));
export const Item = styled(Box)(() => ({
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexWrap: "wrap"
}));

export const TitleText = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  paddingRight: theme.spacing(1),
  marginBottom: theme.spacing(1),
  color: theme.palette.secondary.light
}));
