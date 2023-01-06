import { Box } from "@mui/material";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { stringify } from "qs";
import useFetchList from "../../../../commons/hooks/useFetchList";
import { formatADA, getPageInfo, getShortHash } from "../../../../commons/utils/helper";
import Table, { Column } from "../../../commons/Table";
import CustomTooltip from "../../../commons/CustomTooltip";
import moment from "moment";
import { details } from "../../../../commons/routers";
import { ADAToken } from "../../../commons/Token";
import { StyledLink } from "../styles";

const columns: Column<WithdrawalHistory>[] = [
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
        <Box marginTop="10px">
          <StyledLink to={details.epoch(r.epochNo)}>{r.epochNo}</StyledLink>/{r.epochSlotNo}
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

const WithdrawalHistoryTab = () => {
  const { stakeId } = useParams<{ stakeId: string }>();
  const { search } = useLocation();
  const history = useHistory();
  const pageInfo = getPageInfo(search);

  const fetchData = useFetchList<WithdrawalHistory>(`/stake/${stakeId}/withdrawal-history`, pageInfo);

  return (
    <Table
      {...fetchData}
      columns={columns}
      total={{ title: "Total", count: fetchData.total }}
      pagination={{
        ...pageInfo,
        total: fetchData.total,
        onChange: (page, size) => history.push({ search: stringify({ tab: "withdrawal", page, size }) }),
      }}
    />
  );
};

export default WithdrawalHistoryTab;
