import { styled, Container } from "@mui/material";
import { Link } from "react-router-dom";

export const StyledContainer = styled(Container)`
  max-width: 95vw !important;
  margin-top: 18px;

  @media screen and (max-width: ${(props) => props.theme.breakpoints.values.sm}px) {
    padding-top: 10px;
    margin-top: 0px !important;
    padding-bottom: 20px;
  }
`;

export const StyledLink = styled(Link)`
  font-family: var(--font-family-text) !important;
  color: ${(props) => props.theme.palette.primary.main} !important;
`;

export const TimeDuration = styled("small")(({ theme }) => ({
  color: theme.palette.secondary.light,
  display: "block",
  textAlign: "left",
  marginTop: "0.5rem"
}));
