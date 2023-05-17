import { Box, Button } from "@mui/material";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import moment from "moment";
import React, { useEffect, useMemo, useState } from "react";
import StyledModal from "../commons/StyledModal";
import { DatePickerFooter, DateRangePickerContainer } from "./styles";
import { DesktopDatePicker } from "@mui/x-date-pickers";

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

export const DATETIME_PARTTEN = `YYYY/MM/DD HH:mm:ss`;

const DateRangeModal: React.FC<DateRangeModalProps> = ({ onClose, onDateRangeChange, open, ...rest }) => {
  const [value, setValue] = useState<DateRange>();

  useEffect(() => {
    const { value } = rest;
    setValue({ fromDate: toLocal(value?.fromDate), toDate: toLocal(value?.toDate) });
  }, [rest.value]);

  const toLocal = (date?: string) => {
    return date ? moment.utc(date, DATETIME_PARTTEN).local().format(DATETIME_PARTTEN) : undefined;
  };

  const toMoment = (date?: string) => (date ? moment(date, DATETIME_PARTTEN) : null);

  const onSubmit = () => {
    onDateRangeChange({ fromDate: value?.fromDate, toDate: value?.toDate });
    onClose?.();
  };

  const isValid = useMemo(() => {
    return !(value?.fromDate && value?.toDate) || moment(value?.fromDate).isAfter(moment(value?.toDate));
  }, [value]);
  return (
    <StyledModal open={open} handleCloseModal={() => onClose?.()}>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <DateRangePickerContainer>
          <DatePicker
            value={toMoment(value?.fromDate)}
            onChange={(mDate) =>
              setValue((pre) => {
                return { ...pre, fromDate: mDate?.format("YYYY/MM/DD HH:mm:ss") };
              })
            }
          />
          <Box>-</Box>
          <DatePicker
            value={toMoment(value?.toDate)}
            onChange={(mDate) => setValue((pre) => ({ ...pre, toDate: mDate?.format("YYYY/MM/DD 23:59:59") }))}
          />
        </DateRangePickerContainer>
        <DatePickerFooter>
          <Button disabled={isValid} variant='contained' onClick={onSubmit}>
            OK
          </Button>
          <Button variant='outlined' onClick={() => onClose?.()}>
            Cancel
          </Button>
        </DatePickerFooter>
      </LocalizationProvider>
    </StyledModal>
  );
};

export default DateRangeModal;
