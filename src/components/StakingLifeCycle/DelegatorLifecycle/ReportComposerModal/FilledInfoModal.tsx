import { useEffect, useMemo, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Box, FormControl, FormControlLabel, RadioGroup, Stack, Radio } from "@mui/material";

import CustomModal from "src/components/commons/CustomModal";
import CustomDatePicker, { IDateRange } from "src/components/commons/CustomDatePicker";

import {
  ButtonEvent,
  Container,
  StyledButton,
  StyledFormLabel,
  StyledLabel,
  StyledSlider,
  StyledStack,
  StyledTextField,
  SubText,
  TextError,
  TextRequired
} from "./styles";

import { IPropsModal, STEPS } from ".";

export enum ReportType {
  PoolReport = "POOL_REPORT",
  StakeKeyReport = "STAKE_KEY_REPORT"
}
export enum RatioGroupValue {
  yes = "YES",
  no = "NO",
  unTicked = "UN_TICKED"
}

export enum OptionTransfer {
  adaTransfer = "ADA_TRANSFER",
  feesPaid = "FEES_PAID",
  poolSize = "POOL_SIZE"
}

const SELECT_ALL = "SELECT_ALL";

export const EVENTS_NAME = [
  {
    label: "All",
    value: SELECT_ALL
  },
  {
    label: "Registration",
    value: "REGISTRATION",
    type: ReportType.StakeKeyReport
  },

  {
    label: "Rewards",
    value: "REWARDS",
    type: ReportType.StakeKeyReport
  },
  {
    label: "Delegation",
    value: "DELEGATION",
    type: ReportType.StakeKeyReport
  },
  {
    label: "Withdraw funds",
    value: "WITHDRAWAL",
    type: ReportType.StakeKeyReport
  },
  {
    label: "Deregistration",
    value: "DEREGISTRATION",
    type: ReportType.StakeKeyReport
  },
  {
    label: "Registration",
    value: "registration",
    type: ReportType.PoolReport
  },
  {
    label: "Pool Update",
    value: "pool_update",
    type: ReportType.PoolReport
  },
  {
    label: "Reward",
    value: "reward",
    type: ReportType.PoolReport
  },
  {
    label: "Deregistration",
    value: "deregistration",
    type: ReportType.PoolReport
  }
];

type IEpochRange = [number, number];

