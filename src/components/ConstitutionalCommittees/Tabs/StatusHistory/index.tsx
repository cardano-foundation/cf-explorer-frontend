import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Box,
  useTheme,
  Grid,
  Skeleton,
  AccordionSummary,
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
  ClickAwayListener
} from "@mui/material";
import { t } from "i18next";
import { parse, stringify, ParsedQs } from "qs";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import moment from "moment";
import { isEmpty, isUndefined, omitBy } from "lodash";
import { BsFillCheckCircleFill } from "react-icons/bs";

import FormNowMessage from "src/components/commons/FormNowMessage";
import { TimeDuration } from "src/pages/BlockList/styles";
import { formatDateTimeLocal } from "src/commons/utils/helper";
import DynamicEllipsisText from "src/components/DynamicEllipsisText";
import DatetimeTypeTooltip from "src/components/commons/DatetimeTypeTooltip";
import useFetchList from "src/commons/hooks/useFetchList";
import { API } from "src/commons/utils/api";
import { FooterTable } from "src/components/commons/Table";
import NoRecord from "src/components/commons/NoRecord";
import { actionTypeListDrep } from "src/components/commons/CardGovernanceVotes";
import { details } from "src/commons/routers";
import { POOLS_ACTION_TYPE, VOTE_TYPE, STATUS_VOTE } from "src/commons/utils/constants";
import { ActionTypeIcon, ExpiryIcon, FilterIcon, GovernanceIdIcon, ResetIcon } from "src/commons/resources";
import CustomIcon from "src/components/commons/CustomIcon";
import {
  AccordionContainer,
  AccordionDetailsFilter,
  ApplyFilterButton,
  FilterContainer,
  FilterWrapper
} from "src/pages/NativeScriptsAndSC/styles";
import DateRangeModal, { DATETIME_PARTTEN, DateRange } from "src/components/commons/CustomFilter/DateRangeModal";
import { StyledInput } from "src/components/share/styled";

import { Chip, Item, Row, Title } from "./style";

const StatusHistory = () => {
  const { tabActive } = useParams<{ tabActive?: string }>();
  const { search } = useLocation();
  const history = useHistory();
  const query = parse(search.split("?")[1]);
  const [params, setParams] = useState({});

  useEffect(() => {
    setParams({
      page: query?.page && +query?.page >= 1 ? +query?.page - 1 : 0,
      size: +(query?.voteSize || "") || 6,
      actionType: (query.actionType as string) || "ALL",
      actionStatus: (query.actionStatus as string) || "ANY",
      governanceActionTxHash: (query.governanceActionTxHash as string) || undefined,
      fromDate: (query.fromDate as string) || undefined,
      toDate: (query.toDate as string) || undefined,
      voterType: VOTE_TYPE.CONSTITUTIONAL_COMMITTEE_HOT_KEY_HASH
    });
  }, [JSON.stringify(query)]);

  const { data, loading, total, lastUpdated, error, statusError, initialized } = useFetchList<CCHistory>(
    tabActive === "statusHistory" && params ? API.COMMITTEE.HISTORY : "",
    omitBy(params, isUndefined)
  );
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const setQuery = (query: any) => {
    history.replace({ search: stringify(query) }, history.location.state);
  };

  if (loading) {
    return (
      <Box component={Grid} container spacing={2}>
        {[...new Array(+(query?.voteSize || "") || 6).fill(0)].map((_, idx) => (
          <Grid item width={"100%"} lg={4} md={6} sm={6} xs={12} key={idx}>
            <Box component={Skeleton} variant="rectangular" height={"190px"} borderRadius={2} />
          </Grid>
        ))}
      </Box>
    );
  }

  if ((data && data.length === 0 && initialized && !error) || (error && statusError !== 500)) {
    return <NoRecord m="80px 0px" padding={`0 !important`} />;
  }

  return (
    <Box>
      <Box display="flex" justifyContent={"space-between"} alignItems={"center"}>
        <TimeDuration>
          <FormNowMessage time={lastUpdated} />
        </TimeDuration>
        <FilterGovernanceVotes
          setQuery={setQuery}
          query={query}
          voterType={VOTE_TYPE.CONSTITUTIONAL_COMMITTEE_HOT_KEY_HASH}
        />
      </Box>

      <Box component={Grid} container spacing={2} mt={1}>
        {data?.map((item, idx) => (
          <Grid item width={"100%"} lg={4} md={6} sm={6} xs={12} key={idx}>
            <Box height={"100%"}>
              <StatusHistoryCard item={item} />
            </Box>
          </Grid>
        ))}
      </Box>

      <Box py={1}>
        <FooterTable
          pagination={{
            size: Number(query.voteSize || 6),
            page: query.page ? Number(query.page || 1) - 1 : 0,
            total,
            onChange: (page, size) => history.replace({ search: stringify({ ...query, page, voteSize: size }) })
          }}
          total={{ count: total || 0, title: "" }}
          loading={false}
          optionList={[6, 9, 12]}
        />
      </Box>
    </Box>
  );
};

