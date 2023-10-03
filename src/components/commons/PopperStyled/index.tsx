import React, { useState, useRef, useEffect } from "react";
import { Box, Popper, PopperPlacementType, styled, useTheme } from "@mui/material";

import { CloseLineIcon } from "src/commons/resources";

import CustomIcon from "../CustomIcon";

const StyledPopper = styled(Popper)(({ theme }) => ({
  padding: "10px",
  marginBottom: "20px !important",
  backgroundColor: theme.palette.secondary[0],
  color: "rgb(19, 21, 47)",
  transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
  borderRadius: 4,
  zIndex: 1303,
  boxShadow:
    "rgba(0, 0, 0, 0.2) 0px 5px 5px -3px, rgba(0, 0, 0, 0.14) 0px 8px 10px 1px, rgba(0, 0, 0, 0.12) 0px 3px 14px 2px",
  "&::before": {
    backgroundColor: theme.palette.secondary[0],
    content: '""',
    display: "block",
    position: "absolute",
    width: 12,
    height: 12,
    zIndex: 10,
    bottom: -6,
    transform: "rotate(45deg)",
    left: "calc(50% - 6px)"
  }
}));

type Props = {
  render: ({ handleClick }: { handleClick: (e: HTMLElement) => void }) => React.ReactNode;
  content: React.ReactNode;
  showCloseButton?: boolean;
  placement?: PopperPlacementType;
};

const PopperStyled = (props: Props) => {
  const [anchorEl, setAnchorEl] = useState<(EventTarget & HTMLElement) | null>(null);
  const { render, content, showCloseButton = true } = props;
  const refElement = useRef<HTMLDivElement>(null);
  const theme = useTheme();
  const { placement = "top-start" } = props;
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event: MouseEvent) => {
    if (refElement.current && !(event.target instanceof Node && refElement.current.contains(event.target))) {
      setAnchorEl(null);
    }
  };

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
      <StyledPopper open={open} anchorEl={anchorEl} placement={placement} ref={refElement}>
        {showCloseButton && (
          <Box
            onClick={handleClose}
            position="absolute"
            top={0}
            right={5}
            width={20}
            height={20}
            zIndex={10}
            sx={{
              transform: "translateX(50%) translateY(-50%)",
              cursor: "pointer",
              background: (theme) => theme.palette.secondary.main,
              borderRadius: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <CustomIcon icon={CloseLineIcon} width={14} fill={theme.palette.secondary[0]} />
          </Box>
        )}
        {content}
      </StyledPopper>
    </>
  );
};

export default PopperStyled;
