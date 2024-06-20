import styled from "@emotion/styled";
import {
  AccordionDetails,
  Box,
  Button,
  Checkbox,
  ClickAwayListener,
  Container,
  IconButton,
  alpha,
  useTheme
} from "@mui/material";
import { isEmpty } from "lodash";
import moment from "moment";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { HiArrowLongLeft } from "react-icons/hi2";
import { ImArrowDown2, ImArrowUp2 } from "react-icons/im";
import { IoIosArrowDown, IoIosArrowUp, IoMdClose } from "react-icons/io";
import { Link, useHistory, useParams } from "react-router-dom";
import { useList, useUpdateEffect } from "react-use";
import { useSelector } from "react-redux";

import useFetch from "src/commons/hooks/useFetch";
import { DateRangeIcon, FilterIcon, ProtocolParam, ResetIcon } from "src/commons/resources";
import InfoSolidIcon from "src/components/commons/InfoSolidIcon";
import { details, lists } from "src/commons/routers";
import { API } from "src/commons/utils/api";
import { PROTOCOL_TYPE, FF_GLOBAL_IS_CONWAY_ERA } from "src/commons/utils/constants";
import { getShortValue } from "src/commons/utils/helper";
import Card from "src/components/commons/Card";
import DateRangeModal from "src/components/commons/CustomFilter/DateRangeModal";
import CustomIcon from "src/components/commons/CustomIcon";
import { CommonSkeleton } from "src/components/commons/CustomSkeleton";
import CustomTooltip from "src/components/commons/CustomTooltip";
import NoRecord from "src/components/commons/NoRecord";
import Table from "src/components/commons/Table";
import { ProtocolHistory, ProtocolTypeKey, TProtocolItem, TProtocolParam } from "src/types/protocol";
import { Column } from "src/types/table";
import GroupProtocoParameters from "src/components/ProtocolParameters/GroupProtocolParameters/GroupProtocolParameters";
import ProtocolHeader from "src/components/ProtocolParameters/ProtocolHeader";
import {
  displayTooltipEconomic,
  displayTooltipGovernance,
  displayTooltipNetwork,
  displayTooltipTechnical
} from "src/components/ProtocolParameters/ExplainerText";

import { ExplainerTextModal } from "./ExplainerTextModal";
import { explainerTextProtocolHistory } from "./explainerText";
import {
  AccordionContainer,
  AccordionSummary,
  ApplyFilterButton,
  BackButton,
  BackText,
  ButtonFilter,
  ColumnProtocol,
  FilterContainer,
  StyledDropdownItem,
  TextDescription
} from "./styles";
import TxsProtocolModal from "./TxsProtocolModal";

