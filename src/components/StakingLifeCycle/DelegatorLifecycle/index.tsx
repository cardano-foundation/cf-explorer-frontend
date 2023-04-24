import { useState } from "react";
import { Box } from "@mui/material";

import {
  DelegationIcon,
  DeredistrationIcon,
  RegistrationIcon,
  RewardsDistributionIcon,
  RewardsWithdrawalIcon,
  NextIcon,
  PreviousIcon,
  InfoIcon,
  TranferIcon,
} from "../../../commons/resources";
import { ADATransfersButton, NextButton, PreviousButton, Step, StepButton, TitleStep } from "./styles";

import Registration from "./Registration";
import Delegation from "./Delegation";
import RewardsDistribution from "./RewardsDistribution";
import Deregistration from "./Deregistration";
import RewardsWithdrawal from "./Withdraw";
import ADATransferModal from "./ADATransferModal";

interface StepperProps {
  icon: React.ReactNode;
  title: string;
  component: React.ReactNode;
}

const DelegatorLifecycle = ({
  setMode,
  containerPosition,
  currentStep,
  handleResize,
  setCurrentStep,
}: {
  setMode: (mode: "timeline" | "tablular") => void;
  currentStep: number;
  setCurrentStep: (index: number) => void;
  handleResize: () => void;
  containerPosition: {
    top?: number;
    left?: number;
  };
}) => {
  const [open, setOpen] = useState(false);
  const stepper: StepperProps[] = [
    {
      icon: <RegistrationIcon width={"25px"} height={"25px"} fill={currentStep >= 0 ? "#fff" : "#98A2B3"} />,
      title: "Registration",
      component: <Registration handleResize={handleResize} containerPosition={containerPosition} />,
    },
    {
      icon: <DelegationIcon width={"25px"} height={"25px"} fill={currentStep >= 1 ? "#fff" : "#98A2B3"} />,
      title: "Delegation",
      component: <Delegation handleResize={handleResize} containerPosition={containerPosition} />,
    },
    {
      icon: <RewardsDistributionIcon width={"25px"} height={"25px"} fill={currentStep >= 2 ? "#fff" : "#98A2B3"} />,
      title: "Rewards Distribution",
      component: <RewardsDistribution containerPosition={containerPosition} />,
    },
    {
      icon: <RewardsWithdrawalIcon width={"25px"} height={"25px"} fill={currentStep >= 3 ? "#fff" : "#98A2B3"} />,
      title: "Rewards Withdrawal",
      component: <RewardsWithdrawal handleResize={handleResize} containerPosition={containerPosition} />,
    },
    {
      icon: <DeredistrationIcon width={"25px"} height={"25px"} fill={currentStep >= 4 ? "#fff" : "#98A2B3"} />,
      title: "Deregistration",
      component: <Deregistration handleResize={handleResize} containerPosition={containerPosition} />,
    },
  ];
  return (
    <Box>
      <Box display={"flex"} justifyContent={"space-between"}>
        {stepper.map((step, idx) => (
          <Step component={"span"} key={idx} active={currentStep >= idx}>
            <StepButton
              active={currentStep >= idx}
              onClick={() => {
                setCurrentStep(idx);
                window.scrollTo(0, 0);
              }}
            >
              {step.icon}
            </StepButton>
            <TitleStep currentStep={currentStep} index={idx}>
              {step.title}
            </TitleStep>
          </Step>
        ))}
      </Box>

      <Box mt={3} display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
        <Box fontSize={"1.5rem"} fontWeight={"bold"}>
          {stepper[currentStep].title} <InfoIcon />
        </Box>
        <ADATransfersButton onClick={() => setOpen(true)}>
          <TranferIcon /> ADA Transfers
        </ADATransfersButton>
      </Box>

      <Box minHeight={400}>{stepper[currentStep].component}</Box>

      {currentStep > 0 && (
        <PreviousButton
          onClick={() => {
            setCurrentStep(currentStep - 1);
          }}
        >
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
      <ADATransferModal open={open} handleCloseModal={() => setOpen(false)} />
    </Box>
  );
};

export default DelegatorLifecycle;
