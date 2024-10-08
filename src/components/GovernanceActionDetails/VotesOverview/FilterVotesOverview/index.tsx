import { useTheme } from "@emotion/react";
import {
  AccordionSummary,
  Box,
  Button,
  ClickAwayListener,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { parse, stringify } from "qs";
import { isEmpty, pickBy } from "lodash";
import { BsFillCheckCircleFill } from "react-icons/bs";
import BigNumber from "bignumber.js";

import { FilterIcon, GovBodycon, GovernanceIcon, GovIDIcon, ResetIcon, TimeStampIcon } from "src/commons/resources";
import CustomIcon from "src/components/commons/CustomIcon";
import {
  AccordionContainer,
  AccordionDetailsFilter,
  ApplyFilterButton,
  FilterContainer,
  FilterWrapper
} from "src/pages/NativeScriptsAndSC/styles";
import { StyledInput } from "src/components/share/styled";
import { StyledSlider } from "src/components/commons/CustomFilterMultiRange/styles";
import CustomTooltip from "src/components/commons/CustomTooltip";
import { formatADA, formatPercent, LARGE_NUMBER_ABBREVIATIONS, truncateDecimals } from "src/commons/utils/helper";
import DateRangeModal from "src/components/commons/CustomFilter/DateRangeModal";
import usePageInfo from "src/commons/hooks/usePageInfo";
import useFetch from "src/commons/hooks/useFetch";
import { API } from "src/commons/utils/api";

import { Input } from "./styles";

interface RequestParams {
  page?: number;
  size?: number;
  query?: string;
  voterType?: string | null;
  voterHash?: string | null;
  activeStakeTo?: number;
  activeStakeFrom?: number;
  maxActiveStake?: number;
  minActiveStake?: number;
  minVotingPower?: number;
  maxVotingPower?: number;
  votingPowerFrom?: number;
  votingPowerTo?: number;
}

export default function FilterVotesOverview() {
  const [expanded, setExpanded] = useState<string | false>("");
  const [open, setOpen] = useState<boolean>(false);
  const [filterParams, setFilterParams] = useState<RequestParams>({});
  const [showDaterange, setShowDaterange] = useState<boolean>(false);
  const { search } = useLocation();
  const query = parse(search.split("?")[1]);
  const [dateRange, setDateRange] = useState<{
    fromDate?: string;
    toDate?: string;
  }>({ fromDate: query?.fromDate as string, toDate: query?.toDate as string });
  const theme = useTheme();
  const { t } = useTranslation();
  const history = useHistory();

  const { pageInfo } = usePageInfo();

  const { index, txHash } = useParams<{ index?: string; txHash?: string }>();

  const handleChange = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false);
  };

  const fetchDataRange = useFetch<RequestParams>(
    API.GOV_ACTIONS_DETAIL.RANGE_VALUE.replace(":txHash", txHash || "").replace(":index", index || "")
  );

  const defaultParams = { page: 0, size: 3, sort: "" };

  const dataRange = fetchDataRange.data;

  const initParams: RequestParams = {
    page: 0,
    size: 6,
    voterType: "NONE",
    voterHash: "",
    activeStakeFrom: +(dataRange?.minActiveStake || 0),
    activeStakeTo: +(dataRange?.maxActiveStake || 0),
    votingPowerTo: +(dataRange?.minVotingPower || 0),
    votingPowerFrom: +(dataRange?.maxVotingPower || 0)
  };

  const isDisableFilter = useMemo(() => {
    // Todo
    return false;
  }, [filterParams]);

  useEffect(() => {
    setFilterParams({
      page: query?.page && +query?.page >= 1 ? +query?.page - 1 : 0,
      size: +(query?.size || "") || 6,
      voterType: (query?.voterType || "NONE").toString(),
      voterHash: "",
      ...(query?.activeStakeFrom && { activeStakeFrom: +(query?.activeStakeFrom || 0) }),
      ...(query?.activeStakeTo && { activeStakeTo: +(query?.activeStakeTo || 0) }),
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

  const handleChangeValueRange = (event: Event, newValue: number | number[], minKey: string, maxKey: string) => {
    if (!Array.isArray(newValue)) {
      return;
    }
    const [min, max] = newValue || [];
    setFilterParams({ ...filterParams, [minKey]: Math.min(min), [maxKey]: Math.min(max) });
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
            voterType: filterParams.voterType === "NONE" ? null : filterParams.voterType,
            voterHash: filterParams.voterHash,
            fromDate: dateRange.fromDate,
            toDate: dateRange.toDate,
            size: +(query?.size || "") || 6,
            page: 1
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

  const groupInputRange = (
    minValue: number,
    maxValue: number,
    keyOnChangeMin: string,
    keyOnChangeMax: string,
    maxValueDefault: number,
    disabled = false
  ) => {
    return (
      <Box display="flex" alignItems="center" gap="30px">
        <Box
          component={Input}
          disabled={disabled}
          type="number"
          sx={{
            fontSize: "14px",
            width: "100% !important",
            "& .MuiInputBase-input.Mui-disabled": {
              WebkitTextFillColor: theme.isDark ? "#8c93a466 !important" : "#50596d66 !important"
            }
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
                (keyOnChangeMin === "activeStakeFrom" && key === ".") ||
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
                  : ["activeStakeFrom"].includes(keyOnChangeMin)
                  ? truncateDecimals(+numericValue, 6) * 10 ** 6
                  : truncateDecimals(+numericValue, 6)
            });
          }}
          onKeyPress={handleKeyPress}
        />

        <Box sx={{ width: "15px", height: "2px", background: theme.palette.info.light }}></Box>

        <Box
          component={Input}
          type="number"
          disabled={disabled}
          sx={{
            fontSize: "14px",
            width: "100% !important",
            "& .MuiInputBase-input.Mui-disabled": {
              WebkitTextFillColor: theme.isDark ? "#8c93a466 !important" : "#50596d66 !important"
            }
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
                (keyOnChangeMax === "activeStakeTo" && key === ".") ||
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
                [keyOnChangeMax]: ["activeStakeTo"].includes(keyOnChangeMax) ? +minValue * 10 ** 6 : minValue
              });
          }}
          onChange={({ target: { value } }) => {
            const numericValue = value
              .replace(/[^0-9.]/g, "")
              .replace(/^0+(?!$)/, "")
              .replace(/^0+(?=\d)/, "")
              .replace("%", "");

            Number(numericValue) <= maxValueDefault &&
              setFilterParams({
                ...filterParams,
                [keyOnChangeMax]:
                  +numericValue > maxValueDefault
                    ? maxValueDefault
                    : ["activeStakeTo"].includes(keyOnChangeMax)
                    ? truncateDecimals(+numericValue, 6) * 10 ** 6
                    : truncateDecimals(+numericValue, 6)
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
          variant="text"
          px={2}
          textTransform={"capitalize"}
          onClick={() => setOpen((open) => !open)}
          bgcolor={({ palette, mode }) => (mode === "dark" ? palette.secondary[100] : palette.primary[200])}
          border={({ palette, mode }) => `1px solid ${mode === "dark" ? "none" : palette.primary[200]}`}
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

        {open && (
          <FilterContainer>
            <Box display={"flex"} flexDirection={"column"}>
              <AccordionContainer expanded={expanded === "action-id"} onChange={handleChange("action-id")}>
                <AccordionSummary>
                  <Box width={"100%"} display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
                    <Box display={"flex"} alignItems={"center"}>
                      <CustomIcon icon={GovIDIcon} fill={theme.palette.secondary.light} height={24} width={24} />
                      <Box ml={1} color={({ palette }) => palette.secondary.main}>
                        {t("filter.govID")}
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
                    sx={{
                      p: "0px 12px",
                      width: "100% !important",
                      color: theme.isDark ? theme.palette.secondary.main : theme.palette.secondary.light
                    }}
                    placeholder={"Search ID"}
                    onChange={({ target: { value } }) => setFilterParams({ ...filterParams, voterHash: value })}
                    onKeyPress={handleKeyPress}
                  />
                </AccordionDetailsFilter>
              </AccordionContainer>
            </Box>

            <AccordionContainer expanded={expanded === "status"} onChange={handleChange("status")}>
              <AccordionSummary>
                <Box width={"100%"} display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
                  <Box display={"flex"} alignItems={"center"}>
                    <CustomIcon icon={GovBodycon} fill={theme.palette.secondary.main} height={24} width={24} />
                    <Box ml={"3px"} color={({ palette }) => palette.secondary.main}>
                      {t("filter.governanceBody")}
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
                    name="controlled-radio-buttons-group"
                    value={filterParams.voterType || ""}
                    onChange={({ target: { value } }) => setFilterParams({ ...filterParams, voterType: value })}
                  >
                    <FormControlLabel
                      value="NONE"
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
                      value="CONSTITUTIONAL_COMMITTEE_HOT_KEY_HASH"
                      control={
                        <Radio
                          sx={{
                            color: theme.palette.secondary.light
                          }}
                        />
                      }
                      label={<Box lineHeight={1}>{t("filter.constitutionalCommittee")}</Box>}
                    />
                    <FormControlLabel
                      value="DREP_KEY_HASH"
                      control={
                        <Radio
                          sx={{
                            color: theme.palette.secondary.light
                          }}
                        />
                      }
                      label={<Box lineHeight={1}>{t("filter.dreps")}</Box>}
                    />
                    <FormControlLabel
                      value="STAKING_POOL_KEY_HASH"
                      control={
                        <Radio
                          sx={{
                            color: theme.palette.secondary.light
                          }}
                        />
                      }
                      label={<Box lineHeight={1}>{t("filter.stakePoolOperators")}</Box>}
                    />
                  </RadioGroup>
                </AccordionDetailsFilter>
              </Box>
            </AccordionContainer>

            <AccordionContainer>
              <AccordionSummary onClick={() => setShowDaterange(true)}>
                <Box width={"100%"} display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
                  <Box display={"flex"} alignItems={"center"}>
                    <CustomIcon icon={TimeStampIcon} fill={theme.palette.secondary.main} height={24} width={24} />
                    <Box ml={"4px"} color={({ palette }) => palette.secondary.main}>
                      {t("filter.timeStamp")}
                    </Box>
                  </Box>
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

            <Box width={"100%"} display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
              <Box
                component={
                  Boolean(!dataRange?.maxVotingPower) || filterParams.voterType !== "DREP_KEY_HASH"
                    ? CustomTooltip
                    : Box
                }
                title={
                  Boolean(!dataRange?.maxVotingPower) || filterParams.voterType !== "DREP_KEY_HASH"
                    ? t("common.noDataAvaiable")
                    : undefined
                }
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
                  expanded={expanded === "govActionVoting"}
                  onChange={handleChange("govActionVoting")}
                >
                  <AccordionSummary
                    disabled={Boolean(!dataRange?.maxVotingPower) || filterParams.voterType !== "DREP_KEY_HASH"}
                    sx={{
                      "&.Mui-disabled": {
                        opacity: 0.9
                      }
                    }}
                  >
                    <Box width={"100%"} display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
                      <Box display={"flex"} alignItems={"center"}>
                        <CustomIcon
                          icon={GovernanceIcon}
                          fill={
                            Boolean(!dataRange?.maxVotingPower) || filterParams.voterType !== "DREP_KEY_HASH"
                              ? theme.palette.secondary[600]
                              : theme.palette.secondary.main
                          }
                          height={24}
                          width={24}
                        />
                        <Box
                          ml={1}
                          color={({ palette }) =>
                            Boolean(!dataRange?.maxVotingPower) || filterParams.voterType !== "DREP_KEY_HASH"
                              ? palette.secondary[600]
                              : palette.secondary.main
                          }
                        >
                          {t("pool.poolVoting")}
                        </Box>
                      </Box>
                      <Box>
                        {expanded === "govActionVoting" ? (
                          <IoIosArrowUp
                            color={
                              Boolean(!dataRange?.maxVotingPower) || filterParams.voterType !== "DREP_KEY_HASH"
                                ? theme.palette.secondary[600]
                                : theme.palette.secondary.main
                            }
                          />
                        ) : (
                          <IoIosArrowDown
                            color={
                              Boolean(!dataRange?.maxVotingPower) || filterParams.voterType !== "DREP_KEY_HASH"
                                ? theme.palette.secondary[600]
                                : theme.palette.secondary.main
                            }
                          />
                        )}
                      </Box>
                    </Box>
                  </AccordionSummary>
                  <AccordionDetailsFilter sx={{ background: "unset" }}>
                    <Box padding={"0 8px"} display="flex" alignItems="center" mb={1} sx={{ gap: "14px" }}>
                      <Typography>{formatPercent(dataRange?.minVotingPower || 0)}</Typography>
                      <StyledSlider
                        valueLabelFormat={(value) => formatPercent(value)}
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
                        disabled={dataRange?.maxVotingPower === null}
                      />
                      <Typography>{formatPercent(dataRange?.maxVotingPower || 0)}</Typography>
                    </Box>
                    {groupInputRange(
                      filterParams.minVotingPower || 0,
                      filterParams.maxVotingPower ?? (initParams.maxVotingPower || 0),
                      "minVotingPower",
                      "maxVotingPower",
                      initParams.maxVotingPower || 0,
                      dataRange?.maxVotingPower === null
                    )}
                  </AccordionDetailsFilter>
                </AccordionContainer>
              </Box>
            </Box>

            <Box width={"100%"} display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
              <Box
                component={
                  Boolean(!dataRange?.maxActiveStake) ||
                  filterParams.voterType !== "DREP_KEY_HASH" ||
                  dataRange?.maxActiveStake === dataRange?.minActiveStake
                    ? CustomTooltip
                    : Box
                }
                title={
                  Boolean(!dataRange?.maxActiveStake) || filterParams.voterType !== "DREP_KEY_HASH"
                    ? t("common.noDataAvaiable")
                    : dataRange?.maxActiveStake === dataRange?.minActiveStake
                    ? t("common.notFilter")
                    : undefined
                }
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
                <AccordionContainer expanded={expanded === "voitingStake"} onChange={handleChange("voitingStake")}>
                  <AccordionSummary
                    disabled={Boolean(!dataRange?.maxActiveStake) || filterParams.voterType !== "DREP_KEY_HASH"}
                    sx={{
                      "&.Mui-disabled": {
                        opacity: 0.9
                      }
                    }}
                  >
                    <Box width={"100%"} display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
                      <Box display={"flex"} alignItems={"center"}>
                        <CustomIcon
                          icon={GovernanceIcon}
                          fill={
                            Boolean(!dataRange?.maxActiveStake) || filterParams.voterType !== "DREP_KEY_HASH"
                              ? theme.palette.secondary[600]
                              : theme.palette.secondary.main
                          }
                          height={24}
                          width={24}
                        />
                        <Box
                          ml={1}
                          color={({ palette }) =>
                            Boolean(!dataRange?.maxActiveStake) || filterParams.voterType !== "DREP_KEY_HASH"
                              ? palette.secondary[600]
                              : palette.secondary.main
                          }
                        >
                          {t("filter.voitingStake")}
                        </Box>
                      </Box>
                      <Box>
                        {expanded === "voitingStake" ? (
                          <IoIosArrowUp
                            color={
                              Boolean(!dataRange?.maxActiveStake) || filterParams.voterType !== "DREP_KEY_HASH"
                                ? theme.palette.secondary[600]
                                : theme.palette.secondary.main
                            }
                          />
                        ) : (
                          <IoIosArrowDown
                            color={
                              Boolean(!dataRange?.maxActiveStake) || filterParams.voterType !== "DREP_KEY_HASH"
                                ? theme.palette.secondary[600]
                                : theme.palette.secondary.main
                            }
                          />
                        )}
                      </Box>
                    </Box>
                  </AccordionSummary>
                  <AccordionDetailsFilter sx={{ background: "unset" }}>
                    <Box padding={"0 8px"} display="flex" alignItems="center" mb={1} sx={{ gap: "14px" }}>
                      <Typography>
                        {formatADA(dataRange?.minActiveStake, LARGE_NUMBER_ABBREVIATIONS, 6, 2) || 0}
                      </Typography>
                      <StyledSlider
                        valueLabelFormat={(value) => formatADA(value, LARGE_NUMBER_ABBREVIATIONS, 6, 2)}
                        getAriaLabel={() => "Minimum distance"}
                        defaultValue={[filterParams.activeStakeFrom || 0, initParams.activeStakeTo || 0]}
                        value={[
                          filterParams.activeStakeFrom ?? (initParams.activeStakeFrom || 0),
                          filterParams.activeStakeTo ?? (initParams.activeStakeTo || 0)
                        ]}
                        onChange={(e, newValue) =>
                          handleChangeValueRange(e, newValue, "activeStakeFrom", "activeStakeTo")
                        }
                        valueLabelDisplay="auto"
                        disableSwap
                        step={1000000}
                        min={dataRange?.minActiveStake || 0}
                        max={dataRange?.maxActiveStake || 0}
                        disabled={Boolean(!dataRange?.maxActiveStake)}
                      />
                      <Typography>
                        {formatADA(dataRange?.maxActiveStake, LARGE_NUMBER_ABBREVIATIONS, 6, 2) || 0}
                      </Typography>
                    </Box>
                    {groupInputRange(
                      filterParams.activeStakeFrom !== undefined && !isNaN(filterParams.activeStakeFrom)
                        ? BigNumber(filterParams.activeStakeFrom || 0)
                            .div(10 ** 6)
                            .toNumber()
                        : BigNumber(initParams.activeStakeFrom || 0)
                            .div(10 ** 6)
                            .toNumber(),
                      filterParams.activeStakeTo !== undefined && !isNaN(filterParams.activeStakeTo)
                        ? BigNumber(filterParams.activeStakeTo)
                            .div(10 ** 6)
                            .toNumber()
                        : BigNumber(initParams.activeStakeTo || 0)
                            .div(10 ** 6)
                            .toNumber(),
                      "activeStakeFrom",
                      "activeStakeTo",
                      BigNumber(initParams.activeStakeTo || 0)
                        .div(10 ** 6)
                        .toNumber(),
                      dataRange?.maxActiveStake === dataRange?.minActiveStake
                    )}
                  </AccordionDetailsFilter>
                </AccordionContainer>
              </Box>
            </Box>
            <Box my={1} p="0px 16px">
              <ApplyFilterButton
                onClick={() => {
                  handleFilter();
                }}
                disabled={JSON.stringify(defaultParams) === JSON.stringify(filterParams) && !isDisableFilter}
              >
                {t("common.applyFilters")}
              </ApplyFilterButton>
            </Box>
            <Box
              component={Button}
              width={"100%"}
              textTransform={"capitalize"}
              display={"flex"}
              alignItems={"center"}
              color={({ palette }) => `${palette.primary.main} !important`}
              onClick={handleReset}
            >
              <Box mr={1}>{t("common.reset")}</Box>
              <CustomIcon icon={ResetIcon} fill={theme.palette.primary.main} width={18} />
            </Box>
          </FilterContainer>
        )}
      </FilterWrapper>
    </ClickAwayListener>
  );
}
