import { Box, IconButton, styled, useTheme } from "@mui/material";
import { range } from "lodash";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { BsFillCaretDownFill } from "react-icons/bs";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { DateRangeIcon } from "../../commons/resources";
import "./index.css";
import { SelectDateButton, StyledDatePicker, WrapCustomDatePicker } from "./styles";

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
  }
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
    "December",
  ];

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
        block: "center",
      });
    }
    if (activeYeah2Ref.current) {
      activeYeah2Ref.current.scrollIntoView({
        behavior: "auto",
        block: "center",
      });
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openModalPickYear1, openModalPickYear2]);

  const toggleModalDatePicker = () => {
    setOpen(!open);
  }

  const CustomInput = ({ children }: any) => (
    <WrapCustomDatePicker onClick={toggleModalDatePicker} zIndex={open ? 10 : 12}>
      {(startDate || endDate) ? (
        <Box sx={{ color: theme.palette.text.primary, display: "flex", flexDirection: "row", gap: "5px", paddingLeft: "6px" }}>
          <span>{startDate ? moment(startDate).format("MM/DD/YYYY") : ""}</span><span>-</span><span> {endDate ? moment(endDate).format("MM/DD/YYYY") : ""}</span>
        </Box>

      ) : <Box sx={{ opacity: 0.42 }}>dd/mm/yyyy</Box>}
      <SelectDateButton onClick={toggleModalDatePicker}>
        <DateRangeIcon />
      </SelectDateButton>
      {children}
    </WrapCustomDatePicker>
  );

  return (
    <Box position={"relative"}>
      <CustomInput />
      <WrapContainerPickerStart>
        <StyledDatePicker
          open={open}
          key={"datePickerStart"}
          maxDate={hideFuture ? endDate || lastDayOfCurrentMonth : endDate}
          calendarClassName="start-date-picker"
          placeholderText='MM/DD/YYYY'
          selected={startDate}
          customInput={<Box />}
          onChange={(update: any) => {
            setDateRange([update, endDate]);
          }}
          renderCustomHeader={({
            date,
            changeYear,
            decreaseMonth,
            increaseMonth,
            prevMonthButtonDisabled,
            nextMonthButtonDisabled,
          }) => (
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Box pl={"12px"} fontWeight={600} fontSize={"16px"} display={"flex"} alignItems={"center"}>
                {months[getMonth(date)]} {getYear(date)}
                <IconButton onClick={() => {
                  toggleModalPickYear1();
                }} sx={{
                  marginLeft: "16px"
                }}>
                  <BsFillCaretDownFill size={"12px"} />
                </IconButton>
              </Box>
              {
                openModalPickYear1 && (
                  <HiddenScroll
                    ref={modalRef}
                    position={"absolute"}
                    top={"50%"}
                    left={"-10%"}
                    width={"fit-content"}
                    height={"200px"}
                    overflow={"auto"}
                    bgcolor={"#fff"}
                    boxShadow={"0px 4px 16px rgba(0, 0, 0, 0.12)"}
                    borderRadius={"8px"}
                    zIndex={1}
                  >
                    <MyGrid>
                      {
                        years.map((year) => {
                          const isActive = year === getYear(date);
                          return (
                            <Box
                              ref={isActive ? activeYeah1Ref : null}
                              key={year}
                              onClick={() => {
                                changeYear(year);
                                setOpenModalPickYear1(false);
                              }}
                              sx={{
                                padding: "8px 16px",
                                cursor: "pointer",
                                borderRadius: "18px",
                                backgroundColor: isActive ? theme.palette.primary.main : "transparent",
                                color: isActive ? "#fff" : theme.palette.text.primary,
                                "&:hover": {
                                  backgroundColor: isActive ? theme.palette.primary.main : theme.palette.grey[100],
                                }
                              }}
                            >
                              {year}
                            </Box>
                          )
                        })
                      }
                    </MyGrid>
                  </HiddenScroll>
                )
              }
              <Box>
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
          placeholderText='MM/DD/YYYY'
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
          open={open}
          renderCustomHeader={({
            date,
            changeYear,
            decreaseMonth,
            increaseMonth,
            prevMonthButtonDisabled,
            nextMonthButtonDisabled,
          }) => (
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Box pl={"12px"} fontWeight={600} fontSize={"16px"} display={"flex"} alignItems={"center"}>
                {months[getMonth(date)]} {getYear(date)}
                <IconButton onClick={() => {
                  toggleModalPickYear2();
                }} sx={{
                  marginLeft: "16px"
                }}>
                  <BsFillCaretDownFill size={"12px"} />
                </IconButton>
              </Box>
              {
                openModalPickYear2 && (
                  <HiddenScroll
                    ref={modalRef}
                    position={"absolute"}
                    top={"50%"}
                    left={"-10%"}
                    width={"fit-content"}
                    height={"200px"}
                    overflow={"auto"}
                    bgcolor={"#fff"}
                    boxShadow={"0px 4px 16px rgba(0, 0, 0, 0.12)"}
                    borderRadius={"8px"}
                    zIndex={1}
                  >
                    <MyGrid>
                      {
                        years.map((year) => {
                          const isActive = year === getYear(date);
                          return (
                            <Box
                              ref={isActive ? activeYeah2Ref : null}
                              key={year}
                              onClick={() => {
                                changeYear(year);
                                setOpenModalPickYear2(false);
                              }}
                              sx={{
                                padding: "8px 16px",
                                cursor: "pointer",
                                borderRadius: "18px",
                                backgroundColor: isActive ? theme.palette.primary.main : "transparent",
                                color: isActive ? "#fff" : theme.palette.text.primary,
                                "&:hover": {
                                  backgroundColor: isActive ? theme.palette.primary.main : theme.palette.grey[100],
                                }
                              }}
                            >
                              {year}
                            </Box>
                          )
                        })
                      }
                    </MyGrid>
                  </HiddenScroll>
                )
              }
              <Box>
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
  );
};
const MyGrid = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gridGap: "8px",
  padding: "10px 6px",
}));

const WrapContainerPickerStart = styled(Box)`
  position: absolute;
  @media (min-width: 750px) {
    top: 66%;
    left: -10%;
  }
  @media (max-width: 750px) {
    top: -350px;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
  }

`;
const WrapContainerPickerEnd = styled(Box)`
  position: absolute;
  @media (min-width: 750px) {
    top: 66%;
    right: 49%;
  }
  @media (max-width: 750px) {
    top: 300px;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
  }
`;

const HiddenScroll = styled(Box)(({ theme }) => ({
  "&::-webkit-scrollbar": {
    width: "5px"
  },
  "&::-webkit-scrollbar-track": {
    background: "transparent"
  },
  "&::-webkit-scrollbar-thumb": {
    background: "transparent",
  },
  "&:hover": {
    "&::-webkit-scrollbar-thumb": {
      background: theme.palette.grey[300],
    },
    "&::-webkit-scrollbar-track": {
      background: theme.palette.grey[100]
    }
  }
}));
export default CustomDatePicker;
