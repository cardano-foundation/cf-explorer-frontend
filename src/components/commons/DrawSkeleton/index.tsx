import React, { forwardRef } from "react";
import { Box, BoxProps, Skeleton, styled } from "@mui/material";

const InformationSkeleton = styled(Skeleton)(({ theme }) => ({
  width: 600,
  height: 30,
  borderRadius: 8,
  margin: "0px 0px 36px auto",
  [theme.breakpoints.down("sm")]: {
    width: 250,
    height: 100,
    marginBottom: 30
  }
}));

const ShapeSkeleton = styled(Skeleton)(({ theme }) => ({
  width: "100%",
  height: 300,
  borderRadius: 8,
  margin: "auto",
  [theme.breakpoints.down("md")]: {
    width: 540,
    height: 700
  },
  [theme.breakpoints.down("sm")]: {
    width: 320
  }
}));

export const DrawSkeleton: React.FC<BoxProps> = forwardRef((props, ref) => {
  return (
    <Box {...props} ref={ref}>
      <InformationSkeleton variant="rectangular" />
      <ShapeSkeleton variant="rectangular" />
    </Box>
  );
});

DrawSkeleton.displayName = "DrawSkeleton";

export default DrawSkeleton;
