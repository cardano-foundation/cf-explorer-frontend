import React from "react";
import { Tab, Box } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { ReactComponent as DelegationHistoryIcon } from "../../../commons/resources/icons/delegationHistory.svg";
import { ReactComponent as StateKeyHistoryIcon } from "../../../commons/resources/icons/stateKeyHistory.svg";
import { ReactComponent as WithdrawHistoryIcon } from "../../../commons/resources/icons/withdrawHistory.svg";
import { ReactComponent as InstantaneousHistoryIcon } from "../../../commons/resources/icons/instantaneousHistory.svg";
import { LabelStatus, StyledLink, TitleTab } from "./styles";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import { stringify } from "qs";
import useFetchList from "../../../commons/hooks/useFetchList";
import { formatADA, getPageInfo, getShortHash } from "../../../commons/utils/helper";
import Table, { Column } from "../../commons/Table";
import CustomTooltip from "../../commons/CustomTooltip";
import moment from "moment";
import { details } from "../../../commons/routers";
import { ADAToken } from "../../commons/Token";

const paths: { [key in TabStakeDetail]: string } = {
  delegation: "delegation-history",
  stakeKey: "stake-history",
  withdrawal: "withdrawal-history",
  instantaneous: "instantaneous-rewards",
};

type DataTable = DelegationHistory | Instantaneous | StakeHistory | WithdrawalHistory;
type TabStakeColumns = {
  [key in TabStakeDetail]: Column<any>[];
};

interface ColumnProps extends TabStakeColumns {
  delegation: Column<DelegationHistory>[];
  stakeKey: Column<StakeHistory>[];
  withdrawal: Column<WithdrawalHistory>[];
  instantaneous: Column<Instantaneous>[];
}

