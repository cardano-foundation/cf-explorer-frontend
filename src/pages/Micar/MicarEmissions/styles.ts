import { Box, Card, Divider, styled, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

export const StyledTitle = styled(Typography)(({ theme }) => ({
  color: theme.isDark ? "#F7F9FF" : "#000000",
  fontWeight: 700,
  textAlign: "left",
  marginTop: "42px",
  marginBottom: "20px",
  fontSize: "48px",
  [theme.breakpoints.down("md")]: {
    fontSize: "40px",
    marginTop: "0px"
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "20px",
    marginTop: "0px"
  }
}));

export const StyledTypography = styled(Typography)(({ theme }) => ({
  color: theme.isDark ? "#F7F9FF" : "#000000",
  fontWeight: 700,
  textAlign: "left",
  marginTop: "12px",
  marginBottom: "2px",
  fontSize: "24px",
  [theme.breakpoints.down("sm")]: {
    fontSize: "16px",
    marginTop: "0px"
  }
}));
export const StyledValue = styled(Typography)(({ theme }) => ({
  color: theme.isDark ? "#F7F9FF" : "#000000",
  textAlign: "left",
  marginTop: "12px",
  marginBottom: "20px",
  fontSize: "20px",
  [theme.breakpoints.down("sm")]: {
    marginTop: "0px",
    fontSize: "14px"
  }
}));
export const StyledCard = styled(Card)(({ theme }) => ({
  padding: "2rem",
  border: `1px solid ${theme.isDark ? "#000000" : "#CCCCCC"}`,
  backgroundColor: theme.isDark ? "#24262E" : "#FFFFFF",
  borderRadius: "48px",
  textAlign: "center",
  margin: "auto",
  marginTop: "2rem"
}));

export const SearchContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "start",
  alignItems: "center",
  background: theme.isDark ? "#000000" : "#F9F9F9",
  paddingLeft: 30,
  borderRadius: 10,
  marginBottom: 35,
  marginTop: 25,
  height: 58,
  fontSize: 500,
  opacity: theme.isDark ? "70%" : "100%",
  border: `1.5px solid ${theme.isDark ? "#24262E" : "#FFFFFF"}`,
  "&:focus-within": {
    borderColor: theme.palette.secondary.light
  },
  [theme.breakpoints.down("sm")]: {
    width: "unset",
    maxWidth: "unset"
  }
}));

export const StyledInput = styled("input")`
  border: none;
  width: 100%;
  font-size: var(--font-size-text-small);
  border-radius: 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  background: ${({ theme }) => (theme.isDark ? "#000000" : "#F9F9F9")};
`;

export const SubmitButton = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  box-shadow: none;
  border-radius: 50%;
  min-width: 60px;
  width: 60px;
  height: 60px;
  background-color: "red" !important;
  color: "red" !important;
  cursor: pointer;
`;

export const StyledLink = styled(Link)`
  font-family: var(--font-family-text) !important;
  color: ${(props) => props.theme.palette.primary.main} !important;
`;

export const Line = styled(Divider)(({ theme }) => ({
  marginBottom: "32px",
  borderColor: theme.isDark ? "#434656" : "#0000001F",
  marginTop: "32px"
}));
