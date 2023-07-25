import { styled, Container } from "@mui/material";
import { Link } from "react-router-dom";

export const StyledContainer = styled(Container)`
  margin-top: 18px;
`;

export const StyledLink = styled(Link)`
  font-family: var(--font-family-text) !important;
  color: ${(props) => props.theme.palette.primary.main} !important;
`;
export const Img = styled("img")(() => ({
  paddingRight: "10px",
  width: "35px"
}));
