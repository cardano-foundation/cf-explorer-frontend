import { Box, Button } from "@mui/material";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import moment from "moment";
import React, { useEffect, useMemo, useState } from "react";
import StyledModal from "../commons/StyledModal";
import { DatePickerFooter, DateRangePickerContainer } from "./styles";

export interface DateRange {
  fromDate?: string;
  toDate?: string;
}

export interface DateRangeModalProps {
  onClose?: () => void;
  onDateRangeChange: ({ fromDate, toDate }: DateRange) => void;
  value?: DateRange;
  open: boolean;
}

const DateRangeModal: React.FC<DateRangeModalProps> = ({ onClose, onDateRangeChange, open,...rest }) => {
  const [value, setValue] = useState<DateRange>();

  useEffect(() => {
    const { value } = rest;
    setValue({ fromDate: value?.fromDate, toDate: value?.toDate });
  }, [rest.value]);

  const toMoment = (date?: string) => (date ? moment(date) : null);
  const onSubmit = () => {
    onDateRangeChange({ fromDate: value?.fromDate, toDate: value?.toDate });
    onClose?.();
  };

  const isValid = useMemo(() => !(value?.fromDate && value?.toDate), [value])

  return (
    <StyledModal open={open} handleCloseModal={() => onClose?.()}>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <DateRangePickerContainer>
          <DatePicker
            value={toMoment(value?.fromDate)}
            onChange={mDate => setValue(pre => ({ ...pre, fromDate: mDate?.toString() }))}
          />
          <Box>-</Box>
          <DatePicker
            value={toMoment(value?.toDate)}
            onChange={mDate => setValue(pre => ({ ...pre, toDate: mDate?.toString() }))}
          />
        </DateRangePickerContainer>
        <DatePickerFooter>
          <Button disabled={isValid} variant="contained" onClick={onSubmit}>
            OK
          </Button>
          <Button variant="outlined" onClick={() => onClose?.()}>
            Cancel
          </Button>
        </DatePickerFooter>
      </LocalizationProvider>
    </StyledModal>
  );
};

export default DateRangeModal;
