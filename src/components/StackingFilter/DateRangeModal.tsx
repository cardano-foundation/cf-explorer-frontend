import React, { useEffect, useState } from "react";
import StyledModal from "../commons/StyledModal";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DatePickerFooter, DateRangePickerContainer } from "./styles";
import { Box, Button } from "@mui/material";
import moment, { Moment } from "moment";

export interface DateRange {
  fromDate?: string;
  toDate?: string;
}

export interface DateRangeModalProps {
  onClose?: () => void;
  onDateRangeChange: ({ fromDate, toDate }: DateRange) => void;
  value?: DateRange;
}

const DateRangeModal: React.FC<DateRangeModalProps> = ({ onClose, onDateRangeChange, ...rest }) => {
  const [value, setValue] = useState<DateRange>();

  useEffect(() => {
    const { value } = rest;
    setValue({ fromDate: value?.fromDate, toDate: value?.toDate });
  }, [rest.value]);

  const toMoment = (date?: string) => (date ? moment(date) : null);
  const onSubmit = () => {
    onDateRangeChange({ fromDate: value?.fromDate, toDate: value?.toDate});
    onClose?.();
  }
  return (
    <StyledModal open={true} handleCloseModal={() => onClose?.()}>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <DateRangePickerContainer>
          <DatePicker value={toMoment(value?.fromDate)} onChange={(mDate) => setValue(pre => ({...pre, fromDate: mDate?.toString()}))} />
          <Box>-</Box>
          <DatePicker value={toMoment(value?.toDate)} onChange={(mDate) => setValue(pre => ({...pre, toDate: mDate?.toString()}))} />
        </DateRangePickerContainer>
        <DatePickerFooter>
          <Button variant="contained" onClick={onSubmit}>OK</Button>
          <Button variant="outlined" onClick={() => onClose?.()}>
            Cancel
          </Button>
        </DatePickerFooter>
      </LocalizationProvider>
    </StyledModal>
  );
};

export default DateRangeModal;
