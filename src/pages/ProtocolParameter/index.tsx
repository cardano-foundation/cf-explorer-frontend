import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import _ from "lodash";
import {
  AccordionDetails,
  Box,
  Button,
  Checkbox,
  Container,
  Skeleton,
  alpha,
  useTheme,
  IconButton
} from "@mui/material";
import { useList, useUpdateEffect } from "react-use";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { HiArrowLongLeft } from "react-icons/hi2";
import moment from "moment";
import { IoIosArrowDown, IoIosArrowUp, IoMdClose } from "react-icons/io";
import { ImArrowDown2, ImArrowUp2 } from "react-icons/im";

import Card from "src/components/commons/Card";
import Table from "src/components/commons/Table";
import { Column } from "src/types/table";
import { PROTOCOL_TYPE } from "src/commons/utils/constants";
import useFetch from "src/commons/hooks/useFetch";
import { API } from "src/commons/utils/api";
import { ProtocolHistory, ProtocolTypeKey, TProtocolParam } from "src/types/protocol";
import ParseScriptModal from "src/components/ParseScriptModal";
import { DateRangeIcon, EmptyIcon, FilterIcon, ProtocolParam, ResetIcon } from "src/commons/resources";
import DateRangeModal from "src/components/FilterReport/DateRangeModal";
import { formatDateTimeLocal } from "src/commons/utils/helper";
import { details } from "src/commons/routers";
import CustomTooltip from "src/components/commons/CustomTooltip";

import {
  AccordionContainer,
  AccordionSummary,
  ApplyFilterButton,
  BackButton,
  BackText,
  ButtonFilter,
  FilterContainer
} from "./styles";

const ProtocolParameter: React.FC = () => {
  const [fixedColumnKeys, { push: pushFixedColumnKeys }] = useList<string>([]);
  const [variableColumnList, { push: pushVariableColumn }] = useList<string>([]);
  const [costModelScript, setCostModelScript] = useState("");
  const [showHistory, setShowHistory] = useState(false);
  const { PROTOCOL_PARAMETER } = API;
  const { data: dataFixed, loading: loadingFixed } = useFetch(PROTOCOL_PARAMETER.FIXED);
  const { data: dataLastest, loading: loadingLastest } = useFetch<TProtocolParam>(PROTOCOL_PARAMETER.LASTEST);
  const JSON_FIELDS = ["genDelegs", "costModel"];
  useUpdateEffect(() => {
    dataLastest &&
      [...Object.keys(PROTOCOL_TYPE), "startEpoch", "endEpoch"].map((key) =>
        dataLastest[key as ProtocolTypeKey] !== null && dataLastest[key as ProtocolTypeKey]?.transactionHash !== null
          ? pushVariableColumn(key)
          : ""
      );

    dataLastest && [...Object.keys(dataFixed || {})].map((key) => pushFixedColumnKeys(key));
  }, [dataFixed, dataLastest]);

  useEffect(() => {
    window.history.replaceState({}, document.title);
    document.title = `Protocol Parameters | Cardano Explorer`;
  }, []);

  const theme = useTheme();

  const handleClickRow = (key: string, row: any) => {
    if (key === "costModel") {
      setCostModelScript(row[key] !== null ? row[key]?.value || 0 : "")
    }
    if (key === "genDelegs") {
      setCostModelScript(row[key] !== null ? JSON.stringify(row[key]) : "")
    }
  }

  const columnsMap = Object.keys(PROTOCOL_TYPE).map((key) => ({
    title: key,
    key: key,
    render: (row: TProtocolParam) => {
      const isJSON = JSON_FIELDS.includes(key);
      return (
        <Box
          component={isJSON ? Button : Box}
          onClick={() =>
            isJSON && handleClickRow(key, row)
          }
          p={0}
          justifyItems={"flex-start"}
          textTransform={"capitalize"}
        >
          <Box
            maxWidth={300}
            overflow={"hidden"}
            whiteSpace={"nowrap"}
            textOverflow={"ellipsis"}
            color={({ palette }) => (isJSON ? palette.blue[800] : "unset")}
          >
            {row[key as ProtocolTypeKey] !== null ? row[key as ProtocolTypeKey]?.value || 0 : ""}
          </Box>
        </Box>
      );
    }
  }));

  const columnsFull: Column<TProtocolParam>[] = [
    {
      title: "Last updated in epoch",
      key: "startEpoch",
      render: (row: TProtocolParam) => {
        return row?.epochChange?.startEpoch || 0;
      }
    },
    {
      title: "Timestamp",
      key: "startEpoch",
      render: (row: TProtocolParam) => {
        return row?.timestamp ? formatDateTimeLocal(row.timestamp || "") : "";
      }
    },
    ...columnsMap
  ];

  const fixedColumn = (fixedColumnKeys || []).map((key) => {
    const isJSON = JSON_FIELDS.includes(key);
    return {
      title: key,
      key: key,
      render: (row: any) => {
        return (
          <Box component={isJSON ? Button : Box} justifyItems={"flex-start"} textTransform={"capitalize"} onClick={() => {
            isJSON && handleClickRow(key, row);
          }}>
            <Box maxWidth={300} overflow={"hidden"} whiteSpace={"nowrap"} textOverflow={"ellipsis"}
              color={({ palette }) => (isJSON ? palette.blue[800] : "unset")}
            >
              {typeof row[key] === "object" ? JSON.stringify(row[key]) : row[key]}
            </Box>
          </Box>
        );
      }
    }
  });
  const variableColumn = columnsFull.filter((column) => variableColumnList.includes(column.key));

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
        <Card marginTitle="0px" title={"Protocol parameters"} textAlign={"left"}>
          <Box pt={2}>
            <>
              <Box pb={"30px"} borderBottom={`1px solid ${alpha(theme.palette.common.black, 0.1)}`}>
                <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
                  <Box fontWeight={"bold"} fontSize={"1.25rem"}>
                    Updatable Parameters
                  </Box>
                  <Box
                    component={Button}
                    variant="contained"
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
                    variant="rectangular"
                    height={280}
                  />
                )}
                {!loadingLastest && <Table columns={variableColumn} data={dataLastest !== null ? [dataLastest] : []} />}
              </Box>
              <Box pt={"30px"}>
                <Box>
                  <Box textAlign={"left"} fontWeight={"bold"} fontSize={"1.25rem"}>
                    Global Constants
                  </Box>
                  {loadingFixed && (
                    <Box
                      component={Skeleton}
                      mt={2}
                      borderRadius={({ spacing }) => spacing(2)}
                      variant="rectangular"
                      height={280}
                    />
                  )}
                  {!loadingFixed && (
                    <Table columns={fixedColumn} data={dataFixed !== null && dataFixed ? [dataFixed] : []} />
                  )}
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
        title="CostModel"
      />
    </Container>
  );
};

