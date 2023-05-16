import { useEffect, useState } from "react";
import Card from "../../components/commons/Card";
import {
  AccordionDetails,
  Box,
  Button,
  Checkbox,
  Container,
  Skeleton,
  Typography,
  alpha,
  useTheme
} from "@mui/material";
import { Column } from "../../types/table";
import { PROTOCOL_TYPE } from "../../commons/utils/constants";
import Table from "../../components/commons/Table";

import useFetch from "../../commons/hooks/useFetch";
import { API } from "../../commons/utils/api";
import { ProtocolHistory, ProtocolTypeKey, TProtocolParam } from "../../types/protocol";
import { useList, useUpdateEffect } from "react-use";
import ParseScriptModal from "../../components/ParseScriptModal";
import { HiArrowLongLeft } from "react-icons/hi2";
import {
  AccordionContainer,
  AccordionSummary,
  ApplyFilterButton,
  BackButton,
  BackText,
  ButtonFilter,
  FilterContainer
} from "./styles";
import styled from "@emotion/styled";
import { DateRangeIcon, FilterIcon, FirstLast, LastFirst, ProtocolParam, ResetIcon } from "../../commons/resources";
import DateRangeModal from "../../components/FilterReport/DateRangeModal";
import moment from "moment";
import { BsFillCheckCircleFill } from "react-icons/bs";
import _ from "lodash";

