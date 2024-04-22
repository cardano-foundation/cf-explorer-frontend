import React, { useEffect, useMemo, useState } from "react";
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
import { FilterWrapper } from "src/pages/NativeScriptsAndSC/styles";
import usePageInfo from "src/commons/hooks/usePageInfo";
import { IS_CONWAY_ERA } from "src/commons/utils/constants";

import { ApplyFilterButton, StyledInput } from "../CustomFilter/styles";
import { AccordionContainer, AccordionDetailsFilter, FilterContainer, StyledSlider } from "./styles";
import CustomIcon from "../CustomIcon";

interface PoolResponse {
  page?: number;
  query?: string;
  size?: number;
  sort?: string;
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
  const query = parse(search.split("?")[1]);
  const history = useHistory<{ tickerNameSearch?: string; fromPath?: SpecialPath }>();
  const [expanded, setExpanded] = useState<string | false>("");
  const [open, setOpen] = useState<boolean>(false);
  const { pageInfo } = usePageInfo();
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
  const [filterParams, setFilterParams] = useState<PoolResponse>({});

  useEffect(() => {
    setFilterParams({
      page: query?.page && +query?.page >= 1 ? +query?.page - 1 : 0,
      size: +(query?.voteSize || "") || 50,
      sort: (query?.sort || "").toString(),
      ...(query?.query && { query: query?.query.toString() || "" }),
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
      search: stringify({ ...filterParams, size: pageInfo.size, sort: pageInfo.sort, page: 1 }),
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
                    <Typography>{formatADA(dataRange?.minPoolSize, LARGE_NUMBER_ABBREVIATIONS, 6, 2) || 0}</Typography>
                    <StyledSlider
                      valueLabelFormat={(value) => formatADA(value, LARGE_NUMBER_ABBREVIATIONS, 6, 2)}
                      data-testid="slider"
                      getAriaLabel={() => "Minimum distance"}
                      defaultValue={[filterParams.minPoolSize || 0, initParams.maxPoolSize || 0]}
                      onChange={(e, newValue) => handleChangeValueRange(e, newValue, "minPoolSize", "maxPoolSize")}
                      valueLabelDisplay="auto"
                      value={[filterParams.minPoolSize || 0, filterParams.maxPoolSize ?? (initParams.maxPoolSize || 0)]}
                      disableSwap
                      min={dataRange?.minPoolSize || 0}
                      step={1000000}
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
                    <Typography>{formatADA(dataRange?.minPledge, LARGE_NUMBER_ABBREVIATIONS, 6, 2) || 0}</Typography>
                    <StyledSlider
                      valueLabelFormat={(value) => formatADA(value, LARGE_NUMBER_ABBREVIATIONS, 6, 2)}
                      data-testid="slider"
                      getAriaLabel={() => "Minimum distance"}
                      defaultValue={[filterParams.minPledge || 0, initParams.maxPledge || 0]}
                      value={[filterParams.minPledge || 0, filterParams.maxPledge ?? (initParams.maxPledge || 0)]}
                      onChange={(e, newValue) => handleChangeValueRange(e, newValue, "minPledge", "maxPledge")}
                      valueLabelDisplay="auto"
                      disableSwap
                      step={1000000}
                      min={dataRange?.minPledge || 0}
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
                      defaultValue={[filterParams.minSaturation || 0, initParams.maxSaturation || 0]}
                      onChange={(e, newValue) => handleChangeValueRange(e, newValue, "minSaturation", "maxSaturation")}
                      valueLabelDisplay="auto"
                      value={[
                        filterParams.minSaturation || 0,
                        filterParams.maxSaturation ?? (initParams.maxSaturation || 0)
                      ]}
                      disableSwap
                      min={dataRange?.minSaturation || 0}
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
                    />
                    <Typography>{dataRange?.maxLifetimeBlock || 0}</Typography>
                  </Box>
                </AccordionDetailsFilter>
              </AccordionContainer>
              {IS_CONWAY_ERA && (
                <>
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
                          defaultValue={[
                            filterParams.minGovParticipationRate || 0,
                            initParams.maxGovParticipationRate || 0
                          ]}
                          onChange={(e, newValue) =>
                            handleChangeValueRange(e, newValue, "minGovParticipationRate", "maxGovParticipationRate")
                          }
                          value={[
                            filterParams.minGovParticipationRate || 0,
                            filterParams.maxGovParticipationRate ?? (initParams.maxGovParticipationRate || 0)
                          ]}
                          valueLabelDisplay="auto"
                          disableSwap
                          step={0.000001}
                          min={dataRange?.minGovParticipationRate || 0}
                          max={dataRange?.maxGovParticipationRate || 0}
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
                    </AccordionDetailsFilter>
                  </AccordionContainer>
                </>
              )}

              <Box my={1} p="0px 16px">
                <ApplyFilterButton
                  data-testid="apply-filters"
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
            </Box>
          </FilterContainer>
        )}
      </FilterWrapper>
    </ClickAwayListener>
  );
};

export default CustomFilterMultiRange;
