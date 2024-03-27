import { styled, Box, InputBase } from "@mui/material";
import { TextareaAutosize as BaseTextareaAutosize } from "@mui/base/TextareaAutosize";

export const TitleTab = styled(Box)<{ active: number }>(({ active, theme }) => ({
  fontWeight: "bold",
  textTransform: "capitalize",
  fontFamily: '"Roboto", sans-serif',
  fontSize: "1.125rem",
  color: active ? theme.palette.primary.main : theme.palette.secondary.light
}));

export const DelegationData = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const TabsContainer = styled(Box)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.primary[200]}`
}));
export const FilterContainer = styled(Box)(({ theme }) => ({
  padding: "8px 0px !important",
  width: 300,
  backgroundColor: theme.palette.secondary[0],
  zIndex: 15,
  position: "absolute",
  top: "calc(100% + 10px)",
  right: 0,
  borderRadius: theme.spacing(1),
  boxShadow: theme.isDark ? "rgba(189, 197, 209, 0.2) 0px 0.5rem 1.2rem" : "2px 2px 10px 0px #43465633",
  [theme.breakpoints.down("sm")]: {
    width: "calc(100% - 30px)"
  },
  ":hover": {
    backgroundColor: theme.palette.secondary[0]
  },
  ":after": {
    content: "''",
    display: "block",
    background: theme.palette.secondary[0],
    zIndex: 9,
    position: "absolute",
    top: "-6px",
    right: "36px",
    width: "14px",
    height: "16px",
    transform: "rotate(45deg)"
  },
  "& .MuiAccordion-root::before": {
    position: "unset !important"
  },
  "& .MuiButtonBase-root": {
    ":hover": {
      background: "rgba(0, 0, 0, 0.04)"
    }
  }
}));
export const StyledInput = styled(InputBase)`
  width: 100% !important;
  padding: 0px 16px;

  input.MuiInputBase-input {
    height: 40px;
  }
  .MuiInputBase-input {
    padding: 10px 14px;
    color: ${({ theme }) => theme.palette.secondary.main};
    border: 1.5px solid ${({ theme, error }) => (error ? theme.palette.error.main : theme.palette.primary[200])};
    &:focus-within {
      border-color: ${({ theme }) => theme.palette.secondary.light};
    }
    border-radius: var(--border-radius-sm);
    box-sizing: border-box;
  }
`;

export const TimeDuration = styled("small")(({ theme }) => ({
  color: theme.palette.secondary.light,
  display: "block",
  textAlign: "left",
  margin: "15px 0px 0px"
}));

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
    min-height: 100px;

    &:focus {
      border-color: ${theme.palette.primary.main};
    }
    &:focus-visible {
      outline: 0;
    }
  `
);
