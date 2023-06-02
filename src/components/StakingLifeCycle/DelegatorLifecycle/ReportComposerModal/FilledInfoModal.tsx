import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import { useHistory, useParams } from "react-router-dom";

import { Container } from "src/components/Account/ActivityLogModal/styles";
import { StyledTextField } from "src/components/TokenAutocomplete/styles";
import StyledModal from "src/components/commons/StyledModal";
import { useScreen } from "src/commons/hooks/useScreen";
import CustomDatePicker, { IDateRange } from "src/components/CustomDatePicker";

import { ModalTitle, StyledButton, StyledLabel, StyledStack, TextError, StyledSlider } from "./styles";

import { IPropsModal, STEPS } from ".";

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
    if (/^[a-zA-Z0-9_\s]*$/.test(e.target.value)) {
      const text = e.target.value as string;
      setReportName(text as ReportType);
      if (text.trim().length > 200) {
        setErrorReportField("Report name can not exceed 200 characters");
      } else {
        setErrorReportField("");
      }
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
      reportName: reportName.replaceAll(" ", "-"),
      epochRange
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
          <StyledTextField placeholder="Enter report name" value={reportName} onChange={onChangeReportName} />
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
              valueLabelDisplay="auto"
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
