import { useState, cloneElement, ReactNode, MouseEvent, ReactElement } from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

interface PopoverProps {
  button?: ReactNode;
  content?: ReactNode;
}

export default function BasicPopover({ button, content }: PopoverProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      {button ? (
        cloneElement(button as ReactElement, {
          "aria-describedby": id,
          onClick: handleClick
        })
      ) : (
        <Button aria-describedby={id} variant="contained" onClick={handleClick}>
          Open Popover
        </Button>
      )}
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
      >
        {content || <Typography sx={{ p: 2 }}>The content of the Popover.</Typography>}
      </Popover>
    </div>
  );
}
