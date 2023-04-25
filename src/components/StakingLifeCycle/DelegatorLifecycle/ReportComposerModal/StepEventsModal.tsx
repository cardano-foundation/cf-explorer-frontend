import { Box } from "@mui/material";
import { Container } from "../../../Account/ActivityLogModal/styles";
import StyledModal from "../../../commons/StyledModal";
import { ButtonEvent, ModalTitle, StyledBackButton, StyledButton, StyledStack, SubText, TextRequired } from "./styles";
import { useState } from "react";
import { IPropsModal, STEPS } from ".";
import { ReportType } from "./FilledInfoModal";

export enum RatioGroupValue {
  yes = "YES",
  no = "NO",
  unTicked = "UN_TICKED",
}

export enum OptionTransfer {
  adaTransfer = "ADA_TRANSFER",
  feesPaid = "FEES_PAID",
}
const SELECT_ALL = 0;

export const EVENTS_NAME = [
  {
    label: "All",
    value: SELECT_ALL,
  },
  {
    label: "Registration",
    value: 2,
  },
  {
    label: "Rewards",
    value: 3,
    type: ReportType.StakeKeyReport,
  },
  {
    label: "Delegation",
    value: 4,
    type: ReportType.StakeKeyReport,
  },
  {
    label: "Withdraw funds",
    value: 5,
    type: ReportType.StakeKeyReport,
  },
  {
    label: "Deregistration",
    value: 6,
    type: ReportType.StakeKeyReport,
  },
  {
    label: "Delegate",
    value: 9,
    type: ReportType.PoolReport,
  },
  {
    label: "Reward",
    value: 7,
    type: ReportType.PoolReport,
  },
  {
    label: "Pool Update",
    value: 8,
    type: ReportType.PoolReport,
  },
];

const StepEventsModal: React.FC<IPropsModal> = ({ open, handleCloseModal, saveParams, gotoStep, defaultParams }) => {
  const [eventsKey, setEventsKey] = useState<Array<number>>([]);
  const [step1] = defaultParams || [];

  const handleSelectEvent = (id: number) => {
    if (id === SELECT_ALL) {
      if (eventsKey.length === EVENTS_NAME.length - 1) {
        setEventsKey([]);
      } else {
        const allKeys: Array<number> = [];
        EVENTS_NAME.forEach(event => {
          if (event.value !== SELECT_ALL) {
            allKeys.push(event.value);
          }
        });
        setEventsKey(allKeys);
      }
      return;
    }

    if (eventsKey.includes(id)) {
      setEventsKey(eventsKey.filter((value: number) => value !== id));
    } else {
      setEventsKey([...eventsKey, id]);
    }
  };

  const handleSubmit = () => {
    saveParams?.({
      eventsKey,
    });
    gotoStep?.(STEPS.step4);
  };

  const events = EVENTS_NAME.filter(event => {
    return step1.reportType === ReportType.PoolReport
      ? event.type !== ReportType.StakeKeyReport
      : event.type !== ReportType.PoolReport;
  });

  return (
    <StyledModal open={open} handleCloseModal={handleCloseModal} width={555}>
      <Container>
        <ModalTitle>Report composer</ModalTitle>
        <SubText>Staking lifecycle events</SubText>
        <TextRequired>Select as required</TextRequired>
        <Box display={"flex"} flexWrap={"wrap"} gap="10px" marginTop={"20px"}>
          {events.map(({ label, value }) => {
            return (
              <ButtonEvent key={value} isSelected={eventsKey.includes(value)} onClick={() => handleSelectEvent(value)}>
                {label}
              </ButtonEvent>
            );
          })}
        </Box>
        <StyledStack direction={"row"} display={"flex"} alignContent={"space-between"} gap={"20px"}>
          <StyledBackButton onClick={() => gotoStep?.(STEPS.step2)}>Previous</StyledBackButton>
          <StyledButton isDisabled={!eventsKey.length} onClick={handleSubmit}>
            Compose report
          </StyledButton>
        </StyledStack>
      </Container>
    </StyledModal>
  );
};

export default StepEventsModal;
