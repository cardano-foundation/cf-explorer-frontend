import "react-datepicker/dist/react-datepicker.css";
import { Box } from "@mui/material";
import { SelectDateButton, StyledDatePicker, WrapCustomDatePicker } from "./styles";
import { DateRangeIcon } from "../../commons/resources";
import { useState } from "react";
import { ensuredForwardRef } from "react-use";

export type IDate = Date | null;

export type IDateRange = [IDate, IDate];

interface ICustomDatePicker {
  dateRange: IDateRange;
  setDateRange: (newDateRange: IDateRange) => void;
}

const CustomDatePicker = (props: ICustomDatePicker) => {
  const { dateRange, setDateRange } = props;
  const [startDate, endDate] = dateRange;
  const CustomInput = ensuredForwardRef(({ value, onClick }: any, ref: any) => (
    <WrapCustomDatePicker onClick={onClick} ref={ref}>
      {value ? value : <Box sx={{ opacity: 0.42 }}>dd/mm/yyyy</Box>}
      <SelectDateButton onClick={onClick}>
        <DateRangeIcon />
      </SelectDateButton>
    </WrapCustomDatePicker>
  ));
  return (
    <StyledDatePicker
      placeholderText='dd/mm/yyyy'
      selectsRange={true}
      startDate={startDate}
      endDate={endDate}
      customInput={<CustomInput />}
      onChange={(update: any) => {
        setDateRange(update);
      }}
    />
  );
};
export default CustomDatePicker;
