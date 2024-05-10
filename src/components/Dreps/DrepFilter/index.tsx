import React, { useEffect, useMemo, useState } from "react";
import {
  AccordionSummary,
  Box,
  Button,
  ClickAwayListener,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
  useTheme
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useHistory, useLocation } from "react-router-dom";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { isEmpty, pickBy } from "lodash";
import { stringify, parse } from "qs";

import useFetch from "src/commons/hooks/useFetch";
import {
  ActiveStakeDrepIcon,
  CurrentStatusIcon,
  DrepIdIcon,
  ExpiryIcon,
  FilterIcon,
  GovernanceIdIcon,
  PoolVotingIcon,
  ResetIcon
} from "src/commons/resources";
import { API } from "src/commons/utils/api";
import { LARGE_NUMBER_ABBREVIATIONS, formatADA, formatPercent } from "src/commons/utils/helper";
import { FilterWrapper } from "src/pages/NativeScriptsAndSC/styles";
import usePageInfo from "src/commons/hooks/usePageInfo";
import CustomTooltip from "src/components/commons/CustomTooltip";
import DateRangeModal from "src/components/commons/CustomFilter/DateRangeModal";

import CustomIcon from "../../commons/CustomIcon";
import { ApplyFilterButton, StyledInput } from "../../commons/CustomFilter/styles";
import { AccordionContainer, AccordionDetailsFilter, FilterContainer, Input, StyledSlider } from "./styles";

interface PoolResponse {
  page?: number;
  drepIdOrHash?: string;
  anchorText?: string;
  size?: number;
  sort?: string;
  drepStatus?: string;
  minVotingPower?: number;
  maxVotingPower?: number;
  maxActiveVoteStake?: number;
  minActiveVoteStake?: number;
}

const defaultParams = { page: 0, size: 50, sort: "" };

