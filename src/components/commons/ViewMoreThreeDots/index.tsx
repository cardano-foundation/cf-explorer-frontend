import { IconButtonProps, Box, IconButton, styled, alpha } from "@mui/material";
import React, { forwardRef } from "react";

export const Button = styled(IconButton)(({ theme }) => ({
  width: 30,
  height: 30,
  marginLeft: 6,
  backgroundColor: theme.mode === "light" ? theme.palette.grey[200] : alpha(theme.palette.common.white, 0.2)
}));

export const DotsIcon = styled(Box)`
  border-radius: 50%;
  background-color: ${({ theme }) =>
    theme.mode === "light" ? theme.palette.secondary.light : theme.palette.common.white};
  width: 3.6px;
  height: 3.6px;
  position: relative;
  &::before {
    content: "";
    position: absolute;
    display: block;
    width: 3.6px;
    height: 3.6px;
    right: -7px;
    top: 0px;
    border-radius: 50%;
    background-color: ${({ theme }) =>
      theme.mode === "light" ? theme.palette.secondary.light : theme.palette.common.white};
  }
  &::after {
    content: "";
    position: absolute;
    display: block;
    width: 3.6px;
    height: 3.6px;
    left: -7px;
    top: 0px;
    border-radius: 50%;
    background-color: ${({ theme }) =>
      theme.mode === "light" ? theme.palette.secondary.light : theme.palette.common.white};
  }
`;

export const ViewMoreThreeDots: React.FC<IconButtonProps> = forwardRef((props, ref) => {
  return (
    <Button {...props} ref={ref}>
      <DotsIcon />
    </Button>
  );
});

ViewMoreThreeDots.displayName = "ViewMoreThreeDots";

export default ViewMoreThreeDots;
