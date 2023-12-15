import React, { useEffect, useState } from "react";
import { IconButton, IconButtonProps, styled, TooltipProps, useTheme } from "@mui/material";
import { useCopyToClipboard } from "react-use";
import { BiCheckCircle } from "react-icons/bi";

import { CopyIconSquare } from "src/commons/resources";
import { useScreen } from "src/commons/hooks/useScreen";

import CustomTooltip from "../CustomTooltip";
import CustomIcon from "../CustomIcon";

const Button = styled(IconButton)`
  color: ${(props) => props.theme.palette.text.primary};
  width: 23px;
  height: 23px;
  font-size: var(--font-size-text-large);
  pointer-events: auto;
`;

interface CopyButtonProps extends IconButtonProps {
  text?: string;
  placement?: TooltipProps["placement"];
  className?: string;
  children?: React.ReactNode;
  customIcon?: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  onClick?: (e: React.MouseEvent) => void;
}

const CopyButton: React.FC<CopyButtonProps> = ({ text = "", onClick, children, placement, customIcon, ...props }) => {
  const [, copyToClipboard] = useCopyToClipboard();
  const [copied, setCopied] = useState<boolean>();
  const [tooltipOpen, setTooltipOpen] = useState<boolean>(false);
  const theme = useTheme();
  const { isMobile } = useScreen();

  useEffect(() => {
    if (copied) {
      setTooltipOpen(true);
      const timeout = setTimeout(() => {
        setCopied(false);
        setTooltipOpen(false);
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [copied]);

  const onCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!copied) {
      copyToClipboard(text);
      setCopied(true);
      onClick?.(e);
    }
  };

  const handleCloseToolTip = () => {
    setTooltipOpen(false);
  };
  const handleMouseEnter = () => {
    setTooltipOpen(true);
  };

  return (
    <CustomTooltip
      placement={placement || "top"}
      title={copied ? "Copied" : "Copy"}
      open={tooltipOpen}
      onClose={handleCloseToolTip}
    >
      <Button
        {...props}
        onClick={onCopy}
        disableRipple={isMobile && tooltipOpen}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleCloseToolTip}
      >
        {children ||
          (copied ? (
            <BiCheckCircle
              color={theme.palette.secondary.light}
              style={{ verticalAlign: "text-bottom", scale: "2", height: 16 }}
            />
          ) : (
            <CustomIcon fill={theme.palette.secondary.light} icon={customIcon || CopyIconSquare} height={16} />
          ))}
      </Button>
    </CustomTooltip>
  );
};

export default CopyButton;