export default StatusHistory;

const StatusHistoryCard = ({ item }: { item: CCHistory }) => {
  const theme = useTheme();
  return (
    <Item>
      <Box p={2} height={"100%"} display={"block"}>
        <Row>
          <Title>ID:</Title>
          <Box
            width={"calc(100% - 100px)"}
            color={`${theme.palette.primary.main} !important`}
            component={Link}
            to={details.transaction(item.txHash)}
          >
            <DynamicEllipsisText
              customTruncateFold={[4, 4]}
              value={item.txHash}
              isTooltip
              sx={{ transform: "translateY(0px) !important" }}
            />
          </Box>
        </Row>
        <Row>
          <Title>{t("cc.status.actionType")}:</Title>
          <Box>{actionTypeListDrep.find((action) => action.value === item.type)?.text}</Box>
        </Row>
        <Row>
          <Title>{t("cc.status.creation")}:</Title>
          <Box>
            <DatetimeTypeTooltip>{formatDateTimeLocal(item.createdAt)}</DatetimeTypeTooltip>
          </Box>
        </Row>
        <Row>
          <Title>{t("cc.status.status")}:</Title>
          <Box>
            <Chip pl={`1 !important`} maxWidth={"130px !important"}>
              <Box display={"flex"} alignItems={"center"} height={"100%"}>
                <Box
                  overflow={"hidden"}
                  textOverflow={"ellipsis"}
                  sx={{
                    textWrap: "nowrap"
                  }}
                >
                  {item.status}
                </Box>
              </Box>
            </Chip>
          </Box>
        </Row>
      </Box>
    </Item>
  );
};

