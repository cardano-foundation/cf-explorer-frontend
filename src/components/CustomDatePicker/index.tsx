import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Box, IconButton, useTheme } from "@mui/material";
import { range } from "lodash";
import moment from "moment";
import { BsFillCaretDownFill } from "react-icons/bs";
import { IoIosArrowBack, IoIosArrowForward, IoMdClose } from "react-icons/io";
import DatePicker, { ReactDatePickerProps } from "react-datepicker";

import { DateRangeIcon } from "src/commons/resources";
import { useScreen } from "src/commons/hooks/useScreen";

import {
  CloseButton,
  DatePickerContainer,
  HiddenScroll,
  MyGrid,
  PickerPortalContainer,
  SelectDateButton,
  SelectYear,
  WrapCustomDatePicker
} from "./styles";
import "react-datepicker/dist/react-datepicker.css";

export type IDate = Date | null;

export type IDateRange = [IDate, IDate];

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

interface ICustomDatePicker {
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
      if (node == null) {
        return null;
      }

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
  }, [width, setOpen]);

  return (
    <>
      <WrapCustomDatePicker onClick={handleToggle} ref={ref}>
        {startDate || endDate ? (
          <Box
            sx={{
              color: theme.palette.text.primary,
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
          <Box sx={{ opacity: 0.42 }}>dd/mm/yyyy</Box>
        )}
        <SelectDateButton>
          <DateRangeIcon />
        </SelectDateButton>
      </WrapCustomDatePicker>

      {createPortal(
        <PickerPortalContainer ref={portalRef} sx={position}>
          <SingleDatePicker
            itemKey={1}
            open={open}
            onCalendarClose={handleToggle}
            selected={startDate}
            onChange={(value) => setDateRange([value, endDate])}
            hideFuture={hideFuture}
            maxDate={hideFuture ? endDate || lastDayOfCurrentMonth : endDate}
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

const SingleDatePicker = (props: SingleDatePickerProps) => {
  const { hideFuture, itemKey, ...datePickerProps } = props;
  const [yearModal, setYearModal] = useState(false);
  const yearModalRef = useRef<HTMLInputElement>();
  const toggleRef = useRef<HTMLButtonElement | null>();
  const activeYearRef = useRef<HTMLInputElement>();

  const getYear = (date: Date) => date.getFullYear();
  const getMonth = (date: Date) => date.getMonth();
  const years = range(1990, hideFuture ? getYear(new Date()) : 2999);

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
          behavior: "auto",
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
              {MONTHS[getMonth(date)]} {getYear(date)}
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
                    const isActive = year === getYear(date);
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
              <IconButton onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
                <IoIosArrowBack size="18px" />
              </IconButton>
              <IconButton onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
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
