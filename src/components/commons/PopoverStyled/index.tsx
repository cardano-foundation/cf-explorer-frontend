import React, { useState } from "react";
import { Box, Popover } from "@mui/material";

import { CloseLineIcon } from "src/commons/resources";

import CustomIcon from "../CustomIcon";

type Props = {
  render: ({ handleClick }: { handleClick: (e: HTMLElement) => void }) => React.ReactNode;
  content: React.ReactNode;
  showCloseButton?: boolean;
};

const PopoverStyled = (props: Props) => {
  const [anchorEl, setAnchorEl] = useState<(EventTarget & HTMLElement) | null>(null);
  const { render, content, showCloseButton = true } = props;

  const handleClick = (element: HTMLElement) => {
    setAnchorEl(element);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <>
      {render({ handleClick: anchorEl ? handleClose : handleClick })}
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center"
        }}
        disableScrollLock={true}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "center"
        }}
        sx={{
          "& .MuiPopover-paper": {
            padding: "10px",
            overflow: "visible",
            transform: "translateY(-20px)!important",
            "&::before": {
              backgroundColor: "white",
              content: '""',
              display: "block",
              position: "absolute",
              width: 12,
              height: 12,
              bottom: -6,
              transform: "rotate(45deg)",
              left: "calc(50% - 6px)"
            }
          }
        }}
      >
        {showCloseButton && (
          <Box
            onClick={handleClose}
            position="absolute"
            top={0}
            right={0}
            width={20}
            height={20}
            sx={{
              transform: "translateX(50%) translateY(-50%)",
              cursor: "pointer",
              background: (theme) => theme.palette.grey[200],
              borderRadius: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <CustomIcon icon={CloseLineIcon} width={14} fill="black" />
          </Box>
        )}
        {content}
      </Popover>
    </>
  );
};

export default PopoverStyled;
