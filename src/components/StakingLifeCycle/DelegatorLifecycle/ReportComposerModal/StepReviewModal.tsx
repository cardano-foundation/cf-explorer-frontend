import { Box, Stack } from "@mui/material";
import { Container } from "../../../Account/ActivityLogModal/styles";
import StyledModal from "../../../commons/StyledModal";
import {
  ModalTitle,
  StyledBackButton,
  StyledButton,
  StyledStack,
  TextLabelReview,
  TextRequired,
  TextValueReview,
} from "./styles";
import { IPropsModal, STEPS } from ".";
import moment from "moment";
import { EVENTS_NAME } from "./StepEventsModal";
import { PencilIcon } from "../../../../commons/resources";
import { ReportType } from "./FilledInfoModal";

const StepReviewModal: React.FC<IPropsModal> = ({ open, handleCloseModal, defaultParams, gotoStep }) => {
  const [step1, step2, step3] = defaultParams || [];
  const handleGenerateReport = () => {
    console.log(defaultParams);
    handleCloseModal();
  };

  const [start, end] = step1.dateRange || [];
  const [epochStart, epochEnd] = step1.epochRange || [];
  const events = EVENTS_NAME.filter(({ value }) => step3?.eventsKey?.includes(value))
    .map(({ label }) => label)
    .join(", ");

  const isPoolReport = step1.reportType === ReportType.PoolReport;

  const list = [
    {
      label: "Report name",
      value: step1.reportName,
      step: STEPS.step1,
    },
    {
      label: "Date range",
      value: isPoolReport
        ? `Epoch ${epochStart} -  Epoch ${epochEnd}`
        : `${moment(start).format("d MM yy")} - ${moment(end).format("d MM yy")}`,
      step: STEPS.step1,
    },
    {
      label: "Address details",
      value: step1.address,
      step: STEPS.step1,
    },
    {
      label: "ADA transfers",
      value: step2.adaTransfers,
      step: STEPS.step2,
    },
    {
      label: "Fees paid",
      value: step2.feesPaid,
      step: STEPS.step2,
    },
    {
      label: "Staking lifecycle events",
      value: events,
      step: STEPS.step3,
    },
  ];

  return (
    <StyledModal open={open} handleCloseModal={handleCloseModal} width={555}>
      <Container>
        <ModalTitle>Report composer</ModalTitle>
        <TextRequired>
          Before proceeding with your report creation, we just want to double-check and confirm that you’ve filled out
          all the details correctly?
        </TextRequired>
        <Stack>
          {list.map(({ label, value, step }, index: number) => {
            return (
              <Box
                display={"flex"}
                key={label}
                padding={"10px 0px"}
                justifyContent={"space-between"}
                borderBottom={index === list.length - 1 ? "none" : "1px solid #000000"}
              >
                <TextLabelReview>{label}</TextLabelReview>
                <Stack direction={"row"} spacing={1} justifyContent="center">
                  <TextValueReview>{value}</TextValueReview>
                  <PencilIcon onClick={() => gotoStep?.(step)} />
                </Stack>
              </Box>
            );
          })}
        </Stack>
        <StyledStack direction={"row"} display={"flex"} alignContent={"space-between"} gap={"20px"}>
          <StyledBackButton onClick={() => gotoStep?.(STEPS.step1)}>I’d like to double-check</StyledBackButton>
          <StyledButton isDisabled={false} onClick={handleGenerateReport}>
            Generate report
          </StyledButton>
        </StyledStack>
      </Container>
    </StyledModal>
  );
};

export default StepReviewModal;
