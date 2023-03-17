import { Paper, TextField } from "@mui/material";
import { styled, Box } from "@mui/material";
import { Link } from "react-router-dom";

export const StyledAAmount = styled(Box)`
  display: flex;
`;

export const StyledTextField = styled(TextField)`
  .MuiInputBase-root {
    padding: 0 9px;
    height: 40px;
    border: 1.5px solid var(--border-color);
    border-radius: 8px;
  }
  .MuiInputBase-input {
    font-size: 14px;
  }
  .MuiOutlinedInput-notchedOutline {
    border: none;
  }
`;

export const WrapPaperDropdown = styled(Paper)`
  border-radius: 8px;
  box-shadow: ${props => props.theme.shadow.dropdown};
  padding: 8px 0;
  & > .MuiAutocomplete-listbox {
    padding: 0px;
  }
`;

export const Pool = styled(Link)`
  max-width: 200px;
  text-overflow: hidden;
  color: ${props => props.theme.palette.secondary.main} !important;
  font-weight: bold;
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;
