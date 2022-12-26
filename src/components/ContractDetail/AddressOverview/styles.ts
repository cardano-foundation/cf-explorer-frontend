import { Paper, TextField } from "@mui/material";
import { styled, Box } from "@mui/material";

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
  box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.1);
  padding: 8px 0;
`
