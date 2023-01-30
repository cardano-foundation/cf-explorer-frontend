import { styled, Box, FormHelperText, FormLabel } from "@mui/material";

export const StyledTitle = styled("h3")`
  margin-top: 0;
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

export const TextError = styled(FormHelperText)`
  margin-top: 0px;
  color: ${props => props.theme.colorRed};
  font-size: 14px;
`;

export const WrapButton = styled(Box)`
  margin-top: 35px;
`;
