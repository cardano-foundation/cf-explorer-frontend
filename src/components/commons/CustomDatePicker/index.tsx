import { useEffect, useRef, useState } from "react";
import { Box, IconButton } from "@mui/material";
import { range } from "lodash";
import moment from "moment";
import { BsFillCaretDownFill } from "react-icons/bs";
import { IoIosArrowBack, IoIosArrowForward, IoMdClose } from "react-icons/io";
import { ReactDatePickerProps } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import {
  CloseButton,
  DateIcon,
  DateIconContainer,
  DatePickerContainer,
  HeaderContainer,
  HiddenScroll,
  PlaceHolder,
  SelectYear,
  StyledDatePicker,
  Value,
  YearList,
  YearSelect
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

  const onChange: ReactDatePickerProps<string, true>["onChange"] = (dates) => {
    setDateRange(dates);
    dates[1] && setOpen(false);
  };

  const onClose = () => {
    !endDate && setDateRange([null, null]);
    setOpen(false);
  };
  const excludeDateIntervals = hideFuture ? [{ start: moment().toDate(), end: moment().add(2, "month").toDate() }] : [];

  return (
    <DatePickerContainer>
      <StyledDatePicker
        open={open}
        selectsRange
        selected={startDate}
        startDate={startDate}
        endDate={endDate}
        onCalendarOpen={() => setOpen(true)}
        onInputClick={() => setOpen(!open)}
        maxDate={hideFuture ? moment().toDate() : undefined}
        excludeDateIntervals={excludeDateIntervals}
        onChange={onChange}
        onClickOutside={onClose}
        renderDayContents={(dayOfMonth) => <Box>{dayOfMonth}</Box>}
        isClearable
        popperPlacement="bottom"
        customInput={
          startDate ? (
            <Value>
              {moment(startDate).format("MM/DD/YYYY")} - {endDate ? moment(endDate).format("MM/DD/YYYY") : ""}
            </Value>
          ) : (
            <PlaceHolder>MM/DD/YYYY - MM/DD/YYYY</PlaceHolder>
          )
        }
        renderCustomHeader={({
          date,
          changeYear,
          decreaseMonth,
          increaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled
        }) => (
          <HeaderContainer>
            <CloseButton onClick={onClose}>
              <IoMdClose size={20} />
            </CloseButton>
            <YearSelect>
              {moment(date).format("MMMM YYYY")}
              <IconButton
                ref={(ref) => (toggleRef.current = ref)}
                onClick={() => setYearModal(!yearModal)}
                sx={{ marginLeft: "16px" }}
              >
                <BsFillCaretDownFill size="12px" />
              </IconButton>
            </YearSelect>
            {yearModal && (
              <HiddenScroll ref={yearModalRef}>
                <YearList>
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
                </YearList>
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
          </HeaderContainer>
        )}
      />
      {!startDate && (
        <DateIconContainer>
          <DateIcon />
        </DateIconContainer>
      )}
    </DatePickerContainer>
  );
};

export default CustomDatePicker;
