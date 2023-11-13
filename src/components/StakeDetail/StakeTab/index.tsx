import React, { useRef } from "react";
import { Box, useTheme, AccordionSummary, AccordionDetails } from "@mui/material";
import { useHistory, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { IoIosArrowDown } from "react-icons/io";

import {
  DelegationHistoryIcon,
  StakeKeyHistoryIcon,
  WithdrawalHistoryIcon,
  InstantaneousHistoryIcon,
  TransactionIcon
} from "src/commons/resources";
import { details } from "src/commons/routers";
import { useScreen } from "src/commons/hooks/useScreen";
import { CustomAccordion } from "src/components/share/styled";

import DelegationHistoryTab from "./Tabs/DelegationHistoryTab";
import StakeHistoryTab from "./Tabs/StakeHistoryTab";
import WithdrawalHistoryTab from "./Tabs/WithdrawalHistoryTab";
import InstantaneousTab from "./Tabs/InstantaneousTab";
import TransactionTab from "./Tabs/TransactionTab";
import { TitleTab } from "./styles";

const StakeTab = () => {
  const { t } = useTranslation();
  const tabRef = useRef<HTMLDivElement>();
  const { stakeId, tabActive } = useParams<{ stakeId: string; tabActive?: TabStakeDetail }>();
  const history = useHistory();
  const theme = useTheme();
  const { isMobile } = useScreen();

  const tabs: {
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
    label: React.ReactNode;
    key: TabStakeDetail;
    component: React.ReactNode;
  }[] = [
    {
      icon: DelegationHistoryIcon,
      label: t("tab.DelegationHistory"),
      key: "delegation",
      component: <DelegationHistoryTab isMobile={isMobile} />
    },
    {
      icon: StakeKeyHistoryIcon,
      label: t("tab.stakeAddressHistory"),
      key: "stake-key",
      component: <StakeHistoryTab isMobile={isMobile} />
    },
    {
      icon: WithdrawalHistoryIcon,
      label: t("tab.withdrawalHistory"),
      key: "withdrawal",
      component: <WithdrawalHistoryTab />
    },
    {
      icon: InstantaneousHistoryIcon,
      label: t("tab.instantaneousRewards"),
      key: "instantaneous",
      component: <InstantaneousTab />
    },
    {
      icon: TransactionIcon,
      label: t("tab.transactions"),
      key: "transactions",
      component: <TransactionTab />
    }
  ];

  const indexExpand = tabs.findIndex((item) => item.key === tabActive);

  const needBorderRadius = (currentKey: string) => {
    if (!tabActive) return "0";
    const indexCurrent = tabs.findIndex((item) => item.key === currentKey);
    if (indexExpand - 1 >= 0 && indexExpand - 1 === indexCurrent) return "0 0 12px 12px";
    if (indexExpand + 1 < tabs.length && indexExpand + 1 === indexCurrent) return "12px 12px 0 0";
    return "0";
  };

  const handleChangeTab = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
    tabRef?.current?.scrollIntoView();
    history.replace(details.stake(stakeId, newExpanded ? panel : ""));
  };

  return (
    <Box ref={tabRef} mt={"30px"}>
      {tabs.map(({ key, icon: Icon, label, component }, index) => (
        <CustomAccordion
          key={key}
          expanded={tabActive === key}
          customBorderRadius={needBorderRadius(key)}
          isDisplayBorderTop={tabActive !== key && key !== tabs[0].key && index !== indexExpand + 1}
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
            <Icon fill={key === tabActive ? theme.palette.primary.main : theme.palette.secondary.light} />
            <TitleTab pl={1} active={key === tabActive}>
              {label}
            </TitleTab>
          </AccordionSummary>
          <AccordionDetails>{component}</AccordionDetails>
        </CustomAccordion>
      ))}
    </Box>
  );
};

export default StakeTab;