const delegation: Column<DelegationHistory>[] = [
  {
    title: "Trx Hash",
    key: "hash",
    minWidth: "120px",
    render: r => (
      <Link to={details.transaction(r.txHash)}>
        <CustomTooltip title={r.txHash || ""} placement="top">
          <Box fontFamily={"Helvetica, monospace"} color={props => props.colorBlue}>
            {getShortHash(r.txHash || "")}
          </Box>
        </CustomTooltip>
      </Link>
    ),
  },
  {
    title: "Time",
    key: "time",
    minWidth: "120px",
    render: r => moment(r.time).format("MM/DD/YYYY hh:mm:ss"),
  },
  {
    title: "Block",
    key: "block",
    minWidth: "120px",
    render: r => (
      <Box>
        <Link to={details.block(r.blockNo)}>
          <Box fontFamily={"Helvetica, monospace"} color={props => props.colorBlue}>
            {r.blockNo}
          </Box>
        </Link>
        <Box fontFamily={"Helvetica, monospace"}>
          <Link to={details.epoch(r.epochNo)}>
            <Box component={"span"} fontFamily={"Helvetica, monospace"} color={props => props.colorBlue}>
              {r.epochNo}
            </Box>
          </Link>
          /{r.epochSlotNo}
        </Box>
      </Box>
    ),
  },
  {
    title: "Pool ID",
    key: "poolId",
    minWidth: "120px",
    render: r => (
      <Link to={details.delegation(r.poolId)}>
        <CustomTooltip title={r.poolId || ""} placement="top">
          <Box fontFamily={"Helvetica, monospace"} color={props => props.colorBlue}>
            {getShortHash(r.poolId || "")}
          </Box>
        </CustomTooltip>
      </Link>
    ),
  },
  {
    title: "Pool Name",
    key: "poolName",
    minWidth: "120px",
    maxWidth: "200px",
    render: r => {
      let poolData: { description: string; homepage: string; name: string; ticker: string } | undefined;
      try {
        poolData = JSON.parse(r.poolData);
        console.log(poolData);
      } catch {}
      if (!poolData) return null;
      return (
        <StyledLink to={details.delegation(r.poolId)}>
          <CustomTooltip title={poolData.name}>
            <Box>{poolData.name?.length > 30 ? getShortHash(poolData.name) : poolData.name}</Box>
          </CustomTooltip>
        </StyledLink>
      );
    },
  },
];
const stakeKey: Column<StakeHistory>[] = [
  {
    title: "Trx Hash",
    key: "hash",
    minWidth: "120px",
    render: r => (
      <Link to={details.transaction(r.txHash)}>
        <CustomTooltip title={r.txHash || ""} placement="top">
          <Box fontFamily={"Helvetica, monospace"} color={props => props.colorBlue}>
            {getShortHash(r.txHash || "")}
          </Box>
        </CustomTooltip>
      </Link>
    ),
  },
  {
    title: "Time",
    key: "time",
    minWidth: "120px",
    render: r => moment(r.time).format("MM/DD/YYYY hh:mm:ss"),
  },
  {
    title: "Block",
    key: "block",
    minWidth: "120px",
    render: r => (
      <Box>
        <Link to={details.block(r.blockNo)}>
          <Box fontFamily={"Helvetica, monospace"} color={props => props.colorBlue}>
            {r.blockNo}
          </Box>
        </Link>
        <Box fontFamily={"Helvetica, monospace"}>
          <Link to={details.epoch(r.epochNo)}>
            <Box component={"span"} fontFamily={"Helvetica, monospace"} color={props => props.colorBlue}>
              {r.epochNo}
            </Box>
          </Link>
          /{r.epochSlotNo}
        </Box>
      </Box>
    ),
  },
  {
    title: "Action",
    key: "action",
    minWidth: "120px",
    render: r => (
      <LabelStatus
        color={props => (r.action === "Registered" ? props.colorRed : props.textColorPale)}
        style={{ background: r.action === "Registered" ? "rgba(221, 67, 67, 0.2)" : "rgba(102, 112, 133, 0.2" }}
      >
        {r.action ? r.action.split(" ").join("") : ""}
      </LabelStatus>
    ),
  },
];
const withdrawal: Column<WithdrawalHistory>[] = [
  {
    title: "Trx Hash",
    key: "hash",
    minWidth: "120px",
    render: r => (
      <Link to={details.transaction(r.txHash)}>
        <CustomTooltip title={r.txHash || ""} placement="top">
          <Box fontFamily={"Helvetica, monospace"} color={props => props.colorBlue}>
            {getShortHash(r.txHash || "")}
          </Box>
        </CustomTooltip>
      </Link>
    ),
  },
  {
    title: "Time",
    key: "time",
    minWidth: "120px",
    render: r => moment(r.time).format("MM/DD/YYYY hh:mm:ss"),
  },
  {
    title: "Block",
    key: "block",
    minWidth: "120px",
    render: r => (
      <Box>
        <Link to={details.block(r.blockNo)}>
          <Box fontFamily={"Helvetica, monospace"} color={props => props.colorBlue}>
            {r.blockNo}
          </Box>
        </Link>
        <Box fontFamily={"Helvetica, monospace"}>
          <Link to={details.epoch(r.epochNo)}>
            <Box component={"span"} fontFamily={"Helvetica, monospace"} color={props => props.colorBlue}>
              {r.epochNo}
            </Box>
          </Link>
          /{r.epochSlotNo}
        </Box>
      </Box>
    ),
  },
  {
    title: "Amount",
    key: "amount",
    minWidth: "120px",
    render: r => (
      <>
        {formatADA(r.amount)} <ADAToken />
      </>
    ),
  },
];
const instantaneous: Column<Instantaneous>[] = [
  {
    title: "Trx Hash",
    key: "hash",
    minWidth: "120px",
    render: r => (
      <Link to={details.transaction(r.txHash)}>
        <CustomTooltip title={r.txHash || ""} placement="top">
          <Box fontFamily={"Helvetica, monospace"} color={props => props.colorBlue}>
            {getShortHash(r.txHash || "")}
          </Box>
        </CustomTooltip>
      </Link>
    ),
  },
  {
    title: "Time",
    key: "time",
    minWidth: "120px",
    render: r => moment(r.time).format("MM/DD/YYYY hh:mm:ss"),
  },
  {
    title: "Block",
    key: "block",
    minWidth: "120px",
    render: r => (
      <Box>
        <Link to={details.block(r.blockNo)}>
          <Box fontFamily={"Helvetica, monospace"} color={props => props.colorBlue}>
            {r.blockNo}
          </Box>
        </Link>
        <Box fontFamily={"Helvetica, monospace"}>
          <Link to={details.epoch(r.epochNo)}>
            <Box component={"span"} fontFamily={"Helvetica, monospace"} color={props => props.colorBlue}>
              {r.epochNo}
            </Box>
          </Link>
          /{r.epochSlotNo}
        </Box>
      </Box>
    ),
  },
  {
    title: "Reward Paid",
    key: "rewardPaid",
    minWidth: "120px",
    render: r => (
      <>
        {formatADA(r.amount)} <ADAToken />
      </>
    ),
  },
];

