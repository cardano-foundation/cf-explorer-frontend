import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { Box, Tab, useTheme } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";

import { useScreen } from "src/commons/hooks/useScreen";

import TokenTransaction from "./TokenTransaction";
import { TitleTab } from "./styles";
import TokenTopHolder from "./TokenTopHolder";
import TokenMinting from "./TokenMinting";
import TokenMetaData from "./TokenMetadata";
import { details } from "../../../commons/routers";
import { UnionTokenIcon, PeopleIcon, TransactionIcon, MetadataIcon } from "../../../commons/resources";
import CustomIcon from "../../commons/CustomIcon";

interface ITokenTableData {
  totalSupply?: number;
  metadata?: ITokenMetadata;
  metadataJson?: string;
}

const TokenTableData: React.FC<ITokenTableData> = ({ totalSupply, metadata, metadataJson }) => {
  const history = useHistory();
  const { tabActive = "transactions", tokenId } = useParams<{
    tabActive: keyof Transaction | "topHolders";
    tokenId: string;
  }>();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const theme = useTheme();
  const { isTablet, isMobile } = useScreen();
  const tabs: {
    key: string;
    label: string;
    children: React.ReactNode;
    icon: React.ReactElement;
  }[] = [
    {
      key: "transactions",
      label: "Transactions",
      children: <TokenTransaction tokenId={tokenId} />,
      icon: <CustomIcon icon={TransactionIcon} width={20} fill="currentColor" />
    },
    {
      key: "topHolders",
      label: "Top Holders",
      children: <TokenTopHolder tokenId={tokenId} totalSupply={totalSupply} decimal={metadata?.decimals} />,
      icon: <CustomIcon icon={PeopleIcon} width={20} fill="currentColor" />
    },
    {
      key: "tokenMint",
      label: "Minting",
      children: <TokenMinting tokenId={tokenId} metadata={metadata} />,
      icon: <CustomIcon icon={UnionTokenIcon} width={20} fill="currentColor" />
    },
    {
      key: "metadata",
      label: "Metadata",
      children: <TokenMetaData metadataJson={metadataJson} />,
      icon: <CustomIcon icon={MetadataIcon} width={20} fill="currentColor" />
    }
  ];

  const handleChange = (event: React.SyntheticEvent, tab: keyof Transaction) => {
    history.replace(details.token(tokenId, tab));
  };
  return (
    <TabContext value={tabActive}>
      <TabList
        onChange={handleChange}
        variant="scrollable"
        TabIndicatorProps={{
          sx: {
            background: (theme) => theme.palette.primary.main,
            color: (theme) => theme.palette.primary.main,
            height: 3
          }
        }}
        sx={({ palette }) =>
          isTablet
            ? { borderBottom: `1px solid ${palette.primary[200]}`, width: isMobile ? "calc(100% - 30px)" : "auto" }
            : {}
        }
      >
        {tabs?.map(({ key, label, icon }) => (
          <Tab
            key={key}
            value={key}
            style={{ padding: "12px 0px", marginRight: 40, minHeight: 50 }}
            iconPosition="start"
            label={
              <Box
                display={"flex"}
                alignItems="center"
                color={tabActive === key ? theme.palette.primary.main : theme.palette.secondary[600]}
              >
                {icon}
                <TitleTab pl={1} active={key === tabActive}>
                  {label}
                </TitleTab>
              </Box>
            }
          />
        ))}
      </TabList>
      {tabs.map((item) => (
        <TabPanel key={item.key} value={item.key} style={{ padding: 0, paddingTop: 12 }}>
          {item.children}
        </TabPanel>
      ))}
    </TabContext>
  );
};

export default TokenTableData;
