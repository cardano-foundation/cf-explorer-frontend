import React, { useState } from "react";
import { Box, Popover } from "@mui/material";
import { CloseIcon } from "../../../commons/resources";

type Props = {
  render: ({ handleClick }: { handleClick: (e: React.MouseEvent<HTMLElement>) => void }) => React.ReactNode;
  content: React.ReactNode;
  showCloseButton?: boolean;
};

const PopoverStyled = (props: Props) => {
  const [anchorEl, setAnchorEl] = useState<(EventTarget & HTMLElement) | null>(null);
  const { render, content, showCloseButton } = props;

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <>
      {render({ handleClick })}
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        sx={{
          "& .MuiPopover-paper": {
            padding: "10px",
          },
        }}
      >
        {showCloseButton && (
          <Box
            position={"absolute"}
            top={0}
            right={0}
            onClick={handleClose}
            sx={{ transform: "scale(0.6)", cursor: "pointer" }}
          >
            <img src={CloseIcon} />
          </Box>
        )}
        {content}
      </Popover>
    </>
  );
};

export default PopoverStyled;
