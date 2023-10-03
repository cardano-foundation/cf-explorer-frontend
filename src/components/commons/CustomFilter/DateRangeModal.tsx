import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import moment from "moment";
import { useTranslation } from "react-i18next";

import CustomModal from "../CustomModal";
import { DatePickerFooter, Container, WrapButton } from "./styles";
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
  const { t } = useTranslation();
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
    <CustomModal open={open} onClose={() => onClose?.()} title={t("common.selectDateRange")} width={500}>
      <Container>
        <CustomDatePicker dateRange={dateRange} setDateRange={setDateRange} hideFuture />
        <DatePickerFooter>
          <WrapButton disabled={!dateRange[0] || !dateRange[1]} variant="contained" onClick={onSubmit}>
            {t("common.ok")}
          </WrapButton>
          <Button variant="outlined" onClick={() => onClose?.()}>
            {t("common.cancel")}
          </Button>
        </DatePickerFooter>
      </Container>
    </CustomModal>
  );
};

export default DateRangeModal;
