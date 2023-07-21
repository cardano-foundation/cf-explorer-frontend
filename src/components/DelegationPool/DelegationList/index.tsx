import { useState, useRef, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Box } from "@mui/material";
import { get } from "lodash";

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
  const history = useHistory<{ tickerNameSearch: string | undefined }>();
  const { tickerNameSearch = "" } = history.location.state || {};

  const [value, setValue] = useState(decodeURIComponent(tickerNameSearch));
  const [search, setSearch] = useState(decodeURIComponent(tickerNameSearch));
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

  useEffect(() => {
    if (fetchData.initialized) {
      history.replace({ state: undefined });
    }
  }, [fetchData.initialized, history]);

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
      render: (r) => <Box component={"span"}>{formatADAFull(r.poolSize)}</Box>
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
        <Box display="flex" alignItems="center" justifyContent={"end"}>
          <Box component={"span"} mr={1}>
            {formatPercent(r.saturation / 100) || `0%`}
          </Box>
          <StyledLinearProgress
            variant="determinate"
            saturation={r.saturation}
            value={r.saturation > 100 ? 100 : get(r, "saturation", 0)}
          />
        </Box>
      )
    },
    {
      title: "Number of Delegators",
      minWidth: "200px",
      key: "numberDelegators",
      render: (r) => <Box component={"span"}>{r.numberDelegators || 0}</Box>
    },
    {
      title: "Blocks in Epoch",
      key: "epochBlock",
      minWidth: "120px",
      render: (r) => <Box component={"span"}>{r.epochBlock || 0}</Box>
    },
    {
      title: "Blocks lifetime",
      minWidth: "100px",
      key: "lifetimeBlock",
      render: (r) => <Box component={"span"}>{r.lifetimeBlock || 0}</Box>
    },
    {
      title: (
        <CustomTooltip title="Last calculated gross return, as of the second last epoch">
          <span>Reward</span>
        </CustomTooltip>
      ),
      key: "Reward",
      minWidth: "120px",
      render: (r) => <RateWithIcon value={r.reward} multiple={1} />
    },
    {
      title: (
        <CustomTooltip title="Gross average return during pool’s lifetime">
          <span>Lifetime ROS</span>
        </CustomTooltip>
      ),
      minWidth: "100px",
      key: "lifetimeRos",
      render: (r) => <Box component={"span"}>{toFixedBigNumber(r?.lifetimeRos || 0, 2)}%</Box>
    },
    {
      title: "Fixed Cost (A)",
      key: "pu.fixedCost",
      minWidth: "120px",
      render: (r) => `${formatADAFull(r.feeAmount)} A`,
      sort: ({ columnKey, sortValue }) => {
        sortValue ? setSort(`${columnKey},${sortValue}`) : setSort("");
      }
    },
    {
      title: "Margin ",
      key: "margin",
      minWidth: "120px",
      render: (r) => `${formatPercent(r.feePercent)}`
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
            /* eslint-disable  @typescript-eslint/no-explicit-any */
            (tableRef.current as any)?.scrollIntoView();
          }
        }}
      />
    </>
  );
};

export default DelegationLists;
