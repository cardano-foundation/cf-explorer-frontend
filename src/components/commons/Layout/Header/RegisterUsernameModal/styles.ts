import { styled, Box, ButtonBase, FormHelperText, FormLabel, TextField } from "@mui/material";

export const StyledTitle = styled("h3")`
  margin-top: 0;
`;

export const StyledButton = styled(ButtonBase)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px 45px;
  gap: 8px;
  background: ${props => props.theme.colorBlueDark};
  border-radius: 8px;
  cursor: pointer;
  height: auto;
  border: none;
  font-size: var(--font-size-text);
  line-height: 1;
  height: 40px;
  margin-top: 35px;
`;

export const Span = styled("span")`
  font-family: var(--font-family-title);
  font-weight: var(--font-weight-bold);
  color: ${props => props.theme.textColorReverse};
  white-space: nowrap;
  line-height: 1;
`;

export const TextNote = styled(Box)`
  margin-bottom: 20px;
`;

export const Label = styled(FormLabel)`
  color: var(--text-color);
  margin-top: 20px;
  .MuiFormLabel-asterisk {
    color: var(--color-red);
  }
`;

export const StyledInput = styled(TextField)`
  .MuiOutlinedInput-notchedOutline {
    border: 1.5px solid ${props => props.theme.borderColor};
    border-radius: ${props => props.theme.borderRadius};
  }
  & > .MuiFormHelperText-root {
    margin: 5px 0;
    font-size: 12px;
  }
`;

export const TextError = styled(FormHelperText)`
  margin-top: 0px;
  color: ${props => props.theme.colorRed};
  font-size: 14px;
`;
