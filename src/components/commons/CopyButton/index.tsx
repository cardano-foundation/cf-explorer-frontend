import { Tooltip, TooltipProps } from "@mui/material";

import React, { useEffect, useState } from "react";
import { BiCheckCircle } from "react-icons/bi";
import { IoMdCopy } from "react-icons/io";
import { useCopyToClipboard } from "react-use";

import styles from "./index.module.scss";

interface CopyButtonProps {
  text?: string;
  placement?: TooltipProps["placement"];
  className?: string;
  children?: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
}

const CopyButton: React.FC<CopyButtonProps> = ({ text = "", className, onClick, children, placement }) => {
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
    <Tooltip placement={placement || "top"} title={copied ? "Copied" : "Copy"}>
      <span className={className} onClick={onCopy}>
        {children ||
          (copied ? (
            <BiCheckCircle size={20} className={styles.icon} />
          ) : (
            <IoMdCopy size={20} className={styles.icon} />
          ))}
      </span>
    </Tooltip>
  );
};

export default CopyButton;
