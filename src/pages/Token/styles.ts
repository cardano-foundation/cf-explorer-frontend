import { styled, Container, Select } from "@mui/material";
import { Link } from "react-router-dom";

export const StyledContainer = styled(Container)`
  padding: 20px 0 40px;
`;

export const AssetName = styled(Link)`
  color: ${props => props.theme.palette.secondary.main} !important;
  font-family: var(--font-family-text) !important;
`;

export const Logo = styled("img")`
  width: 36px;
  height: 36px;
  object-fit: cover;
`;

export const StyledSelect = styled(Select)`
  font-family: var(--font-family-text);
  background: ${props => props.theme.palette.background.paper};
  color: ${props => props.theme.palette.text.secondary};
  border-radius: 8px;
  min-width: 250px;
  & > div {
    padding: 6.5px 14px;
    cursor: pointer;
    font-weight: 400;
    text-align: left;
  }
  & > fieldset {
    top: 0;
    border: none !important;
  }
  & > svg {
    color: ${props => props.theme.palette.text.secondary};
    font-size: 20px;
  }
`;
