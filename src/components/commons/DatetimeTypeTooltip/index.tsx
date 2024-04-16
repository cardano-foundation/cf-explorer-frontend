import { Box } from "@mui/material";

import { formatTypeDate } from "src/commons/utils/helper";

import CustomTooltip from "../CustomTooltip";

const DatetimeTypeTooltip = ({ children }: { children: React.ReactNode }) => {
  const title = formatTypeDate();
  return (
    <CustomTooltip title={title}>
      <Box display={"inline-block"}>{children}</Box>
    </CustomTooltip>
  );
};

export default DatetimeTypeTooltip;
