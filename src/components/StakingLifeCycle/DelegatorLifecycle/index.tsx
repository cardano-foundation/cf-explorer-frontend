import { Box } from "@mui/material";

import { ReactComponent as DelegationIcon } from "../../../commons/resources/icons/Staking/DelegationIcon.svg";
import { ReactComponent as DeredistrationIcon } from "../../../commons/resources/icons/Staking/DeredistrationIcon.svg";
import { ReactComponent as RegistrationIcon } from "../../../commons/resources/icons/Staking/RegistrationIcon.svg";
import { ReactComponent as RewardsDistributionIcon } from "../../../commons/resources/icons/Staking/RewardsDistributionIcon.svg";
import { ReactComponent as RewardsWithdrawalIcon } from "../../../commons/resources/icons/Staking/RewardsWithdrawalIcon.svg";
import { ReactComponent as CheckIcon } from "../../../commons/resources/icons/Staking/Check.svg";
import { ReactComponent as NextIcon } from "../../../commons/resources/icons/Staking/nextIcon.svg";
import { ReactComponent as PreviousIcon } from "../../../commons/resources/icons/Staking/previousIcon.svg";
import { NextButton, PreviousButton, Step, StepButton, TitleStep } from "./styles";
import { useState } from "react";

interface StepperProps {
  icon: React.ReactNode;
  title: string;
  component: React.ReactNode;
}

const DelegatorLifecycle = ({ setMode }: { setMode: (mode: "timeline" | "tablular") => void }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const stepper: StepperProps[] = [
    {
      icon: <RegistrationIcon width={"25px"} height={"25px"} fill={currentStep >= 0 ? "#fff" : "#98A2B3"} />,
      title: "Registration",
      component: "Registration",
    },
    {
      icon: <DelegationIcon width={"25px"} height={"25px"} fill={currentStep >= 1 ? "#fff" : "#98A2B3"} />,
      title: "Delegation",
      component: "Delegation",
    },
    {
      icon: <RewardsDistributionIcon width={"25px"} height={"25px"} fill={currentStep >= 2 ? "#fff" : "#98A2B3"} />,
      title: "Rewards Distribution",
      component: "Rewards Distribution",
    },
    {
      icon: <RewardsWithdrawalIcon width={"25px"} height={"25px"} fill={currentStep >= 3 ? "#fff" : "#98A2B3"} />,
      title: "Reward Withdrawal",
      component: "Reward Withdrawal",
    },
    {
      icon: <DeredistrationIcon width={"25px"} height={"25px"} fill={currentStep >= 4 ? "#fff" : "#98A2B3"} />,
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

export default DelegatorLifecycle;