const FilledInfoModal: React.FC<IPropsModal> = ({ open, handleCloseModal, saveParams, gotoStep, currentStep }) => {
  const { currentEpoch } = useSelector(({ system }: RootState) => system);
  const history = useHistory();

  const isDelegatorPage = history.location.pathname.includes("/delegator-lifecycle/");
  const { poolId, stakeId } = useParams<{ poolId: string; stakeId: string }>();

  const reportType: ReportType = isDelegatorPage ? ReportType.StakeKeyReport : ReportType.PoolReport;
  const address = poolId || stakeId;

  const [dateRange, setDateRange] = useState<IDateRange>([null, null]);
  const [adaTransfers, setADATransfer] = useState<RatioGroupValue>(RatioGroupValue.unTicked);
  const [poolSize, setPoolSize] = useState<RatioGroupValue>(RatioGroupValue.unTicked);
  const [reportName, setReportName] = useState<string>("");
  const [epochRange, setEpochRange] = useState<IEpochRange>([30, 50]);
  const [errorReportField, setErrorReportField] = useState("");
  const [eventsKey, setEventsKey] = useState<Array<string>>([]);
  const [feesPaid, setFeesPaid] = useState<RatioGroupValue>(RatioGroupValue.unTicked);

  //step2
  const OPTIONS_TRANSFER = [
    {
      key: OptionTransfer.adaTransfer,
      label: "ADA transfers",
      value: adaTransfers,
      type: [ReportType.StakeKeyReport]
    },
    {
      key: OptionTransfer.poolSize,
      label: "Pool size",
      value: poolSize,
      type: [ReportType.PoolReport]
    }
  ];
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, key: OptionTransfer) => {
    const value = e.target.value as RatioGroupValue;
    if (key === OptionTransfer.adaTransfer) {
      setADATransfer(value);
    } else if (key === OptionTransfer.poolSize) {
      setPoolSize(value);
    } else {
      setFeesPaid(value);
    }
  };

  const handleClickRadio = (key: OptionTransfer) => {
    switch (key) {
      case OptionTransfer.adaTransfer:
        if (adaTransfers !== RatioGroupValue.unTicked) {
          setADATransfer(RatioGroupValue.unTicked);
        }
        break;
      case OptionTransfer.feesPaid:
        if (feesPaid !== RatioGroupValue.unTicked) {
          setFeesPaid(RatioGroupValue.unTicked);
        }
        break;
      case OptionTransfer.poolSize:
        if (poolSize !== RatioGroupValue.unTicked) {
          setPoolSize(RatioGroupValue.unTicked);
        }
        break;
      default:
        break;
    }
  };

  // end Step 2

  // step 3

  const handleSelectEvent = (id: string) => {
    const allEventByType = EVENTS_NAME.filter(({ type }) => type === reportType);
    if (id === SELECT_ALL) {
      if (eventsKey.length === allEventByType.length) {
        setEventsKey([]);
      } else {
        const allKeys: Array<string> = allEventByType.map(({ value }) => value);
        setEventsKey(allKeys);
      }
      return;
    }

    if (eventsKey.includes(id)) {
      setEventsKey(eventsKey.filter((value: string) => value !== id));
    } else {
      setEventsKey([...eventsKey, id]);
    }
  };

  const events = EVENTS_NAME.filter((event) => {
    return reportType === ReportType.PoolReport
      ? event.type !== ReportType.StakeKeyReport
      : event.type !== ReportType.PoolReport;
  });
  const isAll = eventsKey.length === events.length - 1;
  const isPoolReport = reportType === ReportType.PoolReport;

  // end step 3
  const onChangeReportName = (e: any) => {
    if (/^[a-zA-Z0-9_\s]*$/.test(e.target.value)) {
      const text = e.target.value as string;
      setReportName(text as ReportType);
      if (text.trim().length > 125) {
        setErrorReportField("Report name can not exceed 125 characters");
      } else {
        setErrorReportField("");
      }
    }
  };

  const isDisabledButton = useMemo(() => {
    if (errorReportField) return true;
    const [startDate, endDate] = dateRange;
    const defaultDisabledCondition = !address?.trim() || !eventsKey.length;
    if (reportType === ReportType.StakeKeyReport) {
      return defaultDisabledCondition || !startDate || !endDate || adaTransfers === RatioGroupValue.unTicked;
    } else {
      return defaultDisabledCondition || poolSize === RatioGroupValue.unTicked;
    }
  }, [address, dateRange, reportType, errorReportField, adaTransfers, poolSize, eventsKey]);

  const handleSubmit = async () => {
    saveParams?.({
      reportType,
      address,
      dateRange,
      reportName: reportName.replaceAll(" ", "-"),
      epochRange,
      adaTransfers,
      feesPaid: false,
      poolSize,
      eventsKey
    });
    gotoStep?.(STEPS.step2);
  };

  const handleChangeEpochRange = (event: Event, newValue: number | number[]) => {
    if (!Array.isArray(newValue)) {
      return;
    }
    const [min, max] = newValue || [];

    setEpochRange([Math.min(min), Math.min(max)]);
  };

  useEffect(() => {
    if (!currentStep && !open) {
      setDateRange([null, null]);
      setEpochRange([30, 50]);
    }
  }, [open]);

  return (
    <CustomModal
      open={open}
      onClose={handleCloseModal}
      title="Report composer"
      width={500}
      padding="0px 24px !important"
      margin="0px -24px !important"
    >
      <Container>
        <StyledStack>
          <StyledLabel>Report name</StyledLabel>
          <StyledTextField placeholder="Enter report name" value={reportName} onChange={onChangeReportName} />
        </StyledStack>
        {reportType === ReportType.StakeKeyReport && (
          <StyledStack>
            <StyledLabel>Select a date range</StyledLabel>
            <CustomDatePicker dateRange={dateRange} setDateRange={setDateRange} hideFuture />
          </StyledStack>
        )}
        {reportType === ReportType.PoolReport && (
          <Box sx={{ marginBottom: "20px" }}>
            <StyledLabel>Select a epoch range</StyledLabel>
            <StyledSlider
              data-testid="slider"
              getAriaLabel={() => "Minimum distance"}
              value={epochRange}
              onChange={handleChangeEpochRange}
              valueLabelDisplay="auto"
              disableSwap
              min={0}
              max={currentEpoch?.no || 0}
            />
          </Box>
        )}
        <Box marginBottom={"20px"}>
          {OPTIONS_TRANSFER.filter(({ type }) => type.includes(reportType)).map(({ key, label, value }) => {
            return (
              <Box key={key}>
                <FormControl sx={{ width: "100%" }}>
                  <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
                    <StyledFormLabel>{label}</StyledFormLabel>
                    <RadioGroup
                      aria-labelledby={key}
                      name={key}
                      value={value}
                      onChange={(e: any) => handleChange(e, key)}
                      data-testid="radio-group-report"
                    >
                      <Stack direction={"row"}>
                        <FormControlLabel
                          value={RatioGroupValue.yes}
                          control={<Radio onClick={() => handleClickRadio(key)} />}
                          label="Yes"
                          sx={{ color: (props) => props.palette.grey[400] }}
                        />
                        <FormControlLabel
                          value={RatioGroupValue.no}
                          control={<Radio onClick={() => handleClickRadio(key)} />}
                          label="No"
                          sx={{ color: (props) => props.palette.grey[400] }}
                        />
                      </Stack>
                    </RadioGroup>
                  </Box>
                </FormControl>
              </Box>
            );
          })}
        </Box>
        <Box marginBottom={"20px"}>
          <SubText>{isPoolReport ? "Pool Report by event" : "Staking lifecycle events"}</SubText>
          <TextRequired>Select as required</TextRequired>
          <Box display={"flex"} flexWrap={"wrap"} gap="10px" marginTop="20px" marginBottom="40px">
            {events.map(({ label, value }) => {
              return (
                <ButtonEvent
                  key={`${label}_${value}`}
                  active={+Boolean((value === SELECT_ALL && isAll) || +eventsKey.includes(value))}
                  onClick={() => handleSelectEvent(value)}
                >
                  {label}
                </ButtonEvent>
              );
            })}
          </Box>
        </Box>
        {errorReportField && <TextError>{errorReportField}</TextError>}
        <StyledStack>
          <StyledButton disabled={isDisabledButton} onClick={handleSubmit}>
            Next
          </StyledButton>
        </StyledStack>
      </Container>
    </CustomModal>
  );
};

export default FilledInfoModal;
