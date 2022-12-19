import { Select, styled } from "@mui/material";
import { Link } from "react-router-dom";

export const AssetName = styled(Link)`
  color: ${props => props.theme.colorBlue} !important;
  font-family: var(--font-family-text) !important;
`;

export const Logo = styled("img")`
  width: 30px;
  height: 30px;
`;

export const StyledSelect = styled(Select)`
  font-family: var(--font-family-text);
  background: #fff;
  color: #344054;
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
    color: #344054;
    font-size: 20px;
  }
`;
