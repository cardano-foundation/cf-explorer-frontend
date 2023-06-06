import { IconButtonProps, Box, IconButton, styled } from "@mui/material";
import React, { forwardRef } from "react";

export const Button = styled(IconButton)(({ theme }) => ({
  width: 30,
  height: 30,
  marginLeft: 6,
  backgroundColor: theme.palette.grey[200]
}));

export const DotsIcon = styled(Box)`
  border-radius: 50%;
  background-color: ${({ theme }) => theme.palette.grey[400]};
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
    background-color: ${({ theme }) => theme.palette.grey[400]};
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
    background-color: ${({ theme }) => theme.palette.grey[400]};
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
