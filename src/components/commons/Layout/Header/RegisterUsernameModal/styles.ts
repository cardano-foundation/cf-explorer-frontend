import { styled, Box, FormHelperText, FormLabel } from "@mui/material";

export const StyledTitle = styled("h3")`
  margin-top: 0;
`;

export const Span = styled("span")`
  font-family: var(--font-family-title);
  font-weight: var(--font-weight-bold);
  color: ${(props) => props.theme.palette.primary.contrastText};
  white-space: nowrap;
  line-height: 1;
`;

export const TextNote = styled(Box)`
  font-size: 0.875rem;
  margin-bottom: 20px;
`;

export const Label = styled(FormLabel)`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.palette.text.primary};
  margin-top: 20px;
  .MuiFormLabel-asterisk {
    color: ${({ theme }) => theme.palette.text.primary};
  }
`;

export const TextError = styled(FormHelperText)`
  margin-top: 0px;
  color: ${(props) => props.theme.palette.error.main};
  font-size: 14px;
`;

export const WrapButton = styled(Box)`
  margin-top: 35px;
`;
