import { Box, Typography, useTheme } from "@mui/material";
import React, { useState } from "react";
import { IoIosArrowUp } from "react-icons/io";

import { InfoIcon } from "src/commons/resources";

import {
  ArrowIconContainer,
  ExplanDropdownContainer,
  ExplanDropdownContent,
  ExplanDropdownHeader,
  UnderlineText
} from "./styles";

export interface ExplanDropdownProps {
  title: string;
  content?: React.ReactNode;
  children?: React.ReactNode;
}
const ExplanDropdown: React.FC<ExplanDropdownProps> = ({ title, content, children }) => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  return (
    <ExplanDropdownContainer>
      <ExplanDropdownHeader onClick={() => setOpen(!open)}>
        <Box display="flex" alignItems="center" gap="4px" flex={1}>
          <UnderlineText>{title}</UnderlineText>
          <InfoIcon />
        </Box>
        <ArrowIconContainer open={+open}>
          <IoIosArrowUp color={theme.palette.secondary.light} />
        </ArrowIconContainer>
      </ExplanDropdownHeader>
      {open && (
        <ExplanDropdownContent>
          <Typography component="p">{content ?? children}</Typography>
        </ExplanDropdownContent>
      )}
    </ExplanDropdownContainer>
  );
};

export default ExplanDropdown;
