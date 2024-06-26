import { LoadingButton } from "@mui/lab";
import { alpha, Box, FormHelperText, FormLabel, InputBase, styled } from "@mui/material";
import { Link } from "react-router-dom";

export const StyledLink = styled(Link)`
  text-decoration: none;
  font-family: var(--font-family-text);
  color: ${(props) => props.theme.palette.primary.main} !important;
  font-weight: var(--font-weight-normal);
  &:hover {
    font-family: var(--font-family-text);
    color: ${(props) => props.theme.palette.primary.main};
  }
`;

export const SmallText = styled("small")`
  white-space: nowrap;
  color: ${({ theme }) => theme.palette.secondary.light};
`;

export const StyledInput = styled(InputBase)`
  input.MuiInputBase-input {
    height: 40px;
  }
  .MuiInputBase-input {
    padding: 10px 14px;
    border: 1.5px solid ${({ theme, error }) => (error ? theme.palette.error.main : theme.palette.primary[200])};
    border-radius: var(--border-radius-sm);
    box-sizing: border-box;
  }
`;

export const StyledHelperText = styled(FormHelperText)`
  color: ${({ theme }) => theme.palette.error.main};
`;

export const StyledLabelInput = styled(FormLabel)`
  color: ${({ theme }) => theme.palette.text.primary};
  font-size: var(--font-size-text-small);
  .MuiFormLabel-asterisk {
    color: ${({ theme }) => theme.palette.error.main};
  }
`;

export const StyledDarkLoadingButton = styled(LoadingButton)`
  padding: 10px 20px;
  min-width: 150px;
  background: ${(props) =>
    props.theme.isDark ? props.theme.palette.primary.main : props.theme.palette.secondary.main};
  border: none;
  border-radius: var(--border-radius-sm);
  font-size: var(--font-size-text);
  height: 40px;
  color: ${(props) => props.theme.palette.secondary[0]};
  font-family: var(--font-family-title);
  font-weight: var(--font-weight-bold);
  text-transform: unset;
  &:hover {
    background: ${(props) =>
      props.theme.isDark ? props.theme.palette.primary.main : props.theme.palette.secondary.main};
  }
  &:disabled {
    color: white;
    background: ${(props) => alpha(props.theme.palette.secondary.main, 0.44)};
  }
`;

export const FlexCenter = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const TruncateSubTitleContainer = styled(Box)(({ theme }) => ({
  maxWidth: "70vw",
  textTransform: "lowercase",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "60vw"
  },
  [theme.breakpoints.up("md")]: {
    maxWidth: "40vw"
  },
  [theme.breakpoints.up("lg")]: {
    "@media (min-width: 1200px) and (max-width: 2400px)": {
      minWidth: "50vw"
    },
    "@media (max-width: 1200px)": {
      minWidth: "initial"
    }
  }
}));