const DrepFilter: React.FC<{ loading: boolean }> = ({ loading }) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const { search } = useLocation();
  const query = parse(search.split("?")[1]);
  const history = useHistory<{ tickerNameSearch?: string; fromPath?: SpecialPath }>();
  const [expanded, setExpanded] = useState<string | false>("");
  const [open, setOpen] = useState<boolean>(false);
  const { pageInfo } = usePageInfo();
  const handleChange = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false);
  };
  const { data: dataRange, loading: loadingRange } = useFetch<PoolResponse>(API.DREP_RANGE_VALUES);

  const initParams = {
    page: 0,
    size: 50,
    drepIdOrHash: "",
    anchorText: "",
    sort: "",
    drepStatus: "",
    maxActiveVoteStake: +(dataRange?.maxActiveVoteStake || 0),
    minActiveVoteStake: +(dataRange?.minActiveVoteStake || 0),
    minVotingPower: +(dataRange?.minVotingPower || 0),
    maxVotingPower: +(dataRange?.maxVotingPower || 0)
  };

  const [filterParams, setFilterParams] = useState<PoolResponse>({});
  const [showDaterange, setShowDaterange] = useState<boolean>(false);
  const [dateRange, setDateRange] = useState<{
    fromDate?: string;
    toDate?: string;
  }>({ fromDate: query?.fromDate as string, toDate: query?.toDate as string });

  useEffect(() => {
    setFilterParams({
      page: query?.page && +query?.page >= 1 ? +query?.page - 1 : 0,
      size: +(query?.voteSize || "") || 50,
      sort: (query?.sort || "").toString(),
      drepIdOrHash: "",
      anchorText: "",
      drepStatus: "",
      ...(query?.drepStatus && { drepStatus: query?.drepStatus ? `${query?.drepStatus}` : "" }),
      ...(query?.maxActiveVoteStake && { maxActiveVoteStake: +(query?.maxActiveVoteStake || 0) }),
      ...(query?.minActiveVoteStake && { minActiveVoteStake: +(query?.minActiveVoteStake || 0) }),
      ...(query?.minVotingPower && { minVotingPower: +(query?.minVotingPower || 0) }),
      ...(query?.maxVotingPower && { maxVotingPower: +(query?.maxVotingPower || 0) })
    });
    setDateRange({ fromDate: query?.fromDate as string, toDate: query?.toDate as string });
  }, [JSON.stringify(query)]);
  const handleReset = () => {
    setExpanded(false);
    setOpen(false);
    setFilterParams({ ...initParams });
    setDateRange({});
    history.replace({
      search: stringify(
        pickBy(
          {
            ...defaultParams,
            size: pageInfo.size,
            sort: pageInfo.sort,
            page: 1
          },
          (value) => value !== "" && value !== undefined
        )
      ),
      state: undefined
    });
  };

  const handleFilter = () => {
    setExpanded(false);
    setOpen(false);
    setFilterParams({ ...filterParams });
    history.replace({
      search: stringify(
        pickBy(
          {
            ...filterParams,
            size: pageInfo.size,
            sort: pageInfo.sort,
            page: 1,
            fromDate: dateRange.fromDate,
            toDate: dateRange.toDate
          },
          (value) => value !== "" && value !== undefined
        )
      ),
      state: undefined
    });
  };
  const handleKeyPress = (event: { key: string }) => {
    if (event.key === "Enter") {
      handleFilter();
    }
  };
  const handleChangeValueRange = (event: Event, newValue: number | number[], minKey: string, maxKey: string) => {
    if (!Array.isArray(newValue)) {
      return;
    }
    const [min, max] = newValue || [];
    setFilterParams({ ...filterParams, [minKey]: Math.min(min), [maxKey]: Math.min(max) });
  };
  const isDisableFilter = useMemo(
    () =>
      (filterParams.drepIdOrHash || "") !== initParams.drepIdOrHash ||
      (filterParams.anchorText || "") !== initParams.anchorText ||
      (filterParams.maxActiveVoteStake || initParams.maxActiveVoteStake) !== initParams.maxActiveVoteStake ||
      (filterParams.minActiveVoteStake || initParams.minActiveVoteStake) !== initParams.minActiveVoteStake ||
      (filterParams.minVotingPower || initParams.minVotingPower) !== initParams.minVotingPower ||
      (filterParams.maxVotingPower || initParams.maxVotingPower) !== initParams.maxVotingPower,
    [filterParams]
  );

  const groupInputRange = (
    minValue: number,
    maxValue: number,
    keyOnChangeMin: string,
    keyOnChangeMax: string,
    maxValueDefault: number
  ) => {
    return (
      <Box display="flex" alignItems="center" gap="30px">
        <Box
          component={Input}
          type="number"
          data-testid={`filterRange.${keyOnChangeMin}`}
          sx={{
            fontSize: "14px",
            width: "100% !important",
            color: theme.isDark ? theme.palette.secondary.main : theme.palette.secondary.light
          }}
          value={Number(minValue || 0).toString()}
          onKeyDown={(event) => {
            const key = event.key;

            if (
              !(
                key === "ArrowLeft" ||
                key === "ArrowRight" ||
                key === "Backspace" ||
                key === "Delete" ||
                ((keyOnChangeMin === "minVotingPower" ||
                  keyOnChangeMin === "minGovParticipationRate" ||
                  keyOnChangeMin === "minSaturation") &&
                  key === ".") ||
                /^\d$/.test(key)
              )
            ) {
              event.preventDefault();
            }
          }}
          onBlur={() => {
            maxValue < minValue &&
              setFilterParams({
                ...filterParams,
                [keyOnChangeMin]: maxValue
              });
          }}
          onChange={({ target: { value } }) => {
            let numericValue = value.replace(/[^0-9.]/g, "");
            numericValue = numericValue.replace(/^0+(?!$)/, "");

            setFilterParams({
              ...filterParams,
              [keyOnChangeMin]:
                +numericValue > maxValue
                  ? 0
                  : ["minGovParticipationRate"].includes(keyOnChangeMin)
                  ? +numericValue / 100
                  : ["minPledge"].includes(keyOnChangeMin)
                  ? +numericValue * 10 ** 6
                  : ["minSaturation"].includes(keyOnChangeMin)
                  ? parseFloat(numericValue).toFixed(2)
                  : numericValue
            });
          }}
          onKeyPress={handleKeyPress}
        />
        <Box sx={{ width: "15px", height: "2px", background: theme.palette.info.light }}></Box>
        <Box
          component={Input}
          type="number"
          data-testid={`filterRange.${keyOnChangeMax}`}
          sx={{
            fontSize: "14px",
            width: "100% !important",
            color: theme.isDark ? theme.palette.secondary.main : theme.palette.secondary.light
          }}
          value={Number(maxValue).toString()}
          onKeyDown={(event) => {
            const key = event.key;

            if (
              !(
                key === "ArrowLeft" ||
                key === "ArrowRight" ||
                key === "Backspace" ||
                key === "Delete" ||
                ((keyOnChangeMax === "maxVotingPower" ||
                  keyOnChangeMax === "maxSaturation" ||
                  keyOnChangeMax === "maxGovParticipationRate") &&
                  key === ".") ||
                /^\d$/.test(key)
              )
            ) {
              event.preventDefault();
            }
          }}
          onBlur={() => {
            maxValue < minValue &&
              setFilterParams({
                ...filterParams,
                [keyOnChangeMax]: minValue
              });
          }}
          onChange={({ target: { value } }) => {
            const numericValue = value
              .replace(/[^0-9.]/g, "")
              .replace(/^0+(?!$)/, "")
              .replace(/^0+(?=\d)/, "");

            Number(numericValue) <= maxValueDefault &&
              setFilterParams({
                ...filterParams,
                [keyOnChangeMax]:
                  +numericValue > maxValueDefault
                    ? maxValueDefault
                    : ["maxGovParticipationRate"].includes(keyOnChangeMax)
                    ? +numericValue / 100
                    : ["maxPledge"].includes(keyOnChangeMax)
                    ? +numericValue * 10 ** 6
                    : ["maxSaturation"].includes(keyOnChangeMax)
                    ? parseFloat(numericValue).toFixed(2)
                    : numericValue
              });
          }}
          onKeyPress={handleKeyPress}
        />
      </Box>
    );
  };

  return (
    <ClickAwayListener onClickAway={() => setOpen(false)}>
      <FilterWrapper>
        <Box
          component={Button}
          disabled={loadingRange || loading}
          variant="text"
          px={2}
          textTransform={"capitalize"}
          bgcolor={({ palette, mode }) => (mode === "dark" ? palette.secondary.dark : palette.primary[200])}
          border={({ palette, mode }) => `1px solid ${mode === "dark" ? "none" : palette.primary[200]}`}
          onClick={() => setOpen((pre) => !pre)}
          sx={{
            ":hover": {
              bgcolor: theme.mode === "dark" ? theme.palette.secondary.dark : theme.palette.primary[200]
            }
          }}
        >
          <CustomIcon
            icon={FilterIcon}
            fill={theme.mode === "dark" ? theme.palette.primary.main : theme.palette.secondary.light}
            height={20}
          />
          <Box
            ml={1}
            position={"relative"}
            whiteSpace={"nowrap"}
            fontWeight={"bold"}
            color={({ palette, mode }) => (mode === "dark" ? palette.primary.main : palette.secondary.light)}
            data-testid="filterRange.filter"
          >
            {t("common.filter")}
          </Box>
        </Box>
        {open && (
          <FilterContainer>
            <Box display={"flex"} flexDirection={"column"}>
              <AccordionContainer
                data-testid="filterRange.drepId"
                expanded={expanded === "drepId"}
                onChange={handleChange("drepId")}
              >
                <AccordionSummary>
                  <Box width={"100%"} display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
                    <Box display={"flex"} alignItems={"center"}>
                      <CustomIcon icon={DrepIdIcon} stroke={theme.palette.secondary.light} height={20} />
                      <Box
                        data-testid="filterRange.poolNameTitle"
                        ml={"4px"}
                        color={({ palette }) => palette.secondary.main}
                      >
                        {t("drep.filter.drepId")}
                      </Box>
                    </Box>
                    <Box>
                      {expanded === "drepId" ? (
                        <IoIosArrowUp color={theme.palette.secondary.main} />
                      ) : (
                        <IoIosArrowDown color={theme.palette.secondary.main} />
                      )}
                    </Box>
                  </Box>
                </AccordionSummary>
                <AccordionDetailsFilter sx={{ background: "unset" }}>
                  <StyledInput
                    data-testid="filterRange.drepId"
                    sx={{
                      width: "100% !important",
                      color: theme.isDark ? theme.palette.secondary.main : theme.palette.secondary.light
                    }}
                    placeholder={t("drep.filter.drepIdSearch")}
                    value={filterParams?.drepIdOrHash || ""}
                    onChange={({ target: { value } }) => setFilterParams({ ...filterParams, drepIdOrHash: value })}
                    onKeyPress={handleKeyPress}
                  />
                </AccordionDetailsFilter>
              </AccordionContainer>
              <AccordionContainer
                data-testid="filterRange.anchorHash.title"
                expanded={expanded === "anchorHash"}
                onChange={handleChange("anchorHash")}
              >
                <AccordionSummary>
                  <Box width={"100%"} display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
                    <Box display={"flex"} alignItems={"center"}>
                      <CustomIcon icon={GovernanceIdIcon} fill={theme.palette.secondary.light} height={17} />
                      <Box data-testid="filterRange.anchorHash" ml={1} color={({ palette }) => palette.secondary.main}>
                        {t("drep.filter.anchorHash")}
                      </Box>
                    </Box>
                    <Box>
                      {expanded === "anchorHash" ? (
                        <IoIosArrowUp color={theme.palette.secondary.main} />
                      ) : (
                        <IoIosArrowDown color={theme.palette.secondary.main} />
                      )}
                    </Box>
                  </Box>
                </AccordionSummary>
                <AccordionDetailsFilter sx={{ background: "unset" }}>
                  <StyledInput
                    data-testid="filterRange.anchorHashInput"
                    sx={{
                      width: "100% !important",
                      color: theme.isDark ? theme.palette.secondary.main : theme.palette.secondary.light
                    }}
                    placeholder={t("drep.filter.anchorHashSearch")}
                    value={filterParams?.anchorText || ""}
                    onChange={({ target: { value } }) => setFilterParams({ ...filterParams, anchorText: value })}
                    onKeyPress={handleKeyPress}
                  />
                </AccordionDetailsFilter>
              </AccordionContainer>
              <Box
                component={dataRange?.maxActiveVoteStake === null ? CustomTooltip : Box}
                title={dataRange?.maxActiveVoteStake === null ? t("common.noDataAvaiable") : undefined}
                slotProps={{
                  popper: {
                    modifiers: [
                      {
                        name: "offset",
                        options: {
                          offset: [0, -18]
                        }
                      }
                    ]
                  }
                }}
              >
                <AccordionContainer
                  data-testid="filterRange.activeStake"
                  expanded={expanded === "activeStake"}
                  onChange={handleChange("activeStake")}
                >
                  <AccordionSummary
                    disabled={dataRange?.maxActiveVoteStake === null}
                    sx={{
                      "&.Mui-disabled": {
                        opacity: 0.9
                      }
                    }}
                  >
                    <Box width={"100%"} display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
                      <Box display={"flex"} alignItems={"center"}>
                        <CustomIcon
                          icon={ActiveStakeDrepIcon}
                          fill={
                            dataRange?.maxActiveVoteStake === null
                              ? theme.palette.secondary[600]
                              : theme.palette.secondary.light
                          }
                          height={18}
                        />
                        <Box
                          data-testid="filterRange.activeStakeTitle"
                          ml={1}
                          color={({ palette }) =>
                            dataRange?.maxActiveVoteStake === null ? palette.secondary[600] : palette.secondary.main
                          }
                        >
                          {t("drep.filter.activeStake")}
                        </Box>
                      </Box>
                      <Box>
                        {expanded === "activeStake" ? (
                          <IoIosArrowUp
                            color={
                              dataRange?.maxActiveVoteStake === null
                                ? theme.palette.secondary[600]
                                : theme.palette.secondary.main
                            }
                          />
                        ) : (
                          <IoIosArrowDown
                            color={
                              dataRange?.maxActiveVoteStake === null
                                ? theme.palette.secondary[600]
                                : theme.palette.secondary.main
                            }
                          />
                        )}
                      </Box>
                    </Box>
                  </AccordionSummary>
                  <AccordionDetailsFilter sx={{ background: "unset" }}>
                    <Box display="flex" alignItems="center" mb={1} sx={{ gap: "14px" }}>
                      <Typography>
                        {formatADA(dataRange?.minActiveVoteStake, LARGE_NUMBER_ABBREVIATIONS, 6, 2) || 0}
                      </Typography>
                      <StyledSlider
                        data-testid="filterRange.activeStakeValue"
                        getAriaLabel={() => "Minimum distance"}
                        defaultValue={[filterParams?.minActiveVoteStake || 0, initParams.maxActiveVoteStake || 0]}
                        onChange={(e, newValue) =>
                          handleChangeValueRange(e, newValue, "minActiveVoteStake", ".maxActiveVoteStake")
                        }
                        valueLabelDisplay="auto"
                        value={[
                          filterParams?.minActiveVoteStake || 0,
                          filterParams.maxActiveVoteStake ?? (initParams.maxActiveVoteStake || 0)
                        ]}
                        min={dataRange?.minActiveVoteStake || 0}
                        disableSwap
                        step={1000000}
                        max={dataRange?.maxActiveVoteStake || 0}
                      />
                      <Typography>
                        {formatADA(dataRange?.maxActiveVoteStake, LARGE_NUMBER_ABBREVIATIONS, 6, 2) || 0}
                      </Typography>
                    </Box>
                    {groupInputRange(
                      filterParams?.minActiveVoteStake || 0,
                      filterParams.maxActiveVoteStake ?? (initParams.maxActiveVoteStake || 0),
                      "minActiveVoteStake",
                      ".maxActiveVoteStake",
                      initParams.maxActiveVoteStake
                    )}
                  </AccordionDetailsFilter>
                </AccordionContainer>
              </Box>

              <Box
                component={dataRange?.maxVotingPower === null ? CustomTooltip : Box}
                title={dataRange?.maxVotingPower === null ? t("common.noDataAvaiable") : undefined}
                slotProps={{
                  popper: {
                    modifiers: [
                      {
                        name: "offset",
                        options: {
                          offset: [0, -18]
                        }
                      }
                    ]
                  }
                }}
              >
                <AccordionContainer
                  data-testid="filterRange.poolVoting"
                  expanded={expanded === "poolVoting"}
                  onChange={handleChange("poolVoting")}
                >
                  <AccordionSummary
                    disabled={dataRange?.maxVotingPower === null}
                    sx={{
                      "&.Mui-disabled": {
                        opacity: 0.9
                      }
                    }}
                  >
                    <Box width={"100%"} display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
                      <Box display={"flex"} alignItems={"center"}>
                        <CustomIcon
                          icon={PoolVotingIcon}
                          fill={
                            dataRange?.maxVotingPower === null
                              ? theme.palette.secondary[600]
                              : theme.palette.secondary[800]
                          }
                          height={18}
                        />
                        <Box
                          data-testid="filterRange.poolVotingTitle"
                          ml={1}
                          color={({ palette }) =>
                            dataRange?.maxVotingPower === null ? palette.secondary[600] : palette.secondary.main
                          }
                        >
                          {t("pool.poolVoting")}
                        </Box>
                      </Box>
                      <Box>
                        {expanded === "poolVoting" ? (
                          <IoIosArrowUp
                            color={
                              dataRange?.maxActiveVoteStake === null
                                ? theme.palette.secondary[600]
                                : theme.palette.secondary.main
                            }
                          />
                        ) : (
                          <IoIosArrowDown
                            color={
                              dataRange?.maxActiveVoteStake === null
                                ? theme.palette.secondary[600]
                                : theme.palette.secondary.main
                            }
                          />
                        )}
                      </Box>
                    </Box>
                  </AccordionSummary>
                  <AccordionDetailsFilter sx={{ background: "unset" }}>
                    <Box display="flex" alignItems="center" mb={1} sx={{ gap: "14px" }}>
                      <Typography>{formatPercent(dataRange?.minVotingPower || 0)}</Typography>
                      <StyledSlider
                        valueLabelFormat={(value) => formatPercent(value)}
                        data-testid="filterRange.poolVotingValue"
                        getAriaLabel={() => "Minimum distance"}
                        defaultValue={[filterParams.minVotingPower || 0, initParams.maxVotingPower || 0]}
                        onChange={(e, newValue) =>
                          handleChangeValueRange(e, newValue, "minVotingPower", "maxVotingPower")
                        }
                        value={[
                          filterParams.minVotingPower || 0,
                          filterParams.maxVotingPower ?? (initParams.maxVotingPower || 0)
                        ]}
                        valueLabelDisplay="auto"
                        disableSwap
                        min={dataRange?.minVotingPower || 0}
                        step={0.0001}
                        max={dataRange?.maxVotingPower || 0}
                      />
                      <Typography>{formatPercent(dataRange?.maxVotingPower || 0)}</Typography>
                    </Box>
                    {groupInputRange(
                      filterParams.minVotingPower || 0,
                      filterParams.maxVotingPower ?? (initParams.maxVotingPower || 0),
                      "minVotingPower",
                      "maxVotingPower",
                      initParams.maxVotingPower
                    )}
                  </AccordionDetailsFilter>
                </AccordionContainer>
              </Box>

              <AccordionContainer
                data-testid="filterRange.drep.status"
                expanded={expanded === "status"}
                onChange={handleChange("status")}
              >
                <AccordionSummary>
                  <Box width={"100%"} display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
                    <Box display={"flex"} alignItems={"center"}>
                      <CustomIcon icon={CurrentStatusIcon} fill={theme.palette.secondary.main} height={21} />
                      <Box
                        data-testid="filterRange.drep.statusTitle"
                        ml={"3px"}
                        color={({ palette }) => palette.secondary.main}
                      >
                        {t("drep.filter.status")}
                      </Box>
                    </Box>
                    <Box>
                      {expanded === "status" ? (
                        <IoIosArrowUp color={theme.palette.secondary.main} />
                      ) : (
                        <IoIosArrowDown color={theme.palette.secondary.main} />
                      )}
                    </Box>
                  </Box>
                </AccordionSummary>
                <Box px={2}>
                  <AccordionDetailsFilter>
                    <RadioGroup
                      aria-labelledby="demo-controlled-radio-buttons-group"
                      name="controlled-radio-buttons-group"
                      value={filterParams.drepStatus || ""}
                      onChange={({ target: { value } }) => setFilterParams({ ...filterParams, drepStatus: value })}
                    >
                      <FormControlLabel
                        value={""}
                        control={
                          <Radio
                            sx={{
                              color: theme.palette.secondary.light
                            }}
                          />
                        }
                        label={<Box lineHeight={1}>{t("smartContract.any")}</Box>}
                      />
                      <FormControlLabel
                        value="ACTIVE"
                        control={
                          <Radio
                            sx={{
                              color: theme.palette.secondary.light
                            }}
                          />
                        }
                        label={<Box lineHeight={1}>{t("common.active")}</Box>}
                      />
                      <FormControlLabel
                        value={"INACTIVE"}
                        control={
                          <Radio
                            sx={{
                              color: theme.palette.secondary.light
                            }}
                          />
                        }
                        label={<Box lineHeight={1}>{t("common.incactive")}</Box>}
                      />
                      <FormControlLabel
                        value={"RETIRED"}
                        control={
                          <Radio
                            sx={{
                              color: theme.palette.secondary.light
                            }}
                          />
                        }
                        label={<Box lineHeight={1}>{t("common.retired")}</Box>}
                      />
                    </RadioGroup>
                  </AccordionDetailsFilter>
                </Box>
              </AccordionContainer>
              <AccordionContainer data-testid="filterRange.saturation">
                <AccordionSummary onClick={() => setShowDaterange(true)}>
                  <Box width={"100%"} display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
                    <Box display={"flex"} alignItems={"center"}>
                      <CustomIcon icon={ExpiryIcon} fill={theme.palette.secondary.main} height={20} />
                      <Box
                        data-testid="filterRange.drep.statusTitle"
                        ml={"4px"}
                        color={({ palette }) => palette.secondary.main}
                      >
                        {t("drep.filter.registrationDate")}
                      </Box>
                    </Box>{" "}
                    {!isEmpty(pickBy(dateRange, (value) => value !== "" && value !== undefined)) && (
                      <BsFillCheckCircleFill size={14} color={theme.palette.primary.main} />
                    )}
                  </Box>
                </AccordionSummary>
              </AccordionContainer>

              <DateRangeModal
                onClose={() => {
                  setShowDaterange(false);
                }}
                onClearValue={() => {
                  setDateRange({});
                }}
                open={showDaterange}
                value={dateRange}
                onDateRangeChange={({ fromDate, toDate }) => setDateRange({ fromDate, toDate })}
              />
              <Box my={1} p="0px 16px">
                <ApplyFilterButton
                  data-testid="filterRange.applyFilters"
                  onClick={() => {
                    handleFilter();
                  }}
                  disabled={JSON.stringify(defaultParams) === JSON.stringify(filterParams) && !isDisableFilter}
                >
                  {t("common.applyFilters")}
                </ApplyFilterButton>
              </Box>
              <Box p={theme.spacing(1, 2)} mb={theme.spacing(1)}>
                <Box
                  data-testid="filterRange.resetFilters"
                  component={Button}
                  width={"100%"}
                  textTransform={"capitalize"}
                  display={"flex"}
                  alignItems={"center"}
                  color={({ palette }) => `${palette.primary.main} !important`}
                  onClick={handleReset}
                >
                  <Box data-testid="filterRange.resetTitle" mr={1}>
                    {t("common.reset")}
                  </Box>
                  <CustomIcon icon={ResetIcon} fill={theme.palette.primary.main} width={18} />
                </Box>
              </Box>
            </Box>
          </FilterContainer>
        )}
      </FilterWrapper>
    </ClickAwayListener>
  );
};

export default DrepFilter;
