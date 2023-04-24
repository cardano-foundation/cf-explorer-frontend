import { useState } from "react";
import { Box } from "@mui/material";

import { NextButton, PreviousButton, Step, StepButton, TitleStep } from "./styles";

import {
  CheckIcon,
  InfoIcon,
  NextIcon,
  OperatorRewardIcon,
  PoolUpdateIcon,
  PreviousIcon,
  RegistrationIcon,
  RewardsWithdrawalIcon,
  TranferIcon,
} from "../../../commons/resources";
import Registration from "./Registration";
import PoollUpdates from "./PoollUpdates";
import { ADATransfersButton } from "../DelegatorLifecycle/styles";
import OperatorReward from "./OperatorRewards";
import Deregistration from "./Deregistration";
import {
  RegistrationProcessDescription,
  SPOInvolvementInDelegationDescription,
  WithdrawingFundProcessDescription,
  DeregistrationProcessDescription
} from "../../ModalDescription";
interface StepperProps {
  icon: React.ReactNode;
  title: string;
  component: React.ReactNode;
  description: React.ReactNode;
}

const SPOLifecycle = ({
  setMode,
  containerPosition,
  currentStep,
  setCurrentStep,
}: {
  setMode: (mode: "timeline" | "tablular") => void;
  containerPosition: {
    top?: number;
    left?: number;
  };
  currentStep: number;
  setCurrentStep: (index: number) => void;
}) => {
  const stepper: StepperProps[] = [
    {
      icon: <RegistrationIcon width={"25px"} height={"25px"} fill={currentStep >= 0 ? "#fff" : "#98A2B3"} />,
      title: "Registration",
      component: <Registration containerPosition={containerPosition} />,
      description: <RegistrationProcessDescription open={openDescriptionModal} handleCloseModal={() => setOpenDescriptionModal(false)} />,
    },
    {
      icon: <PoolUpdateIcon width={"25px"} height={"25px"} fill={currentStep >= 1 ? "#fff" : "#98A2B3"} />,
      title: "Pool Updates",
      component: <PoollUpdates containerPosition={containerPosition} />,
      description: <SPOInvolvementInDelegationDescription open={openDescriptionModal} handleCloseModal={() => setOpenDescriptionModal(false)} />,
    },
    {
      icon: <OperatorRewardIcon width={"25px"} height={"25px"} fill={currentStep >= 2 ? "#fff" : "#98A2B3"} />,
      title: "Operator Rewards",
      component: <OperatorReward containerPosition={containerPosition} />,
      description: <WithdrawingFundProcessDescription open={openDescriptionModal} handleCloseModal={() => setOpenDescriptionModal(false)} />,
    },
    {
      icon: <RewardsWithdrawalIcon width={"25px"} height={"25px"} fill={currentStep >= 3 ? "#fff" : "#98A2B3"} />,
      title: "Deregistration",
      component: <Deregistration containerPosition={containerPosition} />,
      description: <DeregistrationProcessDescription open={openDescriptionModal} handleCloseModal={() => setOpenDescriptionModal(false)} />,
    },
  ];

  return (
    <Box>
      <Box display={"flex"} justifyContent={"space-between"}>
        {stepper.map((step, idx) => (
          <Step component={"span"} key={idx} active={currentStep >= idx}>
            <StepButton active={currentStep >= idx} onClick={() => setCurrentStep(idx)}>
              {currentStep > idx ? <CheckIcon width={"25px"} height={"25px"} /> : step.icon}
            </StepButton>
            <TitleStep currentStep={currentStep} index={idx}>
              {step.title}
            </TitleStep>
          </Step>
        ))}
      </Box>
      <Box mt={3} display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
        <Box fontSize={"1.5rem"} fontWeight={"bold"}>
          {stepper[currentStep].title} <InfoIcon style={{ cursor: 'pointer' }} onClick={() => setOpenDescriptionModal(true)}/>
        </Box>
        <ADATransfersButton>
          <TranferIcon /> ADA Transfers
        </ADATransfersButton>
      </Box>
      <Box>{stepper[currentStep].description}</Box>
      <Box minHeight={400}>{stepper[currentStep].component}</Box>
      {currentStep > 0 && (
        <PreviousButton onClick={() => setCurrentStep(currentStep - 1)}>
          <PreviousIcon />
          <Box component={"span"}>Previous: {stepper[currentStep - 1]?.title}</Box>
        </PreviousButton>
      )}
      <NextButton
        onClick={() => (currentStep === stepper.length - 1 ? setMode("tablular") : setCurrentStep(currentStep + 1))}
        variant="contained"
      >
        Next: {currentStep === stepper.length - 1 ? "View in tabular" : stepper[currentStep + 1]?.title}
        <NextIcon />
      </NextButton>
    </Box>
  );
};

export default SPOLifecycle;
