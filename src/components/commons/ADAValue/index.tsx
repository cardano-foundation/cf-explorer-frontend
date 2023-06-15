import { Box, BoxProps } from "@mui/material";

import { formatADAFull } from "src/commons/utils/helper";

import ADAicon from "../ADAIcon";

interface IAdaValue extends BoxProps {
  value: number | string;
}

export const AdaValue = ({ value, gap = "8px", fontSize, color, ...props }: IAdaValue) => {
  return (
    <Box {...props} color={color} display="flex" alignItems="center" gap={gap} fontSize={fontSize}>
      {formatADAFull(value)}
      <ADAicon style={{ color }} fontSize={fontSize} />
    </Box>
  );
};
