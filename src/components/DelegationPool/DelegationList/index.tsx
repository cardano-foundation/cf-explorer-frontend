import { Box, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { stringify } from "qs";

import useFetchList from "src/commons/hooks/useFetchList";
import { HeaderSearchIconComponent } from "src/commons/resources";
import { details, routers } from "src/commons/routers";
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
  SubmitButton,
  TopSearchContainer
} from "./styles";

const DelegationLists: React.FC = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const history = useHistory<{ tickerNameSearch?: string; fromPath?: SpecialPath }>();
  const { tickerNameSearch = "" } = history.location.state || {};
  const [value, setValue] = useState("");
  const [search, setSearch] = useState(decodeURIComponent(tickerNameSearch));
  const { pageInfo, setSort } = usePageInfo();
  const [isShowRetired, setIsRetired] = useState(!!pageInfo.retired);

  const tableRef = useRef<HTMLDivElement>(null);
  const blockKey = useSelector(({ system }: RootState) => system.blockKey);
  useEffect(() => {
    if (tickerNameSearch !== search) history.replace({ search: stringify({ ...pageInfo, page: 1 }) });
    if (tickerNameSearch) {
      setSearch(decodeURIComponent(tickerNameSearch));
    }
    setValue("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tickerNameSearch]);

  const fetchData = useFetchList<Delegators>(
    API.DELEGATION.POOL_LIST,
    { ...pageInfo, search, isShowRetired: isShowRetired },
    false,
    blockKey
  );
  const fromPath = history.location.pathname as SpecialPath;

  useEffect(() => {
    if (fetchData.initialized) {
      history.replace({ search: stringify({ ...pageInfo }), state: undefined });
    }
  }, [fetchData.initialized, history]);

  const columns: Column<Delegators>[] = [
    {
      title: t("glossary.pool"),
      key: "poolName",
      minWidth: "200px",
      maxWidth: "200px",
      render: (r) => (
        <CustomTooltip title={r.tickerName || ""}>
          <PoolName to={{ pathname: details.delegation(r.poolId), state: { fromPath } }}>
            <Box component={"span"} textOverflow={"ellipsis"} whiteSpace={"nowrap"} overflow={"hidden"}>
              {r.poolName || `${getShortHash(r.poolId)}`}
            </Box>
          </PoolName>
        </CustomTooltip>
      )
    },
    {
      title: (
        <Box component={"span"}>
          {t("glossary.poolSize")} (<ADAicon />)
        </Box>
      ),
      key: "poolSize",
      minWidth: "120px",
      render: (r) => <Box component={"span"}>{r.poolSize != null ? formatADAFull(r.poolSize) : t("common.N/A")}</Box>,
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
      minWidth: "120px",
      key: "saturation",
      render: (r) =>
        r.saturation != null ? (
          <Box component={"span"} mr={1}>
            {formatPercent(r.saturation / 100) || `0%`}
          </Box>
        ) : (
          t("common.N/A")
        ),
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
      title: t("votingPower") + " ",
      key: "votingPower",
      minWidth: "120px",
      render: (r) => `${r.votingPower}`,
      sort: ({ columnKey, sortValue }) => {
        sortValue ? setSort(`${columnKey},${sortValue}`) : setSort("");
      }
    },
    {
      title: t("governanceParticipationRate") + " ",
      key: "governanceParticipationRate",
      minWidth: "120px",
      render: (r) => `${formatPercent(r.governanceParticipationRate)}`,
      sort: ({ columnKey, sortValue }) => {
        sortValue ? setSort(`${columnKey},${sortValue}`) : setSort("");
      }
    }
  ];
  return (
    <>
      <TopSearchContainer>
        <SearchContainer ref={tableRef}>
          <StyledInput
            placeholder={t("common.searchPools")}
            onChange={(e) => setValue(e.target.value)}
            value={value}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                setSearch(value);
                history.replace({ search: stringify({ ...pageInfo, page: 1 }) });
              }
            }}
          />
          <SubmitButton
            onClick={() => {
              setSearch(value);
              history.push(routers.DELEGATION_POOLS, {
                tickerNameSearch: (value || "").toLocaleLowerCase()
              });
              history.replace({ search: stringify({ ...pageInfo, page: 1 }) });
            }}
          >
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
            checked={isShowRetired}
            onChange={(e) => {
              setIsRetired(e.target.checked);
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
