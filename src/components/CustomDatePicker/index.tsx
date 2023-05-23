import { Box, IconButton, styled, useTheme } from "@mui/material";
import { range } from "lodash";
import "react-datepicker/dist/react-datepicker.css";
import "./index.css"
import { BsFillCaretDownFill } from "react-icons/bs";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { ensuredForwardRef } from "react-use";
import { DateRangeIcon } from "../../commons/resources";
import { SelectDateButton, StyledDatePicker, WrapCustomDatePicker } from "./styles";
import { useState, useRef, useEffect } from "react";

export type IDate = Date | null;

export type IDateRange = [IDate, IDate];

interface ICustomDatePicker {
  dateRange: IDateRange;
  setDateRange: (newDateRange: IDateRange) => void;
}

const CustomDatePicker = (props: ICustomDatePicker) => {
  const { dateRange, setDateRange } = props;
  const [startDate, endDate] = dateRange;
  const theme = useTheme();
  const modalRef = useRef<HTMLInputElement>();
  const activeRef = useRef<HTMLInputElement>();
  const [openModalPickYear, setOpenModalPickYear] = useState(false);
  const toggleModal = () => {
    setOpenModalPickYear(!openModalPickYear);
  };
  const getYear = (date: Date) => date.getFullYear();
  const getMonth = (date: Date) => date.getMonth();
  const years = range(1990, 2100);
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
        setOpenModalPickYear(false);
      }
    };

    if (openModalPickYear) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openModalPickYear]);

  useEffect(() => {
    if (activeRef.current) {
      activeRef.current.scrollIntoView({
        behavior: "auto",
        block: "center",
      });
    }
  }, [openModalPickYear]);

  const CustomInput = ensuredForwardRef(({ value, onClick }: any, ref: any) => (
    <WrapCustomDatePicker onClick={onClick} ref={ref}>
      {value ? value : <Box sx={{ opacity: 0.42 }}>dd/mm/yyyy</Box>}
      <SelectDateButton onClick={onClick}>
        <DateRangeIcon />
      </SelectDateButton>
    </WrapCustomDatePicker>
  ));

  return (
    <StyledDatePicker
      placeholderText='MM/DD/YYYY'
      selectsRange={true}
      startDate={startDate}
      endDate={endDate}
      customInput={<CustomInput />}
      onChange={(update: any) => {
        setDateRange(update);
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
              toggleModal();
            }} sx={{
              marginLeft: "16px"
            }}>
              <BsFillCaretDownFill size={"12px"} />
            </IconButton>
          </Box>
          {
            openModalPickYear && (
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
                          ref={isActive ? activeRef : null}
                          key={year}
                          onClick={() => {
                            changeYear(year);
                            setOpenModalPickYear(false);
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

  );
};
const MyGrid = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gridGap: "8px",
  padding: "10px 6px",
}));

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
