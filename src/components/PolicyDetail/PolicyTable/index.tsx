import React, { useEffect } from "react";
import { TabContext, TabPanel } from "@mui/lab";
import { Box, Tab, useTheme } from "@mui/material";
import { stringify } from "qs";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import useFetchList from "src/commons/hooks/useFetchList";
import { API } from "src/commons/utils/api";
import {
  formatAmount,
  formatDateTimeLocal,
  formatNumberDivByDecimals,
  getPageInfo,
  getShortWallet
} from "src/commons/utils/helper";
import CustomTooltip from "src/components/commons/CustomTooltip";
import Table, { Column } from "src/components/commons/Table";
import { AssetHolderIcon, TokenIcon } from "src/commons/resources";
import { details } from "src/commons/routers";
import FormNowMessage from "src/components/commons/FormNowMessage";

import { LinkComponent, StyledBoxContainer, StyledTabList, TimeDuration, TitleTab } from "./styles";

enum TABS {
  TOKENS = "tokens",
  HOLDERS = "holders"
}

const PolicyTable = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = React.useState<TABS>(TABS.TOKENS);
  const theme = useTheme();
  const { policyId } = useParams<{ policyId: string }>();
  const { search } = useLocation();
  const history = useHistory();
  const pageInfo = getPageInfo(search);
  const blockKey = useSelector(({ system }: RootState) => system.blockKey);

  const resetFilter = () => {
    history.replace({ search: stringify({ page: 1, size: 50 }) });
  };

  const handleChange = (event: React.SyntheticEvent, tab: TABS) => {
    setActiveTab(tab);
    resetFilter();
  };

  useEffect(() => {
    resetFilter();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const columnsToken: Column<TokenPolicys>[] = [
    {
      title: t("common.tokenName"),
      key: "tokenname",
      minWidth: "50px",
      render: (r) => <LinkComponent to={details.token(r.fingerprint)}>{r.displayName || r.name}</LinkComponent>
    },
    {
      title: t("common.tokenID"),
      key: "id",
      minWidth: "100px",
      render: (r) => (
        <CustomTooltip title={r.fingerprint}>
          <LinkComponent to={details.token(r.fingerprint)}>{getShortWallet(r.fingerprint || "")}</LinkComponent>
        </CustomTooltip>
      )
    },
    {
      title: t("createdAt"),
      key: "date",
      minWidth: "150px",
      render: (r) => formatDateTimeLocal(r.createdOn || "")
    },
    {
      title: t("common.totalSupply"),
      key: "totalSupply",
      minWidth: "150px",
      render: (r) => {
        const decimalToken = r?.metadata?.decimals || 0;
        return <Box component={"span"}>{formatNumberDivByDecimals(r?.supply, decimalToken)}</Box>;
      }
    },
    {
      title: t("common.totalTxs"),
      key: "trxtotal",
      minWidth: "150px",
      render: (r) => <>{formatAmount(r?.txCount || "")}</>
    }
  ];

  const columnsAssetHolders: Column<PolicyHolder>[] = [
    {
      title: t("common.address"),
      key: "address",
      minWidth: "50px",
      render: (r) => (
        <CustomTooltip title={r.address}>
          <LinkComponent to={details.address(r.address)}>{getShortWallet(r.address || "")}</LinkComponent>
        </CustomTooltip>
      )
    },
    {
      title: t("common.tokenName"),
      key: "id",
      minWidth: "100px",
      render: (r) => <LinkComponent to={details.token(r.fingerprint)}>{r.displayName || ""}</LinkComponent>
    },
    {
      title: t("common.tokenID"),
      key: "id",
      minWidth: "100px",
      render: (r) => (
        <CustomTooltip title={r.fingerprint}>
          <LinkComponent to={details.token(r.fingerprint)}>{getShortWallet(r.fingerprint || "")}</LinkComponent>
        </CustomTooltip>
      )
    },
    {
      title: t("common.balance"),
      key: "Balance",
      minWidth: "150px",
      render: (r) => <Box component={"span"}>{formatNumberDivByDecimals(r.quantity, r?.metadata?.decimals || 0)}</Box>
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
      label: t("glossary.Token"),
      icon: TokenIcon,
      columns: columnsToken
    },
    {
      key: TABS.HOLDERS,
      label: t("common.policyAssetHolders"),
      icon: AssetHolderIcon,
      columns: columnsAssetHolders
    }
  ];
  const tokenFetchData = useFetchList<TokenPolicys>(
    activeTab === TABS.TOKENS ? `${API.POLICY}/${policyId}/${TABS.TOKENS}` : "",
    pageInfo
  );

  const holderFetchData = useFetchList<PolicyHolder>(
    activeTab === TABS.HOLDERS ? `${API.POLICY}/${policyId}/${TABS.HOLDERS}` : "",
    pageInfo,
    false,
    blockKey
  );

  const fetchData = activeTab === TABS.TOKENS ? tokenFetchData : holderFetchData;

  return (
    <StyledBoxContainer>
      <TabContext value={activeTab}>
        <Box data-testid="tab-testid" style={{ borderBottom: `1px solid ${theme.palette.primary[200]}` }}>
          <StyledTabList
            onChange={handleChange}
            TabIndicatorProps={{ style: { background: theme.palette.primary.main } }}
          >
            {tabs.map(({ icon: Icon, key, label }) => (
              <Tab
                key={key}
                value={key}
                label={
                  <Box>
                    <Box display={"flex"} alignItems="center">
                      <Icon fill={activeTab === key ? theme.palette.primary.main : theme.palette.secondary.light} />
                      <TitleTab pl={1} active={+(activeTab === key)}>
                        {label}
                      </TitleTab>
                    </Box>
                  </Box>
                }
              />
            ))}
          </StyledTabList>
        </Box>
        {tabs.map(({ key, columns }) => (
          <TabPanel style={{ padding: 0 }} key={key} value={key}>
            {key === TABS.HOLDERS ? (
              <TimeDuration>
                <FormNowMessage time={holderFetchData.lastUpdated} />
              </TimeDuration>
            ) : (
              ""
            )}
            <Table
              {...fetchData}
              columns={columns}
              total={{ title: "Total", count: fetchData.total }}
              pagination={{
                ...pageInfo,
                total: fetchData.total,
                onChange: (page, size) => history.replace({ search: stringify({ page, size }) })
              }}
              onClickRow={(_, r: PolicyHolder | TokenPolicys) => history.push(details.token(r.fingerprint))}
            />
          </TabPanel>
        ))}
      </TabContext>
    </StyledBoxContainer>
  );
};

export default PolicyTable;
