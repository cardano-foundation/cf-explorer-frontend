import React, { useEffect, useState } from "react";
import { IconButton, IconButtonProps, styled, TooltipProps, useTheme } from "@mui/material";
import { useCopyToClipboard } from "react-use";
import { BiCheckCircle } from "react-icons/bi";

import { CopyIconSquare } from "src/commons/resources";

import CustomTooltip from "../CustomTooltip";
import CustomIcon from "../CustomIcon";

const Button = styled(IconButton)`
  color: ${(props) => props.theme.palette.text.primary};
  width: 23px;
  height: 23px;
  font-size: var(--font-size-text-large);
`;

interface CopyButtonProps extends IconButtonProps {
  text?: string;
  placement?: TooltipProps["placement"];
  className?: string;
  children?: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
}

const CopyButton: React.FC<CopyButtonProps> = ({ text = "", onClick, children, placement, ...props }) => {
  const [, copyToClipboard] = useCopyToClipboard();
  const [copied, setCopied] = useState<boolean>();
  const theme = useTheme();

  useEffect(() => {
    if (copied) {
      const timeout = setTimeout(() => {
        setCopied(false);
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [copied]);

  const onCopy = (e: React.MouseEvent) => {
    if (!copied) {
      copyToClipboard(text);
      setCopied(true);
      onClick?.(e);
    }
  };
  return (
    <CustomTooltip placement={placement || "top"} title={copied ? "Copied" : "Copy"} enterTouchDelay={0}>
      <Button {...props} onClick={onCopy}>
        {children ||
          (copied ? (
            <BiCheckCircle
              color={theme.palette.secondary.light}
              style={{ verticalAlign: "text-bottom", scale: "2", height: 16 }}
            />
          ) : (
            <CustomIcon fill={theme.palette.secondary.light} icon={CopyIconSquare} height={16} />
          ))}
      </Button>
    </CustomTooltip>
  );
};

export default CopyButton;
