import { Box, Typography, useTheme } from "@mui/material";
import React from "react";
import { IoIosArrowUp } from "react-icons/io";

import InfoSolidIcon from "src/components/commons/InfoSolidIcon";

import {
  ArrowIconContainer,
  StyledAccordion,
  StyledAccordionDetails,
  StyledAccordionSummary,
  UnderlineText
} from "./styles";

export interface ExplanDropdownProps {
  title: string;
  content?: React.ReactNode;
  children?: React.ReactNode;
}
const ExplanDropdown: React.FC<ExplanDropdownProps> = ({ title, content, children }) => {
  const theme = useTheme();
  return (
    <StyledAccordion>
      <StyledAccordionSummary
        expandIcon={
          <ArrowIconContainer>
            <IoIosArrowUp color={theme.palette.secondary.light} />
          </ArrowIconContainer>
        }
      >
        <Box display={"flex"} alignItems={"center"} gap={1}>
          <UnderlineText>{title}</UnderlineText>
          <InfoSolidIcon />
        </Box>
      </StyledAccordionSummary>
      <StyledAccordionDetails>
        <Typography component="p">{content ?? children}</Typography>
      </StyledAccordionDetails>
    </StyledAccordion>
  );
};

export default ExplanDropdown;
