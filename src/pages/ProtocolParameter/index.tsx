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
import { isEmpty, isObject } from "lodash";
import moment from "moment";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { HiArrowLongLeft } from "react-icons/hi2";
import { ImArrowDown2, ImArrowUp2 } from "react-icons/im";
import { IoIosArrowDown, IoIosArrowUp, IoMdClose } from "react-icons/io";
import { Link, useHistory, useParams } from "react-router-dom";
import { useList, useUpdateEffect } from "react-use";

import useFetch from "src/commons/hooks/useFetch";
import { DateRangeIcon, FilterIcon, ProtocolParam, ResetIcon } from "src/commons/resources";
import InfoSolidIcon from "src/components/commons/InfoSolidIcon";
import { details, lists } from "src/commons/routers";
import { API } from "src/commons/utils/api";
import { PROTOCOL_TYPE } from "src/commons/utils/constants";
import { formatDateTimeLocal } from "src/commons/utils/helper";
import ParseScriptModal from "src/components/ParseScriptModal";
import Card from "src/components/commons/Card";
import DateRangeModal from "src/components/commons/CustomFilter/DateRangeModal";
import CustomIcon from "src/components/commons/CustomIcon";
import { CommonSkeleton } from "src/components/commons/CustomSkeleton";
import CustomTooltip from "src/components/commons/CustomTooltip";
import NoRecord from "src/components/commons/NoRecord";
import Table from "src/components/commons/Table";
import { ProtocolFixed, ProtocolHistory, ProtocolTypeKey, TProtocolItem, TProtocolParam } from "src/types/protocol";
import { InfoIcon } from "src/components/commons/DetailHeader/styles";
import { Column } from "src/types/table";

import { ExplainerTextModal } from "./ExplainerTextModal";
import { explainerTextGlobalConstants, explainerTextProtocolHistory } from "./explainerText";
import {
  AccordionContainer,
  AccordionSummary,
  ApplyFilterButton,
  BackButton,
  BackText,
  ButtonFilter,
  ColumnProtocol,
  FilterContainer,
  Header,
  HeaderButton,
  StyledDropdownItem,
  TextDescription
} from "./styles";
import TxsProtocolModal from "./TxsProtocolModal";

interface IProtocolParamVertical {
  name: string;
  value: string;
  epoch?: number;
  timestamp?: string;
}

interface IVerticalLatestTable {
  name: string;
  value: string;
  epochNo: number;
  time: string;
}

