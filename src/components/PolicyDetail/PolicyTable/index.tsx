import React from "react";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Tab } from "@mui/material";
import { Box } from "@mui/material";
import moment from "moment";
import { stringify } from "qs";
import { useHistory, useLocation, useParams } from "react-router-dom";
import useFetchList from "../../../commons/hooks/useFetchList";
import { details } from "../../../commons/routers";
import { ReactComponent as TokenIcon } from "../../../commons/resources/icons/tokenIcon.svg";
import { ReactComponent as AssetHolderIcon } from "../../../commons/resources/icons/assetHolder.svg";
import { formatADA, formatADAFull, getPageInfo, getShortHash, getShortWallet } from "../../../commons/utils/helper";
import Table, { Column } from "../../commons/Table";
import { LinkComponent, TitleTab } from "./styles";
import CustomTooltip from "../../commons/CustomTooltip";

enum TABS {
  TOKENS = "tokens",
  HOLDERS = "holders",
}

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
      <CustomTooltip title={r.fingerprint}>
        <LinkComponent to={details.token(r.fingerprint)}>{getShortHash(r.fingerprint)}</LinkComponent>
      </CustomTooltip>
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
    render: r => (
      <CustomTooltip title={formatADAFull(r?.supply ? +r.supply * 10 ** 6 : "")}>
        <Box component={"span"}>{formatADA(r?.supply ? +r.supply * 10 ** 6 : "")}</Box>
      </CustomTooltip>
    ),
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
      <CustomTooltip title={r.address}>
        <LinkComponent to={details.address(r.address)}>{getShortWallet(r.address || "")}</LinkComponent>
      </CustomTooltip>
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
      <CustomTooltip title={r.fingerprint}>
        <LinkComponent to={details.token(r.fingerprint)}>{getShortHash(r.fingerprint || "")}</LinkComponent>
      </CustomTooltip>
    ),
  },
  {
    title: "Balance",
    key: "Balance",
    minWidth: "150px",
    render: r => (
      <CustomTooltip title={formatADAFull(r?.quantity)}>
        <Box component={"span"}>{formatADA(r.quantity ? r.quantity * 10 ** 6 : "")}</Box>
      </CustomTooltip>
    ),
  },
];

const tabs: {
  label: React.ReactNode;
  key: TABS;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  columns: Column<PolicyHolder>[] | Column<TokenPolicys>[];
}[] = [
  {
    key: TABS.TOKENS,
    label: "Token",
    icon: TokenIcon,
    columns: columnsToken,
  },
  {
    key: TABS.HOLDERS,
    label: "Policy Asset Holders",
    icon: AssetHolderIcon,
    columns: columnsAssetHolders,
  },
];
const PolicyTable = () => {
  const [activeTab, setActiveTab] = React.useState<TABS>(TABS.TOKENS);

  const { policyId } = useParams<{ policyId: string }>();
  const { search } = useLocation();
  const history = useHistory();
  const pageInfo = getPageInfo(search);

  const handleChange = (event: React.SyntheticEvent, tab: TABS) => {
    setActiveTab(tab);
    history.push({ search: stringify({ page: 1, size: 10 }) });
  };

  const fetchData = useFetchList<PolicyHolder | TokenPolicys>(`/policy/${policyId}/${activeTab}`, pageInfo);

  return (
    <Box mt={4}>
      <TabContext value={activeTab}>
        <Box style={{ borderBottom: "1px solid rgba(24, 76, 120, 0.1)" }}>
          <TabList onChange={handleChange} TabIndicatorProps={{ style: { background: "#438f68" } }}>
            {tabs.map(({ icon: Icon, key, label }) => (
              <Tab
                key={key}
                value={key}
                label={
                  <Box>
                    <Box display={"flex"} alignItems="center">
                      <Icon fill={activeTab === key ? "#438F68" : "#98A2B3"} />
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
              total={{ title: "Total", count: fetchData.total }}
              pagination={{
                ...pageInfo,
                total: fetchData.total,
                onChange: (page, size) => history.push({ search: stringify({ page, size }) }),
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
