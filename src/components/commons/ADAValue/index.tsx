import { Box, BoxProps } from "@mui/material";

import { formatADAFull } from "src/commons/utils/helper";

import ADAicon from "../ADAIcon";

interface IAdaValue extends BoxProps {
  value: number | string;
}

export const AdaValue = ({ value, ...props }: IAdaValue) => {
  return (
    <Box component="span" {...props}>
      {formatADAFull(value)}&nbsp;
      <ADAicon />
    </Box>
  );
};
