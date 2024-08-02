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
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useLocation } from "react-router-dom";
import { parse } from "qs";

import {
  CurrentStatusIcon,
  ExpiryIcon,
  FilterIcon,
  GovBodyIcons,
  GovernanceIcon,
  ResetIcon
} from "src/commons/resources";
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
import { formatPercent, truncateToTwoDecimals } from "src/commons/utils/helper";
import DateRangeModal from "src/components/commons/CustomFilter/DateRangeModal";

import { Input } from "./styles";

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
export default function FilterVotesOverview() {
  const theme = useTheme();
  const { t } = useTranslation();
  const { search } = useLocation();
  const query = parse(search.split("?")[1]);
  const [filterParams, setFilterParams] = useState<PoolResponse>({});
  const [expanded, setExpanded] = useState<string | false>("");
  const [open, setOpen] = useState<boolean>(false);
  const [showDaterange, setShowDaterange] = useState<boolean>(false);
  const [dateRange, setDateRange] = useState<{
    fromDate?: string;
    toDate?: string;
  }>({ fromDate: query?.fromDate as string, toDate: query?.toDate as string });
  const handleChange = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false);
  };
  const dataRange = {
    maxGovParticipationRate: "0.014492753623188406",
    maxLifetimeBlock: 630334,
    maxPledge: 10000000000,
    maxPoolSize: null,
    maxSaturation: null,
    maxVotingPower: 0.5,
    minGovParticipationRate: 0,
    minLifetimeBlock: 0,
    minPledge: 0,
    minPoolSize: null,
    minSaturation: null,
    minVotingPower: 0.2
  };

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

  const handleChangeValueRange = (event: Event, newValue: number | number[], minKey: string, maxKey: string) => {
    if (!Array.isArray(newValue)) {
      return;
    }
    const [min, max] = newValue || [];
    setFilterParams({ ...filterParams, [minKey]: Math.min(min), [maxKey]: Math.min(max) });
  };

  const handleKeyPress = (event: { key: string }) => {
    if (event.key === "Enter") {
      //   handleFilter();
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
                  ? truncateToTwoDecimals(+numericValue) / 100
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
          disabled={disabled}
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
                    : ["maxGovParticipationRate"].includes(keyOnChangeMax)
                    ? truncateToTwoDecimals(+numericValue) / 100
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
                      <CustomIcon icon={GovernanceIcon} fill={theme.palette.secondary.light} height={24} width={24} />
                      <Box
                        data-testid="governance.filter.actionIdTitle"
                        ml={1}
                        color={({ palette }) => palette.secondary.main}
                      >
                        {t("dreps.anchorHash")}
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
                    //   onChange={({ target: { value } }) => setParams({ ...params, governanceActionTxHash: value })}
                    onKeyPress={handleKeyPress}
                  />
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
                    <CustomIcon icon={CurrentStatusIcon} fill={theme.palette.secondary.main} height={24} width={24} />
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
                    name="controlled-radio-buttons-group"
                    // value={filterParams.drepStatus || ""}
                    // onChange={({ target: { value } }) => setFilterParams({ ...filterParams, drepStatus: value })}
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
                      label={<Box lineHeight={1}>{t("filter.constitutionalCommittee")}</Box>}
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
                      label={<Box lineHeight={1}>{t("filter.dreps")}</Box>}
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
                      label={<Box lineHeight={1}>{t("filter.stakePoolOperators")}</Box>}
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
                  </Box>
                  {/* {!isEmpty(pickBy(dateRange, (value) => value !== "" && value !== undefined)) && (
                  <BsFillCheckCircleFill size={14} color={theme.palette.primary.main} />
                )} */}
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
                <AccordionContainer expanded={expanded === "poolVoting"} onChange={handleChange("poolVoting")}>
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
                          icon={GovBodyIcons}
                          fill={
                            dataRange?.maxVotingPower === null
                              ? theme.palette.secondary[600]
                              : theme.palette.secondary.light
                          }
                          height={24}
                          width={24}
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
                    <Box padding={"0 8px"} display="flex" alignItems="center" mb={1} sx={{ gap: "14px" }}>
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
                      filterParams.minVotingPower || 0,
                      filterParams.maxVotingPower ?? (initParams.maxVotingPower || 0),
                      "minVotingPower",
                      "maxVotingPower",
                      initParams.maxVotingPower,
                      dataRange?.maxVotingPower === null
                    )}
                  </AccordionDetailsFilter>
                </AccordionContainer>
              </Box>
            </Box>

            <Box width={"100%"} display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
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
                <AccordionContainer expanded={expanded === "test"} onChange={handleChange("test")}>
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
                          icon={GovBodyIcons}
                          fill={
                            dataRange?.maxVotingPower === null
                              ? theme.palette.secondary[600]
                              : theme.palette.secondary.light
                          }
                          height={24}
                          width={24}
                        />
                        <Box
                          ml={1}
                          color={({ palette }) =>
                            dataRange?.maxVotingPower === null ? palette.secondary[600] : palette.secondary.main
                          }
                        >
                          {t("filter.voitingStake")}
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
                    <Box padding={"0 8px"} display="flex" alignItems="center" mb={1} sx={{ gap: "14px" }}>
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
                      filterParams.minVotingPower || 0,
                      filterParams.maxVotingPower ?? (initParams.maxVotingPower || 0),
                      "minVotingPower",
                      "maxVotingPower",
                      initParams.maxVotingPower,
                      dataRange?.maxVotingPower === null
                    )}
                  </AccordionDetailsFilter>
                </AccordionContainer>
              </Box>
            </Box>
            <Box my={1} p="0px 16px">
              <ApplyFilterButton>{t("common.applyFilters")}</ApplyFilterButton>
            </Box>
            <Box
              component={Button}
              width={"100%"}
              textTransform={"capitalize"}
              display={"flex"}
              alignItems={"center"}
              color={({ palette }) => `${palette.primary.main} !important`}
            >
              <Box data-testid="governance.resetTitle" mr={1}>
                {t("common.reset")}
              </Box>
              <CustomIcon icon={ResetIcon} fill={theme.palette.primary.main} width={18} />
            </Box>
          </FilterContainer>
        )}
      </FilterWrapper>
    </ClickAwayListener>
  );
}
