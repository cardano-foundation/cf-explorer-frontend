import { Box } from "@mui/material";
import { get } from "lodash";
import { useState } from "react";
import { IPropsModal, STEPS } from ".";
import { Container } from "../../../Account/ActivityLogModal/styles";
import StyledModal from "../../../commons/StyledModal";
import { ReportType } from "./FilledInfoModal";
import { ButtonEvent, ModalTitle, StyledBackButton, StyledButton, StyledStack, SubText, TextRequired } from "./styles";

export enum RatioGroupValue {
  yes = "YES",
  no = "NO",
  unTicked = "UN_TICKED"
}

export enum OptionTransfer {
  adaTransfer = "ADA_TRANSFER",
  feesPaid = "FEES_PAID"
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

const StepEventsModal: React.FC<IPropsModal> = ({ open, handleCloseModal, saveParams, gotoStep, defaultParams }) => {
  const [eventsKey, setEventsKey] = useState<Array<string>>([]);
  const [step1] = defaultParams || [];

  const handleSelectEvent = (id: string) => {
    const allEventByType = EVENTS_NAME.filter(({ type }) => type === get(defaultParams, "0.reportType"));

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

  const handleSubmit = () => {
    saveParams?.({
      eventsKey
    });
    gotoStep?.(STEPS.step4);
  };

  const events = EVENTS_NAME.filter((event) => {
    return step1.reportType === ReportType.PoolReport
      ? event.type !== ReportType.StakeKeyReport
      : event.type !== ReportType.PoolReport;
  });
  const isAll = eventsKey.length === events.length - 1;
  return (
    <StyledModal open={open} handleCloseModal={handleCloseModal} width={555}>
      <Container p={"10px 10px 1px 20px"}>
        <ModalTitle>Report composer</ModalTitle>
        <SubText>Staking lifecycle events</SubText>
        <TextRequired>Select as required</TextRequired>
        <Box display={"flex"} flexWrap={"wrap"} gap='10px' marginTop={"20px"}>
          {events.map(({ label, value }) => {
            return (
              <ButtonEvent
                key={`${label}_${value}`}
                active={Boolean((value === SELECT_ALL && isAll) || eventsKey.includes(value))}
                onClick={() => handleSelectEvent(value)}
              >
                {label}
              </ButtonEvent>
            );
          })}
        </Box>
        <StyledStack direction={"row"} display={"flex"} alignContent={"space-between"} gap={"20px"} mt={2}>
          <StyledBackButton onClick={() => gotoStep?.(STEPS.step2)}>Previous</StyledBackButton>
          <StyledButton disabled={!eventsKey.length} onClick={handleSubmit}>
            Compose report
          </StyledButton>
        </StyledStack>
      </Container>
    </StyledModal>
  );
};

export default StepEventsModal;
