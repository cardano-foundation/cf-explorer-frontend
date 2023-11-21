import React, { useMemo, useRef } from "react";
import { AccordionSummary, Box, useTheme, AccordionDetails } from "@mui/material";
import { useHistory, useParams } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";

import { details } from "src/commons/routers";
import { SkeletonUI } from "src/components/AddressDetail/AddressAnalytics/styles";

import { IconWrapper, StyledAccordion, TitleTab } from "./styles";

export type TTab = {
  key: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  label: React.ReactNode;
  children: React.ReactNode;
};

export type TCustomAccordionProps = {
  tabs: TTab[];
  hiddenKeys?: string[];
  loading?: boolean;
};

export const CustomAccordion: React.FC<TCustomAccordionProps> = ({ tabs, hiddenKeys = [], loading = false }) => {
  const { tabActive = "0", id } = useParams<{ tabActive: string; id: string }>();

  const getTabs = useMemo(() => {
    if (!hiddenKeys.length) return tabs;
    return tabs.filter((tab) => !hiddenKeys.includes(tab.key));
  }, [tabs, hiddenKeys]);

  const indexExpand = getTabs.findIndex((item) => item.key === tabActive);
  const history = useHistory();
  const tabRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();
  const handleChangeTab = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
    const handleTransitionEnd = () => {
      if (newExpanded) {
        setTimeout(() => {
          tabRef?.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }, 0);
        tabRef?.current?.removeEventListener("transitionend", handleTransitionEnd);
      }
    };
    tabRef?.current?.addEventListener("transitionend", handleTransitionEnd);
    history.replace(details.nativeScriptDetail(id, newExpanded ? panel : ""));
  };

  const needBorderRadius = (currentKey: string) => {
    if (!tabActive) return "0";
    const indexCurrent = tabs.findIndex((item) => item.key === currentKey);
    if (indexExpand - 1 >= 0 && indexExpand - 1 === indexCurrent) return "0 0 12px 12px";
    if (indexExpand + 1 < tabs.length && indexExpand + 1 === indexCurrent) return "12px 12px 0 0";
    return "0";
  };

  if (loading) return <LoadingSkeleton />;
  return (
    <Box>
      {getTabs.map(({ key, icon: Icon, children, label }, index) => (
        <StyledAccordion
          key={key}
          expanded={tabActive === key}
          customBorderRadius={needBorderRadius(key)}
          isDisplayBorderTop={tabActive !== key && index !== indexExpand + 1}
          onChange={handleChangeTab(key)}
          TransitionProps={{ unmountOnExit: true }}
        >
          <AccordionSummary
            expandIcon={
              <IoIosArrowDown
                style={{
                  width: "21px",
                  height: "21px"
                }}
                color={key === tabActive ? theme.palette.primary.main : theme.palette.secondary.light}
              />
            }
            sx={{
              paddingX: theme.spacing(3),
              paddingY: theme.spacing(1)
            }}
          >
            <IconWrapper fill={key === tabActive ? theme.palette.primary.main : theme.palette.secondary.light}>
              <Icon />
            </IconWrapper>
            <TitleTab pl={1} active={+(key === tabActive)}>
              {label}
            </TitleTab>
          </AccordionSummary>
          <AccordionDetails>{children}</AccordionDetails>
        </StyledAccordion>
      ))}
    </Box>
  );
};

const LoadingSkeleton: React.FC = () => {
  return (
    <Box display="flex" flexDirection="column" gap={1}>
      <SkeletonUI variant="rounded" width="100%" height={60} />
      <SkeletonUI variant="rounded" width="100%" height={60} />
      <SkeletonUI variant="rounded" width="100%" height={60} />
      <SkeletonUI variant="rounded" width="100%" height={60} />
      <SkeletonUI variant="rounded" width="100%" height={60} />
    </Box>
  );
};

export default CustomAccordion;
