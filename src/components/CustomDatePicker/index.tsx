import 'react-datepicker/dist/react-datepicker.css';
import { Box } from '@mui/material';
import { SelectDateButton, StyledDatePicker } from './styles';
import { DateRangeIcon } from '../../commons/resources';

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
    <Box position={'relative'}>
      <StyledDatePicker
        placeholderText='dd/mm/yyyy'
        selectsRange={true}
        startDate={startDate}
        endDate={endDate}
        onChange={(update: any) => {
          setDateRange(update);
        }}
      />
      <SelectDateButton>
        <DateRangeIcon />
      </SelectDateButton>
    </Box>
  );
};
export default CustomDatePicker;
