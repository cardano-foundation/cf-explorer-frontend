import { Paper, TextField } from "@mui/material";
import { styled, Box } from "@mui/material";
import { Link } from "react-router-dom";

export const TitleDetail = styled(Box)`
  font-size: var(--font-size-title);
  font-weight: var(--font-weight-bold);
  font-family: var(--font-family-title);
`;

export const ItemDetail = styled(Box)`
  width: 100%;
  padding: 6px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ItemLeft = styled(Box)`
  display: flex;
  align-items: center;
`;

export const ItemLeftTitle = styled(Box)`
  margin-left: 10px;
  color: ${props => props.theme.palette.text.secondary};
  font-size: 14px;
`;

export const AddressGroup = styled(Box)`
  margin-top: 15px;
  margin-bottom: 24px;
  background: ${props => props.theme.palette.secondary.light};
  border-radius: 8px;
  padding: 12px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const AddressLink = styled(Link)`
  max-width: 90%;
  word-wrap: break-word;
  font-weight: var(--font-weight-bold);
  font-family: var(--font-family-text);
  color: ${props => props.theme.palette.secondary.main};
  font-size: 14px;
`;

export const Value = styled(Box)`
  color: black;
  font-weight: var(--font-weight-bold);
  font-size: 14px;
`;

export const StyledTextField = styled(TextField)`
  .MuiInputBase-root {
    padding: 0 9px;
    height: 40px;
    border: 1.5px solid ${props => props.theme.palette.border.main};
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

export const Option = styled("li")<{ active: number }>(({ theme, active }) => ({
  background: active ? theme.palette.green[600_10] : theme.palette.background.paper,
}));