const ProtocolParameter: React.FC = () => {
  const [fixedColumnList, { push: pushFixedColumn }] = useList<string>([]);
  const [variableColumnList, { push: pushVariableColumn }] = useList<string>([]);
  const [costModelScript, setCostModelScript] = useState("");
  const [showHistory, setShowHistory] = useState(false);

  const { data: dataFixed, loading: loadingFixed } = useFetch<TProtocolParam>(API.PROTOCOL_PARAMETER.FIXED);
  const { data: dataLastest, loading: loadingLastest } = useFetch<TProtocolParam>(API.PROTOCOL_PARAMETER.LASTEST);

  useUpdateEffect(() => {
    dataFixed &&
      [...Object.keys(PROTOCOL_TYPE), "startEpoch", "endEpoch"].map((k) =>
        dataFixed[k as ProtocolTypeKey] !== null ? pushFixedColumn(k) : ""
      );

    dataLastest &&
      [...Object.keys(PROTOCOL_TYPE), "startEpoch", "endEpoch"].map((k) =>
        dataLastest[k as ProtocolTypeKey] !== null && dataLastest[k as ProtocolTypeKey]?.transactionHash !== null
          ? pushVariableColumn(k)
          : ""
      );
  }, [dataFixed, dataLastest]);

  useEffect(() => {
    window.history.replaceState({}, document.title);
    document.title = `Protocol Parameters | Cardano Explorer`;
  }, []);

  const theme = useTheme();

  const columnsMap = Object.keys(PROTOCOL_TYPE).map((k, idx) => ({
    title: k,
    key: k,
    render: (r: TProtocolParam) => {
      return (
        <Box
          component={k === "costModel" ? Button : Box}
          onClick={() => k === "costModel" && setCostModelScript(r["costModel"] !== null ? r["costModel"].value : "")}
          justifyItems={"flex-start"}
          textTransform={"capitalize"}
        >
          <Box
            maxWidth={300}
            overflow={"hidden"}
            whiteSpace={"nowrap"}
            textOverflow={"ellipsis"}
            color={({ palette }) => (k === "costModel" ? palette.blue[800] : "unset")}
          >
            {r[k as ProtocolTypeKey] !== null ? r[k as ProtocolTypeKey].value : ""}
          </Box>
        </Box>
      );
    }
  }));

  const columnsFull: Column<TProtocolParam>[] = [
    {
      title: "Epoch",
      key: "startEpoch",
      render: (r: TProtocolParam) => {
        return r?.epochChange?.startEpoch || 0;
      }
    },
    ...columnsMap
  ];

  const fixedColumn = columnsFull.filter((c) => fixedColumnList.includes(c.key));
  const variableColumn = columnsFull.filter((c) => variableColumnList.includes(c.key));

  return (
    <Container>
      {showHistory && (
        <Box textAlign={"left"}>
          <BackButton onClick={() => setShowHistory(false)}>
            <HiArrowLongLeft />
            <BackText>Back</BackText>
          </BackButton>
        </Box>
      )}
      {showHistory && <ProtocolParameterHistory />}
      {!showHistory && (
        <Card marginTitle='0px' title={"Protocol parameters"} textAlign={"left"}>
          <Box pt={2}>
            <>
              <Box pb={"30px"} borderBottom={`1px solid ${alpha(theme.palette.common.black, 0.1)}`}>
                <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
                  <Box fontWeight={"bold"} fontSize={"1.25rem"}>
                    Variable Parameters
                  </Box>
                  <Box
                    component={Button}
                    variant='contained'
                    textTransform={"capitalize"}
                    fontWeight={"bold"}
                    fontSize={"0.875rem"}
                    onClick={() => setShowHistory(true)}
                  >
                    View update history
                  </Box>
                </Box>
                {loadingLastest && (
                  <Box
                    component={Skeleton}
                    mt={2}
                    borderRadius={({ spacing }) => spacing(2)}
                    variant='rectangular'
                    height={280}
                  />
                )}
                {!loadingLastest && <Table columns={variableColumn} data={dataLastest !== null ? [dataLastest] : []} />}
              </Box>
              <Box pt={"30px"}>
                <Box>
                  <Box textAlign={"left"} fontWeight={"bold"} fontSize={"1.25rem"}>
                    Fixed Parameters
                  </Box>
                  {loadingFixed && (
                    <Box
                      component={Skeleton}
                      mt={2}
                      borderRadius={({ spacing }) => spacing(2)}
                      variant='rectangular'
                      height={280}
                    />
                  )}
                  {!loadingFixed && <Table columns={fixedColumn} data={dataFixed !== null ? [dataFixed] : []} />}
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
        title='CostModel'
      />
    </Container>
  );
};

export default ProtocolParameter;

const ProtocolParameterHistory = () => {
  const { data: dataHistory, loading } = useFetch<ProtocolHistory>(API.PROTOCOL_PARAMETER.HISTORY);
  const [dataHistoryMapping, { push: pushHistory, clear }] = useList<{
    [key: string]: any;
  }>([]);

  const [columnTitle, { push: pushColumnTitle }] = useList<string>([]);
  const [dataTable, setDataTable] = useState<{ [key: string]: any }[]>([]);
  const [columnsTable, setColumnsTable] = useState<Column<TProtocolParam & { params: string }>[]>([]);

  const [showFilter, setShowFiter] = useState(false);
  const [filterParams, setFilterParams] = useState<string[]>([]);
  const [resetFilter, setResetFilter] = useState<boolean>(false);
  const [sortTimeFilter, setSortTimeFilter] = useState<"FirstLast" | "LastFirst" | "">("");
  const [dateRangeFilter, setDateRangeFilter] = useState<{ fromDate?: string; toDate?: string }>({});

  const getTitleColumn = (data: ProtocolHistory | null) => {
    data &&
      data.epochChanges.map(({ endEpoch, startEpoch }) => {
        return endEpoch === startEpoch
          ? pushColumnTitle(`Epoch ${startEpoch}`)
          : pushColumnTitle(`Epoch ${endEpoch} - ${startEpoch}`);
      });
  };

  const getDataColumn = (data: ProtocolHistory | null) => {
    clear();
    for (const prop in data) {
      if (Object.hasOwn(data, prop)) {
        const newdata: { [key: string]: any } = {
          params: prop
        };
        columnTitle.map((t, idx) => {
          newdata[t] = data[prop as keyof ProtocolHistory][idx];
        });
        if (newdata) {
          pushHistory(newdata);
        }
      }
    }
  };

  const filterDataByTime = (data: { [key: string]: any }[], start: string, end: string) => {
    const column: string[] = [];
    const startDate = moment(start, "YYYY/MM/DD hh:mm:ss");
    const endDate = moment(end, "YYYY/MM/DD hh:mm:ss");
    data.filter((d) => {
      for (const key in d) {
        if (
          d[key] &&
          d[key]?.time &&
          moment(d[key]?.time, "YYYY/MM/DD hh:mm:ss").isBetween(startDate, endDate, null, "[]")
        ) {
          if (!column.includes(key)) {
            column.push(key);
          }
        }
      }
    });
    setColumnsTable([columnsFull[0], ...columnsFull.filter((c) => column.includes(c.title as string))]);
    return column;
  };

  const columnsMap = columnTitle.map((t) => ({
    title: t,
    key: t,
    render: (r: any) => (
      <Box
        p={"24px 20px"}
        maxWidth={200}
        overflow={"hidden"}
        whiteSpace={"nowrap"}
        minHeight={"16px"}
        textOverflow={"ellipsis"}
        bgcolor={({ palette }) =>
          r[t as ProtocolTypeKey] !== null
            ? r[t as ProtocolTypeKey].status === "UPDATED"
              ? palette.yellow[100]
              : r[t as ProtocolTypeKey].status === "ADDED"
              ? alpha(palette.green[600], 0.1)
              : r[t as ProtocolTypeKey].status === "NOT_EXIST"
              ? palette.red[100]
              : "transparent"
            : "transparent"
        }
      >
        {r[t] ? r[t]?.value : ""}
      </Box>
    )
  }));

  const columnsFull: Column<TProtocolParam & { params: string }>[] = [
    {
      title: "Parameter Name",
      key: "ParameterName",
      render: (r: TProtocolParam & { params: string }) => {
        return <Box p={"24px 20px"}>{r?.params}</Box>;
      }
    },
    ...columnsMap
  ];

  useUpdateEffect(() => {
    if (dataHistory) {
      getTitleColumn(dataHistory);
    }
  }, [JSON.stringify(dataHistory)]);

  useUpdateEffect(() => {
    if (columnTitle) {
      getDataColumn(dataHistory);
      setColumnsTable([...columnsFull]);
    }
  }, [JSON.stringify(columnTitle)]);

  useUpdateEffect(() => {
    if (!_.isEmpty(dateRangeFilter)) {
      filterDataByTime(dataHistoryMapping, dateRangeFilter.fromDate || "", dateRangeFilter.toDate || "");
    } else {
      setColumnsTable([...columnsFull]);
    }
  }, [JSON.stringify(dateRangeFilter)]);

  useUpdateEffect(() => {
    setDataTable([...dataHistoryMapping].slice(1));
  }, [JSON.stringify(dataHistoryMapping)]);

  // filter
  useUpdateEffect(() => {
    if (resetFilter) {
      setFilterParams([]);
      setSortTimeFilter("");
      setDateRangeFilter({});
      setResetFilter(false);
    }
  }, [resetFilter]);

  useUpdateEffect(() => {
    if (filterParams.length > 0) {
      setDataTable(dataHistoryMapping.filter((h) => filterParams.includes(h.params)));
    } else {
      setDataTable(dataHistoryMapping.slice(1));
    }
  }, [JSON.stringify(filterParams)]);

  useUpdateEffect(() => {
    if (_.isEmpty(dateRangeFilter)) {
      if (sortTimeFilter === "FirstLast") {
        setColumnsTable([columnsFull[0], ...columnsFull.slice(1).reverse()]);
      }
      if (sortTimeFilter === "LastFirst" || sortTimeFilter === "") {
        setColumnsTable([...columnsFull]);
      }
    } else {
      setColumnsTable([columnsTable[0], ...columnsTable.slice(1).reverse()]);
    }
  }, [sortTimeFilter]);

  if (loading || dataTable.length === 0) {
    return (
      <Box component={Skeleton} mt={2} borderRadius={({ spacing }) => spacing(2)} variant='rectangular' height={400} />
    );
  }

  return (
    <Box>
      <Card
        marginTitle='0px'
        title={"Protocol parameters update history"}
        textAlign={"left"}
        extra={
          <Box position={"relative"}>
            <Box
              component={Button}
              variant='text'
              textTransform={"capitalize"}
              bgcolor={({ palette }) => alpha(palette.green[600], 0.1)}
              px={2}
              onClick={() => setShowFiter(!showFilter)}
            >
              <FilterIcon />
              <Box ml={1} fontWeight={"bold"}>
                Filter
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
        <TableStyled columns={columnsTable} data={dataTable} loading={loading} />
      </Card>
    </Box>
  );
};

const TableStyled = styled(Table)(() => ({
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

const FilterComponent: React.FC<FilterComponentProps> = ({
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
    <FilterContainer padding={2}>
      <Box display={"flex"} flexDirection={"column"}>
        <ButtonFilter onClick={() => setSort("LastFirst")}>
          <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
            <Box display={"flex"} alignItems={"center"}>
              <LastFirst />
              <Box ml={1}>Latest - First</Box>
            </Box>
            {sort === "LastFirst" && <BsFillCheckCircleFill size={16} style={{ color: "#108AEF !important" }} />}
          </Box>
        </ButtonFilter>
        <ButtonFilter onClick={() => setSort("FirstLast")}>
          <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
            <Box display={"flex"} alignItems={"center"}>
              <FirstLast />
              <Box ml={1}>First - Latest</Box>
            </Box>
            {sort === "FirstLast" && <BsFillCheckCircleFill size={16} style={{ color: "#108AEF !important" }} />}
          </Box>
        </ButtonFilter>
        <ButtonFilter onClick={() => setShowDaterange(true)}>
          <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
            <Box display={"flex"} alignItems={"center"}>
              <DateRangeIcon />
              <Box ml={1}> Date range</Box>
            </Box>
            {!_.isEmpty(dateRange) && <BsFillCheckCircleFill size={16} style={{ color: "#108AEF !important" }} />}
          </Box>
        </ButtonFilter>

        <AccordionContainer expanded={expanded === "params"} onChange={handleChange("params")}>
          <AccordionSummary>
            <Box fontSize={"0.875rem"}>
              <Box display={"flex"} alignItems={"center"}>
                <ProtocolParam />
                <Box ml={1}>Parameter changes {filterOption.length > 0 ? `(${filterOption.length})` : ""}</Box>
              </Box>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Box height={170} overflow={"auto"} bgcolor={({ palette }) => alpha(palette.grey[300], 0.1)}>
              <Checkbox
                checked={filterOption.length === Object.keys(PROTOCOL_TYPE).length}
                id={"all"}
                sx={{
                  color: ({ palette }) => alpha(palette.common.black, 0.15),
                  "&.Mui-checked": {
                    color: `#108AEF !important`
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
              <Box component={"label"} htmlFor={"all"} style={{ cursor: "pointer" }}>
                All parameters
              </Box>

              {Object.keys(PROTOCOL_TYPE).map((k, idx) => (
                <Box key={idx} mb={2}>
                  <Checkbox
                    id={k}
                    checked={filterOption.includes(k)}
                    onChange={(e) =>
                      e.target.checked
                        ? pushFilterOption(k)
                        : removeAtFilterOption(filterOption.findIndex((f) => f === k))
                    }
                    sx={{
                      color: ({ palette }) => alpha(palette.common.black, 0.15),
                      "&.Mui-checked": {
                        color: `#108AEF !important`
                      }
                    }}
                  />
                  <Box component={"label"} htmlFor={k} style={{ cursor: "pointer" }}>
                    {k}
                  </Box>
                </Box>
              ))}
            </Box>
          </AccordionDetails>
        </AccordionContainer>

        <Box>
          <ApplyFilterButton
            onClick={handleApplyFilter}
            disabled={filterOption.length === 0 && !sort && _.isEmpty(dateRange)}
          >
            Apply filters
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
          color={`#108AEF !important`}
        >
          <Box mr={1}>Reset</Box>
          <ResetIcon />
        </Box>
      </Box>
      <DateRangeModal
        onClose={() => setShowDaterange(false)}
        open={showDaterange}
        value={dateRange}
        onDateRangeChange={({ fromDate, toDate }) => setDateRange({ fromDate, toDate })}
      />
    </FilterContainer>
  );
};

const inputData = [
  {
    params: "minFeeA",
    "Epoch 393": {
      time: "10/2/2023",
      value: 10
    },
    "Epoch 366 - 392": {
      time: "13/2/2023",
      value: 10
    }
  },
  {
    params: "minFeeB",
    "Epoch 393": {
      time: null,
      value: 10
    },
    "Epoch 366 - 392": {
      time: "18/2/2023",
      value: 10
    }
  }
];