const columns: ColumnProps = {
  delegation,
  stakeKey,
  withdrawal,
  instantaneous,
};

const tabs: {
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  label: React.ReactNode;
  key: TabStakeDetail;
}[] = [
  {
    icon: DelegationHistoryIcon,
    label: "Delegation History",
    key: "delegation",
  },
  {
    icon: StateKeyHistoryIcon,
    label: "Stake Key History",
    key: "stakeKey",
  },
  {
    icon: WithdrawHistoryIcon,
    label: "Withdrawal History",
    key: "withdrawal",
  },
  {
    icon: InstantaneousHistoryIcon,
    label: "Instantaneous Rewards",
    key: "instantaneous",
  },
];

const StakeTab = () => {
  const [activeTab, setActiveTab] = React.useState<TabStakeDetail>("delegation");
  const { stakeId } = useParams<{ stakeId: string }>();
  const { search } = useLocation();
  const history = useHistory();
  const pageInfo = getPageInfo(search);

  const fetchData = useFetchList<DataTable>(`/stake/${stakeId}/${paths[activeTab]}`, pageInfo);

  const handleChange = (event: React.SyntheticEvent, tab: TabStakeDetail) => {
    setActiveTab(tab);
    history.push({ search: stringify({ page: 1, size: 10 }) });
  };

  const openDetail = (e: React.MouseEvent<Element, MouseEvent>, r: DataTable) => {
    switch (activeTab) {
      case "delegation": {
        return history.push(details.delegation((r as DelegationHistory).poolId));
      }
      default:
        return history.push(details.delegation((r as DelegationHistory).poolId));
    }
  };

  return (
    <Box mt={4}>
      <TabContext value={activeTab}>
        <Box style={{ borderBottom: "1px solid rgba(24, 76, 120, 0.1)" }}>
          <TabList onChange={handleChange} TabIndicatorProps={{ style: { background: "#438f68" } }}>
            {tabs?.map(({ icon: Icon, key, label }) => (
              <Tab
                key={key}
                value={key}
                label={
                  <Box>
                    <Box display={"flex"} alignItems="center">
                      <Icon fill={key === activeTab ? "#438F68" : "#98A2B3"} />
                      <TitleTab pl={1} active={key === activeTab}>
                        {label}
                      </TitleTab>
                    </Box>
                  </Box>
                }
              />
            ))}
          </TabList>
        </Box>
        {tabs.map(item => (
          <TabPanel key={item.key} value={item.key}>
            <Table
              {...fetchData}
              columns={columns[activeTab]}
              total={{ title: "Total Epochs", count: fetchData.total }}
              pagination={{
                ...pageInfo,
                total: fetchData.total,
                onChange: (page, size) => history.push({ search: stringify({ page, size }) }),
              }}
              onClickRow={openDetail}
            />
          </TabPanel>
        ))}
      </TabContext>
    </Box>
  );
};

export default StakeTab;
