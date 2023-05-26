import { Box, styled } from "@mui/material";
import DatePicker from "react-datepicker";

export const StyledDatePicker = styled(DatePicker)`
  border: 1.5px solid #e3e5e9;
  height: 40px;
  border-radius: 8px;
  padding-left: 20px;
  width: calc(100% - 20px);
  &.react-datepicker__header {
    background-color: #fff !important;
    border-bottom: 0px !important;
    padding-bottom: 5px !important;
  }

  &.react-datepicker__month-container {
    padding: 10px !important;
  }

  &.react-datepicker__day--selected,
  &.react-datepicker__day--keyboard-selected {
    background-color: red !important;
    color: white;
  }

  &.react-datepicker__day--selected:hover,
  &.react-datepicker__day--keyboard-selected:hover {
    background-color: blue !important;
    color: white;
  }

  &.react-datepicker__day--in-selecting-range{
    background-color: yellow !important;
    color: white;
  }

  &.react-datepicker__day--in-range {
    background-color: green !important;
    color: white;
  }
`;

export const SelectDateButton = styled(Box)(() => ({
  position: "absolute",
  right: "10px",
  top: "50%",
  transform: "translateY(-50%)",
  cursor: "pointer"
}));

export const WrapCustomDatePicker = styled(Box)(({ theme }) => ({
  position: "relative",
  border: `1.5px solid ${theme.palette.border.main}`,
  borderRadius: "8px",
  backgroundColor: theme.palette.common.white,
  padding: "12px 14px",
  display: "flex",
  alignItems: "center",
  flexDirection: "row",
  minHeight: "18px",
  minWidth: "200px",
  fontSize: "16px",
  fontWeight: 400
}));
