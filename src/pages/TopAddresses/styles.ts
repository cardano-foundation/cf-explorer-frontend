import { styled, Container, Box } from "@mui/material";
import { Link } from "react-router-dom";

export const StyledContainer = styled(Container)`
  margin-top: 18px;

  .MuiSelect-select.MuiSelect-outlined {
    padding-top: 10px;
    padding-bottom: 10px;
  }
`;

export const Actions = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: -30,
}));

export const PageSize = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}));

export const TimeDuration = styled("small")(({ theme }) => ({
  color: theme.palette.grey[400],
  display: "block",
  marginRight: 15,
}));

export const StyledLink = styled(Link)`
  font-family: var(--font-family-text) !important;
  color: ${props => props.theme.palette.secondary.main} !important;
`;

export const PerPage = styled("div")`
  margin-left: 8px;
`;
