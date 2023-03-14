import { LoadingButton } from "@mui/lab";
import { alpha, FormHelperText, FormLabel, InputBase, Link, styled } from "@mui/material";

export const StyledLink = styled(Link)`
  text-decoration: none;
  font-family: var(--font-family-text);
  color: ${props => props.theme.palette.secondary.main};
  font-weight: var(--font-weight-normal);
  &:hover {
    font-family: var(--font-family-text);
    color: ${props => props.theme.palette.secondary.main};
  }
`;

export const SmallText = styled("small")``;

export const StyledInput = styled(InputBase)`
  input.MuiInputBase-input {
    height: 40px;
  }
  .MuiInputBase-input {
    padding: 10px 14px;
    border: 1.5px solid var(--border-color);
    border-radius: var(--border-radius-sm);
    box-sizing: border-box;
  }
`;

export const StyledHelperText = styled(FormHelperText)`
  color: var(--color-red);
`;

export const StyledLabelInput = styled(FormLabel)`
  color: var(--text-color);
  font-size: var(--font-size-text-small);
  .MuiFormLabel-asterisk {
    color: var(--color-red);
  }
`;

export const StyledDarkLoadingButton = styled(LoadingButton)`
  padding: 10px 20px;
  min-width: 150px;
  background: ${props => props.theme.palette.text.primary};
  border: none;
  border-radius: var(--border-radius-sm);
  font-size: var(--font-size-text);
  height: 40px;
  color: white;
  font-family: var(--font-family-title);
  font-weight: var(--font-weight-bold);
  text-transform: unset;
  &:hover {
    background: ${props => props.theme.palette.text.primary};
  }
  &:disabled {
    color: white;
    background: ${props => alpha(props.theme.palette.grey[700], 0.44)};
  }
`;
