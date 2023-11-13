import { Box, useTheme } from "@mui/material";
import React, { useRef } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { useHistory, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { NativeScriptIcon, SmartContractsIcon } from "src/commons/resources";
import { details } from "src/commons/routers";
import { CustomAccordion } from "src/components/share/styled";

import TabNativeScripts from "./TabNativeScripts";
import TabSmartContracts from "./TabSmartContracts";
import { StyledAccordionDetails, StyledAccordionSummary, StyledContractTabs, TitleTab } from "./styles";

interface TTab {
  key: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  label: React.ReactNode;
  children: React.ReactNode;
}

const Tabs = () => {
  const { tabActive = "" } = useParams<{ tabActive: string }>();
  const history = useHistory();
  const { t } = useTranslation();

  const theme = useTheme();
  const tabRef = useRef<HTMLDivElement>(null);

  const handleChangeTab = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
    tabRef?.current?.scrollIntoView();
    history.replace(details.nativeScriptsAndSC(newExpanded ? panel : ""));
  };

  const data: TTab[] = [
    {
      key: "native-scripts",
      icon: NativeScriptIcon,
      label: <Box data-testid="nativeScriptsTab">{t("NativeScripts")}</Box>,
      children: <TabNativeScripts />
    },
    {
      key: "smart-contracts",
      icon: SmartContractsIcon,
      label: <Box data-testid="smartContractTab">{t("glossary.smartContracts")}</Box>,
      children: <TabSmartContracts />
    }
  ];

  const indexExpand = data.findIndex((item) => item.key === tabActive);

  const needBorderRadius = (currentKey: string) => {
    if (!tabActive) return "0";
    const indexCurrent = data.findIndex((item) => item.key === currentKey);
    if (indexExpand - 1 >= 0 && indexExpand - 1 === indexCurrent) return "0 0 12px 12px";
    if (indexExpand + 1 < data.length && indexExpand + 1 === indexCurrent) return "12px 12px 0 0";
    return "0";
  };

  return (
    <StyledContractTabs ref={tabRef}>
      {data?.map(({ key, icon: Icon, label, children }, index) => {
        return (
          <CustomAccordion
            key={key}
            expanded={tabActive === key}
            customBorderRadius={needBorderRadius(key)}
            isDisplayBorderTop={tabActive !== key && key !== data[0].key && index !== indexExpand + 1}
            onChange={handleChangeTab(key)}
            TransitionProps={{ unmountOnExit: true }}
          >
            <StyledAccordionSummary
              expandIcon={
                <IoIosArrowDown
                  style={{
                    width: "21px",
                    height: "21px"
                  }}
                  color={key === tabActive ? theme.palette.primary.main : theme.palette.secondary.light}
                />
              }
            >
              <Icon fill={key === tabActive ? theme.palette.primary.main : theme.palette.secondary.light} />
              <TitleTab active={key === tabActive}>{label}</TitleTab>
            </StyledAccordionSummary>
            <StyledAccordionDetails>{children}</StyledAccordionDetails>
          </CustomAccordion>
        );
      })}
    </StyledContractTabs>
  );
};

export default Tabs;
