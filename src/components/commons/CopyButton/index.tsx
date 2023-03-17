import { IconButton, IconButtonProps, styled, TooltipProps } from "@mui/material";

import React, { useEffect, useState } from "react";
import { BiCheckCircle } from "react-icons/bi";
import { useCopyToClipboard } from "react-use";
import copy from "../../../commons/resources/images/copy.svg";
import CustomTooltip from "../CustomTooltip";

const Button = styled(IconButton)`
  color: ${props => props.theme.palette.text.primary};
  width: 23px;
  height: 23px;
  font-size: var(--font-size-text-large);
`;

const CopyIcon = styled("img")`
  width: auto;
  height: 0.9em;
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
    <CustomTooltip placement={placement || "top"} title={copied ? "Copied" : "Copy"}>
      <Button {...props} onClick={onCopy}>
        {children ||
          (copied ? (
            <BiCheckCircle style={{ verticalAlign: "text-bottom", scale: "2" }} />
          ) : (
            <CopyIcon src={copy} alt="icon copy" />
          ))}
      </Button>
    </CustomTooltip>
  );
};

export default CopyButton;
