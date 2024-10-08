import { Box } from "@mui/material";
import { isNumber, isUndefined, omitBy } from "lodash";
import { stringify } from "qs";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import useFetchList from "src/commons/hooks/useFetchList";
import usePageInfo from "src/commons/hooks/usePageInfo";
import { details } from "src/commons/routers";
import { API } from "src/commons/utils/api";
import { CONWAY_ERE_FEILD, FF_GLOBAL_IS_CONWAY_ERA } from "src/commons/utils/constants";
import { formatADAFull, formatPercent, getShortHash } from "src/commons/utils/helper";
import ADAicon from "src/components/commons/ADAIcon";
import CustomFilterMultiRange from "src/components/commons/CustomFilterMultiRange";
import CustomTooltip from "src/components/commons/CustomTooltip";
import Table, { Column } from "src/components/commons/Table";

import { DelegationContainer, ListOfPools, PoolName, TopSearchContainer } from "./styles";

const DelegationLists: React.FC = () => {
  const { t } = useTranslation();
  const history = useHistory<{ tickerNameSearch?: string; fromPath?: SpecialPath }>();
  const { tickerNameSearch = "" } = history.location.state || {};
  const [search, setSearch] = useState(decodeURIComponent(tickerNameSearch));
  const { pageInfo, setSort } = usePageInfo();

  const tableRef = useRef<HTMLDivElement>(null);
  const blockKey = useSelector(({ system }: RootState) => system.blockKey);

  useEffect(() => {
    if (tickerNameSearch !== search) history.replace({ search: stringify({ ...pageInfo, page: 1 }) });
    if (tickerNameSearch) {
      setSearch(decodeURIComponent(tickerNameSearch));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tickerNameSearch]);

  const newPageInfo = omitBy(
    {
      ...pageInfo
    },
    (value, key) => (isUndefined(value) && !isNumber(pageInfo[key])) || value === ""
  );

  const fetchData = useFetchList<Delegators>(
    API.DELEGATION.POOL_LIST,
    {
      ...newPageInfo,
      isShowRetired: newPageInfo.retired,
      maxPoolSize: newPageInfo?.maxPoolSize ? +newPageInfo.maxPoolSize * 10 ** 6 : "",
      minPoolSize: newPageInfo?.minPoolSize ? +newPageInfo.minPoolSize * 10 ** 6 : ""
    },
    false,
    blockKey
  );
  const { error } = fetchData;
  const fromPath = history.location.pathname as SpecialPath;

  const handleBlankSort = () => {
    history.replace({ search: stringify({ ...pageInfo, page: 1, sort: undefined }) });
  };

  const columns: Column<Delegators>[] = [
    {
      title: <div data-testid="poolList.poolNameTitle">{t("glossary.pool")}</div>,
      key: "poolName",
      minWidth: "150px",
      render: (r, idx) => (
        <CustomTooltip
          title={
            r.tickerName ? (
              <div>
                <Box fontWeight={"bold"} component={"span"}>
                  Ticker:{" "}
                </Box>
                {r.tickerName}
              </div>
            ) : undefined
          }
        >
          <PoolName
            data-testid={`poolList.poolNameValue#${idx}`}
            to={{ pathname: details.delegation(r.poolId), state: { fromPath } }}
          >
            <Box
              component={"span"}
              textOverflow={"ellipsis"}
              display={(r.poolName || r.poolId || "").length > 20 ? "inline-block" : "inline"}
              width={"200px"}
              whiteSpace={"nowrap"}
              overflow={"hidden"}
            >
              {r.poolName || `${getShortHash(r.poolId)}`}
            </Box>
          </PoolName>
        </CustomTooltip>
      )
    },
    {
      title: (
        <Box component={"span"} data-testid="poolList.poolSizeTitle">
          {t("glossary.poolSize")} (<ADAicon />)
        </Box>
      ),
      key: "poolSize",
      minWidth: "120px",
      render: (r, idx) => (
        <Box component={"span"} data-testid={`poolList.poolSizeValue#${idx}`}>
          {r.poolSize != null ? formatADAFull(r.poolSize) : t("common.N/A")}
        </Box>
      ),
      sort: ({ columnKey, sortValue }) => {
        sortValue ? setSort(`${columnKey},${sortValue}`) : handleBlankSort();
      }
    },
    {
      title: (
        <Box component={"span"} data-testid="poolList.declaredPledgeTitle">
          {t("glossary.declaredPledge")} (<ADAicon />)
        </Box>
      ),
      key: "pu.pledge",
      minWidth: "120px",
      render: (r, idx) => (
        <Box component={"span"} data-testid={`poolList.declaredPledgeValue#${idx}`}>
          {formatADAFull(r.pledge)}
        </Box>
      ),
      sort: ({ columnKey, sortValue }) => {
        sortValue ? setSort(`${columnKey},${sortValue}`) : handleBlankSort();
      }
    },
    {
      title: (
        <Box component={"span"} data-testid="poolList.saturationTitle">
          {t("glossary.saturation")}
        </Box>
      ),
      minWidth: "120px",
      key: "saturation",
      render: (r, idx) =>
        r.saturation != null ? (
          <Box component={"span"} mr={1} data-testid={`poolList.saturationValue#${idx}`}>
            {formatPercent(r.saturation / 100) || `0%`}
          </Box>
        ) : (
          t("common.N/A")
        ),
      sort: ({ columnKey, sortValue }) => {
        sortValue ? setSort(`${columnKey},${sortValue}`) : handleBlankSort();
      }
    },
    {
      title: (
        <Box component={"span"} data-testid="poolList.blockInEpochTitle">
          {t("glossary.blocksInEpoch")}
        </Box>
      ),
      key: "epochBlock",
      minWidth: "120px",
      render: (r, idx) => (
        <Box component={"span"} data-testid={`poolList.blockInEpochValue#${idx}`}>
          {r.epochBlock || 0}
        </Box>
      ),
      sort: ({ columnKey, sortValue }) => {
        sortValue ? setSort(`${columnKey},${sortValue}`) : handleBlankSort();
      }
    },
    {
      title: (
        <Box component={"span"} data-testid="poolList.blockLifetimeTitle">
          {t("glossary.blocksLifetime")}
        </Box>
      ),
      minWidth: "100px",
      key: "lifetimeBlock",
      render: (r, idx) => (
        <Box component={"span"} data-testid={`poolList.blockLifetimeValue#${idx}`}>
          {r.lifetimeBlock || 0}
        </Box>
      ),
      sort: ({ columnKey, sortValue }) => {
        sortValue ? setSort(`${columnKey},${sortValue}`) : handleBlankSort();
      }
    },
    {
      title: (
        <Box component={"span"} data-testid="poolList.votingPowerTitle">
          {t("votingPower")}
        </Box>
      ),
      key: "votingPower",
      minWidth: "120px",
      render: (r, idx) =>
        r.votingPower != null ? (
          <CustomTooltip data-testid={`poolList.votingPowerValue#${idx}`} title={`${r.votingPower * 100}%`}>
            <Box component={"span"}>{formatPercent(r.votingPower)}</Box>
          </CustomTooltip>
        ) : (
          t("common.N/A")
        ),
      sort: ({ columnKey, sortValue }) => {
        sortValue ? setSort(`${columnKey},${sortValue}`) : handleBlankSort();
      }
    },
    {
      title: (
        <Box component={"span"} data-testid="poolList.participationRateTitle">
          {t("governanceParticipationRate")}
        </Box>
      ),
      key: "governanceParticipationRate",
      minWidth: "120px",
      render: (r, idx) => (
        <div data-testid={`poolList.participationRateValue#${idx}`}>
          {r.governanceParticipationRate != null ? `${formatPercent(r.governanceParticipationRate)}` : t("common.N/A")}
        </div>
      ),
      sort: ({ columnKey, sortValue }) => {
        sortValue ? setSort(`${columnKey},${sortValue}`) : handleBlankSort();
      }
    }
  ];

  return (
    <DelegationContainer>
      {!error && (
        <TopSearchContainer sx={{ justifyContent: "space-between" }}>
          <ListOfPools>{t("pool.listOfPools")}</ListOfPools>
          <Box display="flex" gap="10px">
            <CustomFilterMultiRange />
          </Box>
        </TopSearchContainer>
      )}
      <Table
        {...fetchData}
        data-testid="delegationList.table"
        columns={columns.filter((col) => {
          if (CONWAY_ERE_FEILD.includes(col.key) && !FF_GLOBAL_IS_CONWAY_ERA) {
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
    </DelegationContainer>
  );
};

export default DelegationLists;
