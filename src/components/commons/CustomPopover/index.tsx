import { Box, styled } from "@mui/material";
import React, { useState, useEffect, useRef } from "react";

const PopoverContainer = styled(Box)`
  // ... (your CSS styles)
  position: relative;
`;

const PopoverContent = styled(Box)<{ isOpen: boolean }>`
  display: ${(props) => (props.isOpen ? "block" : "none")};
  position: absolute;
  background-color: red;
`;

interface PopoverProps {
  trigger: React.ReactNode;
  content?: React.ReactNode;
  children?: React.ReactNode;
}

const CustomPopover: React.FC<PopoverProps> = ({ trigger, content, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const togglePopover = () => {
    setIsOpen(!isOpen);
  };

  return (
    <PopoverContainer ref={popoverRef}>
      <Box onClick={togglePopover}>{trigger}</Box>
      <PopoverContent isOpen={isOpen}>{content || children}</PopoverContent>
    </PopoverContainer>
  );
};

export default CustomPopover;
