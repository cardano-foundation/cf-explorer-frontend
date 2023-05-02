import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";

import Card from "../../commons/Card";
import TokenTransaction from "./TokenTransaction";

import { StyledSelect, TitleTab } from "./styles";
import TokenTopHolder from "./TokenTopHolder";
import TokenMinting from "./TokenMinting";
import { Box, MenuItem, Tab } from "@mui/material";
import { BiChevronDown } from "react-icons/bi";
import { stringify } from "qs";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { details } from "../../../commons/routers";

interface ITokenTableData {
  totalSupply?: number;
}

interface IMappingvalue {
  [key: string]: {
    title: string;
    component: React.ReactNode;
  };
}

const TokenTableData: React.FC<ITokenTableData> = ({ totalSupply }) => {
  const [type, setType] = useState<string>("transactions");
  const history = useHistory();
  let { tabActive = "transactions", tokenId } = useParams<{ tabActive: keyof Transaction; tokenId: string }>();

  const tabs: {
    key: string;
    label: string;
    children: React.ReactNode;
  }[] = [
    {
      key: "transactions",
      label: "Transactions",
      children: <TokenTransaction tokenId={tokenId} active={type === "transactions"} />,
    },
    {
      key: "topHolders",
      label: "Top Holders",
      children: <TokenTopHolder tokenId={tokenId} active={type === "topHolders"} totalSupply={totalSupply} />,
    },
    {
      key: "tokenMint",
      label: "Token Mint",
      children: <TokenMinting tokenId={tokenId} active={type === "minting"} />,
    },
  ];

  const handleChange = (event: React.SyntheticEvent, tab: keyof Transaction) => {
    history.push(details.token(tokenId, tab));
  };
  return (
    <TabContext value={tabActive}>
      <TabList
        onChange={handleChange}
        TabIndicatorProps={{
          sx: { background: theme => theme.palette.primary.main, color: theme => theme.palette.primary.main },
        }}
      >
        {tabs?.map(({ key, label }) => (
          <Tab
            key={key}
            value={key}
            style={{ padding: "12px 0px", marginRight: 40 }}
            label={
              <Box display={"flex"} alignItems="center">
                <TitleTab pl={1} active={key === tabActive}>
                  {label}
                </TitleTab>
              </Box>
            }
          />
        ))}
      </TabList>
      {tabs.map(item => (
        <TabPanel key={item.key} value={item.key} style={{ padding: 0, paddingTop: 12 }}>
          {item.children}
        </TabPanel>
      ))}
    </TabContext>
  );
};

export default TokenTableData;
