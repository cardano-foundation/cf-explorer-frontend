import { Box } from "@mui/material";
import { LabelStatus, StyledLink } from "../styles";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { stringify } from "qs";
import useFetchList from "../../../../commons/hooks/useFetchList";
import { formatDateTimeLocal, getPageInfo, getShortHash } from "../../../../commons/utils/helper";
import Table, { Column } from "../../../commons/Table";
import CustomTooltip from "../../../commons/CustomTooltip";
import moment from "moment";
import { details } from "../../../../commons/routers";

const columns: Column<StakeHistory>[] = [
  {
    title: "Trx Hash",
    key: "hash",
    minWidth: "120px",
    render: r => (
      <CustomTooltip title={r.txHash || ""}>
        <StyledLink to={details.transaction(r.txHash)}>{getShortHash(r.txHash || "")}</StyledLink>
      </CustomTooltip>
    ),
  },
  {
    title: "Time",
    key: "time",
    minWidth: "120px",
    render: r => formatDateTimeLocal(r.time || ""),
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

const StakeHistoryTab = () => {
  const { stakeId } = useParams<{ stakeId: string }>();
  const { search } = useLocation();
  const history = useHistory();
  const pageInfo = getPageInfo(search);

  const fetchData = useFetchList<StakeHistory>(`/stake/${stakeId}/stake-history`, pageInfo);

  return (
    <Table
      {...fetchData}
      columns={columns}
      total={{ title: "Total", count: fetchData.total }}
      pagination={{
        ...pageInfo,
        total: fetchData.total,
        onChange: (page, size) => history.push({ search: stringify({ page, size }) }),
      }}
    />
  );
};

export default StakeHistoryTab;
