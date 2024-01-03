import { Button, Box, InputBase, ListItemIcon, styled } from "@mui/material";

export const Container = styled(Box)`
  width: 100%;
  box-sizing: border-box;
  padding: 2px;
`;

export const DatePickerFooter = styled(Box)`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 20px;
`;

export const AdditionContainer = styled(Box)`
  padding: 0px 16px;
`;

export const StyledInput = styled(InputBase)`
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

export const StyledListItemIcon = styled(ListItemIcon)`
  color: inherit;
`;

export const WrapButton = styled(Button)(({ theme }) => ({
  "&:disabled": {
    backgroundColor: theme.isDark ? theme.palette.secondary.main : ""
  }
}));

export const ApplyFilterButton = styled(Button)(({ theme }) => ({
  width: "100%",
  textTransform: "capitalize",
  fontWeight: "bold",
  fontSize: 16,
  color: theme.isDark ? theme.palette.secondary[100] : theme.palette.primary[100],
  background: theme.palette.primary.main,
  ":hover": {
    background: theme.palette.primary.dark
  },
  ":disabled": {
    background: theme.palette.secondary[600],
    color: theme.palette.secondary[100]
  }
}));
