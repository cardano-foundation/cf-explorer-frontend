import { Box, Container, styled } from "@mui/material";
import { Link } from "react-router-dom";

export const StyledContainer = styled(Container)`
  margin-top: 18px;

  .MuiSelect-select.MuiSelect-outlined {
    padding-top: 10px;
    padding-bottom: 10px;
  }
`;

export const StyledLink = styled(Link)`
  font-family: var(--font-family-text) !important;
  color: ${(props) => props.theme.palette.secondary.main} !important;
`;

export const PerPage = styled("div")`
  margin-left: 8px;
`;

export const Actions = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap",
  marginTop: -10
}));

export const PageSize = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 3
}));

export const TimeDuration = styled("small")(({ theme }) => ({
  color: theme.palette.grey[300],
  display: "block",
  margin: "12px 0px"
}));
export const PoolName = styled(Link)`
  font-family: var(--font-family-text) !important;
  color: ${({ theme }) => theme.palette.secondary.main} !important;
`;
