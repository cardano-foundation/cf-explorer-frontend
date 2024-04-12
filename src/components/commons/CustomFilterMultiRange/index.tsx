import React, { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { AccordionSummary, Box, Button, ClickAwayListener, Typography, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useHistory, useLocation } from "react-router-dom";
import { stringify, parse } from "qs";

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
import { LARGE_NUMBER_ABBREVIATIONS, formatADA, formatPercent } from "src/commons/utils/helper";
import { PoolResponse } from "src/components/DelegationPool/DelegationList";
import { FilterWrapper } from "src/pages/NativeScriptsAndSC/styles";
import usePageInfo from "src/commons/hooks/usePageInfo";

import { ApplyFilterButton, StyledInput } from "../CustomFilter/styles";
import { AccordionContainer, AccordionDetailsFilter, FilterContainer, StyledSlider } from "./styles";
import CustomIcon from "../CustomIcon";

interface CustomFilterMultiRange {
  setParams: Dispatch<SetStateAction<PoolResponse>>;
}

type IValueRange = [number, number];

const CustomFilterMultiRange: React.FC<CustomFilterMultiRange> = ({ setParams }) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const { search } = useLocation();
  const query = parse(search.split("?")[1]);
  const history = useHistory<{ tickerNameSearch?: string; fromPath?: SpecialPath }>();
  const [expanded, setExpanded] = useState<string | false>("");
  const [open, setOpen] = useState<boolean>(false);
  const { pageInfo } = usePageInfo();
  const [valueRange, setValueRange] = useState<IValueRange>([30, 50]);
  const handleChange = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false);
  };
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
  const [filterParams, setFilterParams] = useState<PoolResponse>(initParams || {});

  useEffect(() => {
    setFilterParams({
      page: query?.page && +query?.page >= 1 ? +query?.page - 1 : 0,
      size: +(query?.voteSize || "") || 50,
      query: (query?.query || "").toString(),
      sort: (query?.sort || "").toString(),
      maxPoolSize: +(query?.maxPoolSize || dataRange?.maxPoolSize || 0),
      minPoolSize: +(query?.minPoolSize || dataRange?.minPoolSize || 0),
      minPledge: +(query?.minPledge || dataRange?.minPledge || 0),
      maxPledge: +(query?.maxPledge || dataRange?.maxPledge || 0),
      minSaturation: +(query?.minSaturation || dataRange?.minSaturation || 0),
      maxSaturation: +(query?.maxSaturation || dataRange?.maxSaturation || 0),
      minBlockLifetime: +(query?.minBlockLifetime || dataRange?.minLifetimeBlock || 0),
      maxBlockLifetime: +(query?.maxBlockLifetime || dataRange?.maxLifetimeBlock || 0),
      minVotingPower: +(query?.minVotingPower || dataRange?.minVotingPower || 0),
      maxVotingPower: +(query?.maxVotingPower || dataRange?.maxVotingPower || 0),
      minGovParticipationRate: +(query?.minGovParticipationRate || dataRange?.minGovParticipationRate || 0),
      maxGovParticipationRate: +(query?.maxGovParticipationRate || dataRange?.maxGovParticipationRate || 0)
    });
  }, [JSON.stringify(query)]);
  const handleReset = () => {
    setExpanded(false);
    setOpen(false);
    setFilterParams(initParams);
    setParams(initParams);
    history.replace({ search: stringify({ page: 0, size: 50, sort: "" }), state: undefined });
  };

  const handleFilter = () => {
    setExpanded(false);
    setOpen(false);
    setFilterParams({ ...initParams, ...filterParams });
    setParams({ ...filterParams });
    history.replace({ search: stringify({ ...pageInfo, ...filterParams, page: 0 }), state: undefined });
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
    setValueRange([Math.min(min), Math.min(max)]);
    setFilterParams({ ...filterParams, [minKey]: Math.min(min), [maxKey]: Math.min(max) });
  };

  const isDisableFilter = useMemo(() => JSON.stringify(initParams) === JSON.stringify(filterParams), [filterParams]);

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
              bgcolor: theme.mode === "dark" ? theme.palette.secondary.main : theme.palette.primary[200]
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
                      <CustomIcon icon={PoolNameIcon} fill={theme.palette.secondary.light} height={18} />
                      <Box ml={1} color={({ palette }) => palette.secondary.main}>
                        {t("pool.poolName")}
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
              <AccordionContainer expanded={expanded === "poolSize"} onChange={handleChange("poolSize")}>
                <AccordionSummary>
                  <Box width={"100%"} display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
                    <Box display={"flex"} alignItems={"center"}>
                      <CustomIcon icon={PoolSizesIcon} fill={theme.palette.secondary.light} height={18} />
                      <Box ml={1} color={({ palette }) => palette.secondary.main}>
                        {t("pool.poolSize")}
                      </Box>
                    </Box>
                    <Box>
                      {expanded === "poolSize" ? (
                        <IoIosArrowUp color={theme.palette.secondary.main} />
                      ) : (
                        <IoIosArrowDown color={theme.palette.secondary.main} />
                      )}
                    </Box>
                  </Box>
                </AccordionSummary>
                <AccordionDetailsFilter sx={{ background: "unset" }}>
                  <Box display="flex" alignItems="center" mb="30px" sx={{ gap: "14px" }}>
                    <Typography>{dataRange?.minPoolSize || 0}</Typography>
                    <StyledSlider
                      valueLabelFormat={(value) => formatADA(value, LARGE_NUMBER_ABBREVIATIONS, 6, 2)}
                      data-testid="slider"
                      getAriaLabel={() => "Minimum distance"}
                      value={[filterParams.minPoolSize || 0, filterParams.maxPoolSize || 0] || valueRange}
                      defaultValue={[filterParams.minPoolSize || 0, initParams.maxPoolSize || 0]}
                      onChange={(e, newValue) => handleChangeValueRange(e, newValue, "minPoolSize", "maxPoolSize")}
                      valueLabelDisplay="auto"
                      disableSwap
                      min={0}
                      step={10000000000}
                      max={dataRange?.maxPoolSize || 0}
                    />
                    <Typography>{formatADA(dataRange?.maxPoolSize, LARGE_NUMBER_ABBREVIATIONS, 6, 2) || 0}</Typography>
                  </Box>
                </AccordionDetailsFilter>
              </AccordionContainer>
              <AccordionContainer expanded={expanded === "poolPledge"} onChange={handleChange("poolPledge")}>
                <AccordionSummary>
                  <Box width={"100%"} display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
                    <Box display={"flex"} alignItems={"center"}>
                      <CustomIcon icon={PoolPledgeIcon} fill={theme.palette.secondary.main} height={18} />
                      <Box ml={1} color={({ palette }) => palette.secondary.main}>
                        {t("pool.poolPledge")}
                      </Box>
                    </Box>
                    <Box>
                      {expanded === "poolPledge" ? (
                        <IoIosArrowUp color={theme.palette.secondary.main} />
                      ) : (
                        <IoIosArrowDown color={theme.palette.secondary.main} />
                      )}
                    </Box>
                  </Box>
                </AccordionSummary>
                <AccordionDetailsFilter sx={{ background: "unset" }}>
                  <Box display="flex" alignItems="center" mb="30px" sx={{ gap: "14px" }}>
                    <Typography>{dataRange?.minPledge || 0}</Typography>
                    <StyledSlider
                      valueLabelFormat={(value) => formatADA(value, LARGE_NUMBER_ABBREVIATIONS, 6, 2)}
                      data-testid="slider"
                      getAriaLabel={() => "Minimum distance"}
                      value={[filterParams.minPledge || 0, filterParams.maxPledge || 0] || valueRange}
                      defaultValue={[filterParams.minPledge || 0, initParams.maxPledge || 0]}
                      onChange={(e, newValue) => handleChangeValueRange(e, newValue, "minPledge", "maxPledge")}
                      valueLabelDisplay="auto"
                      disableSwap
                      step={10000000000}
                      min={0}
                      max={dataRange?.maxPledge || 0}
                    />
                    <Typography>{formatADA(dataRange?.maxPledge, LARGE_NUMBER_ABBREVIATIONS, 6, 2) || 0}</Typography>
                  </Box>
                </AccordionDetailsFilter>
              </AccordionContainer>
              <AccordionContainer expanded={expanded === "poolSaturation"} onChange={handleChange("poolSaturation")}>
                <AccordionSummary>
                  <Box width={"100%"} display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
                    <Box display={"flex"} alignItems={"center"}>
                      <CustomIcon icon={PoolSaturationIcon} fill={theme.palette.secondary.main} height={18} />
                      <Box ml={1} color={({ palette }) => palette.secondary.main}>
                        {t("pool.poolSaturation")}
                      </Box>
                    </Box>
                    <Box>
                      {expanded === "poolSaturation" ? (
                        <IoIosArrowUp color={theme.palette.secondary.main} />
                      ) : (
                        <IoIosArrowDown color={theme.palette.secondary.main} />
                      )}
                    </Box>
                  </Box>
                </AccordionSummary>
                <AccordionDetailsFilter sx={{ background: "unset" }}>
                  <Box display="flex" alignItems="center" mb="30px" sx={{ gap: "14px" }}>
                    <Typography>{formatPercent((dataRange?.minSaturation || 0) / 100) || `0%`}</Typography>
                    <StyledSlider
                      valueLabelFormat={(value) => formatPercent(value / 100) || `0%`}
                      data-testid="slider"
                      getAriaLabel={() => "Minimum distance"}
                      value={[filterParams.minSaturation || 0, filterParams.maxSaturation || 0] || valueRange}
                      defaultValue={[filterParams.minSaturation || 0, initParams.maxSaturation || 0]}
                      onChange={(e, newValue) => handleChangeValueRange(e, newValue, "minSaturation", "maxSaturation")}
                      valueLabelDisplay="auto"
                      disableSwap
                      min={0}
                      max={dataRange?.maxSaturation || 0}
                    />

                    <Typography>{formatPercent((dataRange?.maxSaturation || 0) / 100) || `0%`}</Typography>
                  </Box>
                </AccordionDetailsFilter>
              </AccordionContainer>
              <AccordionContainer expanded={expanded === "poolLifetime"} onChange={handleChange("poolLifetime")}>
                <AccordionSummary>
                  <Box width={"100%"} display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
                    <Box display={"flex"} alignItems={"center"}>
                      <CustomIcon icon={PoolBlocksIcon} fill={theme.palette.secondary.main} height={18} />
                      <Box ml={1} color={({ palette }) => palette.secondary.main}>
                        {t("pool.poolLifetime")}
                      </Box>
                    </Box>
                    <Box>
                      {expanded === "poolLifetime" ? (
                        <IoIosArrowUp color={theme.palette.secondary.main} />
                      ) : (
                        <IoIosArrowDown color={theme.palette.secondary.main} />
                      )}
                    </Box>
                  </Box>
                </AccordionSummary>
                <AccordionDetailsFilter sx={{ background: "unset" }}>
                  <Box display="flex" alignItems="center" mb="30px" sx={{ gap: "14px" }}>
                    <Typography>{dataRange?.minLifetimeBlock || 0}</Typography>
                    <StyledSlider
                      data-testid="slider"
                      getAriaLabel={() => "Minimum distance"}
                      value={[filterParams.minBlockLifetime || 0, filterParams.maxBlockLifetime || 0] || valueRange}
                      defaultValue={[filterParams.minBlockLifetime || 0, initParams.maxBlockLifetime || 0]}
                      onChange={(e, newValue) =>
                        handleChangeValueRange(e, newValue, "minBlockLifetime", "maxBlockLifetime")
                      }
                      valueLabelDisplay="auto"
                      disableSwap
                      min={0}
                      max={dataRange?.maxLifetimeBlock || 0}
                    />
                    <Typography>{dataRange?.maxLifetimeBlock || 0}</Typography>
                  </Box>
                </AccordionDetailsFilter>
              </AccordionContainer>
              <AccordionContainer
                expanded={expanded === "poolParticipation"}
                onChange={handleChange("poolParticipation")}
              >
                <AccordionSummary>
                  <Box width={"100%"} display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
                    <Box display={"flex"} alignItems={"center"}>
                      <CustomIcon icon={PoolParticipationIcon} fill={theme.palette.secondary[800]} height={18} />
                      <Box ml={1} color={({ palette }) => palette.secondary.main}>
                        {t("pool.poolParticipation")}
                      </Box>
                    </Box>
                    <Box>
                      {expanded === "poolParticipation" ? (
                        <IoIosArrowUp color={theme.palette.secondary.main} />
                      ) : (
                        <IoIosArrowDown color={theme.palette.secondary.main} />
                      )}
                    </Box>
                  </Box>
                </AccordionSummary>
                <AccordionDetailsFilter sx={{ background: "unset" }}>
                  <Box display="flex" alignItems="center" mb="30px" sx={{ gap: "14px" }}>
                    <Typography>{formatPercent(dataRange?.minGovParticipationRate) || `0%`}</Typography>
                    <StyledSlider
                      valueLabelFormat={(value) => formatPercent(value)}
                      data-testid="slider"
                      getAriaLabel={() => "Minimum distance"}
                      value={
                        [filterParams.minGovParticipationRate || 0, filterParams.maxGovParticipationRate || 0] ||
                        valueRange
                      }
                      defaultValue={[
                        filterParams.minGovParticipationRate || 0,
                        initParams.maxGovParticipationRate || 0
                      ]}
                      onChange={(e, newValue) =>
                        handleChangeValueRange(e, newValue, "minGovParticipationRate", "maxGovParticipationRate")
                      }
                      valueLabelDisplay="auto"
                      disableSwap
                      step={0.000001}
                      min={0}
                      max={dataRange?.maxGovParticipationRate}
                    />
                    <Typography>{formatPercent(dataRange?.maxGovParticipationRate || 0) || `0%`}</Typography>
                  </Box>
                </AccordionDetailsFilter>
              </AccordionContainer>
              <AccordionContainer expanded={expanded === "poolVoting"} onChange={handleChange("poolVoting")}>
                <AccordionSummary>
                  <Box width={"100%"} display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
                    <Box display={"flex"} alignItems={"center"}>
                      <CustomIcon icon={PoolVotingIcon} fill={theme.palette.secondary.light} height={18} />
                      <Box ml={1} color={({ palette }) => palette.secondary.main}>
                        {t("pool.poolVoting")}
                      </Box>
                    </Box>
                    <Box>
                      {expanded === "poolVoting" ? (
                        <IoIosArrowUp color={theme.palette.secondary.main} />
                      ) : (
                        <IoIosArrowDown color={theme.palette.secondary.main} />
                      )}
                    </Box>
                  </Box>
                </AccordionSummary>
                <AccordionDetailsFilter sx={{ background: "unset" }}>
                  <Box display="flex" alignItems="center" mb="30px" sx={{ gap: "14px" }}>
                    <Typography>{formatPercent(dataRange?.minVotingPower || 0)}</Typography>
                    <StyledSlider
                      valueLabelFormat={(value) => formatPercent(value)}
                      data-testid="slider"
                      getAriaLabel={() => "Minimum distance"}
                      value={[filterParams.minVotingPower || 0, filterParams.maxVotingPower || 0] || valueRange}
                      defaultValue={[filterParams.minVotingPower || 0, initParams.maxVotingPower || 0]}
                      onChange={(e, newValue) =>
                        handleChangeValueRange(e, newValue, "minVotingPower", "maxVotingPower")
                      }
                      valueLabelDisplay="auto"
                      disableSwap
                      min={0}
                      step={0.0001}
                      max={dataRange?.maxVotingPower || 0}
                    />
                    <Typography>{formatPercent(dataRange?.maxVotingPower || 0)}</Typography>
                  </Box>
                </AccordionDetailsFilter>
              </AccordionContainer>
              <Box my={1} p="0px 16px">
                <ApplyFilterButton
                  data-testid="apply-filters"
                  onClick={() => {
                    handleFilter();
                  }}
                  disabled={isDisableFilter}
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
            </Box>
          </FilterContainer>
        )}
      </FilterWrapper>
    </ClickAwayListener>
  );
};

export default CustomFilterMultiRange;
