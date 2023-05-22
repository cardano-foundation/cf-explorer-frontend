import { Box } from "@mui/material";
import { StyledLink } from "../styles";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { stringify } from "qs";
import useFetchList from "../../../../commons/hooks/useFetchList";
import { formatDateTimeLocal, getPageInfo, getShortHash, getShortWallet } from "../../../../commons/utils/helper";
import Table, { Column } from "../../../commons/Table";
import CustomTooltip from "../../../commons/CustomTooltip";
import { details } from "../../../../commons/routers";
import { API } from "../../../../commons/utils/api";

const DelegationHistoryTab = ({ isMobile = false }) => {
  const { stakeId } = useParams<{ stakeId: string }>();
  const { search } = useLocation();
  const history = useHistory();
  const pageInfo = getPageInfo(search);
  const fetchData = useFetchList<DelegationHistory>(`${API.STAKE.DETAIL}/${stakeId}/delegation-history`, pageInfo);

  const columns: Column<DelegationHistory>[] = [
    {
      title: "Trx Hash",
      key: "hash",
      minWidth: isMobile ? "245px" : "120px",
      render: (r) => (
        <CustomTooltip title={r.txHash || ""}>
          <StyledLink to={details.transaction(r.txHash)}>{getShortHash(r.txHash || "")}</StyledLink>
        </CustomTooltip>
      )
    },
    {
      title: "Time",
      key: "time",
      minWidth: "120px",
      render: (r) => formatDateTimeLocal(r.time || "")
    },
    {
      title: "Block",
      key: "block",
      minWidth: "120px",
      render: (r) => (
        <Box>
          <StyledLink to={details.block(r.blockNo)}>{r.blockNo}</StyledLink>
          <Box marginTop='5px'>
            <StyledLink to={details.epoch(r.epochNo)}>{r.epochNo}</StyledLink>/{r.epochSlotNo}
          </Box>
        </Box>
      )
    },
    {
      title: "Pool ID",
      key: "poolId",
      minWidth: "120px",
      render: (r) => (
        <CustomTooltip title={r.poolId || ""}>
          <StyledLink to={details.delegation(r.poolId)}>{getShortWallet(r.poolId || "")}</StyledLink>
        </CustomTooltip>
      )
    },
    {
      title: "Pool Name",
      key: "poolName",
      minWidth: "120px",
      maxWidth: "200px",
      render: (r) => {
        let poolData: { name: string } = { name: "" };
        try {
          if (r.poolData) poolData = JSON.parse(r.poolData);
        } catch {
          // To Do
        }
        const name = poolData.name?.length > 30 ? getShortWallet(poolData.name) : poolData.name;
        return (
          <CustomTooltip title={poolData.name || r.poolId}>
            <StyledLink to={details.delegation(r.poolId)}>{name || `Pool [${getShortWallet(r.poolId)}]`}</StyledLink>
          </CustomTooltip>
        );
      }
    }
  ];

  return (
    <Table
      {...fetchData}
      columns={columns}
      total={{ title: "Total", count: fetchData.total }}
      pagination={{
        ...pageInfo,
        total: fetchData.total,
        onChange: (page, size) => history.push({ search: stringify({ page, size }) })
      }}
      onClickRow={(e, r: DelegationHistory) => history.push(details.delegation(r.poolId))}
    />
  );
};

export default DelegationHistoryTab;
