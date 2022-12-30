import React from "react";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Tab } from "@mui/material";
import { Box } from "@mui/material";
import moment from "moment";
import { parse, stringify } from "qs";
import { useHistory, useLocation, useParams } from "react-router-dom";

import useFetchList from "../../../commons/hooks/useFetchList";
import { details } from "../../../commons/routers";
import { ReactComponent as TokenIcon } from "../../../commons/resources/icons/tokenIcon.svg";
import { ReactComponent as AssetHolderIcon } from "../../../commons/resources/icons/assetHolder.svg";
import { formatADA, getShortHash, getShortWallet } from "../../../commons/utils/helper";
import Table, { Column } from "../../commons/Table";
import { LinkComponent, TitleTab } from "./styles";
import { Tooltip } from "@mui/material";

const PolicyTable = () => {
  const [activeTab, setActiveTab] = React.useState<"token" | "assetHolder">("token");

  const { policyId } = useParams<{ policyId: string }>();
  const history = useHistory();
  const { search } = useLocation();
  const query = parse(search.split("?")[1]);
  const setQuery = (query: any) => {
    history.push({ search: stringify(query) });
  };

  const handleChange = (event: React.SyntheticEvent, tab: "token" | "assetHolder") => {
    setActiveTab(tab);
    setQuery({ page: 1, size: 10 });
  };

  const {
    data: dataToken,
    initialized: initializedToken,
    loading: loadingToken,
    total: totalToken,
  } = useFetchList<TokenPolicys>(`/policy/${policyId}/tokens`, {
    page: query.page ? +query.page - 1 : 0,
    size: query.size ? (query.size as string) : 10,
  });

  const {
    data: dataHolder,
    initialized: initializedHolder,
    loading: loadingHolder,
    total: totalHolder,
  } = useFetchList<PolicyHolder>(`/policy/${policyId}/holders`, {
    page: query.page ? +query.page - 1 : 0,
    size: query.size ? (query.size as string) : 10,
  });

  const columnsToken: Column<TokenPolicys>[] = [
    {
      title: "Token Name",
      key: "tokenname",
      minWidth: "50px",
      render: r => <LinkComponent to={details.token(r.fingerprint)}>{r.displayName || r.name}</LinkComponent>,
    },
    {
      title: "Token ID",
      key: "id",
      minWidth: "100px",
      render: r => (
        <Tooltip placement="top" title={r.fingerprint}>
          <LinkComponent to={details.token(r.fingerprint)}>{getShortHash(r.fingerprint)}</LinkComponent>
        </Tooltip>
      ),
    },
    {
      title: "Created Date",
      key: "date",
      minWidth: "150px",
      render: r => moment(r.createdOn).format("MM/DD/YYYY hh:mm:ss"),
    },
    {
      title: "Total Supply",
      key: "totalSupply",
      minWidth: "150px",
      render: r => <>{formatADA(r?.supply ? +r.supply * 10 ** 6 : "")}</>,
    },
    {
      title: "Total Transactions",
      key: "trxtotal",
      minWidth: "150px",
      render: r => <>{r?.txCount ?? ""}</>,
    },
  ];

  const columnsAssetHolders: Column<PolicyHolder>[] = [
    {
      title: "Address",
      key: "address",
      minWidth: "50px",
      render: r => (
        <Tooltip placement="top" title={r.address}>
          <LinkComponent to={details.address(r.address)}>{getShortWallet(r.address || "")}</LinkComponent>
        </Tooltip>
      ),
    },
    {
      title: "Token name",
      key: "id",
      minWidth: "100px",
      render: r => <LinkComponent to={details.token(r.fingerprint)}>{r.tokenName || ""}</LinkComponent>,
    },
    {
      title: "Token id",
      key: "id",
      minWidth: "100px",
      render: r => (
        <Tooltip placement="top" title={r.fingerprint}>
          <LinkComponent to={details.token(r.fingerprint)}>{getShortHash(r.fingerprint || "")}</LinkComponent>
        </Tooltip>
      ),
    },
    {
      title: "Balance",
      key: "Balance",
      minWidth: "150px",
      render: r => <>{formatADA(r.quantity ? r.quantity * 10 ** 6 : "")}</>,
    },
  ];

  const tabs: { label: React.ReactNode; key: string; children: React.ReactNode }[] = [
    {
      label: (
        <Box>
          <Box display={"flex"} alignItems="center">
            <TokenIcon fill={activeTab === "token" ? "#438F68" : "#98A2B3"} />
            <TitleTab pl={1} active={activeTab === "token"}>
              Token
            </TitleTab>
          </Box>
        </Box>
      ),
      key: "token",
      children: (
        <Table
          columns={columnsToken}
          data={dataToken || []}
          loading={loadingToken}
          initialized={initializedToken}
          total={{ count: totalToken, title: "Total" }}
          pagination={{
            onChange: (page, size) => {
              setQuery({ page, size });
            },
            page: query.page ? +query.page - 1 : 0,
            total: totalToken,
          }}
        />
      ),
    },
    {
      label: (
        <Box>
          <Box display={"flex"} alignItems="center">
            <AssetHolderIcon fill={activeTab === "assetHolder" ? "#438F68" : "#98A2B3"} />
            <TitleTab pl={1} active={activeTab === "assetHolder"}>
              Policy Asset Holders
            </TitleTab>
          </Box>
        </Box>
      ),
      key: "assetHolder",
      children: (
        <Table
          columns={columnsAssetHolders}
          data={dataHolder || []}
          loading={loadingHolder}
          initialized={initializedHolder}
          total={{ count: totalHolder, title: "Total" }}
          pagination={{
            onChange: (page, size) => {
              setQuery({ page, size });
            },
            page: query.page ? +query.page - 1 : 0,
            total: totalHolder,
          }}
        />
      ),
    },
  ];

  return (
    <Box mt={4}>
      <TabContext value={activeTab}>
        <Box style={{ borderBottom: "1px solid rgba(24, 76, 120, 0.1)" }}>
          <TabList onChange={handleChange} TabIndicatorProps={{ style: { background: "#438f68" } }}>
            {tabs?.map(item => (
              <Tab key={item.key} label={item.label} value={item.key} />
            ))}
          </TabList>
        </Box>
        {tabs.map(item => (
          <TabPanel style={{ padding: 0 }} key={item.key} value={item.key}>
            {item.children}
          </TabPanel>
        ))}
      </TabContext>
    </Box>
  );
};

export default PolicyTable;
