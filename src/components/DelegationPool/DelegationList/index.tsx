import { useState, useRef } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Box } from "@mui/material";

import Table, { Column } from "src/components/commons/Table";
import { formatADAFull, formatPercent, getPageInfo, getShortWallet } from "src/commons/utils/helper";
import { details } from "src/commons/routers";
import { HeaderSearchIcon } from "src/commons/resources";
import useFetchList from "src/commons/hooks/useFetchList";
import CustomTooltip from "src/components/commons/CustomTooltip";
import RateWithIcon from "src/components/commons/RateWithIcon";
import { API } from "src/commons/utils/api";
import { REFRESH_TIMES } from "src/commons/utils/constants";

import { Image, PoolName, SearchContainer, StyledInput, StyledLinearProgress, SubmitButton } from "./styles";

const DelegationLists: React.FC = () => {
  const history = useHistory();
  const [value, setValue] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(50);
  const [sort, setSort] = useState<string>("");
  const tableRef = useRef(null);
  const fetchData = useFetchList<Delegators>(
    API.DELEGATION.POOL_LIST,
    { page: page - 1, size, search, sort },
    false,
    REFRESH_TIMES.POOLS
  );
  const { search: locationSearch } = useLocation();
  const pageInfo = getPageInfo(locationSearch);

  const columns: Column<Delegators & { adaFake: number; feeFake: number }>[] = [
    {
      title: "Pool",
      key: "Pool",
      minWidth: "40px",
      maxWidth: "350px",
      render: (r) => (
        <CustomTooltip title={r.poolName || r.poolId}>
          <PoolName to={details.delegation(r.poolId)}>
            <Box component={"span"} textOverflow={"ellipsis"} whiteSpace={"nowrap"} overflow={"hidden"}>
              {r.poolName || `${getShortWallet(r.poolId)}`}
            </Box>
          </PoolName>
        </CustomTooltip>
      )
    },
    {
      title: "Pool size (A)",
      key: "poolSize",
      minWidth: "120px",
      render: (r) => <Box component={"span"}>{formatADAFull(r.poolSize)}</Box>,
      sort: ({ columnKey, sortValue }) => {
        sortValue ? setSort(`${columnKey},${sortValue}`) : setSort("");
      }
    },
    {
      title: "Reward",
      key: "Reward",
      minWidth: "120px",
      render: (r) => <RateWithIcon value={r.reward} multiple={1} />
    },
    {
      title: "Fee (A) ",
      key: "pu.fixedCost",
      minWidth: "120px",
      render: (r) => `${formatPercent(r.feePercent)} (${formatADAFull(r.feeAmount)} A)`,
      sort: ({ columnKey, sortValue }) => {
        sortValue ? setSort(`${columnKey},${sortValue}`) : setSort("");
      }
    },
    {
      title: "Declared Pledge (A)",
      key: "pu.pledge",
      minWidth: "120px",
      render: (r) => <Box component={"span"}>{formatADAFull(r.pledge)}</Box>,
      sort: ({ columnKey, sortValue }) => {
        sortValue ? setSort(`${columnKey},${sortValue}`) : setSort("");
      }
    },
    {
      title: "Saturation",
      minWidth: "200px",
      key: "Saturation",
      render: (r) => (
        <Box display="flex" alignItems="center" justifyContent={"space-between"}>
          <Box component={"span"}>{formatPercent(r.saturation / 100) || `0%`}</Box>
          <StyledLinearProgress variant="determinate" value={r.saturation > 100 ? 100 : r.saturation} />
        </Box>
      )
    }
  ];

  return (
    <>
      <SearchContainer ref={tableRef}>
        <StyledInput
          placeholder="Search Pools"
          onChange={(e) => setValue(e.target.value)}
          value={value}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              setSearch(value);
              setPage(1);
            }
          }}
        />
        <SubmitButton onClick={() => setSearch(value)}>
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
          size,
          total: fetchData.total,
          onChange: (page, size) => {
            setPage(page);
            setSize(size);
            (tableRef.current as any)?.scrollIntoView();
          }
        }}
      />
    </>
  );
};

export default DelegationLists;
