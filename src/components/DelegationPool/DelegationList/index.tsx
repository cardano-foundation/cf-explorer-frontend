import { Box, useTheme } from "@mui/material";
import { get } from "lodash";
import { useTranslation } from "react-i18next";
import { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { stringify } from "qs";

import useFetchList from "src/commons/hooks/useFetchList";
import { HeaderSearchIconComponent } from "src/commons/resources";
import { details } from "src/commons/routers";
import { API } from "src/commons/utils/api";
import { formatADAFull, formatPercent, getShortHash } from "src/commons/utils/helper";
import ADAicon from "src/components/commons/ADAIcon";
import CustomTooltip from "src/components/commons/CustomTooltip";
import Table, { Column } from "src/components/commons/Table";
import CustomIcon from "src/components/commons/CustomIcon";
import usePageInfo from "src/commons/hooks/usePageInfo";

import {
  AntSwitch,
  PoolName,
  SearchContainer,
  ShowRetiredPools,
  StyledInput,
  StyledLinearProgress,
  SubmitButton,
  TopSearchContainer
} from "./styles";

const DelegationLists: React.FC = () => {
  const { t } = useTranslation();
  const theme = useTheme();

  const history = useHistory<{ tickerNameSearch?: string; fromPath?: SpecialPath; retired?: boolean }>();
  const tickerNameSearchValue = new URLSearchParams(document.location.search).get("search") || "";
  const { tickerNameSearch = "", retired = false } = history.location.state || {};
  const [value, setValue] = useState(tickerNameSearchValue);
  const [search, setSearch] = useState(decodeURIComponent(tickerNameSearch));
  const { pageInfo, setSort } = usePageInfo();
  const isShowRetired = pageInfo?.retired || retired;
  const tableRef = useRef<HTMLDivElement>(null);
  const blockKey = useSelector(({ system }: RootState) => system.blockKey);

  useEffect(() => {
    if (tickerNameSearch !== search) {
      history.replace({
        search: stringify({ ...pageInfo, page: 1, search: (value || "").toLocaleLowerCase(), retired: isShowRetired })
      });
    }
    if (tickerNameSearch) {
      setSearch(tickerNameSearch || "");
      setValue(tickerNameSearch || "");
    }
  }, [tickerNameSearch]);

  const fetchData = useFetchList<Delegators>(
    API.DELEGATION.POOL_LIST,
    { ...pageInfo, search: decodeURIComponent(search || tickerNameSearchValue), isShowRetired },
    false,
    blockKey
  );

  const fromPath = history.location.pathname as SpecialPath;

  useEffect(() => {
    if (fetchData.initialized) {
      history.replace({ search: stringify({ ...pageInfo }), state: undefined });
    }
  }, [fetchData.initialized, history]);

  const columns: Column<Delegators & { adaFake: number; feeFake: number }>[] = [
    {
      title: t("glossary.pool"),
      key: "poolName",
      minWidth: "200px",
      maxWidth: "200px",
      render: (r) => (
        <CustomTooltip title={r.poolName || r.poolId}>
          <PoolName to={{ pathname: details.delegation(r.poolId), state: { fromPath } }}>
            <Box component={"span"} textOverflow={"ellipsis"} whiteSpace={"nowrap"} overflow={"hidden"}>
              {r.poolName || `${getShortHash(r.poolId)}`}
            </Box>
          </PoolName>
        </CustomTooltip>
      )
    },
    {
      title: t("common.ticker") + " ",
      key: "tickerName",
      minWidth: "120px",
      render: (r) => <Box component={"span"}>{r.tickerName}</Box>,
      sort: ({ columnKey, sortValue }) => {
        sortValue ? setSort(`${columnKey},${sortValue}`) : setSort("");
      }
    },
    {
      title: (
        <Box component={"span"}>
          {t("glossary.poolSize")} (<ADAicon />)
        </Box>
      ),
      key: "poolSize",
      minWidth: "120px",
      render: (r) => (
        <Box component={"span"}>{r.poolSize != null ? formatADAFull(r.poolSize) : t("common.notAvailable")}</Box>
      ),
      sort: ({ columnKey, sortValue }) => {
        sortValue ? setSort(`${columnKey},${sortValue}`) : setSort("");
      }
    },
    {
      title: (
        <Box component={"span"}>
          {t("glossary.declaredPledge")} (<ADAicon />)
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
      title: t("glossary.saturation"),
      minWidth: "200px",
      key: "saturation",
      render: (r) =>
        r.saturation != null ? (
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
        ) : (
          t("common.notAvailable")
        ),
      sort: ({ columnKey, sortValue }) => {
        sortValue ? setSort(`${columnKey},${sortValue}`) : setSort("");
      }
    },
    {
      title: t("glossary.numberOfDelegators"),
      minWidth: "200px",
      key: "numberDelegators",
      render: (r) => <Box component={"span"}>{r.numberDelegators || 0}</Box>,
      sort: ({ columnKey, sortValue }) => {
        sortValue ? setSort(`${columnKey},${sortValue}`) : setSort("");
      }
    },
    {
      title: t("glossary.blocksInEpoch"),
      key: "epochBlock",
      minWidth: "120px",
      render: (r) => <Box component={"span"}>{r.epochBlock || 0}</Box>,
      sort: ({ columnKey, sortValue }) => {
        sortValue ? setSort(`${columnKey},${sortValue}`) : setSort("");
      }
    },
    {
      title: t("glossary.blocksLifetime"),
      minWidth: "100px",
      key: "lifetimeBlock",
      render: (r) => <Box component={"span"}>{r.lifetimeBlock || 0}</Box>,
      sort: ({ columnKey, sortValue }) => {
        sortValue ? setSort(`${columnKey},${sortValue}`) : setSort("");
      }
    },
    {
      title: (
        <Box component={"span"} sx={{ textWrap: "nowrap" }}>
          {t("glossary.fixedCost")} (<ADAicon />)
        </Box>
      ),
      key: "fee",
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
      title: t("margin") + " ",
      key: "margin",
      minWidth: "120px",
      render: (r) => `${formatPercent(r.feePercent)}`,
      sort: ({ columnKey, sortValue }) => {
        sortValue ? setSort(`${columnKey},${sortValue}`) : setSort("");
      }
    }
  ];

  const handleSearch = () => {
    setSearch(value);
    history.replace({
      search: stringify({
        ...pageInfo,
        page: 1,
        search: (value || "").toLocaleLowerCase()
      })
    });
  };
  return (
    <>
      <TopSearchContainer>
        <SearchContainer ref={tableRef}>
          <StyledInput
            placeholder={t("common.searchPools")}
            onChange={(e) => setValue(e.target.value)}
            value={decodeURIComponent(value)}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />
          <SubmitButton onClick={handleSearch}>
            <CustomIcon
              data-testid="search-icon"
              icon={HeaderSearchIconComponent}
              fill={theme.palette.secondary[0]}
              stroke={theme.palette.secondary.light}
              height={22}
              width={22}
            />
          </SubmitButton>
        </SearchContainer>
        <ShowRetiredPools>
          {t("glassary.showRetiredPools")}
          <AntSwitch
            checked={isShowRetired === "true"}
            onChange={(e) => {
              history.replace({ search: stringify({ ...pageInfo, page: 0, retired: e.target.checked }) });
            }}
          />
        </ShowRetiredPools>
      </TopSearchContainer>
      <Table
        {...fetchData}
        columns={columns}
        total={{ count: fetchData.total, title: "Total", isDataOverSize: fetchData.isDataOverSize }}
        onClickRow={(_, r: Delegators) => history.push(details.delegation(r.poolId), { fromPath })}
        pagination={{
          ...pageInfo,
          total: fetchData.total,
          onChange: (page, size) => {
            history.replace({ search: stringify({ ...pageInfo, page, size }) });
            tableRef.current?.scrollIntoView();
          }
        }}
      />
    </>
  );
};

export default DelegationLists;