const ProtocolParameter: React.FC = () => {
  const { t } = useTranslation();
  const [costModelScript, setCostModelScript] = useState("");
  const [titleModal, setTitleModal] = useState("");
  const { histories } = useParams<{ histories?: "histories" }>();
  const history = useHistory();
  const { PROTOCOL_PARAMETER } = API;
  const { data: dataFixed, initialized: initialFixed } = useFetch<ProtocolFixed>(PROTOCOL_PARAMETER.FIXED);
  const { data: dataLastest, initialized: initialLastest } = useFetch<Partial<TProtocolParam>>(
    PROTOCOL_PARAMETER.LASTEST
  );

  const dataFixedVertical =
    isObject(dataFixed) &&
    Object.entries(dataFixed).map(([name, value]: [string, string]) => ({
      name,
      value: isObject(value) ? JSON.stringify(value) : value
    }));

  const dataLatestVertical =
    isObject(dataLastest) &&
    Object.entries(dataLastest)
      .map(([name, valueObject]) => {
        const convertedObj = valueObject as Partial<
          TProtocolItem & TProtocolParam["epochChange"] & { epochNo: number; time: string }
        >;
        return {
          name,
          value: name === "costModel" ? JSON.stringify(valueObject) : convertedObj?.value,
          epochNo: convertedObj?.epochNo,
          time: convertedObj?.time
        };
      })
      .filter((item) => item.name !== "timestamp");

  const [explainerText, setExplainerText] = useState<{ title: string; content: string } | null>(null);

  useEffect(() => {
    window.history.replaceState({}, document.title);
    document.title = `${t("common.protocolParameters")} | ${t("head.page.dashboard")}`;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const theme = useTheme();

  const columnsVerticalFixedTable: Column<IProtocolParamVertical>[] = [
    {
      title: t("common.parameterName"),
      key: "name",
      render: (r: IProtocolParamVertical) => {
        const k = r.name;
        return (
          <Box>
            {k}{" "}
            {explainerTextGlobalConstants[k as keyof Omit<ProtocolHistory, "epochChanges">] && (
              <Box
                component={IconButton}
                padding={"2px"}
                onClick={() =>
                  setExplainerText({
                    content: t(`explain.${k}`),
                    title: k
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
    {
      title: t("common.value"),
      key: "value",
      maxWidth: 400,
      render: (r) => {
        const k = r.name;
        const isModalType = k === "genDelegs";
        return (
          <Box
            component={isModalType ? Button : Box}
            onClick={() => {
              if (isModalType) {
                setCostModelScript(r.value);
                setTitleModal(k);
              }
            }}
            p={0}
            justifyItems={"flex-start"}
            textTransform={"capitalize"}
          >
            <Box
              maxWidth={300}
              overflow={"hidden"}
              whiteSpace={"nowrap"}
              textOverflow={"ellipsis"}
              color={({ palette }) => (isModalType ? palette.primary.main : "unset")}
            >
              {r.value}
            </Box>
          </Box>
        );
      }
    }
  ];

  const columnsVerticalLatestTable: Column<IVerticalLatestTable>[] = [
    {
      title: t("common.parameterName"),
      key: "name",
      render: (r: IProtocolParamVertical) => {
        const k = r.name;
        return (
          <Box>
            {k}{" "}
            {explainerTextProtocolHistory[k as keyof Omit<ProtocolHistory, "epochChanges">] && (
              <Box
                component={IconButton}
                padding={"2px"}
                onClick={() =>
                  setExplainerText({
                    content: t(`explain.${k}`),
                    title: k
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
    {
      title: t("common.value"),
      key: "value",
      maxWidth: 400,
      render: (r) => {
        const k = r.name;
        const isModalType = k === "costModel";
        return (
          <Box
            component={isModalType ? Button : Box}
            onClick={() => {
              if (isModalType) {
                setCostModelScript(r.value);
                setTitleModal(k);
              }
            }}
            p={0}
            justifyItems={"flex-start"}
            textTransform={"capitalize"}
          >
            <Box
              maxWidth={300}
              overflow={"hidden"}
              whiteSpace={"nowrap"}
              textOverflow={"ellipsis"}
              color={({ palette }) => (isModalType ? palette.primary.main : "unset")}
            >
              {r.value}
            </Box>
          </Box>
        );
      }
    },
    {
      title: t("common.lastUpdatedInEpoch"),
      key: "epochNo",
      render: (r) => <Box>{r?.epochNo}</Box>
    },
    {
      title: t("common.timestamp"),
      key: "timestamp",
      render: (r) => (r?.time ? formatDateTimeLocal(r.time) : "")
    }
  ];

  if (histories && histories !== "histories") return <NoRecord />;

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
        <Card title={t("common.protocolParameters")}>
          <Box pt={2}>
            <>
              <Box pb={"30px"} borderBottom={`1px solid ${alpha(theme.palette.common.black, 0.1)}`}>
                <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
                  <Header>{t("common.updatableParameters")}</Header>
                  <HeaderButton variant="contained" onClick={() => history.push(lists.protocolParameters("histories"))}>
                    {t("common.viewUpdateHistory")}
                  </HeaderButton>
                </Box>
                {!initialLastest && (
                  <Box
                    component={CommonSkeleton}
                    mt={2}
                    borderRadius={({ spacing }) => spacing(2)}
                    variant="rectangular"
                    height={280}
                  />
                )}
                {initialLastest && <Table columns={columnsVerticalLatestTable} data={dataLatestVertical || []} />}
              </Box>
              <Box pt={"30px"}>
                <Box>
                  <Box
                    textAlign={"left"}
                    color={({ palette }) => palette.secondary.main}
                    fontWeight={"bold"}
                    fontSize={"1.25rem"}
                  >
                    {t("glossary.globalconstants")}
                  </Box>
                  {!initialFixed && (
                    <Box
                      component={CommonSkeleton}
                      mt={2}
                      borderRadius={({ spacing }) => spacing(2)}
                      variant="rectangular"
                      height={280}
                    />
                  )}
                  {initialFixed && <Table columns={columnsVerticalFixedTable} data={dataFixedVertical || []} />}
                </Box>
              </Box>
            </>
          </Box>
        </Card>
      )}
      <ParseScriptModal
        open={!!costModelScript}
        onClose={() => setCostModelScript("")}
        script={costModelScript}
        title={titleModal || "CostModel"}
      />
      <ExplainerTextModal
        open={!!explainerText}
        handleCloseModal={() => setExplainerText(null)}
        explainerText={explainerText || { content: "", title: "" }}
      />
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
  const { data: dataHistory, loading, initialized } = useFetch<ProtocolHistory>(url);

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
      (data.epochChanges || [])?.map(({ endEpoch, startEpoch }) => {
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
                <Box>
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

  useUpdateEffect(() => {
    if (columnTitle) {
      getDataColumn(dataHistory);
      setColumnsTable([...columnsFull]);
    }
  }, [JSON.stringify(columnTitle), JSON.stringify(dataHistory)]);

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
              <Box display={"inline-block"}>
                <InfoIcon style={{ cursor: "pointer" }} />
              </Box>
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
            </Box>
            {showFilter && (
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
              {sort === "LastFirst" && <BsFillCheckCircleFill size={16} color={theme.palette.secondary.main} />}
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
              {sort === "FirstLast" && <BsFillCheckCircleFill size={16} color={theme.palette.secondary.main} />}
            </Box>
          </ButtonFilter>
          <ButtonFilter onClick={() => setShowDaterange(true)}>
            <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
              <Box display={"flex"} alignItems={"center"}>
                <CustomIcon icon={DateRangeIcon} fill={theme.palette.secondary.main} height={18} />
                <Box ml={1} color={({ palette }) => palette.secondary.main}>
                  {" "}
                  {t("filter.daterange")}
                </Box>
              </Box>
              {!isEmpty(dateRange) && <BsFillCheckCircleFill size={16} color={theme.palette.secondary.main} />}
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
