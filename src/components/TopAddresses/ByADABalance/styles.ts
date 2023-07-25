import { styled, Box } from "@mui/material";
import { Link } from "react-router-dom";

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
  color: theme.palette.secondary.light,
  display: "block",
  margin: "12px 0px"
}));

export const StyledLink = styled(Link)`
  font-family: var(--font-family-text) !important;
  color: ${(props) => props.theme.palette.primary.main} !important;
`;

export const PerPage = styled("div")`
  margin-left: 8px;
  color: ${({ theme }) => theme.palette.secondary.light};
`;
