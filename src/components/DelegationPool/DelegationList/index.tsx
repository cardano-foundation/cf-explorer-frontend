import { Box } from "@mui/material";
import { get } from "lodash";
import { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";

import useFetchList from "src/commons/hooks/useFetchList";
import { HeaderSearchIcon } from "src/commons/resources";
import { details, routers } from "src/commons/routers";
import { API } from "src/commons/utils/api";
import { REFRESH_TIMES } from "src/commons/utils/constants";
import { formatADAFull, formatPercent, getShortWallet } from "src/commons/utils/helper";
import ADAicon from "src/components/commons/ADAIcon";
import CustomTooltip from "src/components/commons/CustomTooltip";
import Table, { Column } from "src/components/commons/Table";

import { Image, PoolName, SearchContainer, StyledInput, StyledLinearProgress, SubmitButton } from "./styles";

const DelegationLists: React.FC = () => {
  const history = useHistory<{ tickerNameSearch?: string; fromPath?: SpecialPath }>();
  const { tickerNameSearch = "" } = history.location.state || {};
  const [value, setValue] = useState("");
  const [search, setSearch] = useState(decodeURIComponent(tickerNameSearch));
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(50);
  const [sort, setSort] = useState<string>("");
  const tableRef = useRef(null);

  useEffect(() => {
    if (tickerNameSearch !== search) setPage(1);
    if (tickerNameSearch) {
      setSearch(decodeURIComponent(tickerNameSearch));
    }
  }, [tickerNameSearch]);

  const fetchData = useFetchList<Delegators>(
    API.DELEGATION.POOL_LIST,
    { page: page - 1, size, search, sort },
    false,
    REFRESH_TIMES.POOLS
  );
  const fromPath = history.location.pathname as SpecialPath;

  useEffect(() => {
    if (fetchData.initialized) {
      history.replace({ state: undefined });
    }
  }, [fetchData.initialized, history]);

  const columns: Column<Delegators & { adaFake: number; feeFake: number }>[] = [
    {
      title: "Pool",
      key: "Pool",
      minWidth: "200px",
      maxWidth: "200px",
      render: (r) => (
        <CustomTooltip title={r.poolName || r.poolId}>
          <PoolName to={{ pathname: details.delegation(r.poolId), state: { fromPath } }}>
            <Box component={"span"} textOverflow={"ellipsis"} whiteSpace={"nowrap"} overflow={"hidden"}>
              {r.poolName || `${getShortWallet(r.poolId)}`}
            </Box>
          </PoolName>
        </CustomTooltip>
      )
    },
    {
      title: (
        <Box component={"span"}>
          Pool size (<ADAicon />)
        </Box>
      ),
      key: "poolSize",
      minWidth: "120px",
      render: (r) => <Box component={"span"}>{formatADAFull(r.poolSize)}</Box>
    },
    {
      title: (
        <Box component={"span"}>
          Declared Pledge (<ADAicon />)
        </Box>
      ),
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
        <Box component={"span"}>
          Fixed Cost (<ADAicon />)
        </Box>
      ),
      key: "pu.fixedCost",
      minWidth: "120px",
      render: (r) => (
        <Box component="span">
          {formatADAFull(r.feeAmount)}&nbsp;
          <ADAicon />
        </Box>
      ),
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
        <SubmitButton
          onClick={() => {
            setPage(1);
            history.push(routers.DELEGATION_POOLS, {
              tickerNameSearch: (value || "").toLocaleLowerCase()
            });
          }}
        >
          <Image src={HeaderSearchIcon} alt="Search" />
        </SubmitButton>
      </SearchContainer>
      <Table
        {...fetchData}
        columns={columns}
        total={{ count: fetchData.total, title: "Total" }}
        onClickRow={(_, r: Delegators) => history.push(details.delegation(r.poolId), { fromPath })}
        pagination={{
          page: page - 1,
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
