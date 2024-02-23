import { ClickAwayListener, Tooltip, TooltipProps, useTheme } from "@mui/material";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

import { useScreen } from "src/commons/hooks/useScreen";

interface Props extends TooltipProps {
  wOpacity?: boolean;
  closeTooltip?: boolean;
  setIsCloseTooltip?: Dispatch<SetStateAction<boolean>>;
}

export const CustomTooltip = (props: Props) => {
  const { componentsProps, placement, wOpacity = true, open, onClose, children, onOpen, ...otherProps } = props;
  const [openTooltip, setOpenTooltip] = useState(false);

  const theme = useTheme();
  const { isMobile } = useScreen();
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onCloseWhenChangeTab = () => {
      if (document.visibilityState === "hidden") {
        setOpenTooltip(false);
      }
    };

    document.addEventListener("visibilitychange", onCloseWhenChangeTab);

    return () => {
      document.removeEventListener("visibilitychange", onCloseWhenChangeTab);
    };
  }, []);

  const handleOpenTooltip = () => {
    setOpenTooltip(true);
  };

  const handleCloseTooltip = () => {
    setOpenTooltip(false);
  };

  return (
    <ClickAwayListener
      onClickAway={(e) => {
        if (onClose) {
          onClose(e);
        } else {
          setOpenTooltip(false);
        }
      }}
    >
      <Tooltip
        leaveDelay={0}
        leaveTouchDelay={0}
        enterNextDelay={0}
        enterTouchDelay={0}
        enterDelay={0}
        open={open || openTooltip}
        onClose={onClose || handleCloseTooltip}
        onOpen={onOpen || handleOpenTooltip}
        ref={tooltipRef}
        arrow
        placement={placement || "top"}
        componentsProps={{
          ...(componentsProps || {}),
          arrow: {
            ...(componentsProps?.arrow || {}),
            style: {
              fontSize: "var(--font-size-text-small)",
              color: theme.palette.common.black,
              ...(componentsProps?.arrow?.style || {})
            }
          },
          transition: {
            ...(componentsProps?.transition || {}),
            style: {
              maxWidth: isMobile ? "calc(100vw - 20px)" : 400,
              fontSize: "var(--font-size-text-small)",
              padding: "6px 8px",
              lineHeight: 1.5,
              backgroundColor: theme.palette.common.black,
              opacity: wOpacity ? 0.78 : 1,
              borderRadius: 2,
              ...(componentsProps?.transition?.style || {})
            }
          }
        }}
        {...otherProps}
      >
        {children}
      </Tooltip>
    </ClickAwayListener>
  );
};

export default CustomTooltip;
