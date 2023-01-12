import { Box, Tooltip } from "@mui/material";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import useFetchList from "../../commons/hooks/useFetchList";
import { details } from "../../commons/routers";
import { formatADA, formatADAFull, getShortWallet } from "../../commons/utils/helper";
import Card from "../../components/commons/Card";
import CustomTooltip from "../../components/commons/CustomTooltip";
import Table from "../../components/commons/Table";
import { ADAToken } from "../../components/commons/Token";
import { Column } from "../../types/table";
import { StyledContainer, StyledLink } from "./styles";

const TopDelegators = () => {
  const history = useHistory();
  const { error, data, initialized, loading } = useFetchList<Contracts>("/stake/top-delegators", { page: 0, size: 50 });

  useEffect(() => { 
    document.title = `Top Delegators | Cardano Explorer`;
  }, []);

  const columns: Column<TopDelegator>[] = [
    {
      title: "#",
      minWidth: 30,
      key: "index",
      render: (r, idx) => idx + 1,
    },
    {
      title: "Addresses",
      minWidth: 120,
      key: "addresses",
      render: (r, idx) => (
        <Tooltip title={r.stakeKey}>
          <StyledLink to={details.stake(r.stakeKey)}>{getShortWallet(r.stakeKey)}</StyledLink>
        </Tooltip>
      ),
    },
    {
      title: "Pool",
      key: "pool",
      render: (r, idx) => (
        <Tooltip title={`${r.poolName} #${r.poolId}`}>
          <StyledLink to={details.delegation(r.poolId)}>
            {r.poolName} #{r.poolId}
          </StyledLink>
        </Tooltip>
      ),
    },
    {
      title: "Stake amount",
      key: "Stakeamount",
      render: (r, idx) => (
        <CustomTooltip title={formatADAFull(r.balance)}>
          <Box component={"span"}>
            {formatADA(r.balance || 0)} <ADAToken />
          </Box>
        </CustomTooltip>
      ),
    },
  ];

  return (
    <StyledContainer>
      <Card title="Top 50 delegators">
        <Table
          onClickRow={(_, r) => history.push(details.address(r.stakeKey))}
          data={data}
          error={error}
          loading={loading}
          initialized={initialized}
          columns={columns}
        />
      </Card>
    </StyledContainer>
  );
};
export default TopDelegators;