export default ProtocolParameter;

export const ProtocolParameterHistory = () => {
  const { PROTOCOL_PARAMETER } = API;
  const TOTAL_PARAMETER = 29;

  const [filterParams, setFilterParams] = useState<string[]>([]);
  const [dateRangeFilter, setDateRangeFilter] = useState<{ fromDate?: string; toDate?: string }>({});
  let urlFetch = "";

  const filterParamsString = filterParams.length === TOTAL_PARAMETER || filterParams.length === 0
    ? "ALL"
    : filterParams.map((filter) => PROTOCOL_TYPE[filter as keyof typeof PROTOCOL_TYPE]).join(",");

  if (_.isEmpty(dateRangeFilter)) {
    urlFetch = `${PROTOCOL_PARAMETER.HISTORY}/${filterParamsString}`;
  } else {
    const startDate = moment(dateRangeFilter.fromDate).startOf("D").utc().format("X");
    const endDate = moment(dateRangeFilter.toDate).endOf("D").utc().format("X");
    urlFetch = `${PROTOCOL_PARAMETER.HISTORY}/${filterParamsString}?endTime=${endDate}&startTime=${startDate}`;
  }
  const {
    data: dataHistory,
    loading,
    initialized
  } = useFetch<ProtocolHistory>(
    urlFetch
  );

  const [dataHistoryMapping, { push: pushHistory, clear }] = useList<{
    [key: string]: any;
  }>([]);

  const [columnTitle, { push: pushColumnTitle, clear: clearColumnTitle }] = useList<string>([]);
  const [dataTable, setDataTable] = useState<{ [key: string]: any }[]>([]);
  const [columnsTable, setColumnsTable] = useState<Column<TProtocolParam & { params: string }>[]>([]);

  const [showFilter, setShowFiter] = useState(false);
  const [resetFilter, setResetFilter] = useState<boolean>(false);
  const [sortTimeFilter, setSortTimeFilter] = useState<"FirstLast" | "LastFirst" | "">("");

  const getTitleColumn = (data: ProtocolHistory | null) => {
    data &&
      (data.epochChanges || [])?.map(({ endEpoch, startEpoch }) => {
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

  const columnsMap = columnTitle.map((t) => ({
    title: t,
    key: t,
    render: (r: any) => {
      return (
        <Box
          p={"24px 20px"}
          maxWidth={200}
          overflow={"hidden"}
          whiteSpace={"nowrap"}
          component={["UPDATED", "ADDED"].includes(r[t as ProtocolTypeKey]?.status as string) ? Link : Box}
          minHeight={"16px"}
          textOverflow={"ellipsis"}
          display={"block"}
          bgcolor={({ palette }) =>
            r[t as ProtocolTypeKey] !== null
              ? ["UPDATED", "ADDED"].includes(r[t as ProtocolTypeKey]?.status as string)
                ? alpha(palette.green[600], 0.4)
                : "transparent"
              : "transparent"
          }
          to={
            r[t as ProtocolTypeKey]?.transactionHash
              ? details.transaction(r[t as ProtocolTypeKey]?.transactionHash, "protocols")
              : "#"
          }
        >
          {r[t]?.status === "ADDED" || (r[t]?.status === "UPDATED" && !r[t]?.transactionHash) ? (
            <CustomTooltip title="No transaction">
              <Box>{r[t] ? (r[t]?.value ? r[t]?.value : r[t]?.value === 0 ? 0 : "") : ""}</Box>
            </CustomTooltip>
          ) : r[t] ? (
            r[t]?.value ? (
              r[t]?.value
            ) : r[t]?.value === 0 ? (
              0
            ) : (
              ""
            )
          ) : (
            ""
          )}
        </Box>
      );
    }
  }));

  const columnsFull: Column<TProtocolParam & { params: string }>[] = [
    {
      title: "Parameter Name",
      key: "ParameterName",
      fixed: true,
      render: (r: TProtocolParam & { params: string }) => {
        return <Box p={"24px 20px"}>{r?.params}</Box>;
      }
    },
    ...columnsMap
  ];

  useUpdateEffect(() => {
    if (dataHistory) {
      clearColumnTitle();
      getTitleColumn(dataHistory);
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
  }, [JSON.stringify(dataHistoryMapping)]);

  useUpdateEffect(() => {
    if (resetFilter) {
      setFilterParams([]);
      setSortTimeFilter("");
      setDateRangeFilter({});
      setResetFilter(false);
    }
  }, [resetFilter]);

  useUpdateEffect(() => {
    setColumnsTable([columnsTable[0], ...columnsTable.slice(1).reverse()]);
  }, [sortTimeFilter]);

  if (loading) {
    return (
      <Box component={Skeleton} mt={2} borderRadius={({ spacing }) => spacing(2)} variant="rectangular" height={400} />
    );
  }

  return (
    <Box>
      <Card
        marginTitle="0px"
        title={"Protocol parameters update history"}
        textAlign={"left"}
        extra={
          <Box position={"relative"}>
            <Box
              component={Button}
              variant="text"
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
        {initialized && !!dataHistory ? (
          columnsTable?.length === 1 &&
          !loading && (
            <Box textAlign={"center"}>
              <Box component={"img"} src={EmptyIcon} mt={3} />
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
                color={"#108aef !important"}
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
    <FilterContainer padding={2} pt={5}>
      <CloseButton saving={0} onClick={() => setShowFiter(false)} data-testid="close-modal-button">
        <IoMdClose />
      </CloseButton>
      <Box display={"flex"} flexDirection={"column"}>
        <ButtonFilter onClick={() => setSort("LastFirst")}>
          <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
            <Box display={"flex"} alignItems={"center"}>
              <ImArrowDown2 />
              <Box ml={1}>Latest - First</Box>
            </Box>
            {sort === "LastFirst" && <BsFillCheckCircleFill size={16} style={{ color: "#108AEF !important" }} />}
          </Box>
        </ButtonFilter>
        <ButtonFilter onClick={() => setSort("FirstLast")}>
          <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
            <Box display={"flex"} alignItems={"center"}>
              <ImArrowUp2 />
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
            <Box
              fontSize={"0.875rem"}
              width={"100%"}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Box display={"flex"} alignItems={"center"}>
                <ProtocolParam />
                <Box ml={1}>Parameter changes {filterOption.length > 0 ? `(${filterOption.length})` : ""}</Box>
              </Box>
              <Box>{expanded === "params" ? <IoIosArrowDown /> : <IoIosArrowUp />}</Box>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Box height={170} overflow={"auto"}>
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
            data-testid="apply-filters"
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

const CloseButton = styled(IconButton) <{ saving: number }>`
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
