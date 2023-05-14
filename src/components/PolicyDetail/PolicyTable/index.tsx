import React from 'react';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Tab, useTheme } from '@mui/material';
import { stringify } from 'qs';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import useFetchList from '../../../commons/hooks/useFetchList';
import { details } from '../../../commons/routers';
import { ReactComponent as TokenIcon } from '../../../commons/resources/icons/tokenIcon.svg';
import { ReactComponent as AssetHolderIcon } from '../../../commons/resources/icons/assetHolder.svg';
import { formatDateTimeLocal, getPageInfo, getShortWallet, numberWithCommas } from '../../../commons/utils/helper';
import Table, { Column } from '../../commons/Table';
import { LinkComponent, TitleTab } from './styles';
import CustomTooltip from '../../commons/CustomTooltip';
import { API } from '../../../commons/utils/api';

enum TABS {
  TOKENS = 'tokens',
  HOLDERS = 'holders'
}

const columnsToken: Column<TokenPolicys>[] = [
  {
    title: 'Token Name',
    key: 'tokenname',
    minWidth: '50px',
    render: (r) => <LinkComponent to={details.token(r.fingerprint)}>{r.displayName || r.name}</LinkComponent>
  },
  {
    title: 'Token ID',
    key: 'id',
    minWidth: '100px',
    render: (r) => (
      <CustomTooltip title={r.fingerprint}>
        <LinkComponent to={details.token(r.fingerprint)}>{getShortWallet(r.fingerprint)}</LinkComponent>
      </CustomTooltip>
    )
  },
  {
    title: 'Created Date',
    key: 'date',
    minWidth: '150px',
    render: (r) => formatDateTimeLocal(r.createdOn || '')
  },
  {
    title: 'Total Supply',
    key: 'totalSupply',
    minWidth: '150px',
    render: (r) => <Box component={'span'}>{numberWithCommas(r.supply)}</Box>
  },
  {
    title: 'Total Transactions',
    key: 'trxtotal',
    minWidth: '150px',
    render: (r) => <>{r?.txCount ?? ''}</>
  }
];

const columnsAssetHolders: Column<PolicyHolder>[] = [
  {
    title: 'Address',
    key: 'address',
    minWidth: '50px',
    render: (r) => (
      <CustomTooltip title={r.address}>
        <LinkComponent to={details.address(r.address)}>{getShortWallet(r.address || '')}</LinkComponent>
      </CustomTooltip>
    )
  },
  {
    title: 'Token name',
    key: 'id',
    minWidth: '100px',
    render: (r) => <LinkComponent to={details.token(r.fingerprint)}>{r.displayName || ''}</LinkComponent>
  },
  {
    title: 'Token ID',
    key: 'id',
    minWidth: '100px',
    render: (r) => (
      <CustomTooltip title={r.fingerprint}>
        <LinkComponent to={details.token(r.fingerprint)}>{getShortWallet(r.fingerprint || '')}</LinkComponent>
      </CustomTooltip>
    )
  },
  {
    title: 'Balance',
    key: 'Balance',
    minWidth: '150px',
    render: (r) => <Box component={'span'}>{numberWithCommas(r.quantity)}</Box>
  }
];

const tabs: {
  label: React.ReactNode;
  key: TABS;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  columns: Column<PolicyHolder>[] | Column<TokenPolicys>[];
}[] = [
  {
    key: TABS.TOKENS,
    label: 'Token',
    icon: TokenIcon,
    columns: columnsToken
  },
  {
    key: TABS.HOLDERS,
    label: 'Policy Asset Holders',
    icon: AssetHolderIcon,
    columns: columnsAssetHolders
  }
];
const PolicyTable = () => {
  const [activeTab, setActiveTab] = React.useState<TABS>(TABS.TOKENS);
  const theme = useTheme();
  const { policyId } = useParams<{ policyId: string }>();
  const { search } = useLocation();
  const history = useHistory();
  const pageInfo = getPageInfo(search);

  const handleChange = (event: React.SyntheticEvent, tab: TABS) => {
    setActiveTab(tab);
    history.push({ search: stringify({ page: 1, size: 10 }) });
  };

  const fetchData = useFetchList<PolicyHolder | TokenPolicys>(`${API.POLICY}/${policyId}/${activeTab}`, pageInfo);

  return (
    <Box mt={4}>
      <TabContext value={activeTab}>
        <Box style={{ borderBottom: `1px solid ${theme.palette.border.secondary}` }}>
          <TabList onChange={handleChange} TabIndicatorProps={{ style: { background: theme.palette.primary.main } }}>
            {tabs.map(({ icon: Icon, key, label }) => (
              <Tab
                key={key}
                value={key}
                label={
                  <Box>
                    <Box display={'flex'} alignItems='center'>
                      <Icon fill={activeTab === key ? theme.palette.primary.main : theme.palette.text.hint} />
                      <TitleTab pl={1} active={activeTab === key}>
                        {label}
                      </TitleTab>
                    </Box>
                  </Box>
                }
              />
            ))}
          </TabList>
        </Box>
        {tabs.map(({ key, columns }) => (
          <TabPanel style={{ padding: 0 }} key={key} value={key}>
            <Table
              {...fetchData}
              columns={columns}
              total={{ title: 'Total', count: fetchData.total }}
              pagination={{
                ...pageInfo,
                total: fetchData.total,
                onChange: (page, size) => history.push({ search: stringify({ page, size }) })
              }}
              onClickRow={(_, r: PolicyHolder | TokenPolicys) => history.push(details.token(r.fingerprint))}
            />
          </TabPanel>
        ))}
      </TabContext>
    </Box>
  );
};

export default PolicyTable;
