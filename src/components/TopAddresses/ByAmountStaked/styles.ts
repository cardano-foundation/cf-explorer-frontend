import { Box, styled } from "@mui/material";
import { Link } from "react-router-dom";

export const StyledLink = styled(Link)`
  font-family: var(--font-family-text) !important;
  color: ${(props) => props.theme.palette.secondary.main} !important;
`;

export const PerPage = styled("div")`
  margin-left: 8px;
  color: ${({ theme }) => theme.palette.grey[300]};
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
