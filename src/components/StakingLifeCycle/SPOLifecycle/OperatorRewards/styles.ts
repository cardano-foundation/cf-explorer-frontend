import { Box, Typography, alpha, styled } from "@mui/material";
import { Link } from "react-router-dom";

export const StyledEpoch = styled(Link)`
  color: ${(props) => props.theme.palette.primary.main} !important;
  font-family: var(--font-family-text) !important;
`;
export const StyledLink = styled(Link)`
  color: ${(props) => props.theme.palette.primary.main} !important;
  font-family: var(--font-family-text) !important;
  text-decoration: underline !important;
`;

export const DrawContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  height: "max-content",
  position: "relative",
  width: "100%",
  maxWidth: 820,
  margin: "0 auto",
  marginTop: 35,
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    gap: 60
  }
}));

export const ADAOperator = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  paddingTop: "31px",
  cursor: "pointer",
  [theme.breakpoints.down("sm")]: {
    padding: "0px 0px 20px"
  }
}));
export const ADATitle = styled(Box)(({ theme }) => ({
  height: "30px",
  color: theme.palette.secondary.main,
  display: "flex",
  alignItems: "flex-end",
  fontWeight: 700
}));

export const ADAAmount = styled(Box)`
  color: ${(props) =>
    props.theme.isDark ? props.theme.palette.success[700] : props.theme.palette.success[800]} !important;
`;

export const HoldContainer = styled(Box)`
  padding: 20px 27px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  border: 1.5px solid ${({ theme }) => theme.palette.primary[200]};
  border-radius: 25px;
  gap: 20px;
  width: 100%;
  max-width: 324px;
  background: ${({ theme }) => alpha(theme.palette.secondary.light, 0.03)};
`;

export const HoldBoxTitle = styled(Typography)`
  font-size: 18px;
  color: ${({ theme }) => theme.palette.secondary.main};
  font-weight: bold;
`;
