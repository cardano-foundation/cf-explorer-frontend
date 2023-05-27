import { Container } from "../../../Account/ActivityLogModal/styles";
import { StyledTextField } from "../../../TokenAutocomplete/styles";
import StyledModal from "../../../commons/StyledModal";
import {
  ModalTitle,
  StyledAddressSelect,
  StyledButton,
  StyledGroupField,
  StyledLabel,
  StyledSelect,
  StyledStack,
  TextWarning,
  TextError,
  StyledSlider
} from "./styles";

import { Box, MenuItem, Slider } from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { IPropsModal, STEPS } from ".";
import { useScreen } from "../../../../commons/hooks/useScreen";
import { DownIcon } from "../../../../commons/resources";
import { API } from "../../../../commons/utils/api";
import defaultAxios from "../../../../commons/utils/axios";
import CustomDatePicker, { IDateRange } from "../../../CustomDatePicker";
import { useHistory } from "react-router-dom";

export enum ReportType {
  PoolReport = "POOL_REPORT",
  StakeKeyReport = "STAKE_KEY_REPORT"
}

const options = [
  {
    value: ReportType.PoolReport,
    label: "Pool report"
  },
  {
    value: ReportType.StakeKeyReport,
    label: "Stake key report"
  }
];

type IEpochRange = [number, number];

const FilledInfoModal: React.FC<IPropsModal> = ({ open, handleCloseModal, saveParams, gotoStep }) => {
  const { currentEpoch } = useSelector(({ system }: RootState) => system);
  const history = useHistory();
  const isDelegatorPage = history.location.pathname.includes("/delegator-lifecycle/");
  const [reportType, setReportType] = useState<ReportType>(
    isDelegatorPage ? ReportType.StakeKeyReport : ReportType.PoolReport
  );
  const [address, setAddress] = useState<string>("");
  const [dateRange, setDateRange] = useState<IDateRange>([null, null]);
  const [reportName, setReportName] = useState<string>("");
  const [epochRange, setEpochRange] = useState<IEpochRange>([30, 50]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onChangeReportType = useCallback((e: any) => {
    setReportType(e.target.value as ReportType);
    setError("");
  }, []);

  const onChangeReportName = useCallback((e: any) => {
    setReportName(e.target.value as ReportType);
  }, []);

  const onChangeAddress = useCallback((e: any) => {
    const regex = /^[a-zA-Z0-9]*$/;
    if (!regex.test(e.target.value)) return;
    setAddress(e.target.value);
    setError("");
  }, []);

  const { isMobile } = useScreen();

  const isDisabledButton = useMemo(() => {
    if (error || loading) return true;
    const [startDate, endDate] = dateRange;
    if (reportType === ReportType.StakeKeyReport) {
      return !address?.trim() || !startDate || !endDate;
    } else {
      return !address?.trim();
    }
  }, [address, dateRange, reportType, error, loading]);

  let placeholderAddress = "Pool ID";
  switch (reportType) {
    case "POOL_REPORT":
      break;
    case "STAKE_KEY_REPORT":
      placeholderAddress = "Address details";
      break;
    default:
  }

  const handleSubmit = async () => {
    setLoading(true);
    if (reportType === ReportType.PoolReport) {
      try {
        const res = await defaultAxios.get(`${API.DELEGATION.POOL_DETAIL_HEADER}/${address}`);
        if (!res.data) throw Error();
      } catch (error) {
        setError("No pool found");
        return setLoading(false);
      }
    }
    if (reportType === ReportType.StakeKeyReport) {
      try {
        const res = await defaultAxios.get(`${API.STAKE.DETAIL}/${address}`);
        if (!res.data) throw Error();
      } catch (error) {
        setError("No stake key found");
        return setLoading(false);
      }
    }
    setLoading(false);
    saveParams?.({
      reportType,
      address,
      dateRange,
      reportName,
      epochRange
    });
    gotoStep?.(STEPS.step2);
  };

  const handleChangeEpochRange = (event: Event, newValue: number | number[], activeThumb: number) => {
    if (!Array.isArray(newValue)) {
      return;
    }
    const [min, max] = newValue || [];

    setEpochRange([Math.min(min), Math.min(max)]);
  };

  return (
    <StyledModal
      open={open}
      handleCloseModal={handleCloseModal}
      paddingX={isMobile ? "10px" : "40px"}
      paddingY={isMobile ? "20px" : "30px"}
      contentStyle={{ overflowY: "unset" }}
    >
      <Container>
        <ModalTitle>
          <Box sx={{ fontSize: `${isMobile ? "20px" : "24px"}` }}>Report composer</Box>
        </ModalTitle>
        <StyledStack>
          <StyledLabel>Report name</StyledLabel>
          <StyledTextField placeholder='Enter report name' value={reportName} onChange={onChangeReportName} />
        </StyledStack>
        <Box sx={{ marginBottom: "20px" }}>
          <StyledLabel>Address details</StyledLabel>
          <StyledAddressSelect display={"flex"}>
            <StyledSelect
              size='small'
              onChange={onChangeReportType}
              value={reportType}
              IconComponent={DownIcon}
              sx={{ paddingRight: `${isMobile ? "12px" : "0px"}` }}
            >
              {options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </StyledSelect>
            <StyledGroupField
              onChange={onChangeAddress}
              value={address}
              sx={{ flexGrow: 1 }}
              placeholder={placeholderAddress}
            />
          </StyledAddressSelect>
        </Box>
        {error && <TextError>{error}</TextError>}
        {reportType === ReportType.StakeKeyReport && (
          <Container>
            <StyledStack>
              <StyledLabel>Select a date range</StyledLabel>
              <CustomDatePicker dateRange={dateRange} setDateRange={setDateRange} hideFuture />
            </StyledStack>
          </Container>
        )}
        {reportType === ReportType.PoolReport && (
          <Box sx={{ marginBottom: "20px" }}>
            <StyledLabel>Select a epoch range</StyledLabel>
            <StyledSlider
              getAriaLabel={() => "Minimum distance"}
              value={epochRange}
              onChange={handleChangeEpochRange}
              valueLabelDisplay='auto'
              disableSwap
              min={0}
              max={currentEpoch?.no || 0}
            />
          </Box>
        )}
        <StyledStack>
          <StyledButton disabled={isDisabledButton} onClick={handleSubmit}>
            Next
          </StyledButton>
        </StyledStack>
      </Container>
    </StyledModal>
  );
};

export default FilledInfoModal;
