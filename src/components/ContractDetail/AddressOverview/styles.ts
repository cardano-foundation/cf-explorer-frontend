import { alpha, Paper, TextField, styled, Box, Grid } from "@mui/material";
import { Link } from "react-router-dom";

import Card from "src/components/commons/Card";

export const StyledAAmount = styled(Box)`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.palette.secondary.main};
  word-break: break-word;
`;

export const StyledTextField = styled(TextField)`
  .MuiInputBase-root {
    padding: 0 9px;
    height: 40px;
    border: 1.5px solid ${({ theme }) => theme.palette.primary[200]};
    border-radius: 8px;
  }
  .MuiInputBase-input {
    font-size: 14px;
  }
  .MuiOutlinedInput-notchedOutline {
    border: none;
  }
`;

export const WrapPaperDropdown = styled(Paper)`
  border-radius: 8px;
  box-shadow: ${(props) => props.theme.shadow.dropdown};
  padding: 8px 0;
  & > .MuiAutocomplete-listbox {
    padding: 0px;
  }
`;

export const Pool = styled(Link)`
  max-width: 200px;
  text-overflow: hidden;
  color: ${(props) => props.theme.palette.primary.main} !important;
  font-weight: bold;
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;
export const Logo = styled("img")`
  width: 25px;
  height: 25px;
  object-fit: cover;
`;
export const LogoEmpty = styled(Box)`
  width: 25px;
  height: 25px;
  background: ${(props) => alpha(props.theme.palette.common.white, 0.6)};
  border-radius: 50%;
  border: 1px solid ${(props) => props.theme.palette.primary[200]};
`;

export const GridContainer = styled(Grid)``;
export const GridItem = styled(Grid)``;

export const RedirectButton = styled(Box)(({ theme }) => ({
  textTransform: "capitalize",
  backgroundColor: theme.mode === "light" ? theme.palette.secondary.main : theme.palette.primary.main,
  color: theme.palette.secondary[0],
  padding: `${theme.spacing(1)} ${theme.spacing(2)} `,
  ":hover": {
    backgroundColor: theme.isDark ? theme.palette.primary.dark : alpha(theme.palette.secondary.main, 0.8)
  },
  borderRadius: 8
}));

export const BannerSuccess = styled(Box)`
  font-weight: 500;
  font-size: 18px;
  line-height: 21px;
  text-align: center;
  color: ${(props) => (props.theme.isDark ? props.theme.palette.success[700] : props.theme.palette.success[800])};
  border: ${(props) => props.theme.palette.primary[200]};
  border-radius: 10px;
  width: 100%;
  padding: 12px 0px;
  margin: 20px 0px;
`;

export const TimeDuration = styled("small")(({ theme }) => ({
  color: theme.palette.secondary.light,
  display: "block",
  textAlign: "left",
  flex: 1,
  [theme.breakpoints.down("md")]: {
    marginTop: 8
  }
}));

export const CardContainer = styled(Card)`
  ${(props) => props.theme.breakpoints.down("sm")} {
    h2 {
      padding-top: 0 !important;
      margin-top: 0 !important;
      width: 100%;
    }
  }
`;

export const WrapButtonExtra = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: 10,
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    width: "100%"
  }
}));

export const StyledVerifyButton = styled(Box)(({ theme }) => ({
  color: theme.palette.success[800],
  background: theme.palette.success[100],
  border: `2px solid ${theme.isDark ? theme.palette.warning[800] : theme.palette.success.main}`,
  cursor: "pointer",
  borderRadius: 4,
  padding: "8px 14px",
  fontWeight: 700,
  lineHeight: 1.2,
  fontSize: "14px",
  height: "34px",
  boxSizing: "border-box"
}));

export const VerifyScriptContainer = styled(Box)`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 10px;
  flex-wrap: wrap;
`;
