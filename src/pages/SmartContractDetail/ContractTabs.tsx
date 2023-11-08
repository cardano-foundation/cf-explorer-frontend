import { useTheme } from "@mui/material";
import React, { useRef } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { useHistory, useParams } from "react-router-dom";
import { t } from "i18next";

import { UtxoIcon } from "src/commons/resources";
import { details } from "src/commons/routers";
import { CustomAccordion } from "src/components/share/styled";

import TabAssociated from "./TabAssociated";
import TabTransactions from "./TabTransactions";
import {
  StyledAccordionDetails,
  StyledAccordionSummary,
  StyledAssociatedIcon,
  StyledContractTabs,
  StyledTabName,
  TitleTab
} from "./styles";

interface TTab {
  key: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  label: React.ReactNode;
  children: React.ReactNode;
}

const ContractTabs = ({ setVersion }: { setVersion: (v: string) => void }) => {
  const { tabActive = false, address } = useParams<{ tabActive: keyof Transaction; address: string }>();
  const history = useHistory();

  const theme = useTheme();
  const tabRef = useRef<HTMLDivElement>(null);

  const handleChangeTab = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
    tabRef?.current?.scrollIntoView();
    history.replace(details.smartContract(address, newExpanded ? panel : ""));
  };

  const data: TTab[] = [
    {
      key: "associated",
      icon: StyledAssociatedIcon,
      label: <StyledTabName data-testid="sc.AssociatedAddresses">{t("AssociatedAddresses")}</StyledTabName>,
      children: <TabAssociated setVersion={setVersion} />
    },
    {
      key: "transactions",
      icon: UtxoIcon,
      label: <StyledTabName data-testid="sc.transaction">{t("glossary.transactions")}</StyledTabName>,
      children: <TabTransactions />
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
      {data?.map(({ key, icon: Icon, label, children }, index) => (
        <CustomAccordion
          key={key}
          expanded={tabActive === key}
          customBorderRadius={needBorderRadius(key)}
          isDisplayBorderTop={tabActive !== key && key !== data[0].key && index !== indexExpand + 1}
          onChange={handleChangeTab(key)}
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
      ))}
    </StyledContractTabs>
  );
};

export default ContractTabs;
