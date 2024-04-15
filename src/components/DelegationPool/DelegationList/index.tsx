import { Box } from "@mui/material";
import { stringify } from "qs";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import useFetchList from "src/commons/hooks/useFetchList";
import usePageInfo from "src/commons/hooks/usePageInfo";
import { details } from "src/commons/routers";
import { API } from "src/commons/utils/api";
import { formatADAFull, formatPercent, getShortHash } from "src/commons/utils/helper";
import ADAicon from "src/components/commons/ADAIcon";
import CustomFilterMultiRange from "src/components/commons/CustomFilterMultiRange";
import CustomTooltip from "src/components/commons/CustomTooltip";
import Table, { Column } from "src/components/commons/Table";
import { IS_CONWAY_ERA } from "src/commons/utils/constants";

import { AntSwitch, PoolName, ShowRetiredPools, TopSearchContainer } from "./styles";

const DelegationLists: React.FC = () => {
  const { t } = useTranslation();
  const history = useHistory<{ tickerNameSearch?: string; fromPath?: SpecialPath }>();
  const { tickerNameSearch = "" } = history.location.state || {};
  const [search, setSearch] = useState(decodeURIComponent(tickerNameSearch));
  const { pageInfo, setSort } = usePageInfo();
  const [isShowRetired, setIsRetired] = useState(/^true$/i.test(pageInfo.retired));

  const tableRef = useRef<HTMLDivElement>(null);
  const blockKey = useSelector(({ system }: RootState) => system.blockKey);

  useEffect(() => {
    if (tickerNameSearch !== search) history.replace({ search: stringify({ ...pageInfo, page: 1 }) });
    if (tickerNameSearch) {
      setSearch(decodeURIComponent(tickerNameSearch));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tickerNameSearch]);

  const fetchData = useFetchList<Delegators>(
    API.DELEGATION.POOL_LIST,
    {
      search,
      isShowRetired: isShowRetired,
      ...pageInfo
    },
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
        <CustomTooltip
          title={
            r.tickerName ? (
              <>
                <Box fontWeight={"bold"} component={"span"}>
                  Ticker:{" "}
                </Box>
                {r.tickerName}
              </>
            ) : undefined
          }
        >
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
      title: t("votingPower"),
      key: "votingPower",
      minWidth: "120px",
      render: (r) =>
        r.votingPower != null ? (
          <CustomTooltip title={`${r.votingPower * 100}%`}>
            <Box component={"span"}>{formatPercent(r.votingPower)}</Box>
          </CustomTooltip>
        ) : (
          t("common.N/A")
        ),
      sort: ({ columnKey, sortValue }) => {
        sortValue ? setSort(`${columnKey},${sortValue}`) : setSort("");
      }
    },
    {
      title: t("governanceParticipationRate"),
      key: "governanceParticipationRate",
      minWidth: "120px",
      render: (r) =>
        r.governanceParticipationRate != null ? `${formatPercent(r.governanceParticipationRate)}` : t("common.N/A"),
      sort: ({ columnKey, sortValue }) => {
        sortValue ? setSort(`${columnKey},${sortValue}`) : setSort("");
      }
    }
  ];
  return (
    <>
      <TopSearchContainer sx={{ justifyContent: "end" }}>
        <Box display="flex" gap="10px">
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
          <CustomFilterMultiRange />
        </Box>
      </TopSearchContainer>
      <Table
        {...fetchData}
        height={fetchData.data.length ? "498px" : "435px"}
        maxHeight={fetchData.data.length ? "585px" : "435px"}
        columns={columns.filter((col) => {
          if ((col.key === "governanceParticipationRate" || col.key === "votingPower") && !IS_CONWAY_ERA) {
            return false;
          }
          return true;
        })}
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
