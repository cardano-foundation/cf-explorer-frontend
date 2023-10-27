import { Box, useTheme } from "@mui/material";
import React, { useRef } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { useHistory, useParams } from "react-router-dom";

import { SummaryIcon, UtxoIcon } from "src/commons/resources";
import { CustomAccordion } from "src/components/TransactionDetail/TransactionMetadata/styles";
import { details } from "src/commons/routers";

import TabAssociated from "./TabAssociated";
import TabTransactions from "./TabTransactions";
import { StyledAccordionDetails, StyledAccordionSummary, StyledContractTabs, StyledTabName } from "./styles";

interface TTab {
  key: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  label: React.ReactNode;
  children: React.ReactNode;
}

const ContractTabs = () => {
  const { tabActive = false } = useParams<{ tabActive: keyof Transaction }>();
  const history = useHistory();

  const theme = useTheme();
  const tabRef = useRef<HTMLDivElement>(null);

  const handleChangeTab = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
    tabRef?.current?.scrollIntoView();
    history.replace(
      details.smartContract("af2e27f580f7f08e93190a81f72462f153026d06450924726645891b", newExpanded ? panel : "")
    );
  };

  const data: TTab[] = [
    {
      key: "associated",
      icon: SummaryIcon,
      label: <StyledTabName>Associated Addresses</StyledTabName>,
      children: <TabAssociated />
    },
    {
      key: "transactions",
      icon: UtxoIcon,
      label: <StyledTabName>Transactions</StyledTabName>,
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
    <StyledContractTabs ref={tabRef} className="StyledContractTabs">
      {data?.map(({ key, icon: Icon, label, children }, index) => (
        <CustomAccordion
          className="CustomAccordion"
          key={key}
          expanded={tabActive === key}
          customBorderRadius={needBorderRadius(key)}
          isDisplayBorderTop={tabActive !== key && key !== data[0].key && index !== indexExpand + 1}
          onChange={handleChangeTab(key)}
        >
          <StyledAccordionSummary
            className="AccordionSummary"
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
            <Box>{label}</Box>
          </StyledAccordionSummary>
          <StyledAccordionDetails>{children}</StyledAccordionDetails>
        </CustomAccordion>
      ))}
    </StyledContractTabs>
  );
};

export default ContractTabs;
