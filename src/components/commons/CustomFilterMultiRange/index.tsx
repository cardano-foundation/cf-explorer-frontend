import React, { useEffect, useMemo, useState } from "react";
import { Box, Button, ClickAwayListener, Typography, useTheme, AccordionSummary } from "@mui/material";
import { useTranslation } from "react-i18next";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useHistory, useLocation } from "react-router-dom";
import { stringify, parse } from "qs";
import BigNumber from "bignumber.js";

import useFetch from "src/commons/hooks/useFetch";
import {
  FilterIcon,
  PoolBlocksIcon,
  PoolNameIcon,
  PoolParticipationIcon,
  PoolPledgeIcon,
  PoolSaturationIcon,
  PoolSizesIcon,
  PoolVotingIcon,
  ResetIcon
} from "src/commons/resources";
import { API } from "src/commons/utils/api";
import {
  LARGE_NUMBER_ABBREVIATIONS,
  formatADA,
  formatPercent,
  truncateDecimals,
  truncateToTwoDecimals
} from "src/commons/utils/helper";
import { FilterWrapper } from "src/pages/NativeScriptsAndSC/styles";
import usePageInfo from "src/commons/hooks/usePageInfo";
import { FF_GLOBAL_IS_CONWAY_ERA } from "src/commons/utils/constants";
import { AntSwitch } from "src/components/DelegationPool/DelegationList/styles";

import { ApplyFilterButton, StyledInput } from "../CustomFilter/styles";
import { AccordionContainer, AccordionDetailsFilter, FilterContainer, Input, StyledSlider } from "./styles";
import CustomIcon from "../CustomIcon";
import CustomTooltip from "../CustomTooltip";

interface PoolResponse {
  page?: number;
  query?: string;
  size?: number;
  sort?: string;
  isShowRetired?: boolean;
  retired?: boolean;
  minPoolSize?: number;
  maxPoolSize?: number;
  minPledge?: number;
  maxPledge?: number;
  minSaturation?: number;
  maxSaturation?: number;
  minBlockLifetime?: number;
  maxBlockLifetime?: number;
  maxLifetimeBlock?: number;
  minLifetimeBlock?: number;
  minVotingPower?: number;
  maxVotingPower?: number;
  minGovParticipationRate?: number;
  maxGovParticipationRate?: number;
}

const defaultParams = { page: 0, size: 50, sort: "" };

