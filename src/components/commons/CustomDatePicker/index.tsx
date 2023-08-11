import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Box, IconButton, useTheme } from "@mui/material";
import { range } from "lodash";
import moment from "moment";
import { BsFillCaretDownFill } from "react-icons/bs";
import { IoIosArrowBack, IoIosArrowForward, IoMdClose } from "react-icons/io";
import DatePicker, { ReactDatePickerProps } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { DateRangeIcon } from "src/commons/resources";
import { useScreen } from "src/commons/hooks/useScreen";

import {
  CloseButton,
  DatePickerContainer,
  HiddenScroll,
  MyGrid,
  PickerPortalContainer,
  PlaceHolder,
  SelectDateButton,
  SelectYear,
  SelectedDay,
  StyledDay,
  WrapCustomDatePicker
} from "./styles";

export type IDate = Date | null;

export type IDateRange = [IDate, IDate];

export interface ICustomDatePicker {
  dateRange: IDateRange;
  setDateRange: (newDateRange: IDateRange) => void;
  hideFuture?: boolean;
}

const CustomDatePicker = (props: ICustomDatePicker) => {
  const { dateRange, setDateRange, hideFuture } = props;
  const [startDate, endDate] = dateRange;
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLElement>();
  const portalRef = useRef<HTMLElement>();
  const { width } = useScreen();
  const theme = useTheme();
  const lastDayOfCurrentMonth = moment().endOf("month").toDate();

  const [position, setPosition] = useState({ top: 0, left: 0 });

  const handleToggle = () => setOpen((open) => !open);

  useEffect(() => {
    if (open) {
      const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as Node;
        if (!portalRef.current?.contains(target) && !ref.current?.contains(target)) {
          setOpen(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [open, setOpen]);

  useEffect(() => {
    setOpen(false);
    let timeout: ReturnType<typeof setTimeout> | null = null;
    const getPortalPosition = () => {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        if (ref.current) {
          const { top, left, width, height } = ref.current.getBoundingClientRect();
          setPosition({ top: Math.min(top + height, window.innerHeight - 384), left: left + width / 2 });
        }
        if (open) setOpen(true);
      }, 200);
    };
    getPortalPosition();

    const getScrollParent = (node: HTMLElement | null): HTMLElement | null => {
      if (!node) return null;

      if (!node.parentElement || node.scrollHeight > node.clientHeight) {
        return node;
      } else {
        return getScrollParent(node.parentElement);
      }
    };
    const parentScroll = getScrollParent(ref.current || null) || window;

    parentScroll.addEventListener("scroll", getPortalPosition);

    return () => {
      parentScroll.removeEventListener("scroll", getPortalPosition);
      if (timeout) clearTimeout(timeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width, setOpen]);

  const renderDayContents = (dayOfMonth: number, date?: Date | undefined, selectedDate?: IDate) => {
    if (!(date && startDate && endDate)) return dayOfMonth;
    if (moment(date).isBefore(startDate) || moment(date).isAfter(endDate)) return dayOfMonth;

    const mDate = moment(date),
      isStartDate = mDate.isSame(startDate),
      isEndDate = mDate.isSame(endDate),
      isStartWeek = mDate.weekday() === 0,
      isEndWeek = mDate.weekday() === 6,
      isStartMonth = mDate.isSame(moment(date).startOf("month"), "date"),
      isEndMonth = mDate.isSame(moment(date).endOf("month"), "date");

    let borderRadius = "0%";
    if (isStartDate || isStartWeek || isStartMonth) borderRadius = "50% 0% 0% 50%";
    if (isEndDate || isEndWeek || isEndMonth) borderRadius = "0% 50% 50% 0%";
    if ((isStartDate || isStartWeek || isStartMonth) && (isEndDate || isEndWeek || isEndMonth)) borderRadius = "50%";

    return (
      <StyledDay borderRadius={borderRadius}>
        {!moment(date).isSame(selectedDate) ? dayOfMonth : <SelectedDay>{dayOfMonth}</SelectedDay>}
      </StyledDay>
    );
  };

  return (
    <>
      <WrapCustomDatePicker data-testid="date-range-picker" onClick={handleToggle} ref={ref}>
        {startDate || endDate ? (
          <Box
            sx={{
              color: theme.palette.secondary.light,
              display: "flex",
              flexDirection: "row",
              gap: "5px",
              paddingLeft: "6px"
            }}
          >
            <span>{startDate ? moment(startDate).format("MM/DD/YYYY") : ""}</span>
            <span>-</span>
            <span> {endDate ? moment(endDate).format("MM/DD/YYYY") : ""}</span>
          </Box>
        ) : (
          <PlaceHolder>dd/mm/yyyy</PlaceHolder>
        )}
        <SelectDateButton>
          <DateRangeIcon />
        </SelectDateButton>
      </WrapCustomDatePicker>

      {createPortal(
        <PickerPortalContainer data-testid="custom-picker-calender" ref={portalRef} sx={position}>
          <SingleDatePicker
            itemKey={1}
            open={open}
            onCalendarClose={handleToggle}
            selected={startDate}
            onChange={(value) => setDateRange([value, endDate])}
            hideFuture={hideFuture}
            maxDate={hideFuture ? endDate || lastDayOfCurrentMonth : endDate}
            renderDayContents={(dayOfMonth, date) => renderDayContents(dayOfMonth, date, startDate)}
          />
          <SingleDatePicker
            itemKey={2}
            open={open}
            onCalendarClose={handleToggle}
            selected={endDate}
            onChange={(value) => {
              if (!startDate) return;
              setDateRange([startDate, value]);
              if (value) setOpen(false);
            }}
            hideFuture={hideFuture}
            minDate={startDate}
            maxDate={hideFuture ? lastDayOfCurrentMonth : null}
            renderDayContents={(dayOfMonth, date) => renderDayContents(dayOfMonth, date, endDate)}
          />
          <CloseButton onClick={handleToggle} sx={{ display: open ? "inline-flex" : "none" }}>
            <IoMdClose size={20} />
          </CloseButton>
        </PickerPortalContainer>,
        document.body
      )}
    </>
  );
};

declare interface SingleDatePickerProps extends ReactDatePickerProps<string> {
  hideFuture?: boolean;
  itemKey: number | string;
}

export const SingleDatePicker = (props: SingleDatePickerProps) => {
  const { hideFuture, itemKey, ...datePickerProps } = props;
  const [yearModal, setYearModal] = useState(false);
  const yearModalRef = useRef<HTMLInputElement>();
  const toggleRef = useRef<HTMLButtonElement | null>();
  const activeYearRef = useRef<HTMLInputElement>();

  const years = range(1990, hideFuture ? moment().year() + 1 : 2999);

  useEffect(() => {
    if (yearModal) {
      const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as Node;
        if (!yearModalRef.current?.contains(target) && !toggleRef.current?.contains(target)) {
          setYearModal(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      const timeout = setTimeout(() => {
        activeYearRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center"
        });
      }, 200);

      return () => {
        clearTimeout(timeout);
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [yearModal, setYearModal]);

  const excludeDatesFuture = hideFuture ? [{ start: moment().toDate(), end: moment().add(2, "month").toDate() }] : [];

  return (
    <DatePickerContainer>
      <DatePicker
        key={itemKey}
        placeholderText="MM/DD/YYYY"
        customInput={<Box />}
        excludeDateIntervals={excludeDatesFuture}
        renderCustomHeader={({
          date,
          changeYear,
          decreaseMonth,
          increaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled
        }) => (
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box pl="12px" fontWeight={600} fontSize="16px" display="flex" alignItems="center">
              {moment(date).format("MMMM YYYY")}
              <IconButton
                ref={(ref) => (toggleRef.current = ref)}
                onClick={() => setYearModal(!yearModal)}
                sx={{ marginLeft: "16px" }}
              >
                <BsFillCaretDownFill size="12px" />
              </IconButton>
            </Box>
            {yearModal && (
              <HiddenScroll ref={yearModalRef}>
                <MyGrid>
                  {years.map((year) => {
                    const isActive = year === moment(date).year();
                    return (
                      <SelectYear
                        isActive={+isActive}
                        ref={isActive ? activeYearRef : null}
                        key={year}
                        onClick={() => {
                          changeYear(year);
                          setYearModal(false);
                        }}
                      >
                        {year}
                      </SelectYear>
                    );
                  })}
                </MyGrid>
              </HiddenScroll>
            )}
            <Box position="relative">
              <IconButton data-testid="decrease-month" onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
                <IoIosArrowBack size="18px" />
              </IconButton>
              <IconButton data-testid="increase-month" onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
                <IoIosArrowForward size="18px" />
              </IconButton>
            </Box>
          </Box>
        )}
        {...datePickerProps}
      />
    </DatePickerContainer>
  );
};

export default CustomDatePicker;
