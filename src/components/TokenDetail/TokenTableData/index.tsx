import React, { useRef } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Box, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import { IoIosArrowDown } from "react-icons/io";

import { details } from "src/commons/routers";
import { UnionTokenIcon, PeopleIcon, TransactionIcon, MetadataIcon } from "src/commons/resources";
import { CustomAccordion } from "src/components/share/styled";

import TokenTransaction from "./TokenTransaction";
import TokenTopHolder from "./TokenTopHolder";
import TokenMinting from "./TokenMinting";
import TokenMetaData from "./TokenMetadata";
import { TitleTab } from "./styles";

interface ITokenTableData {
  totalSupply?: number;
  metadata?: ITokenMetadata;
  metadataJson?: string;
  setCurrentHolder?: (holders: number) => void;
}

const TokenTableData: React.FC<ITokenTableData> = ({ totalSupply, metadata, metadataJson, setCurrentHolder }) => {
  const { t } = useTranslation();
  const tabRef = useRef<HTMLDivElement>(null);
  const history = useHistory();
  const { tabActive, tokenId } = useParams<{
    tabActive: keyof Transaction | "topHolders";
    tokenId: string;
  }>();
  const theme = useTheme();

  const tabs: {
    key: string;
    label: string;
    children: React.ReactNode;
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
  }[] = [
    {
      key: "transactions",
      label: t("glossary.transactions"),
      children: <TokenTransaction tokenId={tokenId} />,
      icon: TransactionIcon
    },
    {
      key: "topHolders",
      label: t("glossary.topHolders"),
      children: (
        <TokenTopHolder
          tokenId={tokenId}
          totalSupply={totalSupply}
          decimal={metadata?.decimals}
          setCurrentHolder={setCurrentHolder}
        />
      ),
      icon: PeopleIcon
    },
    {
      key: "tokenMint",
      label: t("tab.minting"),
      children: <TokenMinting tokenId={tokenId} metadata={metadata} />,
      icon: UnionTokenIcon
    },
    {
      key: "metadata",
      label: t("glossary.metadata"),
      children: <TokenMetaData metadataJson={metadataJson} />,
      icon: MetadataIcon
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
    history.replace(details.token(tokenId, newExpanded ? panel : ""));
  };

  return (
    <Box ref={tabRef} mt={"30px"}>
      {tabs.map(({ key, icon: Icon, label, children }, index) => (
        <CustomAccordion
          key={key}
          expanded={tabActive === key}
          customBorderRadius={needBorderRadius(key)}
          isDisplayBorderTop={tabActive !== key && key !== tabs[0].key && index !== indexExpand + 1}
          onChange={handleChangeTab(key)}
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
          <AccordionDetails>{children}</AccordionDetails>
        </CustomAccordion>
      ))}
    </Box>
  );
};

export default TokenTableData;
