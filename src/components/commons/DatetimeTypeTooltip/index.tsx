import { Box } from "@mui/material";
import { useEffect, useState } from "react";

import { formatTypeDate } from "src/commons/utils/helper";

import CustomTooltip from "../CustomTooltip";

const DatetimeTypeTooltip = ({ children }: { children: React.ReactNode }) => {
  const [title, setTitle] = useState(formatTypeDate());
  useEffect(() => setTitle(formatTypeDate()), [window.navigator.language]);
  return (
    <CustomTooltip title={<Box>{title}</Box>}>
      <Box display={"inline-block"}>{children}</Box>
    </CustomTooltip>
  );
};

export default DatetimeTypeTooltip;
