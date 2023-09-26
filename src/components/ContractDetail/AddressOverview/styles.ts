import { alpha, Paper, TextField, styled, Box, Grid } from "@mui/material";
import { Link } from "react-router-dom";

export const StyledAAmount = styled(Box)`
  display: flex;
  color: ${({ theme }) => theme.palette.secondary.main};
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
    backgroundColor: alpha(theme.palette.secondary.main, 0.8)
  }
}));

export const BannerSuccess = styled(Box)`
  font-weight: 500;
  font-size: 18px;
  line-height: 21px;
  text-align: center;
  color: ${(props) => props.theme.palette.success[800]};
  background: ${(props) => (props.theme.isDark ? "transparent" : props.theme.palette.success[100])};
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
  flex: 1
}));
