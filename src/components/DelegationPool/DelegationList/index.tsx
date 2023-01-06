import { useHistory, useLocation } from "react-router-dom";
import { parse, stringify } from "qs";
import Table, { Column } from "../../commons/Table";
import { formatADA, formatPercent, getPageInfo } from "../../../commons/utils/helper";
import { details } from "../../../commons/routers";
import { Image, PoolName, SearchContainer, StyledInput, StyledLinearProgress, SubmitButton } from "./styles";
import { HeaderSearchIcon } from "../../../commons/resources";
import useFetchList from "../../../commons/hooks/useFetchList";
import { useState } from "react";
import { Box } from "@mui/material";
import CustomTooltip from "../../commons/CustomTooltip";
import RateWithIcon from "../../commons/RateWithIcon";

const columns: Column<Delegators & { adaFake: number; feeFake: number }>[] = [
  {
    title: "Pool",
    key: "Pool",
    minWidth: "40px",
    maxWidth: "350px",
    render: r => (
      <PoolName to={details.delegation(r.poolId)}>
        <CustomTooltip title={r.poolName || r.poolId} placement="top">
          <Box>{r.poolName || r.poolId}</Box>
        </CustomTooltip>
      </PoolName>
    ),
  },
  {
    title: "Pool size (A)",
    key: "PoolsizeA",
    minWidth: "120px",
    render: r => formatADA(r.poolSize),
  },
  {
    title: "Reward",
    key: "Reward",
    minWidth: "120px",
    render: r => <RateWithIcon value={r.reward} />,
  },
  {
    title: "Fee (A) ",
    key: "fee",
    minWidth: "120px",
    render: r => `${formatPercent(r.feePercent)} (${formatADA(r.feeAmount)} A)`,
  },
  {
    title: "Declared Pledge (A)",
    key: "Declared",
    minWidth: "120px",
    render: r => formatADA(r.pledge),
  },
  {
    title: "Saturation",
    minWidth: "200px",
    key: "Saturation",
    render: r => (
      <Box display="flex" alignItems="center">
        <span>{formatPercent(r.saturation) || `0%`}</span>
        <StyledLinearProgress
          variant="determinate"
          value={Math.max(0, Math.min(100, Number(r.saturation * 100) || 0))}
        />
      </Box>
    ),
  },
];

const DelegationLists: React.FC = () => {
  const { search } = useLocation();
  const history = useHistory();
  const [value, setValue] = useState("");
  const { name } = parse(search.split("?")[1]);
  const pageInfo = getPageInfo(search);
  const fetchData = useFetchList<Delegators>("/delegation/pool-list", {
    ...pageInfo,
    search: (name as string) || "",
  });

  return (
    <>
      <SearchContainer>
        <StyledInput
          placeholder="Search Pools"
          onChange={e => setValue(e.target.value)}
          value={value}
          onKeyUp={e => {
            if (e.key === "Enter") {
              history.push({ search: stringify({ name: value, page: 1 }) });
            }
          }}
        />
        <SubmitButton onClick={() => history.push({ search: stringify({ name: value, page: 1 }) })}>
          <Image src={HeaderSearchIcon} alt="Search" />
        </SubmitButton>
      </SearchContainer>
      <Table
        {...fetchData}
        columns={columns}
        total={{ count: fetchData.total, title: "Total" }}
        onClickRow={(_, r: Delegators) => history.push(details.delegation(r.poolId))}
        pagination={{
          ...pageInfo,
          total: fetchData.total,
          onChange: (page, size) => history.push({ search: stringify({ page, size, name }) }),
        }}
      />
    </>
  );
};

export default DelegationLists;
