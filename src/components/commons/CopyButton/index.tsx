import { IconButton, IconButtonProps, TooltipProps, styled, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { BiCheckCircle } from "react-icons/bi";
import { useCopyToClipboard } from "react-use";

import { CopyIconSquare } from "src/commons/resources";

import CustomIcon from "../CustomIcon";
import CustomTooltip from "../CustomTooltip";

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
  const [open, setOpen] = useState<boolean>(false);
  const theme = useTheme();

  useEffect(() => {
    if (copied) {
      const timeout = setTimeout(() => {
        setCopied(false);
        setOpen(true);
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

  return (
    <CustomTooltip
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      placement={placement || "top"}
      title={copied ? "Copied" : "Copy"}
      enterTouchDelay={0}
    >
      <Button {...props} onClick={onCopy}>
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
