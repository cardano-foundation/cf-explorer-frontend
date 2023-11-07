import { LoadingButton } from "@mui/lab";
import { Accordion, alpha, Box, FormHelperText, FormLabel, InputBase, styled } from "@mui/material";
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
  background: ${(props) => props.theme.palette.primary.main};
  border: none;
  border-radius: var(--border-radius-sm);
  font-size: var(--font-size-text);
  height: 40px;
  color: ${(props) => props.theme.palette.secondary[0]};
  font-family: var(--font-family-title);
  font-weight: var(--font-weight-bold);
  text-transform: unset;
  &:hover {
    background: ${(props) => props.theme.palette.primary.main};
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
  [theme.breakpoints.up("sm")]: {
    maxWidth: "60vw"
  },
  [theme.breakpoints.up("md")]: {
    maxWidth: "40vw"
  },
  [theme.breakpoints.up("lg")]: {
    minWidth: "50vw"
  }
}));

export const CustomAccordion = styled(Accordion)<{
  expanded: boolean;
  customBorderRadius: string;
  isDisplayBorderTop: boolean;
}>(({ expanded, customBorderRadius, isDisplayBorderTop, theme }) => ({
  borderRadius: expanded ? "12px" : customBorderRadius,
  background: theme.palette.secondary[0],
  textAlign: "left",
  boxShadow: expanded || customBorderRadius !== "0" ? "0px 4px 4px rgba(0, 0, 0, 0.05)" : "none",
  "&.MuiAccordion-root:first-of-type": {
    borderTopLeftRadius: "12px",
    borderTopRightRadius: "12px"
  },
  "&.MuiAccordion-root:last-of-type": {
    borderBottomLeftRadius: "12px",
    borderBottomRightRadius: "12px",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.05)"
  },
  "&:before": {
    display: isDisplayBorderTop ? "flex" : "none",
    width: "calc(100% - 40px)",
    margin: "0 auto",
    height: "1px",
    borderBottom: `2px solid ${theme.isDark ? theme.palette.secondary[700] : theme.palette.primary[200]}`,
    background: "transparent"
  }
}));
