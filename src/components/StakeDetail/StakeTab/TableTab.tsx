import { Box } from "@mui/material";
import moment from "moment";
import { parse, stringify } from "qs";
import { Link, useHistory, useLocation } from "react-router-dom";
import { routers } from "../../../commons/routers";
import { formatADA, getShortHash, getShortWallet } from "../../../commons/utils/helper";
import CustomTooltip from "../../commons/CustomTooltip";
import Table, { Column } from "../../commons/Table";
import { ADAToken } from "../../commons/Token";
import { LabelStatus, StyledLink } from "./component";

interface TableTabProps {
  type: TabStakeDetail;
  data: (DelegationHistory | Instantaneous | StakeHistory | WithdrawalHistory)[];
  loading: boolean;
  error: string | null;
  initialized: boolean;
  currentPage: number;
  total: number;
}

interface columnProps {
  delegation: Column<DelegationHistory>[];
  stakeKey: Column<StakeHistory>[];
  withdrawal: Column<WithdrawalHistory>[];
  instantaneous: Column<Instantaneous>[];
}
const TableTab: React.FC<TableTabProps> = ({ type, data, error, initialized, loading, currentPage, total }) => {
  const history = useHistory();

  const setQuery = (query: any) => {
    history.push({ search: stringify(query) });
  };

  const column: columnProps = {
    delegation: [
      {
        title: "Trx Hash",
        key: "hash",
        minWidth: "120px",
        render: r => (
          <StyledLink to={routers.TRANSACTION_DETAIL.replace(":trxHash", r.txHash)}>
            <Box fontFamily={"Helvetica, monospace"} color={props => props.colorBlue}>
              {getShortHash(r.txHash || "")}
            </Box>
          </StyledLink>
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
            <Link to={routers.BLOCK_DETAIL.replace(":blockId", `${r.blockNo}`)}>
              <Box fontFamily={"Helvetica, monospace"} color={props => props.colorBlue}>
                {r.blockNo}
              </Box>
            </Link>
            <Box fontFamily={"Helvetica, monospace"}>
              <Link to={routers.EPOCH_DETAIL.replace(":epochId", `${r.epochNo}`)}>
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
          <Link to={routers.DELEGATION_POOL_DETAIL.replace(":poolId", `${r.poolId}`)}>
            <Box fontFamily={"Helvetica, monospace"} color={props => props.colorBlue}>
              {getShortHash(r.poolId || "")}
            </Box>
          </Link>
        ),
      },
      {
        title: "Pool Name",
        key: "poolName",
        minWidth: "120px",
        maxWidth: "250px",
        render: r => (
          <Link to={routers.DELEGATION_POOL_DETAIL.replace(":poolId", `${r.poolId}`)}>
            <CustomTooltip title={r.poolData ? `${JSON.parse(r.poolData).ticker} - ${JSON.parse(r.poolData).name}` : ""}>
              <Box
                fontFamily={"Helvetica, monospace"}
                color={props => props.colorBlue}
                overflow={"hidden"}
                textOverflow={"clip"}
              >
                {r.poolData ? `${JSON.parse(r.poolData).ticker} - ${JSON.parse(r.poolData).name}` : ""}
              </Box>
            </CustomTooltip>
          </Link>
        ),
      },
    ],
    stakeKey: [
      {
        title: "Trx Hash",
        key: "hash",
        minWidth: "120px",
        render: r => (
          <StyledLink to={routers.TRANSACTION_DETAIL.replace(":trxHash", r.txHash)}>
            <Box fontFamily={"Helvetica, monospace"} color={props => props.colorBlue}>
              {getShortHash(r.txHash || "")}
            </Box>
          </StyledLink>
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
            <Link to={routers.BLOCK_DETAIL.replace(":blockId", `${r.blockNo}`)}>
              <Box fontFamily={"Helvetica, monospace"} color={props => props.colorBlue}>
                {r.blockNo}
              </Box>
            </Link>
            <Box fontFamily={"Helvetica, monospace"}>
              <Link to={routers.EPOCH_DETAIL.replace(":epochId", `${r.epochNo}`)}>
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
    ],
    withdrawal: [
      {
        title: "Trx Hash",
        key: "hash",
        minWidth: "120px",
        render: r => (
          <StyledLink to={routers.TRANSACTION_DETAIL.replace(":trxHash", r.txHash)}>
            <Box fontFamily={"Helvetica, monospace"} color={props => props.colorBlue}>
              {getShortHash(r.txHash || "")}
            </Box>
          </StyledLink>
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
            <Link to={routers.BLOCK_DETAIL.replace(":blockId", `${r.blockNo}`)}>
              <Box fontFamily={"Helvetica, monospace"} color={props => props.colorBlue}>
                {r.blockNo}
              </Box>
            </Link>
            <Box fontFamily={"Helvetica, monospace"}>
              <Link to={routers.EPOCH_DETAIL.replace(":epochId", `${r.epochNo}`)}>
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
    ],
    instantaneous: [
      {
        title: "Trx Hash",
        key: "hash",
        minWidth: "120px",
        render: r => (
          <StyledLink to={routers.TRANSACTION_DETAIL.replace(":trxHash", r.txHash)}>
            <Box fontFamily={"Helvetica, monospace"} color={props => props.colorBlue}>
              {getShortHash(r.txHash || "")}
            </Box>
          </StyledLink>
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
            <Link to={routers.BLOCK_DETAIL.replace(":blockId", `${r.blockNo}`)}>
              <Box fontFamily={"Helvetica, monospace"} color={props => props.colorBlue}>
                {r.blockNo}
              </Box>
            </Link>
            <Box fontFamily={"Helvetica, monospace"}>
              <Link to={routers.EPOCH_DETAIL.replace(":epochId", `${r.epochNo}`)}>
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
    ],
  };

  return (
    <Table
      columns={column[type]}
      data={data}
      error={error}
      loading={loading}
      initialized={initialized}
      pagination={{
        onChange: (page, size) => {
          setQuery({ page, size });
        },
        page: currentPage || 0,
        total: total,
      }}
    />
  );
};

export default TableTab;
