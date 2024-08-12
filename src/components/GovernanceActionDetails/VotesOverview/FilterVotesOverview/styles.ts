import { InputBase, styled } from "@mui/material";

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

export const Input = styled(StyledInput)(() => ({
  "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
    display: "none"
  },
  "& input[type=number]": {
    MozAppearance: "textfield"
  }
}));