const CustomFilterMultiRange: React.FC = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const { search } = useLocation();
  const isIOS =
    /iPad|iPhone|iPod/.test(navigator.platform) || (navigator.userAgent.includes("Mac") && "ontouchend" in document);

  const query = parse(search.split("?")[1]);
  const history = useHistory<{ tickerNameSearch?: string; fromPath?: SpecialPath }>();
  const [expanded, setExpanded] = useState<string | false>("");
  const [open, setOpen] = useState<boolean>(false);
  const [fixMax, setFixMax] = useState<number>(2);
  const [fixMin, setFixMin] = useState<number>(0);
  const [addDotMin, setAddDotMin] = useState<boolean>(false);
  const [addDotMax, setAddDotMax] = useState<boolean>(false);
  const { pageInfo } = usePageInfo();
  const handleChange = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false);
  };

  const [isShowRetired, setIsRetired] = useState<boolean>(/^true$/i.test(pageInfo.retired));
  const fetchDataRange = useFetch<PoolResponse>(API.POOL_RANGE_VALUES);
  const dataRange = fetchDataRange.data;

  const initParams = {
    page: 0,
    size: 50,
    query: "",
    sort: "",
    maxPoolSize: +(dataRange?.maxPoolSize || 0),
    minPoolSize: +(dataRange?.minPoolSize || 0),
    minPledge: +(dataRange?.minPledge || 0),
    maxPledge: +(dataRange?.maxPledge || 0),
    minSaturation: +(dataRange?.minSaturation || 0),
    maxSaturation: +(dataRange?.maxSaturation || 0),
    minBlockLifetime: +(dataRange?.minLifetimeBlock || 0),
    maxBlockLifetime: +(dataRange?.maxLifetimeBlock || 0),
    minVotingPower: +(dataRange?.minVotingPower || 0),
    maxVotingPower: +(dataRange?.maxVotingPower || 0),
    minGovParticipationRate: +(dataRange?.minGovParticipationRate || 0),
    maxGovParticipationRate: +(dataRange?.maxGovParticipationRate || 0)
  };

  const [filterParams, setFilterParams] = useState<PoolResponse>({});

  useEffect(() => {
    setIsRetired(query.retired === "true" || false);
    setFilterParams({
      page: query?.page && +query?.page >= 1 ? +query?.page - 1 : 0,
      size: +(query?.voteSize || "") || 50,
      sort: (query?.sort || "").toString(),
      query: "",

      ...(query?.maxPoolSize && { maxPoolSize: +(query?.maxPoolSize || 0) }),
      ...(query?.maxPoolSize && { maxPoolSize: +(query?.maxPoolSize || 0) }),
      ...(query?.minPoolSize && { minPoolSize: +(query?.minPoolSize || 0) }),
      ...(query?.minPledge && { minPledge: +(query?.minPledge || 0) }),
      ...(query?.maxPledge && { maxPledge: +(query?.maxPledge || 0) }),
      ...(query?.minSaturation && { minSaturation: +(query?.minSaturation || 0) }),
      ...(query?.maxSaturation && { maxSaturation: +(query?.maxSaturation || 0) }),
      ...(query?.minBlockLifetime && { minBlockLifetime: +(query?.minBlockLifetime || 0) }),
      ...(query?.maxBlockLifetime && { maxBlockLifetime: +(query?.maxBlockLifetime || 0) }),
      ...(query?.minVotingPower && { minVotingPower: +(query?.minVotingPower || 0) }),
      ...(query?.maxVotingPower && { maxVotingPower: +(query?.maxVotingPower || 0) }),
      ...(query?.minGovParticipationRate && { minGovParticipationRate: +(query?.minGovParticipationRate || 0) }),
      ...(query?.maxGovParticipationRate && { maxGovParticipationRate: +(query?.maxGovParticipationRate || 0) })
    });
  }, [JSON.stringify(query)]);

  useEffect(() => {
    let initDecimalMin = 0;

    switch (expanded) {
      case "poolSaturation":
        initDecimalMin = filterParams?.minSaturation ? filterParams?.minSaturation.toString().split(".")[1]?.length : 0;
        break;
      case "poolParticipation":
        initDecimalMin = filterParams?.minGovParticipationRate
          ? filterParams?.minGovParticipationRate.toString().split(".")[1]?.length
          : 0;
        break;
      case "poolVoting":
        initDecimalMin = filterParams?.minVotingPower
          ? ((filterParams?.minVotingPower * 10000) / 100).toString().split(".")[1]?.length
          : 2;
        break;
    }

    if (initDecimalMin >= 2) {
      setFixMin(2);
    } else if (initDecimalMin > 0) {
      setFixMin(initDecimalMin);
    } else {
      setFixMin(0);
    }

    let initDecimalMax = 0;

    switch (expanded) {
      case "poolSaturation":
        initDecimalMax = Number(
          filterParams?.maxSaturation ? filterParams?.maxSaturation : initParams?.maxSaturation || 0
        )
          .toString()
          .split(".")[1]?.length;
        break;
      case "poolParticipation":
        initDecimalMax = Number(
          filterParams?.maxGovParticipationRate
            ? filterParams?.maxGovParticipationRate
            : initParams?.maxGovParticipationRate || 0
        )
          .toString()
          .split(".")[1]?.length;
        break;
      case "poolVoting":
        initDecimalMax = (
          (Number(filterParams?.maxVotingPower ? filterParams?.maxVotingPower : initParams?.maxVotingPower || 0) *
            10000) /
          100
        )

          .toString()
          .split(".")[1]?.length;
        break;
    }

    if (initDecimalMax >= 2) {
      setFixMax(2);
    } else if (initDecimalMax > 0) {
      setFixMax(initDecimalMax);
    } else {
      setFixMax(0);
    }
  }, [dataRange, expanded]);

  const handleReset = () => {
    setExpanded(false);
    setOpen(false);
    setFilterParams({ ...initParams });
    history.replace({ search: stringify(defaultParams), state: undefined });
  };

  const handleFilter = () => {
    setExpanded(false);
    setOpen(false);
    setFilterParams({ ...filterParams });
    history.replace({
      search: stringify({
        ...filterParams,
        size: pageInfo.size,
        sort: pageInfo.sort,
        page: 1,
        isShowRetired: isShowRetired,
        retired: isShowRetired
      }),
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
      (filterParams.query || "") !== initParams.query ||
      (filterParams.maxPoolSize || initParams.maxPoolSize) !== initParams.maxPoolSize ||
      (filterParams.minPoolSize || initParams.minPoolSize) !== initParams.minPoolSize ||
      (filterParams.minPledge || initParams.minPledge) !== initParams.minPledge ||
      (filterParams.minSaturation || initParams.minSaturation) !== initParams.minSaturation ||
      (filterParams.maxSaturation || initParams.maxSaturation) !== initParams.maxSaturation ||
      (filterParams.minBlockLifetime || initParams.minBlockLifetime) !== initParams.minBlockLifetime ||
      (filterParams.maxBlockLifetime || initParams.maxBlockLifetime) !== initParams.maxBlockLifetime ||
      (filterParams.minVotingPower || initParams.minVotingPower) !== initParams.minVotingPower ||
      (filterParams.maxVotingPower || initParams.maxVotingPower) !== initParams.maxVotingPower ||
      (filterParams.minGovParticipationRate || initParams.minGovParticipationRate) !==
        initParams.minGovParticipationRate ||
      (filterParams.maxGovParticipationRate || initParams.maxGovParticipationRate) !==
        initParams.maxGovParticipationRate ||
      (filterParams.maxPledge || initParams.maxPledge) !== initParams.maxPledge,
    [filterParams]
  );

  function toFixedWithoutRounding(value: number, decimals: number) {
    const factor = Math.pow(10, decimals);
    return (Math.floor(value * factor) / factor).toFixed(decimals);
  }

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
          type={addDotMin ? "text" : "number"}
          data-testid={`filterRange.${keyOnChangeMin}`}
          sx={{
            fontSize: "14px",
            width: "100% !important",
            color: theme.isDark ? theme.palette.secondary.main : theme.palette.secondary.light
          }}
          value={
            addDotMin
              ? Number(minValue || 0).toString() + ","
              : ["minSaturation", "minGovParticipationRate", "minVotingPower"].includes(keyOnChangeMin)
              ? Number(minValue || 0).toFixed(fixMin)
              : Number(minValue || 0).toString()
          }
          onKeyDown={(event) => {
            const key = event.key;

            if (
              isIOS &&
              key === "." &&
              !event.target.value.includes(".") &&
              ["minSaturation", "minGovParticipationRate", "minVotingPower"].includes(keyOnChangeMin)
            ) {
              event.preventDefault();
              setAddDotMin(true);
            } else if (
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

            const decimals = numericValue.split(".")[1]?.length;
            if (decimals <= 2 && decimals > 0) {
              setFixMin(decimals);
            } else if (decimals > 2) {
              setFixMin(2);
            } else {
              setFixMin(0);
            }

            if (addDotMin) {
              numericValue = (Number(numericValue.replace(/\\,/, ".")) / 10).toString();
              setFixMin(1);
              setAddDotMin(false);
            }

            setFilterParams({
              ...filterParams,
              [keyOnChangeMin]:
                +numericValue > maxValue
                  ? 0
                  : ["minGovParticipationRate"].includes(keyOnChangeMin)
                  ? truncateToTwoDecimals(+numericValue) / 100
                  : ["minPledge"].includes(keyOnChangeMin)
                  ? +numericValue * 10 ** 6
                  : ["minSaturation"].includes(keyOnChangeMin)
                  ? toFixedWithoutRounding(parseFloat(numericValue), 2)
                  : ["minActiveStake"].includes(keyOnChangeMin)
                  ? truncateDecimals(+numericValue, 6) * 10 ** 6
                  : ["minVotingPower"].includes(keyOnChangeMin)
                  ? truncateDecimals(+numericValue / 100, 4)
                  : numericValue
            });
          }}
          onKeyPress={handleKeyPress}
        />
        <Box sx={{ width: "15px", height: "2px", background: theme.palette.info.light }}></Box>
        <Box
          component={Input}
          type={addDotMax ? "text" : "number"}
          disabled={disabled}
          data-testid={`filterRange.${keyOnChangeMax}`}
          sx={{
            fontSize: "14px",
            width: "100% !important",
            color: theme.isDark ? theme.palette.secondary.main : theme.palette.secondary.light
          }}
          value={
            addDotMax
              ? Number(maxValue).toString() + ","
              : ["maxSaturation", "maxGovParticipationRate", "maxVotingPower"].includes(keyOnChangeMax)
              ? Number(maxValue).toFixed(fixMax)
              : Number(maxValue).toString() + (addDotMax ? "," : "")
          }
          onKeyDown={(event) => {
            const key = event.key;

            if (
              isIOS &&
              key === "." &&
              !event.target.value.includes(".") &&
              ["maxSaturation", "maxGovParticipationRate", "maxVotingPower"].includes(keyOnChangeMax)
            ) {
              event.preventDefault();
              setAddDotMax(true);
            } else if (
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
                [keyOnChangeMax]: ["maxGovParticipationRate"].includes(keyOnChangeMax)
                  ? +minValue / 100
                  : ["maxPledge"].includes(keyOnChangeMax)
                  ? +minValue * 10 ** 6
                  : ["maxSaturation"].includes(keyOnChangeMax)
                  ? parseFloat(`${minValue}`).toFixed(2)
                  : minValue
              });
          }}
          onChange={({ target: { value } }) => {
            let numericValue = value
              .replace(/[^0-9.]/g, "")
              .replace(/^0+(?!$)/, "")
              .replace(/^0+(?=\d)/, "");

            if (addDotMax) {
              numericValue = (Number(numericValue.replace(/\\,/, ".")) / 10).toString();
              setAddDotMax(false);
            }

            if (
              Number(numericValue) <= maxValueDefault ||
              (["maxVotingPower"].includes(keyOnChangeMax) && +numericValue / 100 <= maxValueDefault)
            ) {
              const decimals = numericValue.split(".")[1]?.length;
              if (decimals <= 2 && decimals > 0) {
                setFixMax(decimals);
              } else if (decimals > 2) {
                setFixMax(2);
              } else if (addDotMax) {
                setFixMax(1);
              } else {
                setFixMax(0);
              }

              setFilterParams({
                ...filterParams,
                [keyOnChangeMax]: ["maxGovParticipationRate"].includes(keyOnChangeMax)
                  ? truncateToTwoDecimals(+numericValue) / 100
                  : ["maxPledge"].includes(keyOnChangeMax)
                  ? +numericValue * 10 ** 6
                  : ["maxSaturation"].includes(keyOnChangeMax)
                  ? toFixedWithoutRounding(parseFloat(numericValue), 2)
                  : ["maxVotingPower"].includes(keyOnChangeMax)
                  ? truncateDecimals(+numericValue / 100, 4)
                  : numericValue
              });
            }
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
            height={18}
            data-testid="filter.common.btn"
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
            <AccordionContainer data-testid="filterRange.retiredPools">
              <AccordionSummary>
                <Box width={"100%"} display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
                  <Box display={"flex"} alignItems={"center"}>
                    <Box color={({ palette }) => palette.secondary.main} data-testid="delegationList.retiredPoolsTitle">
                      {t("glassary.showRetiredPools")}
                    </Box>
                  </Box>

                  <AntSwitch
                    data-testid="poolList.retiredValue"
                    checked={isShowRetired}
                    onChange={(e) => {
                      setIsRetired(e.target.checked);
                    }}
                  />
                </Box>
              </AccordionSummary>
            </AccordionContainer>
            <Box display={"flex"} flexDirection={"column"}>
              <AccordionContainer
                data-testid="filterRange.poolName"
                expanded={expanded === "poolName"}
                onChange={handleChange("poolName")}
              >
                <AccordionSummary>
                  <Box width={"100%"} display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
                    <Box display={"flex"} alignItems={"center"}>
                      <CustomIcon icon={PoolNameIcon} fill={theme.palette.secondary.light} height={18} />
                      <Box
                        data-testid="filterRange.poolNameTitle"
                        ml={1}
                        color={({ palette }) => palette.secondary.main}
                      >
                        {t("pool.poolName")}
                      </Box>
                    </Box>
                    <Box>
                      {expanded === "poolName" ? (
                        <IoIosArrowUp color={theme.palette.secondary.main} />
                      ) : (
                        <IoIosArrowDown color={theme.palette.secondary.main} />
                      )}
                    </Box>
                  </Box>
                </AccordionSummary>
                <AccordionDetailsFilter sx={{ background: "unset" }}>
                  <StyledInput
                    data-testid="filterRange.poolNameValue"
                    sx={{
                      width: "100% !important",
                      color: theme.isDark ? theme.palette.secondary.main : theme.palette.secondary.light
                    }}
                    placeholder={t("pool.poolSearchName")}
                    value={filterParams?.query || ""}
                    onChange={({ target: { value } }) => setFilterParams({ ...filterParams, query: value })}
                    onKeyPress={handleKeyPress}
                  />
                </AccordionDetailsFilter>
              </AccordionContainer>
              <Box
                component={dataRange?.maxPoolSize === null ? CustomTooltip : Box}
                title={dataRange?.maxPoolSize === null ? t("common.noDataAvaiable") : undefined}
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
                  data-testid="filterRange.poolSize"
                  expanded={expanded === "poolSize"}
                  onChange={handleChange("poolSize")}
                >
                  <AccordionSummary
                    disabled={dataRange?.maxPoolSize === null}
                    sx={{
                      "&.Mui-disabled": {
                        opacity: 0.9
                      }
                    }}
                  >
                    <Box width={"100%"} display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
                      <Box display={"flex"} alignItems={"center"}>
                        <CustomIcon
                          icon={PoolSizesIcon}
                          fill={
                            dataRange?.maxPoolSize === null
                              ? theme.palette.secondary[600]
                              : theme.palette.secondary.light
                          }
                          height={18}
                        />
                        <Box
                          data-testid="filterRange.poolSizeTitle"
                          ml={1}
                          color={({ palette }) =>
                            dataRange?.maxPoolSize === null ? palette.secondary[600] : palette.secondary.main
                          }
                        >
                          {t("pool.poolSize")}
                        </Box>
                      </Box>
                      <Box>
                        {expanded === "poolSize" ? (
                          <IoIosArrowUp
                            color={
                              dataRange?.maxPoolSize === null
                                ? theme.palette.secondary[600]
                                : theme.palette.secondary.main
                            }
                          />
                        ) : (
                          <IoIosArrowDown
                            color={
                              dataRange?.maxPoolSize === null
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
                        {formatADA(dataRange?.minPoolSize, LARGE_NUMBER_ABBREVIATIONS, 6, 2) || 0}
                      </Typography>
                      <StyledSlider
                        data-testid="filterRange.poolSizeValue"
                        getAriaLabel={() => "Minimum distance"}
                        defaultValue={[filterParams.minPoolSize || 0, initParams.maxPoolSize || 0]}
                        onChange={(e, newValue) => handleChangeValueRange(e, newValue, "minPoolSize", "maxPoolSize")}
                        valueLabelDisplay="auto"
                        value={[
                          filterParams.minPoolSize || 0,
                          filterParams.maxPoolSize ?? (initParams.maxPoolSize || 0)
                        ]}
                        min={dataRange?.minPoolSize ? dataRange.minPoolSize / 10 ** 6 : 0}
                        disableSwap
                        step={100}
                        disabled={dataRange?.maxPoolSize === null}
                        max={dataRange?.maxPoolSize ? dataRange.maxPoolSize / 10 ** 6 : 0}
                      />
                      <Typography>
                        {formatADA(dataRange?.maxPoolSize, LARGE_NUMBER_ABBREVIATIONS, 6, 2) || 0}
                      </Typography>
                    </Box>
                    {groupInputRange(
                      filterParams.minPoolSize || 0,
                      filterParams.maxPoolSize ?? (initParams.maxPoolSize || 0),
                      "minPoolSize",
                      "maxPoolSize",
                      initParams.maxPoolSize,
                      dataRange?.maxPoolSize === null
                    )}
                  </AccordionDetailsFilter>
                </AccordionContainer>
              </Box>
              <Box
                component={dataRange?.maxPledge === null ? CustomTooltip : Box}
                title={dataRange?.maxPledge === null ? t("common.noDataAvaiable") : undefined}
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
                  data-testid="filterRange.pledge"
                  expanded={expanded === "poolPledge"}
                  onChange={handleChange("poolPledge")}
                >
                  <AccordionSummary
                    disabled={dataRange?.maxPledge === null}
                    sx={{
                      "&.Mui-disabled": {
                        opacity: 0.9
                      }
                    }}
                  >
                    <Box width={"100%"} display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
                      <Box display={"flex"} alignItems={"center"}>
                        <CustomIcon
                          icon={PoolPledgeIcon}
                          fill={
                            dataRange?.maxPledge === null ? theme.palette.secondary[600] : theme.palette.secondary.main
                          }
                          height={18}
                        />
                        <Box
                          data-testid="filterRange.pledgeTitle"
                          ml={1}
                          color={({ palette }) =>
                            dataRange?.maxPledge === null ? palette.secondary[600] : palette.secondary.main
                          }
                        >
                          {t("pool.poolPledge")}
                        </Box>
                      </Box>
                      <Box>
                        {expanded === "poolPledge" ? (
                          <IoIosArrowUp
                            color={
                              dataRange?.maxPledge === null
                                ? theme.palette.secondary[600]
                                : theme.palette.secondary.main
                            }
                          />
                        ) : (
                          <IoIosArrowDown
                            color={
                              dataRange?.maxPledge === null
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
                      <Typography>{formatADA(dataRange?.minPledge, LARGE_NUMBER_ABBREVIATIONS, 6, 2) || 0}</Typography>
                      <StyledSlider
                        valueLabelFormat={(value) => formatADA(value, LARGE_NUMBER_ABBREVIATIONS, 6, 2)}
                        data-testid="filterRange.pledgeValue"
                        getAriaLabel={() => "Minimum distance"}
                        defaultValue={[filterParams.minPledge || 0, initParams.maxPledge || 0]}
                        value={[filterParams.minPledge || 0, filterParams.maxPledge ?? (initParams.maxPledge || 0)]}
                        onChange={(e, newValue) => handleChangeValueRange(e, newValue, "minPledge", "maxPledge")}
                        valueLabelDisplay="auto"
                        disableSwap
                        step={1000000}
                        min={dataRange?.minPledge || 0}
                        max={dataRange?.maxPledge || 0}
                        disabled={dataRange?.maxPledge === null}
                      />
                      <Typography>{formatADA(dataRange?.maxPledge, LARGE_NUMBER_ABBREVIATIONS, 6, 2) || 0}</Typography>
                    </Box>
                    {groupInputRange(
                      BigNumber(filterParams.minPledge || 0)
                        .div(10 ** 6)
                        .toNumber(),
                      filterParams.maxPledge !== undefined && !isNaN(filterParams.maxPledge)
                        ? BigNumber(filterParams.maxPledge)
                            .div(10 ** 6)
                            .toNumber()
                        : BigNumber(initParams.maxPledge || 0)
                            .div(10 ** 6)
                            .toNumber(),
                      "minPledge",
                      "maxPledge",
                      BigNumber(initParams.maxPledge || 0)
                        .div(10 ** 6)
                        .toNumber(),
                      dataRange?.maxPledge === null
                    )}
                  </AccordionDetailsFilter>
                </AccordionContainer>
              </Box>
              <Box
                component={dataRange?.maxSaturation === null ? CustomTooltip : Box}
                title={dataRange?.maxSaturation === null ? t("common.noDataAvaiable") : undefined}
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
                  data-testid="filterRange.saturation"
                  expanded={expanded === "poolSaturation"}
                  onChange={handleChange("poolSaturation")}
                >
                  <AccordionSummary
                    disabled={dataRange?.maxSaturation === null}
                    sx={{
                      "&.Mui-disabled": {
                        opacity: 0.9
                      }
                    }}
                  >
                    <Box width={"100%"} display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
                      <Box display={"flex"} alignItems={"center"}>
                        <CustomIcon
                          icon={PoolSaturationIcon}
                          fill={
                            dataRange?.maxSaturation === null
                              ? theme.palette.secondary[600]
                              : theme.palette.secondary.main
                          }
                          height={18}
                        />
                        <Box
                          data-testid="filterRange.saturationTitle"
                          ml={1}
                          color={({ palette }) =>
                            dataRange?.maxSaturation === null ? palette.secondary[600] : palette.secondary.main
                          }
                        >
                          {t("pool.poolSaturation")}
                        </Box>
                      </Box>
                      <Box>
                        {expanded === "poolSaturation" ? (
                          <IoIosArrowUp
                            color={
                              dataRange?.maxSaturation === null
                                ? theme.palette.secondary[600]
                                : theme.palette.secondary.main
                            }
                          />
                        ) : (
                          <IoIosArrowDown
                            color={
                              dataRange?.maxSaturation === null
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
                      <Typography>{formatPercent((dataRange?.minSaturation || 0) / 100) || `0%`}</Typography>
                      <StyledSlider
                        valueLabelFormat={(value) => formatPercent(value / 100) || `0%`}
                        data-testid="filterRange.saturationValue"
                        getAriaLabel={() => "Minimum distance"}
                        defaultValue={[filterParams.minSaturation || 0, initParams.maxSaturation || 0]}
                        onChange={(e, newValue) =>
                          handleChangeValueRange(e, newValue, "minSaturation", "maxSaturation")
                        }
                        valueLabelDisplay="auto"
                        value={[
                          filterParams.minSaturation || 0,
                          filterParams.maxSaturation ?? (initParams.maxSaturation || 0)
                        ]}
                        disableSwap
                        min={dataRange?.minSaturation || 0}
                        max={dataRange?.maxSaturation || 0}
                        disabled={dataRange?.maxSaturation === null}
                      />

                      <Typography>{formatPercent((dataRange?.maxSaturation || 0) / 100) || `0%`}</Typography>
                    </Box>
                    {groupInputRange(
                      filterParams.minSaturation || 0,
                      filterParams.maxSaturation ?? (initParams.maxSaturation || 0),
                      "minSaturation",
                      "maxSaturation",
                      initParams.maxSaturation,
                      dataRange?.maxSaturation === null
                    )}
                  </AccordionDetailsFilter>
                </AccordionContainer>
              </Box>
              <Box
                component={dataRange?.maxLifetimeBlock === null ? CustomTooltip : Box}
                title={dataRange?.maxLifetimeBlock === null ? t("common.noDataAvaiable") : undefined}
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
                  data-testid="filterRange.blocksLifeTime"
                  expanded={expanded === "poolLifetime"}
                  onChange={handleChange("poolLifetime")}
                >
                  <AccordionSummary
                    disabled={dataRange?.maxLifetimeBlock === null}
                    sx={{
                      "&.Mui-disabled": {
                        opacity: 0.9
                      }
                    }}
                  >
                    <Box width={"100%"} display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
                      <Box display={"flex"} alignItems={"center"}>
                        <CustomIcon
                          icon={PoolBlocksIcon}
                          fill={
                            dataRange?.maxLifetimeBlock === null
                              ? theme.palette.secondary[600]
                              : theme.palette.secondary.main
                          }
                          height={18}
                        />
                        <Box
                          data-testid="filterRange.blocksLifeTimeTitle"
                          ml={1}
                          color={({ palette }) =>
                            dataRange?.maxLifetimeBlock === null ? palette.secondary[600] : palette.secondary.main
                          }
                        >
                          {t("pool.poolLifetime")}
                        </Box>
                      </Box>
                      <Box>
                        {expanded === "poolLifetime" ? (
                          <IoIosArrowUp
                            color={
                              dataRange?.maxLifetimeBlock === null
                                ? theme.palette.secondary[600]
                                : theme.palette.secondary.main
                            }
                          />
                        ) : (
                          <IoIosArrowDown
                            color={
                              dataRange?.maxLifetimeBlock === null
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
                      <Typography>{dataRange?.minLifetimeBlock || 0}</Typography>
                      <StyledSlider
                        data-testid="filterRange.blocksLifeTimeValue"
                        getAriaLabel={() => "Minimum distance"}
                        defaultValue={[filterParams.minBlockLifetime || 0, initParams.maxBlockLifetime || 0]}
                        onChange={(e, newValue) =>
                          handleChangeValueRange(e, newValue, "minBlockLifetime", "maxBlockLifetime")
                        }
                        valueLabelDisplay="auto"
                        value={[
                          filterParams.minBlockLifetime || 0,
                          filterParams.maxBlockLifetime ?? (initParams.maxBlockLifetime || 0)
                        ]}
                        disableSwap
                        min={dataRange?.minLifetimeBlock || 0}
                        max={dataRange?.maxLifetimeBlock || 0}
                        disabled={dataRange?.maxLifetimeBlock === null}
                      />
                      <Typography>{dataRange?.maxLifetimeBlock || 0}</Typography>
                    </Box>
                    {groupInputRange(
                      filterParams.minBlockLifetime || 0,
                      filterParams.maxBlockLifetime ?? (initParams.maxBlockLifetime || 0),
                      "minBlockLifetime",
                      "maxBlockLifetime",
                      initParams.maxBlockLifetime,
                      dataRange?.maxLifetimeBlock === null
                    )}
                  </AccordionDetailsFilter>
                </AccordionContainer>
              </Box>
              {FF_GLOBAL_IS_CONWAY_ERA && (
                <>
                  <Box
                    component={dataRange?.maxGovParticipationRate === null ? CustomTooltip : Box}
                    title={dataRange?.maxGovParticipationRate === null ? t("common.noDataAvaiable") : undefined}
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
                      data-testid="filterRange.poolParticipation"
                      expanded={expanded === "poolParticipation"}
                      onChange={handleChange("poolParticipation")}
                    >
                      <AccordionSummary
                        disabled={dataRange?.maxGovParticipationRate === null}
                        sx={{
                          "&.Mui-disabled": {
                            opacity: 0.9
                          }
                        }}
                      >
                        <Box width={"100%"} display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
                          <Box display={"flex"} alignItems={"center"}>
                            <CustomIcon
                              icon={PoolParticipationIcon}
                              fill={
                                dataRange?.maxGovParticipationRate === null
                                  ? theme.palette.secondary[600]
                                  : theme.palette.secondary[800]
                              }
                              height={18}
                            />
                            <Box
                              data-testid="filterRange.poolParticipationTitle"
                              ml={1}
                              color={({ palette }) =>
                                dataRange?.maxGovParticipationRate === null
                                  ? palette.secondary[600]
                                  : palette.secondary.main
                              }
                            >
                              {t("pool.poolParticipation")}
                            </Box>
                          </Box>
                          <Box>
                            {expanded === "poolParticipation" ? (
                              <IoIosArrowUp
                                color={
                                  dataRange?.maxGovParticipationRate === null
                                    ? theme.palette.secondary[600]
                                    : theme.palette.secondary.main
                                }
                              />
                            ) : (
                              <IoIosArrowDown
                                color={
                                  dataRange?.maxGovParticipationRate === null
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
                          <Typography>{formatPercent(dataRange?.minGovParticipationRate) || `0%`}</Typography>
                          <StyledSlider
                            valueLabelFormat={(value) => formatPercent(value)}
                            data-testid="filterRange.poolParticipationValue"
                            getAriaLabel={() => "Minimum distance"}
                            defaultValue={[
                              filterParams.minGovParticipationRate || 0,
                              initParams.maxGovParticipationRate
                            ]}
                            onChange={(e, newValue) =>
                              handleChangeValueRange(e, newValue, "minGovParticipationRate", "maxGovParticipationRate")
                            }
                            value={[
                              filterParams.minGovParticipationRate || 0,
                              filterParams.maxGovParticipationRate ?? initParams.maxGovParticipationRate
                            ]}
                            valueLabelDisplay="auto"
                            disableSwap
                            step={0.000001}
                            min={dataRange?.minGovParticipationRate || 0}
                            max={dataRange?.maxGovParticipationRate || 0}
                            disabled={dataRange?.maxGovParticipationRate === null}
                          />
                          <Typography>{formatPercent(dataRange?.maxGovParticipationRate || 0) || `0%`}</Typography>
                        </Box>
                        {groupInputRange(
                          +formatPercent(filterParams.minGovParticipationRate || 0).replace("%", ""),
                          filterParams.maxGovParticipationRate !== undefined
                            ? +formatPercent(filterParams.maxGovParticipationRate || 0).replace("%", "")
                            : +formatPercent(initParams.maxGovParticipationRate || 0).replace("%", ""),
                          "minGovParticipationRate",
                          "maxGovParticipationRate",
                          +formatPercent(initParams.maxGovParticipationRate || 0).replace("%", ""),
                          dataRange?.maxGovParticipationRate === null
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
                                  : theme.palette.secondary.light
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
                                  dataRange?.maxVotingPower === null
                                    ? theme.palette.secondary[600]
                                    : theme.palette.secondary.main
                                }
                              />
                            ) : (
                              <IoIosArrowDown
                                color={
                                  dataRange?.maxVotingPower === null
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
                            disabled={dataRange?.maxVotingPower === null}
                          />
                          <Typography>{formatPercent(dataRange?.maxVotingPower || 0)}</Typography>
                        </Box>
                        {groupInputRange(
                          ((filterParams.minVotingPower || 0) * 10000) / 100,
                          ((filterParams.maxVotingPower ?? (initParams.maxVotingPower || 0)) * 10000) / 100,
                          "minVotingPower",
                          "maxVotingPower",
                          initParams.maxVotingPower,
                          dataRange?.maxVotingPower === null
                        )}
                      </AccordionDetailsFilter>
                    </AccordionContainer>
                  </Box>
                </>
              )}
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

export default CustomFilterMultiRange;
