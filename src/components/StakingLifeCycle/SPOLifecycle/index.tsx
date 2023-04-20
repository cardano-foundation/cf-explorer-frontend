import { useState } from "react";
import { Box } from "@mui/material";

import { ReactComponent as OperatorRewardIcon } from "../../../commons/resources/icons/Staking/OperatorRewardIcon.svg";
import { ReactComponent as PoolUpdateIcon } from "../../../commons/resources/icons/Staking/poolUpdateIcon.svg";
import { ReactComponent as RegistrationIcon } from "../../../commons/resources/icons/Staking/RegistrationIcon.svg";
import { ReactComponent as RewardsWithdrawalIcon } from "../../../commons/resources/icons/Staking/RewardsWithdrawalIcon.svg";
import { ReactComponent as CheckIcon } from "../../../commons/resources/icons/Staking/Check.svg";
import { ReactComponent as NextIcon } from "../../../commons/resources/icons/Staking/nextIcon.svg";
import { ReactComponent as PreviousIcon } from "../../../commons/resources/icons/Staking/previousIcon.svg";

import { NextButton, PreviousButton, Step, StepButton, TitleStep } from "./styles";

interface StepperProps {
  icon: React.ReactNode;
  title: string;
  component: React.ReactNode;
}

const SPOLifecycle = ({ setMode }: { setMode: (mode: "timeline" | "tablular") => void }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const stepper: StepperProps[] = [
    {
      icon: <RegistrationIcon width={"25px"} height={"25px"} fill={currentStep >= 0 ? "#fff" : "#98A2B3"} />,
      title: "Registration",
      component: "Registration",
    },
    {
      icon: <PoolUpdateIcon width={"25px"} height={"25px"} fill={currentStep >= 1 ? "#fff" : "#98A2B3"} />,
      title: "Pool Updates",
      component: "Pool Updates",
    },
    {
      icon: <OperatorRewardIcon width={"25px"} height={"25px"} fill={currentStep >= 2 ? "#fff" : "#98A2B3"} />,
      title: "Operator Rewards",
      component: "Operator Rewards",
    },
    {
      icon: <RewardsWithdrawalIcon width={"25px"} height={"25px"} fill={currentStep >= 3 ? "#fff" : "#98A2B3"} />,
      title: "Deregistration",
      component: "Deregistration",
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
      <Box mt={3}>{stepper[currentStep].component}</Box>
      {currentStep > 0 && (
        <PreviousButton onClick={() => setCurrentStep(prev => prev - 1)}>
          <PreviousIcon />
          <Box component={"span"}>Previous: {stepper[currentStep - 1]?.title}</Box>
        </PreviousButton>
      )}
      <NextButton
        onClick={() => (currentStep === stepper.length - 1 ? setMode("tablular") : setCurrentStep(prev => prev + 1))}
        variant="contained"
      >
        Next Step: {currentStep === stepper.length - 1 ? "View in tabular" : stepper[currentStep + 1]?.title}
        <NextIcon />
      </NextButton>
    </Box>
  );
};

export default SPOLifecycle;
