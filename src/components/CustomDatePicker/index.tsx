import "react-datepicker/dist/react-datepicker.css";
import { Box } from "@mui/material";
import { StyledDatePicker } from "./styles";
import { DateRangeIcon } from "../../commons/resources";

export type IDate = Date | null;

export type IDateRange = [IDate, IDate];

interface ICustomDatePicker {
  dateRange: IDateRange;
  setDateRange: (newDateRange: IDateRange) => void;
}

const CustomDatePicker = (props: ICustomDatePicker) => {
  const { dateRange, setDateRange } = props;
  const [startDate, endDate] = dateRange;

  return (
    <Box position={"relative"}>
      <StyledDatePicker
        selectsRange={true}
        startDate={startDate}
        endDate={endDate}
        onChange={(update: any) => {
          setDateRange(update);
        }}
      />
      <Box position={"absolute"} right="0" top="10px">
        <DateRangeIcon />
      </Box>
    </Box>
  );
};
export default CustomDatePicker;
