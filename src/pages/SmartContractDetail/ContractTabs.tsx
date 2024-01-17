import { useTheme } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { useHistory, useParams } from "react-router-dom";
import { t } from "i18next";

import { UtxoIcon } from "src/commons/resources";
import { StyledAccordion } from "src/components/commons/CustomAccordion/styles";
import { details } from "src/commons/routers";
import { API } from "src/commons/utils/api";
import useFetch from "src/commons/hooks/useFetch";

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
  const { data, loading } = useFetch<ScriptAssociatedAddress>(API.SCRIPTS.ASSOCIATED_ADDRESS(address));
  const theme = useTheme();
  const tabRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (data?.scriptType) setVersion(data?.scriptType);
  }, [data]);

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
    history.replace(details.smartContract(address, newExpanded ? panel : ""));
  };

  const tabs: TTab[] = [
    {
      key: "transactions",
      icon: UtxoIcon,
      label: <StyledTabName data-testid="sc.transaction">{t("glossary.transactions")}</StyledTabName>,
      children: <TabTransactions />
    },
    {
      key: "associated",
      icon: StyledAssociatedIcon,
      label: <StyledTabName data-testid="sc.AssociatedAddresses">{t("AssociatedAddresses")}</StyledTabName>,
      children: <TabAssociated data={data} loading={loading} />
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

  return (
    <StyledContractTabs ref={tabRef}>
      {tabs?.map(({ key, icon: Icon, label, children }, index) => (
        <StyledAccordion
          key={key}
          expanded={tabActive === key}
          customBorderRadius={needBorderRadius(key)}
          isDisplayBorderTop={tabActive !== key && key !== tabs[0].key && index !== indexExpand + 1}
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
        </StyledAccordion>
      ))}
    </StyledContractTabs>
  );
};

export default ContractTabs;
