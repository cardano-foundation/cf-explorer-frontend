import { styled } from "@mui/material";
import { Link } from "react-router-dom";
import Container from "../../components/commons/Container";

export const StyledContainer = styled(Container)`
  padding: 30px 0 40px;
`;

export const Header = styled("div")`
  text-align: left;
`;

export const StyledButton = styled("button")`
  background: transparent;
  border: none;
  cursor: pointer;
  font-family: var(--font-family-title);
  font-size: var(--font-size-title);
  font-weight: var(--font-weight-bold);
  color: ${props => props.theme.titleColor};
  /* transition: all 3ms ease; */

  &:hover {
    color: ${props => props.theme.colorBlack};
  }
`;

export const ActiveButton = styled(StyledButton)`
  border-bottom: 4px solid var(--color-green-light);
  color: var(--color-black);
`;

export const StyledLink = styled(Link)`
  font-family: var(--font-family-text) !important;
  color: ${props => props.theme.colorBlue} !important;
`;
