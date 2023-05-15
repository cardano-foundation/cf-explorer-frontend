import React from "react";
import { useHistory, useParams } from "react-router-dom";

import TokenTransaction from "./TokenTransaction";

import { TitleTab } from "./styles";
import TokenTopHolder from "./TokenTopHolder";
import TokenMinting from "./TokenMinting";
import { Box, Tab, useTheme } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { details } from "../../../commons/routers";
import { UnionTokenIcon, PeopleIcon, TransactionIcon } from "../../../commons/resources";
import CustomIcon from "../../commons/CustomIcon";

interface ITokenTableData {
  totalSupply?: number;
}

const TokenTableData: React.FC<ITokenTableData> = ({ totalSupply }) => {
  const history = useHistory();
  const { tabActive = "transactions", tokenId } = useParams<{ tabActive: keyof Transaction; tokenId: string }>();
  const theme = useTheme();
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
      icon: <CustomIcon icon={TransactionIcon} width={20} fill={theme.palette.grey[300]} />
    },
    {
      key: "topHolders",
      label: "Top Holders",
      children: <TokenTopHolder tokenId={tokenId} totalSupply={totalSupply} />,
      icon: <PeopleIcon />
    },
    {
      key: "tokenMint",
      label: "Minting",
      children: <TokenMinting tokenId={tokenId} />,
      icon: <UnionTokenIcon />
    }
  ];

  const handleChange = (event: React.SyntheticEvent, tab: keyof Transaction) => {
    history.push(details.token(tokenId, tab));
  };
  return (
    <TabContext value={tabActive}>
      <TabList
        onChange={handleChange}
        variant='scrollable'
        TabIndicatorProps={{
          sx: { background: (theme) => theme.palette.primary.main, color: (theme) => theme.palette.primary.main }
        }}
      >
        {tabs?.map(({ key, label, icon }) => (
          <Tab
            key={key}
            value={key}
            style={{ padding: "12px 0px", marginRight: 40 }}
            icon={icon}
            iconPosition='start'
            label={
              <Box display={"flex"} alignItems='center'>
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
