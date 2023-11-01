import { styled } from "@mui/material";
import { TextareaAutosize as BaseTextareaAutosize } from "@mui/base/TextareaAutosize";

export const TextareaAutosize = styled(BaseTextareaAutosize)<{ error?: number }>(
  ({ theme, error }) => `
    width: 100%;
    box-sizing: border-box;
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 8px 12px;
    border-radius: 8px;
    color: ${theme.palette.secondary.light};
    background: ${theme.palette.secondary[0]};
    border: 1px solid ${
      error ? theme.palette.error[700] : theme.isDark ? theme.palette.secondary[600] : theme.palette.primary[200]
    };
    min-height: 200px;
  
    &:focus {
      border-color: ${theme.palette.primary.main};
    }
    &:focus-visible {
      outline: 0;
    }
  `
);
