import { Box } from "@mui/material";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { stringify } from "qs";

import useFetchList from "src/commons/hooks/useFetchList";
import { formatADAFull, formatDateTimeLocal, getPageInfo, getShortHash } from "src/commons/utils/helper";
import Table, { Column } from "src/components/commons/Table";
import CustomTooltip from "src/components/commons/CustomTooltip";
import { details } from "src/commons/routers";
import { API } from "src/commons/utils/api";
import ADAicon from "src/components/commons/ADAIcon";

import { StyledLink } from "../styles";

const columns: Column<Instantaneous>[] = [
  {
    title: "Tx Hash",
    key: "hash",
    minWidth: "120px",
    render: (r) => (
      <CustomTooltip title={r.txHash || ""}>
        <StyledLink to={details.transaction(r.txHash)}>{getShortHash(r.txHash || "")}</StyledLink>
      </CustomTooltip>
    )
  },
  {
    title: "Created At",
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
        <Box marginTop="5px">
          <StyledLink to={details.epoch(r.epochNo)}>{r.epochNo}</StyledLink>/{r.epochSlotNo}
        </Box>
      </Box>
    )
  },
  {
    title: "Rewards Paid",
    key: "rewardPaid",
    minWidth: "120px",
    render: (r) => (
      <>
        <Box component={"span"}> {formatADAFull(r.amount)}</Box>
        <ADAicon pl={"3px"} />
      </>
    )
  }
];

const InstantaneousTab = () => {
  const { stakeId } = useParams<{ stakeId: string }>();
  const { search } = useLocation();
  const history = useHistory();
  const pageInfo = getPageInfo(search);

  const fetchData = useFetchList<Instantaneous>(`${API.STAKE.DETAIL}/${stakeId}/instantaneous-rewards`, pageInfo);

  return (
    <Table
      {...fetchData}
      columns={columns}
      total={{ title: "Total", count: fetchData.total }}
      pagination={{
        ...pageInfo,
        total: fetchData.total,
        onChange: (page, size) => history.replace({ search: stringify({ page, size }) })
      }}
    />
  );
};

export default InstantaneousTab;
