import React from 'react';
import { useHistory, useParams } from 'react-router-dom';

import TokenTransaction from './TokenTransaction';

import { TitleTab } from './styles';
import TokenTopHolder from './TokenTopHolder';
import TokenMinting from './TokenMinting';
import { Box, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { details } from '../../../commons/routers';

interface ITokenTableData {
  totalSupply?: number;
}

const TokenTableData: React.FC<ITokenTableData> = ({ totalSupply }) => {
  const history = useHistory();
  const { tabActive = 'transactions', tokenId } = useParams<{ tabActive: keyof Transaction; tokenId: string }>();

  const tabs: {
    key: string;
    label: string;
    children: React.ReactNode;
  }[] = [
    {
      key: 'transactions',
      label: 'Transactions',
      children: <TokenTransaction tokenId={tokenId} />
    },
    {
      key: 'topHolders',
      label: 'Top Holders',
      children: <TokenTopHolder tokenId={tokenId} totalSupply={totalSupply} />
    },
    {
      key: 'tokenMint',
      label: 'Minting',
      children: <TokenMinting tokenId={tokenId} />
    }
  ];

  const handleChange = (event: React.SyntheticEvent, tab: keyof Transaction) => {
    history.push(details.token(tokenId, tab));
  };
  return (
    <TabContext value={tabActive}>
      <TabList
        onChange={handleChange}
        TabIndicatorProps={{
          sx: { background: (theme) => theme.palette.primary.main, color: (theme) => theme.palette.primary.main }
        }}
      >
        {tabs?.map(({ key, label }) => (
          <Tab
            key={key}
            value={key}
            style={{ padding: '12px 0px', marginRight: 40 }}
            label={
              <Box display={'flex'} alignItems='center'>
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
