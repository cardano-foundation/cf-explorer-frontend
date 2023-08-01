import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import moment from "moment";

import CustomModal from "../CustomModal";
import { DatePickerFooter, Container } from "./styles";
import CustomDatePicker, { IDateRange } from "../CustomDatePicker";

export const DATETIME_PARTTEN = `YYYY/MM/DD HH:mm:ss`;

const toLocalTime = (date?: string): Date | null => (date ? moment.utc(date, DATETIME_PARTTEN).local().toDate() : null);

const toTimeFormat = (date: Date | null): string | undefined =>
  date ? moment(date).format(DATETIME_PARTTEN) : undefined;

export interface DateRange {
  fromDate?: string;
  toDate?: string;
}
export interface DateRangeModalProps {
  onClose?: () => void;
  onDateRangeChange: (range: DateRange) => void;
  value?: DateRange;
  open: boolean;
}

const DateRangeModal: React.FC<DateRangeModalProps> = ({ onClose, onDateRangeChange, open, value }) => {
  const [dateRange, setDateRange] = useState<IDateRange>([null, null]);

  useEffect(() => {
    if (!value) return;
    const { fromDate, toDate } = value;
    if (fromDate && toDate) setDateRange([toLocalTime(fromDate), toLocalTime(toDate)]);
  }, [value, setDateRange]);

  const onSubmit = () => {
    onDateRangeChange({ fromDate: toTimeFormat(dateRange[0]), toDate: toTimeFormat(dateRange[1]) });
    onClose?.();
  };

  return (
    <CustomModal open={open} onClose={() => onClose?.()} title="Select date range" width={500}>
      <Container>
        <CustomDatePicker dateRange={dateRange} setDateRange={setDateRange} hideFuture />
        <DatePickerFooter>
          <Button disabled={!dateRange[0] || !dateRange[1]} variant="contained" onClick={onSubmit}>
            OK
          </Button>
          <Button variant="outlined" onClick={() => onClose?.()}>
            Cancel
          </Button>
        </DatePickerFooter>
      </Container>
    </CustomModal>
  );
};

export default DateRangeModal;
