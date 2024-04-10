import React, { Dispatch, SetStateAction, useState } from "react";
import { AccordionSummary, Box, Button, ClickAwayListener, Typography, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

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
import { formatADA, formatPercent, formatPrice } from "src/commons/utils/helper";
import { PoolResponse } from "src/components/DelegationPool/DelegationList";
import { FilterWrapper } from "src/pages/NativeScriptsAndSC/styles";

import { ApplyFilterButton, StyledInput } from "../CustomFilter/styles";
import CustomIcon from "../CustomIcon";
import { AccordionContainer, AccordionDetailsFilter, FilterContainer, StyledSlider } from "./styles";

interface CustomFilterMultiRange {
  params: PoolResponse;
  setParams: Dispatch<SetStateAction<PoolResponse>>;
}

type IvalueRange = [number, number];

const CustomFilterMultiRange: React.FC<CustomFilterMultiRange> = ({ params, setParams }) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState<string | false>("");
  const [open, setOpen] = useState<boolean>(false);
  const [filterParams, setFilterParams] = useState<PoolResponse>({});
  const [valueRange, setValueRange] = useState<IvalueRange>([30, 50]);
  const handleChange = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false);
  };

  const fetchDataRange = useFetch<PoolResponse>(API.POOL_RANGE_VALUES);
  const dataRange = fetchDataRange.data;
  const handleReset = () => {
    setExpanded(false);
    setOpen(false);
    setParams({});
  };

  const handleFilter = () => {
    setExpanded(false);
    setOpen(false);
    setParams({ ...params, ...filterParams });
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
        <FilterContainer>
          {open && (
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
                    value={filterParams?.query}
                    onChange={({ target: { value } }) => setFilterParams({ ...filterParams, query: value })}
                    onKeyPress={handleKeyPress}
                  />
                </AccordionDetailsFilter>
              </AccordionContainer>
              <AccordionContainer expanded={expanded === "saturation"} onChange={handleChange("saturation")}>
                <AccordionSummary>
                  <Box width={"100%"} display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
                    <Box display={"flex"} alignItems={"center"}>
                      <CustomIcon icon={PoolSizesIcon} fill={theme.palette.secondary.light} height={18} />
                      <Box ml={1} color={({ palette }) => palette.secondary.main}>
                        {t("pool.poolSize")}
                      </Box>
                    </Box>
                    <Box>
                      {expanded === "saturation" ? (
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
                      valueLabelFormat={(value) => formatADA(value)}
                      data-testid="slider"
                      getAriaLabel={() => "Minimum distance"}
                      value={
                        [filterParams.minPoolSize || 0, filterParams.maxPoolSize || dataRange?.maxPoolSize || 0] ||
                        valueRange
                      }
                      onChange={(e, newValue) => handleChangeValueRange(e, newValue, "minPoolSize", "maxPoolSize")}
                      valueLabelDisplay="auto"
                      disableSwap
                      min={0}
                      max={dataRange?.maxPoolSize || 0}
                    />
                    <Typography>{formatADA(dataRange?.maxPoolSize) || 0}</Typography>
                  </Box>
                </AccordionDetailsFilter>
              </AccordionContainer>
              <AccordionContainer expanded={expanded === "action-type"} onChange={handleChange("action-type")}>
                <AccordionSummary>
                  <Box width={"100%"} display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
                    <Box display={"flex"} alignItems={"center"}>
                      <CustomIcon icon={PoolPledgeIcon} fill={theme.palette.secondary.main} height={18} />
                      <Box ml={1} color={({ palette }) => palette.secondary.main}>
                        {t("pool.poolPledge")}
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
                <AccordionDetailsFilter sx={{ background: "unset" }}>
                  <Box display="flex" alignItems="center" mb="30px" sx={{ gap: "14px" }}>
                    <Typography>{dataRange?.minPledge || 0}</Typography>
                    <StyledSlider
                      valueLabelFormat={(value) => formatADA(value)}
                      data-testid="slider"
                      getAriaLabel={() => "Minimum distance"}
                      value={
                        [filterParams.minPledge || 0, filterParams.maxPledge || dataRange?.maxPledge || 0] || valueRange
                      }
                      onChange={(e, newValue) => handleChangeValueRange(e, newValue, "minPledge", "maxPledge")}
                      valueLabelDisplay="auto"
                      disableSwap
                      min={0}
                      max={dataRange?.maxPledge || 0}
                    />
                    <Typography>{formatADA(dataRange?.maxPledge) || 0}</Typography>
                  </Box>
                </AccordionDetailsFilter>
              </AccordionContainer>
              <AccordionContainer expanded={expanded === "current-status"} onChange={handleChange("current-status")}>
                <AccordionSummary>
                  <Box width={"100%"} display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
                    <Box display={"flex"} alignItems={"center"}>
                      <CustomIcon icon={PoolSaturationIcon} fill={theme.palette.secondary.main} height={18} />
                      <Box ml={1} color={({ palette }) => palette.secondary.main}>
                        {t("pool.poolSaturation")}
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
                <AccordionDetailsFilter sx={{ background: "unset" }}>
                  <Box display="flex" alignItems="center" mb="30px" sx={{ gap: "14px" }}>
                    <Typography>{formatPercent((dataRange?.minSaturation || 0) / 100) || `0%`}</Typography>
                    <StyledSlider
                      valueLabelFormat={(value) => formatPercent(value / 100) || `0%`}
                      data-testid="slider"
                      getAriaLabel={() => "Minimum distance"}
                      value={
                        [
                          filterParams.minSaturation || 0,
                          filterParams.maxSaturation || dataRange?.maxSaturation || 0
                        ] || valueRange
                      }
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
              <AccordionContainer expanded={expanded === "vote"} onChange={handleChange("vote")}>
                <AccordionSummary>
                  <Box width={"100%"} display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
                    <Box display={"flex"} alignItems={"center"}>
                      <CustomIcon icon={PoolBlocksIcon} fill={theme.palette.secondary.main} height={18} />
                      <Box ml={1} color={({ palette }) => palette.secondary.main}>
                        {t("pool.poolLifetime")}
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
                <AccordionDetailsFilter sx={{ background: "unset" }}>
                  <Box display="flex" alignItems="center" mb="30px" sx={{ gap: "14px" }}>
                    <Typography>{dataRange?.minLifetimeBlock || 0}</Typography>
                    <StyledSlider
                      data-testid="slider"
                      getAriaLabel={() => "Minimum distance"}
                      value={
                        [
                          filterParams.minBlockLifetime || 0,
                          filterParams.maxBlockLifetime || dataRange?.maxLifetimeBlock || 0
                        ] || valueRange
                      }
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
              <AccordionContainer expanded={expanded === "participation"} onChange={handleChange("participation")}>
                <AccordionSummary>
                  <Box width={"100%"} display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
                    <Box display={"flex"} alignItems={"center"}>
                      <CustomIcon icon={PoolParticipationIcon} fill={theme.palette.secondary.light} height={18} />
                      <Box ml={1} color={({ palette }) => palette.secondary.main}>
                        {t("pool.poolParticipation")}
                      </Box>
                    </Box>
                    <Box>
                      {expanded === "participation" ? (
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
                        [
                          filterParams.minGovParticipationRate || 0,
                          filterParams.maxGovParticipationRate || dataRange?.maxGovParticipationRate || 0
                        ] || valueRange
                      }
                      onChange={(e, newValue) =>
                        handleChangeValueRange(e, newValue, "minGovParticipationRate", "maxGovernanceParticipationRate")
                      }
                      valueLabelDisplay="auto"
                      disableSwap
                      min={0}
                      max={dataRange?.maxGovParticipationRate || 0}
                    />
                    <Typography>{formatPercent(dataRange?.maxGovParticipationRate) || `0%`}</Typography>
                  </Box>
                </AccordionDetailsFilter>
              </AccordionContainer>
              <AccordionContainer expanded={expanded === "voting-power"} onChange={handleChange("voting-power")}>
                <AccordionSummary>
                  <Box width={"100%"} display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
                    <Box display={"flex"} alignItems={"center"}>
                      <CustomIcon icon={PoolVotingIcon} fill={theme.palette.secondary.light} height={18} />
                      <Box ml={1} color={({ palette }) => palette.secondary.main}>
                        {t("pool.poolVoting")}
                      </Box>
                    </Box>
                    <Box>
                      {expanded === "voting-power" ? (
                        <IoIosArrowUp color={theme.palette.secondary.main} />
                      ) : (
                        <IoIosArrowDown color={theme.palette.secondary.main} />
                      )}
                    </Box>
                  </Box>
                </AccordionSummary>
                <AccordionDetailsFilter sx={{ background: "unset" }}>
                  <Box display="flex" alignItems="center" mb="30px" sx={{ gap: "14px" }}>
                    <Typography>{dataRange?.minVotingPower || 0}</Typography>
                    <StyledSlider
                      valueLabelFormat={(value) => formatPrice(value)}
                      data-testid="slider"
                      getAriaLabel={() => "Minimum distance"}
                      value={
                        [
                          filterParams.minVotingPower || 0,
                          filterParams.maxVotingPower || dataRange?.maxVotingPower || 0
                        ] || valueRange
                      }
                      onChange={(e, newValue) =>
                        handleChangeValueRange(e, newValue, "minVotingPower", "maxVotingPower")
                      }
                      valueLabelDisplay="auto"
                      disableSwap
                      min={0}
                      step={0.000001}
                      max={dataRange?.maxVotingPower || 0}
                    />
                    <Typography>{formatPrice(dataRange?.maxVotingPower) || 0}</Typography>
                  </Box>
                </AccordionDetailsFilter>
              </AccordionContainer>
              <Box my={1} p="0px 16px">
                <ApplyFilterButton
                  data-testid="apply-filters"
                  onClick={() => {
                    handleFilter();
                  }}
                  disabled={JSON.stringify(dataRange) === JSON.stringify(filterParams)}
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
          )}
        </FilterContainer>
      </FilterWrapper>
    </ClickAwayListener>
  );
};

export default CustomFilterMultiRange;