interface FilterGovernanceVotes {
  query: ParsedQs;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setQuery: (query: any) => void;
  voterType: string;
}
export interface FilterParams {
  sort?: string;
  fromDate?: string;
  toDate?: string;
  search?: string;
  governanceActionTxHash?: string;
  isRepeatVote?: boolean;
  actionType?: string;
  anchorText?: string;
  actionStatus?: string;
  voteType?: string;
}
export const FilterGovernanceVotes: React.FC<FilterGovernanceVotes> = ({ query, setQuery, voterType }) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const history = useHistory();
  const [expanded, setExpanded] = useState<string | false>("");
  const [openDateRange, setOpenDateRange] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  const filterValue = {
    sort: "ASC",
    governanceActionTxHash: "",
    anchorText: "",
    isRepeatVote: false,
    actionType: STATUS_VOTE.ALL,
    vote: STATUS_VOTE.ANY,
    fromDate: "",
    toDate: ""
  };

  const [params, setParams] = useState<FilterParams | null>(query || filterValue || {});
  const [paramsFilter, setParamsFilter] = useState<FilterParams | null>(filterValue || {});
  const [dateRange, setDateRange] = useState<DateRange>({ fromDate: "", toDate: "" });

  const handleChange = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleReset = () => {
    setExpanded(false);
    setOpen(false);
    setParams(filterValue);
    setParamsFilter(filterValue);
    setDateRange({ fromDate: "", toDate: "" });
    history.replace({
      search: stringify({
        page: 1,
        size: 6,
        tab: "governanceVotes",
        governanceActionTxHash: "",
        actionType: STATUS_VOTE.ALL,
        voteType: STATUS_VOTE.ANY,
        voterType: VOTE_TYPE.CONSTITUTIONAL_COMMITTEE_HOT_KEY_HASH
      })
    });
  };

  const handleFilter = () => {
    setExpanded(false);
    setOpen(false);
    setParamsFilter(params);
    setQuery({
      tab: query.tab,
      page: 1,
      size: 6,
      governanceActionTxHash: params?.governanceActionTxHash,
      actionType: params?.actionType,
      voterType: VOTE_TYPE.CONSTITUTIONAL_COMMITTEE_HOT_KEY_HASH,
      ...(dateRange?.fromDate && { fromDate: dateRange.fromDate || "" }),
      ...(dateRange?.toDate && { toDate: dateRange.toDate || "" })
    });
  };

  const actionTypeListDrep = [
    { value: POOLS_ACTION_TYPE.ALL, text: t("common.all") },
    { value: POOLS_ACTION_TYPE.NO_CONFIDENCE, text: t("pool.typeMotion") },
    { value: POOLS_ACTION_TYPE.UPDATE_COMMITTEE, text: t("pool.typeConstitutional") },
    { value: POOLS_ACTION_TYPE.NEW_CONSTITUTION, text: t("drep.updateConstitution") },
    { value: POOLS_ACTION_TYPE.HARD_FORK_INITIATION_ACTION, text: t("pool.typeHardFork") },
    { value: POOLS_ACTION_TYPE.PARAMETER_CHANGE_ACTION, text: t("drep.protocolChange") },
    { value: POOLS_ACTION_TYPE.TREASURY_WITHDRAWALS_ACTION, text: t("drep.treasuryWithdrawals") },
    { value: POOLS_ACTION_TYPE.INFO_ACTION, text: t("pool.typeInfo") }
  ];

  const actionTypeListPools = [
    { value: POOLS_ACTION_TYPE.ALL, text: t("pool.any") },
    { value: POOLS_ACTION_TYPE.NO_CONFIDENCE, text: t("pool.typeMotion") },
    { value: POOLS_ACTION_TYPE.UPDATE_COMMITTEE, text: t("pool.typeConstitutional") },
    { value: POOLS_ACTION_TYPE.NEW_CONSTITUTION, text: t("drep.updateConstitution") },
    { value: POOLS_ACTION_TYPE.HARD_FORK_INITIATION_ACTION, text: t("pool.typeHardFork") },
    { value: POOLS_ACTION_TYPE.PARAMETER_CHANGE_ACTION, text: t("drep.protocolChange") },
    { value: POOLS_ACTION_TYPE.TREASURY_WITHDRAWALS_ACTION, text: t("drep.treasuryWithdrawals") },
    { value: POOLS_ACTION_TYPE.INFO_ACTION, text: t("pool.typeInfo") }
  ];

  const handleKeyPress = (event: { key: string }) => {
    if (event.key === "Enter") {
      handleFilter();
    }
  };

  return (
    <ClickAwayListener onClickAway={() => setOpen(false)}>
      <FilterWrapper>
        <Box
          data-testid="governance.filter"
          component={Button}
          variant="text"
          px={2}
          textTransform={"capitalize"}
          bgcolor={({ palette, mode }) => (mode === "dark" ? palette.secondary[100] : palette.primary[200])}
          border={({ palette, mode }) => `1px solid ${mode === "dark" ? "none" : palette.primary[200]}`}
          onClick={() => setOpen((pre) => !pre)}
          sx={{
            ":hover": {
              bgcolor: theme.mode === "dark" ? theme.palette.secondary[100] : theme.palette.secondary[100]
            }
          }}
        >
          <CustomIcon
            icon={FilterIcon}
            fill={theme.mode === "dark" ? theme.palette.primary.main : theme.palette.secondary.light}
            height={18}
          />
          <Box
            ml={1}
            position={"relative"}
            whiteSpace={"nowrap"}
            fontWeight={"bold"}
            color={({ palette, mode }) => (mode === "dark" ? palette.primary.main : palette.secondary.light)}
          >
            {t("common.filter")}
          </Box>
        </Box>
        <FilterContainer>
          {open && (
            <Box display={"flex"} flexDirection={"column"}>
              <AccordionContainer expanded={expanded === "action-id"} onChange={handleChange("action-id")}>
                <AccordionSummary data-testid="governance.filter.actionId">
                  <Box width={"100%"} display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
                    <Box display={"flex"} alignItems={"center"}>
                      <CustomIcon icon={GovernanceIdIcon} fill={theme.palette.secondary.light} height={18} />
                      <Box
                        data-testid="governance.filter.actionIdTitle"
                        ml={1}
                        color={({ palette }) => palette.secondary.main}
                      >
                        ID
                      </Box>
                    </Box>
                    <Box>
                      {expanded === "action-id" ? (
                        <IoIosArrowUp color={theme.palette.secondary.main} />
                      ) : (
                        <IoIosArrowDown color={theme.palette.secondary.main} />
                      )}
                    </Box>
                  </Box>
                </AccordionSummary>
                <AccordionDetailsFilter sx={{ background: "unset" }}>
                  <StyledInput
                    data-testid="governance.filter.actionIdValue"
                    sx={{
                      p: "0px 12px",
                      width: "100% !important",
                      color: theme.isDark ? theme.palette.secondary.main : theme.palette.secondary.light
                    }}
                    placeholder={"Search ID"}
                    value={params?.governanceActionTxHash}
                    onChange={({ target: { value } }) => setParams({ ...params, governanceActionTxHash: value })}
                    onKeyPress={handleKeyPress}
                  />
                </AccordionDetailsFilter>
              </AccordionContainer>

              <AccordionContainer expanded={expanded === "action-type"} onChange={handleChange("action-type")}>
                <AccordionSummary data-testid="governance.filter.actionType">
                  <Box width={"100%"} display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
                    <Box display={"flex"} alignItems={"center"}>
                      <CustomIcon icon={ActionTypeIcon} fill={theme.palette.secondary.main} height={18} />
                      <Box
                        data-testid="governance.filter.actionTypeTitle"
                        ml={1}
                        color={({ palette }) => palette.secondary.main}
                      >
                        {t("pool.actionType")}
                      </Box>
                    </Box>
                    <Box>
                      {expanded === "action-type" ? (
                        <IoIosArrowUp color={theme.palette.secondary.main} />
                      ) : (
                        <IoIosArrowDown color={theme.palette.secondary.main} />
                      )}
                    </Box>
                  </Box>
                </AccordionSummary>
                <AccordionDetailsFilter
                  sx={{ maxHeight: "170px", display: "block", overflowX: "hidden", overflowY: "auto" }}
                >
                  <RadioGroup
                    data-testid="governance.filter.actionTypeValue"
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    sx={{ p: "0px 16px" }}
                    value={params?.actionType}
                    onChange={(e) => setParams({ ...params, actionType: e.target.value })}
                  >
                    {(voterType === VOTE_TYPE.DREP_KEY_HASH ? actionTypeListDrep : actionTypeListPools).map((i) => (
                      <FormControlLabel
                        key={i.value}
                        value={i.value}
                        checked={
                          params?.actionType ? i.value === params?.actionType : POOLS_ACTION_TYPE.ALL === i.value
                        }
                        control={
                          <Radio
                            sx={{
                              color: theme.palette.secondary.light
                            }}
                          />
                        }
                        label={
                          <Typography
                            fontSize="16px"
                            fontWeight={400}
                            lineHeight={1}
                            noWrap
                            overflow="hidden"
                            textOverflow="ellipsis"
                            maxWidth="15rem"
                          >
                            {i.text}
                          </Typography>
                        }
                      />
                    ))}
                  </RadioGroup>
                </AccordionDetailsFilter>
              </AccordionContainer>

              <AccordionSummary data-testid="governance.filter.dateRange">
                <Box width={"100%"} display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
                  <Box display={"flex"} alignItems={"center"}>
                    <CustomIcon icon={ExpiryIcon} fill={theme.palette.secondary.main} height={18} />
                    <Box
                      data-testid="governance.filter.dateRangeTitle"
                      ml={1}
                      color={({ palette }) => palette.secondary.main}
                      onClick={() => setOpenDateRange(true)}
                    >
                      {t("pool.dateRange")}
                    </Box>
                  </Box>
                  {!isEmpty(dateRange?.fromDate) && (
                    <BsFillCheckCircleFill size={14} color={theme.palette.primary.main} />
                  )}
                </Box>
                <DateRangeModal
                  data-testid="governance.filter.dateRangeValue"
                  open={openDateRange}
                  value={{
                    fromDate: dateRange?.fromDate,
                    toDate: dateRange?.toDate
                  }}
                  onDateRangeChange={({ fromDate, toDate }) => {
                    setDateRange({
                      fromDate: moment(fromDate, DATETIME_PARTTEN).startOf("d").utc().format(DATETIME_PARTTEN),
                      toDate: moment(toDate, DATETIME_PARTTEN).endOf("d").utc().format(DATETIME_PARTTEN)
                    });
                  }}
                  onClose={() => setOpenDateRange(false)}
                  onClearValue={() => setDateRange({ fromDate: "", toDate: "" })}
                />
              </AccordionSummary>
              <Box my={1} p="0px 16px">
                <ApplyFilterButton
                  data-testid="governance.applyFilters"
                  onClick={() => {
                    handleFilter();
                  }}
                  disabled={
                    JSON.stringify(filterValue) === JSON.stringify(paramsFilter) &&
                    JSON.stringify(filterValue) === JSON.stringify(params) &&
                    JSON.stringify(filterValue.fromDate) === JSON.stringify(dateRange.fromDate) &&
                    JSON.stringify(filterValue.toDate) === JSON.stringify(dateRange.toDate)
                  }
                >
                  {t("common.applyFilters")}
                </ApplyFilterButton>
              </Box>
              <Box
                data-testid="governance.filter.reset"
                component={Button}
                width={"100%"}
                textTransform={"capitalize"}
                display={"flex"}
                alignItems={"center"}
                color={({ palette }) => `${palette.primary.main} !important`}
                onClick={handleReset}
              >
                <Box data-testid="governance.resetTitle" mr={1}>
                  {t("common.reset")}
                </Box>
                <CustomIcon icon={ResetIcon} fill={theme.palette.primary.main} width={18} />
              </Box>
            </Box>
          )}
        </FilterContainer>
      </FilterWrapper>
    </ClickAwayListener>
  );
};