const ProtocolParameter: React.FC = () => {
  const { t } = useTranslation();

  const { histories } = useParams<{ histories?: "histories" }>();
  const history = useHistory();
  const { PROTOCOL_PARAMETER } = API;
  const { data: dataLastest, loading } = useFetch<Partial<TProtocolParam>>(PROTOCOL_PARAMETER.LASTEST);

  useEffect(() => {
    window.history.replaceState({}, document.title);
    document.title = `${t("common.protocolParameters")} | ${t("head.page.dashboard")}`;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const theme = useTheme();

  if (histories && histories !== "histories") return <NoRecord />;

  const Network = [
    { name: "maxBBSize", value: dataLastest?.maxBBSize?.value, time: dataLastest?.maxBBSize?.time, icon: true },
    { name: "maxTxSize", value: dataLastest?.maxTxSize?.value, time: dataLastest?.maxTxSize?.time, icon: true },
    { name: "maxBHSize", value: dataLastest?.maxBHSize?.value, time: dataLastest?.maxBHSize?.time, icon: true },
    { name: "maxValSize", value: dataLastest?.maxValSize?.value, time: dataLastest?.maxValSize?.time, icon: true },
    {
      name: "maxTxExUnits",
      value: dataLastest?.maxTxExUnits?.value,
      time: dataLastest?.maxTxExUnits?.time,
      icon: false
    },
    {
      name: "maxBlockExUnits",
      value: dataLastest?.maxBlockExUnits?.value,
      time: dataLastest?.maxBlockExUnits?.time,
      icon: true
    },
    {
      name: "maxCollateralInputs",
      value: dataLastest?.maxCollateralInputs?.value,
      time: dataLastest?.maxCollateralInputs?.time,
      icon: false
    }
  ];

  const Economic = [
    { name: "minFeeA", value: dataLastest?.minFeeA?.value, time: dataLastest?.minFeeA?.time, icon: true },
    { name: "minFeeB", value: dataLastest?.minFeeB?.value, time: dataLastest?.minFeeB?.time, icon: true },
    { name: "keyDeposit", value: dataLastest?.keyDeposit?.value, time: dataLastest?.keyDeposit?.time, icon: false },
    { name: "poolDeposit", value: dataLastest?.poolDeposit?.value, time: dataLastest?.poolDeposit?.time, icon: false },
    {
      name: "rho",
      value: dataLastest?.rho?.value,
      time: dataLastest?.rho?.time,
      icon: false
    },
    {
      name: "tau",
      value: dataLastest?.tau?.value,
      time: dataLastest?.tau?.time,
      icon: false
    },
    {
      name: "minPoolCost",
      value: dataLastest?.minPoolCost?.value,
      time: dataLastest?.minPoolCost?.time,
      icon: false
    },
    {
      name: "coinsPerUTxOByte",
      value: dataLastest?.coinsPerUTxOByte?.value,
      time: dataLastest?.coinsPerUTxOByte?.time,
      icon: true
    },
    {
      name: "prices",
      value: dataLastest?.prices?.value,
      time: dataLastest?.prices?.time,
      icon: false
    }
  ];

  const Technical = [
    { name: "a0", value: dataLastest?.a0?.value, time: dataLastest?.a0?.time, icon: false },
    { name: "eMax", value: dataLastest?.eMax?.value, time: dataLastest?.eMax?.time, icon: false },
    { name: "nOpt", value: dataLastest?.nOpt?.value, time: dataLastest?.nOpt?.time, icon: false },
    { name: "costModels", value: dataLastest?.costModels?.value, time: dataLastest?.costModels?.time, icon: false },
    {
      name: "collateralPercentage",
      value: dataLastest?.collateralPercentage?.value,
      time: dataLastest?.collateralPercentage?.time,
      icon: false
    }
  ];

  const Governance = [
    {
      name: "govActionLifetime",
      value: dataLastest?.govActionLifetime?.value,
      time: dataLastest?.govActionLifetime?.time,
      icon: false
    },
    {
      name: "govActionDeposit",
      value: dataLastest?.govActionDeposit?.value,
      time: dataLastest?.govActionDeposit?.time,
      icon: true
    },
    { name: "drepDeposit", value: dataLastest?.drepDeposit?.value, time: dataLastest?.drepDeposit?.time, icon: false },
    {
      name: "drepActivity",
      value: dataLastest?.drepActivity?.value,
      time: dataLastest?.drepActivity?.time,
      icon: false
    },
    {
      name: "ccMinSize",
      value: dataLastest?.ccMinSize?.value,
      time: dataLastest?.ccMinSize?.time,
      icon: false
    },
    {
      name: "ccMaxTermLength",
      value: dataLastest?.ccMaxTermLength?.value,
      time: dataLastest?.ccMaxTermLength?.time,
      icon: false
    }
  ];

  return (
    <Container>
      {histories && (
        <Box textAlign={"left"} sx={{ marginTop: "30px" }}>
          <BackButton onClick={() => history.push(lists.protocolParameters())}>
            <HiArrowLongLeft color={theme.palette.secondary.light} />
            <BackText>{t("common.back")}</BackText>
          </BackButton>
        </Box>
      )}
      {histories && <ProtocolParameterHistory />}
      {!histories && (
        <Box marginBottom={"109px"} marginTop={"64px"}>
          <ProtocolHeader />
          <GroupProtocoParameters loading={loading} data={displayTooltipNetwork} group={Network} type="network" />
          <GroupProtocoParameters loading={loading} group={Economic} data={displayTooltipEconomic} type="economic" />
          <GroupProtocoParameters loading={loading} group={Technical} data={displayTooltipTechnical} type="technical" />
          {FF_GLOBAL_IS_CONWAY_ERA && (
            <GroupProtocoParameters
              loading={loading}
              data={displayTooltipGovernance}
              group={Governance}
              type="governance"
            />
          )}
        </Box>
      )}
    </Container>
  );
};

export default ProtocolParameter;

export const ProtocolParameterHistory = () => {
  const { t } = useTranslation();
  const { PROTOCOL_PARAMETER } = API;
  const TOTAL_PARAMETER = 29;
  const theme = useTheme();
  const [initing, setIniting] = useState(true);
  const [filterParams, setFilterParams] = useState<string[]>([]);
  const [selectTxs, setSelectTxs] = useState<string[] | null>(null);
  const [dateRangeFilter, setDateRangeFilter] = useState<{ fromDate?: string; toDate?: string }>({});
  const [explainerText, setExplainerText] = useState<{ title: string; content: string } | null>(null);

  const { currentEpoch } = useSelector(({ system }: RootState) => system);
  const currentEpochNo = currentEpoch?.no || 0;
  const historyUrlBase = PROTOCOL_PARAMETER.HISTORY;
  let historyUrlParams = "";
  if (filterParams.length === 0 || filterParams.length === TOTAL_PARAMETER) {
    historyUrlParams = "ALL";
  } else {
    const filterParamValues = filterParams.map((f) => PROTOCOL_TYPE[f as keyof typeof PROTOCOL_TYPE]);
    historyUrlParams = filterParamValues.join(",");
  }

  let dateRangeQueryParams = "";
  if (!isEmpty(dateRangeFilter)) {
    const endDate = moment(dateRangeFilter.toDate).endOf("D").utc().format("X");
    const startDate = moment(dateRangeFilter.fromDate).startOf("D").utc().format("X");
    dateRangeQueryParams = `?endTime=${endDate}&startTime=${startDate}`;
  }

  const url = `${historyUrlBase}/${historyUrlParams}${dateRangeQueryParams}`;
  const {
    data: dataHistory,
    loading,
    initialized,
    error: errorHistory,
    statusError: statusErrHistory
  } = useFetch<ProtocolHistory>(url);
  const [isShowUpcomingEpoch, setIsShowUpcomingEpoch] = useState<boolean>(false);

  const [dataHistoryMapping, { push: pushHistory, clear }] = useList<{
    [key: string]: string;
  }>([]);

  const [columnTitle, { push: pushColumnTitle, clear: clearColumnTitle }] = useList<string>([]);
  const [dataTable, setDataTable] = useState<{ [key: string]: string }[]>([]);
  const [columnsTable, setColumnsTable] = useState<Column<TProtocolParam & { params: string }>[]>([]);

  const [showFilter, setShowFiter] = useState(false);
  const [resetFilter, setResetFilter] = useState<boolean>(false);
  const [sortTimeFilter, setSortTimeFilter] = useState<"FirstLast" | "LastFirst" | "">("");
  const [totalEpoch, setTotalEpoch] = useState<number>(0);

  const getTitleColumn = (data: ProtocolHistory | null) => {
    data &&
      (data.epochChanges || [])?.map(({ endEpoch, startEpoch }, index) => {
        if (index === 0 && isShowUpcomingEpoch) {
          return pushColumnTitle(`${t("glossary.upcomingEpoch")} ${startEpoch}`);
        }
        return endEpoch === startEpoch
          ? pushColumnTitle(`${t("glossary.epoch")} ${startEpoch}`)
          : pushColumnTitle(`${t("glossary.epoch")} ${endEpoch} - ${startEpoch}`);
      });
  };

  const getDataColumn = (data: ProtocolHistory | null) => {
    clear();
    for (const prop in data) {
      if (Object.hasOwn(data, prop)) {
        const newdata: { [key: string]: string } = {
          params: prop
        };
        columnTitle.map((t, idx) => {
          newdata[t] = data[prop as keyof ProtocolHistory][idx] as unknown as string;
        });
        if (newdata) {
          pushHistory(newdata);
        }
      }
    }
  };

  const columnsMap: Column<Record<string, TProtocolItem> | (TProtocolParam & { params: string })>[] = columnTitle.map(
    (t) => ({
      title: t,
      key: t,
      render: (r) => {
        return (
          <ColumnProtocol
            isLink={
              r[t as ProtocolTypeKey] !== null
                ? ["UPDATED", "ADDED"].includes(r[t as ProtocolTypeKey]?.status as string)
                  ? 1
                  : 0
                : 0
            }
            onClick={() => {
              setSelectTxs(r[t as ProtocolTypeKey]?.transactionHashs || null);
            }}
            component={["UPDATED", "ADDED"].includes(r[t as ProtocolTypeKey]?.status as string) ? Link : Box}
            to={
              r[t as ProtocolTypeKey]?.transactionHashs && r[t as ProtocolTypeKey]?.transactionHashs.length === 1
                ? details.transaction(r[t as ProtocolTypeKey]?.transactionHashs[0], "protocols")
                : "#"
            }
          >
            {(r[t as ProtocolTypeKey]?.status === "ADDED" || r[t as ProtocolTypeKey]?.status === "UPDATED") &&
            !r[t as ProtocolTypeKey]?.transactionHashs ? (
              <CustomTooltip title="No transaction">
                <Box component={"div"} style={{ overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>
                  {r[t as ProtocolTypeKey]
                    ? r[t as ProtocolTypeKey]?.value
                      ? r[t as ProtocolTypeKey]?.value
                      : r[t as ProtocolTypeKey]?.value === 0
                      ? 0
                      : ""
                    : ""}
                </Box>
              </CustomTooltip>
            ) : r[t as ProtocolTypeKey] ? (
              r[t as ProtocolTypeKey]?.value ? (
                r[t as ProtocolTypeKey]?.value
              ) : r[t as ProtocolTypeKey]?.value === 0 ? (
                0
              ) : (
                ""
              )
            ) : (
              ""
            )}
          </ColumnProtocol>
        );
      }
    })
  );

  const columnsFull: Column<TProtocolParam & { params: string }>[] = [
    {
      title: t("common.parameterName"),
      key: "ParameterName",
      fixed: true,
      render: (r: TProtocolParam & { params: string }) => {
        return (
          <Box p={"24px 20px"}>
            {r?.params}
            {explainerTextProtocolHistory[r?.params as keyof Omit<ProtocolHistory, "epochChanges">] && (
              <Box
                component={IconButton}
                padding={"2px"}
                onClick={() =>
                  setExplainerText({
                    content: t(`explain.${r?.params}`),
                    title: r?.params
                  })
                }
              >
                <InfoSolidIcon />
              </Box>
            )}
          </Box>
        );
      }
    },
    ...columnsMap
  ];

  useUpdateEffect(() => {
    if (dataHistory) {
      clearColumnTitle();
      getTitleColumn(dataHistory);
      const totalEpoch = (dataHistory?.epochChanges || []).reduce((acc, cur) => {
        return acc + (cur.endEpoch === cur.startEpoch ? 1 : cur.startEpoch - cur.endEpoch + 1);
      }, 0);
      setTotalEpoch(totalEpoch);
    }
  }, [JSON.stringify(dataHistory)]);

  const newCostModel = dataHistory?.costModel?.map((item): TProtocolItem => {
    return {
      ...item,
      value: getShortValue(item.value?.toString() || "")
    };
  }) as TProtocolItem[];

  useUpdateEffect(() => {
    if (columnTitle && dataHistory) {
      getDataColumn(
        newCostModel
          ? {
              ...dataHistory,
              costModel: newCostModel || []
            }
          : dataHistory
      );
      setColumnsTable([...columnsFull]);
    }
  }, [JSON.stringify(columnTitle), JSON.stringify(dataHistory)]);

  useEffect(() => {
    if (dataHistory && dataHistory?.epochChanges?.length > 0) {
      setIsShowUpcomingEpoch(currentEpochNo < dataHistory?.epochChanges[0].endEpoch);
    }
  }, [dataHistory, currentEpochNo, dataHistory?.epochChanges?.length]);

  useEffect(() => {
    if (dataHistory) {
      clear();
      clearColumnTitle();
      getTitleColumn(dataHistory);
      getDataColumn(dataHistory);
    }
  }, [isShowUpcomingEpoch]);

  useUpdateEffect(() => {
    setDataTable([...dataHistoryMapping].slice(1));
    setIniting(false);
  }, [JSON.stringify(dataHistoryMapping)]);

  useUpdateEffect(() => {
    if (resetFilter) {
      setFilterParams([]);
      setSortTimeFilter("");
      setDateRangeFilter({});
      setResetFilter(false);
    }
  }, [resetFilter]);
  const totalFilter = filterParams.length + (sortTimeFilter ? 1 : 0) + (dateRangeFilter.fromDate ? 1 : 0);
  useUpdateEffect(() => {
    setColumnsTable([columnsTable[0], ...columnsTable.slice(1).reverse()]);
  }, [sortTimeFilter]);

  if (loading) {
    return (
      <Box
        component={CommonSkeleton}
        mt={2}
        borderRadius={({ spacing }) => spacing(2)}
        variant="rectangular"
        height={400}
      />
    );
  }

  return (
    <Box>
      <Card
        titleSx={{
          margin: 0,
          width: "100%"
        }}
        title={
          <Box>
            {t("common.ppUpdateHistory")}{" "}
            <CustomTooltip
              title={
                <Box>
                  {t("explain.shelleyEra", {
                    epoch: 208
                  })}
                  <Box
                    ml={1}
                    color={({ palette }) => `${palette.primary[200]} !important`}
                    component={"a"}
                    href="https://github.com/cardano-foundation/CIPs/tree/master/CIP-0009"
                    rel="noreferrer"
                    target="_blank"
                  >
                    https://github.com/cardano-foundation/CIPs/tree/master/CIP-0009
                  </Box>
                </Box>
              }
            >
              <span>
                <InfoSolidIcon />
              </span>
            </CustomTooltip>
          </Box>
        }
        textAlign={"left"}
        extra={
          <Box position={"relative"}>
            <Box display={"flex"} alignItems={"center"} gap={"15px"}>
              {Boolean(totalFilter && totalEpoch) && (
                <TextDescription>
                  {totalEpoch > 1
                    ? t("glossary.showingNumberEpochs", { total: totalEpoch })
                    : t("glossary.showingNumberEpoch", { total: totalEpoch })}
                </TextDescription>
              )}
              {!errorHistory && (
                <Box
                  component={Button}
                  variant="text"
                  textTransform={"capitalize"}
                  bgcolor={({ palette, mode }) => (mode === "dark" ? palette.secondary[0] : palette.primary[200])}
                  border={({ palette, mode }) => `1px solid ${mode === "dark" ? "none" : palette.primary[200]}`}
                  px={2}
                  onClick={() => setShowFiter(!showFilter)}
                >
                  <CustomIcon
                    icon={FilterIcon}
                    fill={theme.mode === "dark" ? theme.palette.primary.main : theme.palette.secondary.light}
                    height={18}
                  />
                  <Box
                    ml={1}
                    whiteSpace={"nowrap"}
                    fontWeight={"bold"}
                    color={({ palette, mode }) => (mode === "dark" ? palette.primary.main : palette.secondary.light)}
                  >
                    {t("common.filter")} {totalFilter ? `(${totalFilter})` : ""}
                  </Box>
                </Box>
              )}
            </Box>
            {showFilter && !errorHistory && (
              <FilterComponent
                setFilterParams={setFilterParams}
                setResetFilter={setResetFilter}
                setShowFiter={setShowFiter}
                filterParams={filterParams}
                setSortTimeFilter={setSortTimeFilter}
                sortTimeFilter={sortTimeFilter}
                setDateRangeFilter={setDateRangeFilter}
                dateRangeFilter={dateRangeFilter}
              />
            )}
          </Box>
        }
      >
        {initialized && !!dataHistory ? (
          columnsTable?.length === 1 &&
          !initing &&
          !loading && (
            <Box textAlign={"center"}>
              <NoRecord />
              <Box
                component={Button}
                width={"200px"}
                textTransform={"capitalize"}
                onClick={() => {
                  setResetFilter(true);
                  setShowFiter(false);
                }}
                mx={"auto"}
                display={"flex"}
                alignItems={"center"}
                mt={3}
                mb={2}
                color={`${theme.palette.primary.main} !important`}
              >
                <Box mr={1}>Reset</Box>
                <ResetIcon />
              </Box>
            </Box>
          )
        ) : (
          <></>
        )}
        {columnsTable?.length > 1 && initialized && (
          <TableStyled columns={columnsTable} data={dataTable} loading={loading} />
        )}

        {errorHistory && (
          <TableStyled
            columns={columnsTable}
            data={dataTable}
            error={errorHistory}
            statusError={statusErrHistory}
            loading={loading}
          />
        )}
      </Card>
      <ExplainerTextModal
        open={!!explainerText}
        handleCloseModal={() => setExplainerText(null)}
        explainerText={explainerText || { content: "", title: "" }}
      />
      <TxsProtocolModal open={!!selectTxs} onClose={() => setSelectTxs(null)} txs={selectTxs} />
    </Box>
  );
};

export const TableStyled = styled(Table)(() => ({
  td: {
    padding: 0
  }
}));

interface FilterComponentProps {
  filterParams: string[];
  sortTimeFilter: "FirstLast" | "LastFirst" | "";
  setFilterParams: (feild: string[]) => void;
  setResetFilter: (reset: boolean) => void;
  setShowFiter: (show: boolean) => void;
  setSortTimeFilter: (sortTime: "FirstLast" | "LastFirst" | "") => void;
  dateRangeFilter: {
    fromDate?: string;
    toDate?: string;
  };
  setDateRangeFilter: React.Dispatch<
    React.SetStateAction<{
      fromDate?: string;
      toDate?: string;
    }>
  >;
}

export const FilterComponent: React.FC<FilterComponentProps> = ({
  setFilterParams,
  setResetFilter,
  setSortTimeFilter,
  setShowFiter,
  setDateRangeFilter,
  filterParams,
  sortTimeFilter,
  dateRangeFilter
}) => {
  const [filterOption, { push: pushFilterOption, removeAt: removeAtFilterOption, clear }] =
    useList<string>(filterParams);
  const theme = useTheme();
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState<string | false>("");
  const [showDaterange, setShowDaterange] = useState<boolean>(false);
  const [sort, setSort] = useState<"FirstLast" | "LastFirst" | "">(sortTimeFilter);
  const [dateRange, setDateRange] = useState<{
    fromDate?: string;
    toDate?: string;
  }>(dateRangeFilter);
  const handleChange = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleApplyFilter = () => {
    setFilterParams([...filterOption]);
    setSortTimeFilter(sort);
    setDateRangeFilter(dateRange);
    setShowFiter(false);
  };
  return (
    <ClickAwayListener
      onClickAway={() => {
        setShowFiter(false);
      }}
    >
      <FilterContainer padding={2} pt={5}>
        <CloseButton saving={0} onClick={() => setShowFiter(false)} data-testid="close-modal-button">
          <IoMdClose color={theme.palette.secondary.main} />
        </CloseButton>
        <Box display={"flex"} flexDirection={"column"}>
          <ButtonFilter onClick={() => setSort("LastFirst")}>
            <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
              <Box display={"flex"} alignItems={"center"}>
                <ImArrowDown2 color={theme.palette.secondary.main} />
                <Box ml={1} color={({ palette }) => palette.secondary.main}>
                  {t("filter.latestFirst")}
                </Box>
              </Box>
              {sort === "LastFirst" && <BsFillCheckCircleFill size={14} color={theme.palette.primary.main} />}
            </Box>
          </ButtonFilter>
          <ButtonFilter onClick={() => setSort("FirstLast")}>
            <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
              <Box display={"flex"} alignItems={"center"}>
                <ImArrowUp2 color={theme.palette.secondary.main} />
                <Box ml={1} color={({ palette }) => palette.secondary.main}>
                  {t("filter.firstLatest")}
                </Box>
              </Box>
              {sort === "FirstLast" && <BsFillCheckCircleFill size={14} color={theme.palette.primary.main} />}
            </Box>
          </ButtonFilter>
          <ButtonFilter onClick={() => setShowDaterange(true)}>
            <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
              <Box display={"flex"} alignItems={"center"}>
                <CustomIcon
                  data-testid="date-range"
                  icon={DateRangeIcon}
                  fill={theme.palette.secondary.main}
                  height={18}
                />
                <Box ml={1} color={({ palette }) => palette.secondary.main}>
                  {" "}
                  {t("filter.daterange")}
                </Box>
              </Box>
              {Boolean(dateRange.fromDate) && Boolean(dateRange.toDate) && (
                <BsFillCheckCircleFill size={14} color={theme.palette.primary.main} />
              )}
            </Box>
          </ButtonFilter>

          <AccordionContainer expanded={expanded === "params"} onChange={handleChange("params")}>
            <AccordionSummary>
              <Box
                fontSize={"0.875rem"}
                width={"100%"}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <Box display={"flex"} alignItems={"center"}>
                  <CustomIcon icon={ProtocolParam} stroke={theme.palette.secondary.main} height={20} />
                  <Box ml={1} color={({ palette }) => palette.secondary.main}>
                    {t("common.parameterChanges")} {filterOption.length > 0 ? `(${filterOption.length})` : ""}
                  </Box>
                </Box>
                <Box>
                  {expanded === "params" ? (
                    <IoIosArrowDown color={theme.palette.secondary.main} />
                  ) : (
                    <IoIosArrowUp color={theme.palette.secondary.main} />
                  )}
                </Box>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Box height={170} overflow={"auto"}>
                <Box>
                  <Checkbox
                    checked={filterOption.length === Object.keys(PROTOCOL_TYPE).length}
                    id={"all"}
                    sx={{
                      color: ({ palette, isDark }) => alpha(isDark ? palette.common.white : palette.common.black, 0.15),
                      "&.Mui-checked": {
                        color: `${theme.palette.primary.main} !important`
                      }
                    }}
                    onChange={(e) => {
                      if (e.target.checked) {
                        clear();
                        pushFilterOption(...Object.keys(PROTOCOL_TYPE));
                      } else {
                        clear();
                      }
                    }}
                  />
                  <StyledDropdownItem htmlFor={"all"} style={{ cursor: "pointer" }}>
                    {t("common.allParameters")}
                  </StyledDropdownItem>
                </Box>

                {Object.keys(PROTOCOL_TYPE).map((k, idx) => (
                  <Box key={idx}>
                    <Checkbox
                      id={k}
                      checked={filterOption.includes(k)}
                      onChange={(e) =>
                        e.target.checked
                          ? pushFilterOption(k)
                          : removeAtFilterOption(filterOption.findIndex((f) => f === k))
                      }
                      sx={{
                        color: ({ palette, isDark }) =>
                          alpha(isDark ? palette.common.white : palette.common.black, 0.15),
                        "&.Mui-checked": {
                          color: `${theme.palette.primary.main} !important`
                        }
                      }}
                    />
                    <StyledDropdownItem htmlFor={k} style={{ cursor: "pointer" }}>
                      {k === "coinsPerUtxoSize" ? "coinsPerUtxoByte" : k}
                    </StyledDropdownItem>
                  </Box>
                ))}
              </Box>
            </AccordionDetails>
          </AccordionContainer>

          <Box>
            <ApplyFilterButton
              data-testid="apply-filters"
              onClick={handleApplyFilter}
              disabled={filterOption.length === 0 && !sort && isEmpty(dateRange)}
            >
              {t("common.applyFilters")}
            </ApplyFilterButton>
          </Box>
          <Box
            component={Button}
            width={"100%"}
            textTransform={"capitalize"}
            onClick={() => {
              setResetFilter(true);
              setShowFiter(false);
            }}
            display={"flex"}
            alignItems={"center"}
            mt={2}
            color={({ palette }) => `${palette.primary.main} !important`}
          >
            <Box mr={1}>{t("common.reset")}</Box>
            <CustomIcon icon={ResetIcon} height={16} fill={theme.palette.primary.main} />
          </Box>
        </Box>
        <DateRangeModal
          onClose={() => setShowDaterange(false)}
          open={showDaterange}
          value={dateRange}
          onDateRangeChange={({ fromDate, toDate }) => setDateRange({ fromDate, toDate })}
          onClearValue={() => setDateRange({ fromDate: "", toDate: "" })}
        />
      </FilterContainer>
    </ClickAwayListener>
  );
};

const CloseButton = styled(IconButton)<{ saving: number }>`
  position: absolute;
  top: 15px;
  right: 20px;
  width: 30px;
  height: 30px;
  padding: 0;
  border: 1px solid ${(props) => props.theme.palette.grey["A100"]};
  cursor: ${(props) => (props.saving ? `wait` : `pointer`)};
  &:hover {
    ${(props) => (props.saving ? `background: none;` : ``)}
  }
`;
