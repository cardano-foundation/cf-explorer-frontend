import { Box } from "@mui/material";
import { StyledLink } from "../styles";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { stringify } from "qs";
import useFetchList from "../../../../commons/hooks/useFetchList";
import { getPageInfo, getShortHash, getShortWallet } from "../../../../commons/utils/helper";
import Table, { Column } from "../../../commons/Table";
import CustomTooltip from "../../../commons/CustomTooltip";
import moment from "moment";
import { details } from "../../../../commons/routers";

const columns: Column<DelegationHistory>[] = [
  {
    title: "Trx Hash",
    key: "hash",
    minWidth: "120px",
    render: r => (
      <CustomTooltip title={r.txHash || ""} placement="top">
        <StyledLink to={details.transaction(r.txHash)}>{getShortHash(r.txHash || "")}</StyledLink>
      </CustomTooltip>
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
        <StyledLink to={details.block(r.blockNo)}>{r.blockNo}</StyledLink>
        <Box marginTop="5px">
          <StyledLink to={details.epoch(r.epochNo)}>{r.epochNo}</StyledLink>/{r.epochSlotNo}
        </Box>
      </Box>
    ),
  },
  {
    title: "Pool ID",
    key: "poolId",
    minWidth: "120px",
    render: r => (
      <CustomTooltip title={r.poolId || ""} placement="top">
        <StyledLink to={details.delegation(r.poolId)}>{getShortHash(r.poolId || "")}</StyledLink>
      </CustomTooltip>
    ),
  },
  {
    title: "Pool Name",
    key: "poolName",
    minWidth: "120px",
    maxWidth: "200px",
    render: r => {
      let poolData: { name: string } = { name: "" };
      try {
        if (r.poolData) poolData = JSON.parse(r.poolData);
        console.log(poolData);
      } catch {}
      const name = poolData.name?.length > 30 ? getShortWallet(poolData.name) : poolData.name;
      return (
        <CustomTooltip title={poolData.name || r.poolId} placement="top">
          <StyledLink to={details.delegation(r.poolId)}>{name || `Pool (${getShortWallet(r.poolId)})`}</StyledLink>
        </CustomTooltip>
      );
    },
  },
];

const DelegationHistoryTab = () => {
  const { stakeId } = useParams<{ stakeId: string }>();
  const { search } = useLocation();
  const history = useHistory();
  const pageInfo = getPageInfo(search);

  const fetchData = useFetchList<DelegationHistory>(`/stake/${stakeId}/delegation-history`, pageInfo);

  return (
    <Table
      {...fetchData}
      columns={columns}
      total={{ title: "Total", count: fetchData.total }}
      pagination={{
        ...pageInfo,
        total: fetchData.total,
        onChange: (page, size) => history.push({ search: stringify({ tab: "delegation", page, size }) }),
      }}
      onClickRow={(e, r: DelegationHistory) => history.push(details.delegation(r.poolId))}
    />
  );
};

export default DelegationHistoryTab;
