import React, { useEffect, useMemo, useState } from "react";
import { Box, Button } from "@mui/material";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import moment from "moment";

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

export const DATETIME_PARTTEN = `YYYY/MM/DD HH:mm:ss`;

const DateRangeModal: React.FC<DateRangeModalProps> = ({ onClose, onDateRangeChange, open, ...rest }) => {
  const [value, setValue] = useState<DateRange>();

  useEffect(() => {
    const { value } = rest;
    if (value?.fromDate && value?.toDate) {
      setValue({ fromDate: toLocal(value?.fromDate), toDate: toLocal(value?.toDate) });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          <DesktopDatePicker
            value={toMoment(value?.fromDate)}
            disableFuture
            onChange={(mDate) =>
              setValue((pre) => {
                return { ...pre, fromDate: mDate?.format("YYYY/MM/DD HH:mm:ss") };
              })
            }
            slotProps={{
              popper: {
                sx: {
                  zIndex: 1305
                }
              }
            }}
          />
          <Box>-</Box>
          <DesktopDatePicker
            value={toMoment(value?.toDate)}
            disableFuture
            onChange={(mDate) => setValue((pre) => ({ ...pre, toDate: mDate?.format("YYYY/MM/DD 23:59:59") }))}
            slotProps={{
              popper: {
                sx: {
                  zIndex: 1305
                }
              }
            }}
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
