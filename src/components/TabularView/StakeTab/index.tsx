import React, { useRef } from "react";
import { Box, useTheme, AccordionSummary, AccordionDetails } from "@mui/material";
import { IoIosArrowDown } from "react-icons/io";

import { StyledAccordion } from "src/components/commons/CustomAccordion/styles";

import { TitleTab } from "./styles";

export interface StakeTabItem {
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  label: React.ReactNode;
  key: string;
  component: React.ReactNode;
  keyCheckShow?: string;
}
export interface StackTabProps {
  checkshow?: boolean;
  tabs: StakeTabItem[];
  tabActive?: string;
  onChangeTab?: (tab: TabStakeDetail) => void;
  tabsRenderConfig?: ListStakeKeyResponse | ListTabResponseSPO;
}

const StakeTab: React.FC<StackTabProps> = ({ tabs, tabActive, onChangeTab, tabsRenderConfig, checkshow }) => {
  const tabRef = useRef<HTMLDivElement>();
  const theme = useTheme();

  const indexExpand = tabs.findIndex((item) => item.key === tabActive);

  const needBorderRadius = (currentKey: string) => {
    if (!tabActive) return "0";
    const indexCurrent = tabs.findIndex((item) => item.key === currentKey);
    if (indexExpand - 1 >= 0 && indexExpand - 1 === indexCurrent) return "0 0 12px 12px";
    if (indexExpand + 1 < tabs.length && indexExpand + 1 === indexCurrent) return "12px 12px 0 0";
    return "0";
  };

  const handleChangeTab = (panel: TabStakeDetail) => (event: React.SyntheticEvent, newExpanded: boolean) => {
    const handleTransitionEnd = () => {
      if (newExpanded) {
        setTimeout(() => {
          tabRef?.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }, 150);
        tabRef?.current?.removeEventListener("transitionend", handleTransitionEnd);
      }
    };
    tabRef?.current?.addEventListener("transitionend", handleTransitionEnd);
    onChangeTab?.(newExpanded ? panel : "");
    if (checkshow && tabsRenderConfig && !tabsRenderConfig[tabs.find((t) => t.key === tabActive)?.keyCheckShow || ""])
      return;
  };

  const getColorTab = (key: string, tabActive: string | undefined): string => {
    if (key === tabActive) return theme.palette.primary.main;
    return theme.palette.secondary.light;
  };

  return (
    <Box ref={tabRef} mt={4}>
      {tabs.map(({ key, icon: Icon, label, component }, index) => {
        const colorActive = getColorTab(key, tabActive);
        return (
          <StyledAccordion
            key={key}
            expanded={tabActive === key}
            customBorderRadius={needBorderRadius(key)}
            isDisplayBorderTop={tabActive !== key && key !== tabs[0].key && index !== indexExpand + 1}
            onChange={handleChangeTab(key as TabStakeDetail)}
          >
            <AccordionSummary
              expandIcon={
                <IoIosArrowDown
                  style={{
                    width: "21px",
                    height: "21px"
                  }}
                  color={colorActive}
                />
              }
              sx={{
                paddingX: theme.spacing(3),
                paddingY: theme.spacing(1)
              }}
            >
              <Icon
                fill={key === "poolSize" ? "none" : colorActive}
                stroke={key === "poolSize" ? colorActive : "none"}
              />
              <TitleTab pl={1} active={+(key === tabActive)}>
                {label}
              </TitleTab>
            </AccordionSummary>
            <AccordionDetails>{component}</AccordionDetails>
          </StyledAccordion>
        );
      })}
    </Box>
  );
};

export default StakeTab;
