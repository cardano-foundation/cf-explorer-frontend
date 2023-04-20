import React, { useState } from 'react';
import { Box, Button, IconButton, Popover } from "@mui/material";
import { CloseIcon } from '../../../commons/resources';
import { InfoIcon } from '../DetailView/styles';

const PopoverStyled = (props: any) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { WrappedParent, children, showCloseButton } = props;

  const handleClick = (event: any) => {
    console.log(123)
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <Box onClick={handleClick}>
        <WrappedParent />
      </Box>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        sx={{
          '& .MuiPopover-paper': {
            padding: "10px",
          }
        }}
      >
        {showCloseButton && (<Box position={"absolute"} top={0} right={0} onClick={handleClose} sx={{ transform: "scale(0.6)", cursor: "pointer" }}>
          <img src={CloseIcon} />
        </Box>)
        }
        {children}
      </Popover>
    </>
  );
};

export default PopoverStyled;
