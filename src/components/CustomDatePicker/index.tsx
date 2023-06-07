import { useEffect, useRef, useState } from "react";
import { Box, IconButton, useTheme } from "@mui/material";
import { range } from "lodash";
import moment from "moment";
import { BsFillCaretDownFill } from "react-icons/bs";
import { IoIosArrowBack, IoIosArrowForward, IoMdClose } from "react-icons/io";

import { DateRangeIcon } from "src/commons/resources";
import useComponentVisible from "src/commons/hooks/useComponentVisible";

import {
  CloseButtonLeft,
  CloseButtonRight,
  HiddenScroll,
  MyGrid,
  SelectDateButton,
  SelectYear,
  StyledDatePicker,
  WrapContainerPickerEnd,
  WrapContainerPickerStart,
  WrapCustomDatePicker
} from "./styles";
import "react-datepicker/dist/react-datepicker.css";
import "./index.css";

export type IDate = Date | null;

export type IDateRange = [IDate, IDate];

interface ICustomDatePicker {
  dateRange: IDateRange;
  setDateRange: (newDateRange: IDateRange) => void;
  hideFuture?: boolean;
}

const CustomDatePicker = (props: ICustomDatePicker) => {
  const { dateRange, setDateRange, hideFuture } = props;
  const [startDate, endDate] = dateRange;
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const modalRef = useRef<HTMLInputElement>();
  const activeYeah1Ref = useRef<HTMLInputElement>();
  const activeYeah2Ref = useRef<HTMLInputElement>();
  const [openModalPickYear1, setOpenModalPickYear1] = useState(false);
  const [openModalPickYear2, setOpenModalPickYear2] = useState(false);
  const toggleModalPickYear1 = () => {
    setOpenModalPickYear1(!openModalPickYear1);
  };
  const toggleModalPickYear2 = () => {
    setOpenModalPickYear2(!openModalPickYear2);
  };
  const getYear = (date: Date) => date.getFullYear();
  const getMonth = (date: Date) => date.getMonth();
  const years = range(1990, hideFuture ? getYear(new Date()) : 2999);
  const lastDayOfCurrentMonth = moment().endOf("month").toDate();
  const months = [
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

  const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(true);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setOpenModalPickYear1(false);
        setOpenModalPickYear2(false);
      }
    };

    if (openModalPickYear1 || openModalPickYear2) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    if (activeYeah1Ref.current) {
      activeYeah1Ref.current.scrollIntoView({
        behavior: "auto",
        block: "center"
      });
    }
    if (activeYeah2Ref.current) {
      activeYeah2Ref.current.scrollIntoView({
        behavior: "auto",
        block: "center"
      });
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openModalPickYear1, openModalPickYear2, modalRef]);

  const toggleModalDatePicker = () => {
    setOpen(!open);
    setIsComponentVisible(true);
  };

  const CustomInput = ({ children }: any) => (
    <WrapCustomDatePicker onClick={toggleModalDatePicker} zIndex={open ? 10 : 12}>
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
      <SelectDateButton onClick={toggleModalDatePicker}>
        <DateRangeIcon />
      </SelectDateButton>
      {children}
    </WrapCustomDatePicker>
  );

  const excludeDatesFuture = hideFuture ? [{ start: moment().toDate(), end: moment().add(2, "month").toDate() }] : [];

  return (
    <Box position={"relative"} ref={ref}>
      <CustomInput />
      {isComponentVisible && (
        <Box position={"relative"} zIndex={open ? 20 : -1}>
          <WrapContainerPickerStart>
            <StyledDatePicker
              open={open}
              key={"datePickerStart"}
              maxDate={hideFuture ? endDate || lastDayOfCurrentMonth : endDate}
              calendarClassName="start-date-picker"
              placeholderText="MM/DD/YYYY"
              selected={startDate}
              customInput={<Box />}
              onChange={(update: any) => {
                setDateRange([update, endDate]);
              }}
              excludeDateIntervals={excludeDatesFuture}
              renderCustomHeader={({
                date,
                changeYear,
                decreaseMonth,
                increaseMonth,
                prevMonthButtonDisabled,
                nextMonthButtonDisabled
              }) => (
                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                  <Box pl={"12px"} fontWeight={600} fontSize={"16px"} display={"flex"} alignItems={"center"}>
                    {months[getMonth(date)]} {getYear(date)}
                    <IconButton
                      onClick={() => {
                        toggleModalPickYear1();
                      }}
                      sx={{
                        marginLeft: "16px"
                      }}
                    >
                      <BsFillCaretDownFill size={"12px"} />
                    </IconButton>
                  </Box>
                  {openModalPickYear1 && (
                    <HiddenScroll ref={modalRef}>
                      <MyGrid>
                        {years.map((year) => {
                          const isActive = year === getYear(date);
                          return (
                            <SelectYear
                              isActive={isActive ? 1 : 0}
                              ref={isActive ? activeYeah1Ref : null}
                              key={year}
                              onClick={() => {
                                changeYear(year);
                                setOpenModalPickYear1(false);
                              }}
                            >
                              {year}
                            </SelectYear>
                          );
                        })}
                      </MyGrid>
                    </HiddenScroll>
                  )}
                  <Box position={"relative"}>
                    <CloseButtonLeft saving={0} onClick={() => setOpen(false)} data-testid="close-modal-button">
                      <IoMdClose />
                    </CloseButtonLeft>
                    <IconButton onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
                      <IoIosArrowBack size={"18px"} />
                    </IconButton>
                    <IconButton onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
                      <IoIosArrowForward size={"18px"} />
                    </IconButton>
                  </Box>
                </Box>
              )}
            />
          </WrapContainerPickerStart>
          <WrapContainerPickerEnd>
            <StyledDatePicker
              placeholderText="MM/DD/YYYY"
              minDate={startDate}
              maxDate={hideFuture ? lastDayOfCurrentMonth : null}
              selected={endDate}
              customInput={<Box />}
              calendarClassName="end-date-picker"
              key={"datePickerEnd"}
              onChange={(update: any) => {
                setDateRange([startDate, update]);
                if (startDate && update) {
                  setOpen(false);
                }
              }}
              excludeDateIntervals={excludeDatesFuture}
              open={open}
              renderCustomHeader={({
                date,
                changeYear,
                decreaseMonth,
                increaseMonth,
                prevMonthButtonDisabled,
                nextMonthButtonDisabled
              }) => (
                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                  <Box pl={"12px"} fontWeight={600} fontSize={"16px"} display={"flex"} alignItems={"center"}>
                    {months[getMonth(date)]} {getYear(date)}
                    <IconButton
                      onClick={() => {
                        toggleModalPickYear2();
                      }}
                      sx={{
                        marginLeft: "16px"
                      }}
                    >
                      <BsFillCaretDownFill size={"12px"} />
                    </IconButton>
                  </Box>
                  {openModalPickYear2 && (
                    <HiddenScroll>
                      <MyGrid>
                        {years.map((year) => {
                          const isActive = year === getYear(date);
                          return (
                            <SelectYear
                              isActive={isActive ? 1 : 0}
                              ref={isActive ? activeYeah2Ref : null}
                              key={year}
                              onClick={() => {
                                changeYear(year);
                                setOpenModalPickYear2(false);
                              }}
                            >
                              {year}
                            </SelectYear>
                          );
                        })}
                      </MyGrid>
                    </HiddenScroll>
                  )}
                  <Box position={"relative"}>
                    <CloseButtonRight saving={0} onClick={() => setOpen(false)} data-testid="close-modal-button">
                      <IoMdClose />
                    </CloseButtonRight>
                    <IconButton onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
                      <IoIosArrowBack size={"18px"} />
                    </IconButton>
                    <IconButton onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
                      <IoIosArrowForward size={"18px"} />
                    </IconButton>
                  </Box>
                </Box>
              )}
            />
          </WrapContainerPickerEnd>
        </Box>
      )}
    </Box>
  );
};

export default CustomDatePicker;
