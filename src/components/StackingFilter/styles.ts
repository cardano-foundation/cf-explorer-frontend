import { Box, styled } from "@mui/material";

export const FilterContainer = styled(Box)``;

export const DateRangePickerContainer = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  ${({ theme }) => theme.breakpoints.down("sm")} {
    padding-top: 24px;
    gap: 5px;
    & .MuiOutlinedInput-input {
      padding: 10px;
      font-size: 12px;
    };
    & .MuiButtonBase-root {
      display: flex;
    }
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
