import { Container } from "../../../Account/ActivityLogModal/styles";
import { StyledTextField } from "../../../TokenAutocomplete/styles";
import StyledModal from "../../../commons/StyledModal";
import { ModalTitle, StyledButton, StyledLabel, StyledStack, TextError, StyledSlider } from "./styles";

import { Box } from "@mui/material";
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { IPropsModal, STEPS } from ".";
import { useScreen } from "../../../../commons/hooks/useScreen";

import CustomDatePicker, { IDateRange } from "../../../CustomDatePicker";
import { useHistory, useParams } from "react-router-dom";

export enum ReportType {
  PoolReport = "POOL_REPORT",
  StakeKeyReport = "STAKE_KEY_REPORT"
}

type IEpochRange = [number, number];

const FilledInfoModal: React.FC<IPropsModal> = ({ open, handleCloseModal, saveParams, gotoStep }) => {
  const { currentEpoch } = useSelector(({ system }: RootState) => system);
  const history = useHistory();

  const isDelegatorPage = history.location.pathname.includes("/delegator-lifecycle/");
  const { poolId, stakeId } = useParams<{ poolId: string; stakeId: string }>();

  const reportType: ReportType = isDelegatorPage ? ReportType.StakeKeyReport : ReportType.PoolReport;
  const address = poolId || stakeId;

  const [dateRange, setDateRange] = useState<IDateRange>([null, null]);
  const [reportName, setReportName] = useState<string>("");
  const [epochRange, setEpochRange] = useState<IEpochRange>([30, 50]);
  const [errorReportField, setErrorReportField] = useState("");

  const onChangeReportName = (e: any) => {
    setReportName(e.target.value as ReportType);
    if (reportName.trim().length > 200) {
      setErrorReportField("Report name can not exceed 200 characters");
    } else {
      setErrorReportField("");
    }
  };

  const { isMobile } = useScreen();

  const isDisabledButton = useMemo(() => {
    if (errorReportField) return true;
    const [startDate, endDate] = dateRange;
    if (reportType === ReportType.StakeKeyReport) {
      return !address?.trim() || !startDate || !endDate;
    } else {
      return !address?.trim();
    }
  }, [address, dateRange, reportType, errorReportField]);

  const handleSubmit = async () => {
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
        {errorReportField && <TextError>{errorReportField}</TextError>}
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
