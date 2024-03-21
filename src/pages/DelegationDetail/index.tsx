import {
  Box,
  Button,
  Container,
  FormControlLabel,
  Radio,
  RadioGroup,
  Switch,
  Tooltip,
  Typography,
  useTheme
} from "@mui/material";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import moment from "moment";
import QueryString, { parse, stringify } from "qs";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useSelector } from "react-redux";
import { useHistory, useLocation, useParams } from "react-router-dom";

import useFetch from "src/commons/hooks/useFetch";
import useFetchList from "src/commons/hooks/useFetchList";
import {
  ActionTypeIcon,
  AnchorTextIcon,
  CurrentStatusIcon,
  ExpiryIcon,
  FilterIcon,
  GovernanceIdIcon,
  RepeatVotesIcon,
  StakeKeyHistoryIcon,
  StakingDelegators,
  TimelineIconComponent,
  VoteIcon,
  VotesIcon
} from "src/commons/resources";
import { routers } from "src/commons/routers";
import { API } from "src/commons/utils/api";
import { POOL_STATUS } from "src/commons/utils/constants";
import { getPageInfo } from "src/commons/utils/helper";
import DelegationDetailChart from "src/components/DelegationDetail/DelegationDetailChart";
import DelegationDetailInfo from "src/components/DelegationDetail/DelegationDetailInfo";
import {
  DelegationCertificatesHistory,
  DelegationEpochList,
  DelegationGovernanceVotes,
  DelegationStakingDelegatorsList
} from "src/components/DelegationDetail/DelegationDetailList";
import DelegationDetailOverview from "src/components/DelegationDetail/DelegationDetailOverview";
import { StyledAccordion } from "src/components/commons/CustomAccordion/styles";
import DateRangeModal, { DATETIME_PARTTEN } from "src/components/commons/CustomFilter/DateRangeModal";
import CustomIcon from "src/components/commons/CustomIcon";
import FormNowMessage from "src/components/commons/FormNowMessage";
import NoRecord from "src/components/commons/NoRecord";
import { setSpecialPath } from "src/stores/system";

import { AccordionContainer, AccordionDetailsFilter, ButtonSort } from "../NativeScriptsAndSC/styles";
import { FilterContainer, StyledInput, TextareaAutosize, TimeDuration, TitleTab } from "./styles";

interface Query {
  tab: string | string[] | QueryString.ParsedQs | QueryString.ParsedQs[] | undefined;
  page: number;
  size: number;
  voteId?: string | number;
}

const TABS: TabPoolDetail[] = ["epochs", "delegators", "certificatesHistory", "governanceVotes"];

const DelegationDetail: React.FC = () => {
  const { t } = useTranslation();
  const { poolId } = useParams<{ poolId: string }>();
  const { search, state } = useLocation<{ fromPath?: SpecialPath }>();
  const history = useHistory();
  const query = parse(search.split("?")[1]);
  const tab: TabPoolDetail | "" = TABS.includes(query.tab as TabPoolDetail) ? (query.tab as TabPoolDetail) : "";
  const pageInfo = getPageInfo(search);
  const [showFilter, setShowFiter] = useState(false);
  const tableRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();
  const blockKey = useSelector(({ system }: RootState) => system.blockKey);
  useEffect(() => {
    if (Object.keys(query).length === 0) {
      setQuery({ tab: "epochs", page: 1, size: 50 });
    }
  }, [Object.keys(query).length]);

  const scrollEffect = () => {
    tableRef !== null &&
      tableRef.current &&
      tableRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
  };

  const setQuery = (query: Query) => {
    history.replace({ search: stringify(query) }, state);
  };

  const status = useFetch<ListTabResponseSPO>(API.SPO_LIFECYCLE.TABS(poolId));

  const { data, loading, initialized, error, lastUpdated } = useFetch<DelegationOverview>(
    `${API.DELEGATION.POOL_DETAIL_HEADER}/${poolId}`,
    undefined,
    false,
    blockKey
  );

  const fetchDataEpochs = useFetchList<DelegationEpoch>(
    API.DELEGATION.POOL_DETAIL("epochs"),
    { poolView: poolId, ...pageInfo },
    false,
    tab === "epochs" ? blockKey : undefined
  );

  const fetchDataDelegators = useFetchList<StakingDelegators>(
    API.DELEGATION.POOL_DETAIL("delegators"),
    { poolView: poolId, ...pageInfo },
    false,
    tab === "delegators" ? blockKey : undefined
  );

  const fetchDataCertificatesHistory = useFetchList<CertificateHistory>(
    `${API.POOL_CERTIFICATES_HISTORY}/${poolId}`,
    { ...pageInfo },
    false,
    tab === "certificatesHistory" ? blockKey : undefined
  );

  const fetchDataGovernanceVotes = useFetchList<CertificateHistory>(
    `${API.POOL_CERTIFICATES_HISTORY}/${poolId}`,
    { ...pageInfo },
    false,
    tab === "governanceVotes" ? blockKey : undefined
  );

  useEffect(() => {
    document.title = `Delegation Pool ${poolId} | Cardano Blockchain Explorer`;
    window.scrollTo(0, 0);
  }, [poolId]);

  useEffect(() => {
    if (state?.fromPath) return setSpecialPath(state.fromPath);
    if (status.data?.isDeRegistration) {
      if (data?.poolStatus === POOL_STATUS.RETIRED) {
        return setSpecialPath(routers.POOL_DEREGISTRATION);
      } else {
        return setSpecialPath(routers.POOL_CERTIFICATE);
      }
    }
    if (status.data?.isRegistration) return setSpecialPath(routers.POOL_CERTIFICATE);

    if (status.data) setSpecialPath(routers.DELEGATION_POOLS);
  }, [state, status, data?.poolStatus]);

  if ((initialized && !data) || error) return <NoRecord />;

  const tabs: {
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
    label: React.ReactNode;
    key: TabPoolDetail;
    component: React.ReactNode;
  }[] = [
    {
      icon: StakeKeyHistoryIcon,
      label: t("epoch"),
      key: "epochs",
      component: (
        <div ref={tableRef}>
          <DelegationEpochList {...fetchDataEpochs} scrollEffect={scrollEffect} />
        </div>
      )
    },
    {
      icon: StakingDelegators,
      label: t("stakingDelegators"),
      key: "delegators",
      component: (
        <div ref={tableRef}>
          <DelegationStakingDelegatorsList {...fetchDataDelegators} scrollEffect={scrollEffect} />
        </div>
      )
    },
    {
      icon: TimelineIconComponent,
      label: <Box data-testid="certificatesHistory">{t("certificatesHistory")}</Box>,
      key: "certificatesHistory",
      component: (
        <div ref={tableRef}>
          <DelegationCertificatesHistory {...fetchDataCertificatesHistory} scrollEffect={scrollEffect} />
        </div>
      )
    },
    {
      icon: VotesIcon,
      label: t("governanceVotes"),
      key: "governanceVotes",
      component: (
        <div ref={tableRef}>
          <DelegationGovernanceVotes />
        </div>
      )
    }
  ];

  const indexExpand = tabs.findIndex((item) => item.key === tab);
  const needBorderRadius = (currentKey: string) => {
    if (!tab) return "0";
    const indexCurrent = tabs.findIndex((item) => item.key === currentKey);
    if (indexExpand - 1 >= 0 && indexExpand - 1 === indexCurrent) return "0 0 12px 12px";
    if (indexExpand + 1 < tabs.length && indexExpand + 1 === indexCurrent) return "12px 12px 0 0";
    return "0";
  };

  const handleChangeTab = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
    const handleTransitionEnd = () => {
      if (newExpanded) {
        setTimeout(() => {
          tableRef?.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }, 150);
        // Remove the event listener after the scroll
        tableRef?.current?.removeEventListener("transitionend", handleTransitionEnd);
      }
    };

    // Attach the transitionend event listener to wait for the expansion animation
    tableRef?.current?.addEventListener("transitionend", handleTransitionEnd);
    setQuery({ tab: newExpanded ? panel : "", page: 1, size: 50 });
  };

  const getLastUpdatedTime = () => {
    switch (tab) {
      case "epochs":
        return fetchDataEpochs.lastUpdated;
      case "delegators":
        return fetchDataDelegators.lastUpdated;
      case "certificatesHistory":
        return fetchDataCertificatesHistory.lastUpdated;
      case "governanceVotes":
        return fetchDataGovernanceVotes.lastUpdated;
      default:
        return null;
    }
  };

  return (
    <Container>
      <DelegationDetailInfo data={data} loading={loading} poolId={poolId} lastUpdated={lastUpdated} />
      <DelegationDetailOverview data={data} loading={loading} />
      <DelegationDetailChart poolId={poolId} />
      <Box ref={tableRef} mt={"30px"}>
        {tabs.map(({ key, icon: Icon, label, component }, index) => (
          <StyledAccordion
            key={key}
            expanded={tab === key}
            customBorderRadius={needBorderRadius(key)}
            isDisplayBorderTop={tab !== key && key !== tabs[0].key && index !== indexExpand + 1}
            onChange={handleChangeTab(key)}
          >
            <AccordionSummary
              expandIcon={
                <IoIosArrowDown
                  style={{
                    width: "21px",
                    height: "21px"
                  }}
                  color={key === tab ? theme.palette.primary.main : theme.palette.secondary.light}
                />
              }
              sx={{
                paddingX: theme.spacing(3),
                paddingY: theme.spacing(1)
              }}
            >
              <Icon fill={key === tab ? theme.palette.primary.main : theme.palette.secondary.light} />
              <TitleTab pl={1} active={+(key === tab)}>
                {label}
              </TitleTab>
            </AccordionSummary>
            <AccordionDetails>
              {!query.voteId && (
                <TimeDuration sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <FormNowMessage time={getLastUpdatedTime()} />
                  <Box>
                    {tab === "governanceVotes" && (
                      <Box
                      // onBlur={() => {
                      //   setShowFiter(false);
                      // }}
                      >
                        <Box position={"relative"} mb={2} textAlign={"right"}>
                          <Box
                            component={Button}
                            variant="text"
                            px={2}
                            textTransform={"capitalize"}
                            bgcolor={({ palette, mode }) =>
                              mode === "dark" ? palette.secondary[100] : palette.primary[200]
                            }
                            border={({ palette, mode }) =>
                              `1px solid ${mode === "dark" ? "none" : palette.primary[200]}`
                            }
                            onClick={() => setShowFiter(!showFilter)}
                            sx={{
                              ":hover": {
                                bgcolor:
                                  theme.mode === "dark" ? theme.palette.secondary[100] : theme.palette.primary[200]
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
                              whiteSpace={"nowrap"}
                              fontWeight={"bold"}
                              color={({ palette, mode }) =>
                                mode === "dark" ? palette.primary.main : palette.secondary.light
                              }
                            >
                              {t("common.filter")}
                            </Box>
                          </Box>
                          {showFilter && <FilterGovernanceVotes />}
                        </Box>
                      </Box>
                    )}
                  </Box>
                </TimeDuration>
              )}

              {component}
            </AccordionDetails>
          </StyledAccordion>
        ))}
      </Box>
    </Container>
  );
};

export default DelegationDetail;

export interface FilterParams {
  sort?: string;
  fromDate?: string;
  toDate?: string;
  search?: string;
}

const FilterGovernanceVotes: React.FC = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState<string | false>("");
  const [search, setSearch] = useState<string | number>("");
  const [text, setText] = useState<string | number>("");
  const [openDateRange, setOpenDateRange] = useState<boolean>(false);
  const filterValue = { sort: "ASC", fromDate: "", toDate: "", search: "" };

  const [params, setParams] = useState<FilterParams | null>(filterValue || {});

  const handleChange = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false);
  };

  const currentStatusList = [t("pool.any"), t("pool.open"), t("pool.ratified"), t("pool.enacted"), t("pool.dropped")];
  const voteList = [t("pool.any"), t("pool.yes"), t("pool.no"), t("pool.abstain"), t("pool.none")];
  const actionTypeList = [
    t("pool.typeMotion"),
    t("pool.typeConstitutional"),
    t("pool.typeUpdate"),
    t("pool.typeHardFork"),
    t("pool.typeProtocol"),
    t("pool.typeTreasury"),
    t("pool.typeInfo")
  ];

  return (
    <FilterContainer>
      <Box display={"flex"} flexDirection={"column"}>
        <Box component={ButtonSort} p="0px 16px" height="48px">
          <Box display={"flex"} alignItems={"center"} justifyContent="space-between" width="100%">
            <Box display="flex">
              <CustomIcon icon={RepeatVotesIcon} fill={theme.palette.secondary.light} width={16} height={24} />
              <Typography fontSize="16px" ml={1} color={({ palette }) => palette.secondary.main}>
                {t("pool.repeatVotes")}
              </Typography>
            </Box>
            <Switch defaultChecked />
          </Box>
          {/* {sort.includes("numberOfTokens") && <BsFillCheckCircleFill size={14} color={theme.palette.primary.main} />} */}
        </Box>
        <AccordionContainer expanded={expanded === "action-id"} onChange={handleChange("action-id")}>
          <AccordionSummary>
            <Box width={"100%"} display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
              <Box display={"flex"} alignItems={"center"}>
                <CustomIcon icon={GovernanceIdIcon} fill={theme.palette.secondary.light} height={18} />
                <Box fontSize="16px" ml={1} color={({ palette }) => palette.secondary.main}>
                  {t("pool.actionId")}
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
              // inputRef={inputRef}
              placeholder={"Search ID"}
              value={search}
              onChange={({ target: { value } }) => setSearch(value)}
            />
          </AccordionDetailsFilter>
        </AccordionContainer>
        <AccordionContainer expanded={expanded === "anchor-text"} onChange={handleChange("anchor-text")}>
          <AccordionSummary>
            <Box width={"100%"} display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
              <Box display={"flex"} alignItems={"center"}>
                <CustomIcon icon={AnchorTextIcon} fill={theme.palette.secondary.light} height={18} />
                <Box fontSize="16px" ml={1} color={({ palette }) => palette.secondary.main}>
                  {t("pool.anchorText")}
                </Box>
              </Box>
              <Box>
                {expanded === "anchor-text" ? (
                  <IoIosArrowUp color={theme.palette.secondary.main} />
                ) : (
                  <IoIosArrowDown color={theme.palette.secondary.main} />
                )}
              </Box>
            </Box>
          </AccordionSummary>
          <AccordionDetailsFilter sx={{ background: "unset" }}>
            <Box sx={{ p: "0px 16px" }}>
              <TextareaAutosize
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder={t("pool.searchAnchorText")}
              />
            </Box>
          </AccordionDetailsFilter>
        </AccordionContainer>
        <AccordionContainer expanded={expanded === "action-type"} onChange={handleChange("action-type")}>
          <AccordionSummary>
            <Box width={"100%"} display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
              <Box display={"flex"} alignItems={"center"}>
                <CustomIcon icon={ActionTypeIcon} fill={theme.palette.secondary.main} height={18} />
                <Box fontSize="16px" ml={1} color={({ palette }) => palette.secondary.main}>
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
          <AccordionDetailsFilter>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              sx={{ p: "0px 16px" }}
              // value={openTimeLocked}
              // onChange={handleChooseTimeLoked}
            >
              {actionTypeList.map((value) => (
                <FormControlLabel
                  key={value}
                  value={value}
                  control={
                    <Radio
                      sx={{
                        color: theme.palette.secondary.light
                      }}
                    />
                  }
                  label={
                    <Tooltip title={value} placement="top">
                      <Typography
                        fontSize="16px"
                        fontWeight={400}
                        lineHeight={1}
                        noWrap
                        overflow="hidden"
                        textOverflow="ellipsis"
                        maxWidth="15rem"
                      >
                        {value}
                      </Typography>
                    </Tooltip>
                  }
                />
              ))}
            </RadioGroup>
          </AccordionDetailsFilter>
        </AccordionContainer>
        <AccordionContainer expanded={expanded === "current-status"} onChange={handleChange("current-status")}>
          <AccordionSummary>
            <Box width={"100%"} display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
              <Box display={"flex"} alignItems={"center"}>
                <CustomIcon icon={CurrentStatusIcon} fill={theme.palette.secondary.main} height={18} />
                <Box fontSize="16px" ml={1} color={({ palette }) => palette.secondary.main}>
                  {t("pool.currentStatus")}
                </Box>
              </Box>
              <Box>
                {expanded === "current-status" ? (
                  <IoIosArrowUp color={theme.palette.secondary.main} />
                ) : (
                  <IoIosArrowDown color={theme.palette.secondary.main} />
                )}
              </Box>
            </Box>
          </AccordionSummary>
          <AccordionDetailsFilter>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              sx={{ p: "0px 16px" }}
              // value={openTimeLocked}
              // onChange={handleChooseTimeLoked}
            >
              {currentStatusList.map((value) => (
                <FormControlLabel
                  key={value}
                  value={value}
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
                      {value}
                    </Typography>
                  }
                />
              ))}
            </RadioGroup>
          </AccordionDetailsFilter>
        </AccordionContainer>
        <AccordionContainer expanded={expanded === "vote"} onChange={handleChange("vote")}>
          <AccordionSummary>
            <Box width={"100%"} display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
              <Box display={"flex"} alignItems={"center"}>
                <CustomIcon icon={VoteIcon} fill={theme.palette.secondary.main} height={18} />
                <Box fontSize="16px" ml={1} color={({ palette }) => palette.secondary.main}>
                  {t("pool.vote")}
                </Box>
              </Box>
              <Box>
                {expanded === "vote" ? (
                  <IoIosArrowUp color={theme.palette.secondary.main} />
                ) : (
                  <IoIosArrowDown color={theme.palette.secondary.main} />
                )}
              </Box>
            </Box>
          </AccordionSummary>
          <AccordionDetailsFilter>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              sx={{ p: "0px 16px" }}
              // value={openTimeLocked}
              // onChange={handleChooseTimeLoked}
            >
              {voteList.map((value) => (
                <FormControlLabel
                  key={value}
                  value={value}
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
                      {value}
                    </Typography>
                  }
                />
              ))}
            </RadioGroup>
          </AccordionDetailsFilter>
        </AccordionContainer>
        <AccordionSummary>
          <Box width={"100%"} display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
            <Box display={"flex"} alignItems={"center"}>
              <CustomIcon icon={ExpiryIcon} fill={theme.palette.secondary.main} height={18} />
              <Box
                fontSize="16px"
                ml={1}
                color={({ palette }) => palette.secondary.main}
                onClick={() => setOpenDateRange(true)}
              >
                {t("pool.dateRange")}
              </Box>

              <DateRangeModal
                open={openDateRange}
                value={{ fromDate: filterValue?.fromDate, toDate: filterValue?.toDate }}
                onDateRangeChange={({ fromDate, toDate }) => {
                  setParams?.({
                    ...params,
                    fromDate: moment(fromDate, DATETIME_PARTTEN).startOf("d").utc().format(DATETIME_PARTTEN),
                    toDate: moment(toDate, DATETIME_PARTTEN).endOf("d").utc().format(DATETIME_PARTTEN)
                  });
                }}
                onClose={() => setOpenDateRange(false)}
              />
            </Box>
          </Box>
        </AccordionSummary>
      </Box>
    </FilterContainer>
  );
};
