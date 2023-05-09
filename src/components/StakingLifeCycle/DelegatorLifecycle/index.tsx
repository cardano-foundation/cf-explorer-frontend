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
import {
  ADATransfersButton,
  ButtonText,
  DescriptionText,
  NextButton,
  PreviousButton,
  Step,
  StepButton,
  StyledBox,
  TabTitle,
  TitleStep,
} from "./styles";

import Registration from "./Registration";
import Delegation from "./Delegation";
import RewardsDistribution from "./RewardsDistribution";
import Deregistration from "./Deregistration";
import RewardsWithdrawal from "./Withdraw";
import ADATransferModal from "./ADATransferModal";
import {
  DelegationProcessDescription,
  DeregistrationProcessDescription,
  RegistrationProcessDescription,
  RewardDistributionProcessDescription,
  WithdrawingFundProcessDescription,
} from "../../ModalDescription";
import { useHistory, useParams } from "react-router-dom";
import { details } from "../../../commons/routers";

interface StepperProps {
  icon: React.ReactNode;
  title: string;
  component: React.ReactNode;
  description: React.ReactNode;
  key: string;
}

const DelegatorLifecycle = ({
  setMode,
  containerPosition,
  handleResize,
  currentStep,
  setCurrentStep,
}: {
  setMode: (mode: "timeline" | "tablular") => void;
  containerPosition: {
    top?: number;
    left?: number;
  };
  handleResize: () => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
}) => {
  const history = useHistory();
  const { stakeId = "" } = useParams<{
    stakeId: string;
  }>();
  const [open, setOpen] = useState(false);
  const [openDescriptionModal, setOpenDescriptionModal] = useState(false);

  const stepper: StepperProps[] = [
    {
      icon: <RegistrationIcon width={"25px"} height={"25px"} fill={currentStep >= 0 ? "#fff" : "#98A2B3"} />,
      title: "Registration",
      component: <Registration handleResize={handleResize} containerPosition={containerPosition} />,
      description: (
        <RegistrationProcessDescription
          open={openDescriptionModal}
          handleCloseModal={() => setOpenDescriptionModal(false)}
        />
      ),
      key: "registration",
    },
    {
      icon: <DelegationIcon width={"25px"} height={"25px"} fill={currentStep >= 1 ? "#fff" : "#98A2B3"} />,
      title: "Delegation",
      component: <Delegation handleResize={handleResize} containerPosition={containerPosition} />,
      description: (
        <DelegationProcessDescription
          open={openDescriptionModal}
          handleCloseModal={() => setOpenDescriptionModal(false)}
        />
      ),
      key: "delegation",
    },
    {
      icon: <RewardsDistributionIcon width={"25px"} height={"25px"} fill={currentStep >= 2 ? "#fff" : "#98A2B3"} />,
      title: "Rewards Distribution",
      component: <RewardsDistribution handleResize={handleResize} containerPosition={containerPosition} />,
      description: (
        <RewardDistributionProcessDescription
          open={openDescriptionModal}
          handleCloseModal={() => setOpenDescriptionModal(false)}
        />
      ),
      key: "rewardsDistribution",
    },
    {
      icon: <RewardsWithdrawalIcon width={"25px"} height={"25px"} fill={currentStep >= 3 ? "#fff" : "#98A2B3"} />,
      title: "Rewards Withdrawal",
      component: <RewardsWithdrawal handleResize={handleResize} containerPosition={containerPosition} />,
      description: (
        <WithdrawingFundProcessDescription
          open={openDescriptionModal}
          handleCloseModal={() => setOpenDescriptionModal(false)}
        />
      ),
      key: "rewardsWithdrawal",
    },
    {
      icon: <DeredistrationIcon width={"25px"} height={"25px"} fill={currentStep >= 4 ? "#fff" : "#98A2B3"} />,
      title: "Deregistration",
      component: <Deregistration handleResize={handleResize} containerPosition={containerPosition} />,
      description: (
        <DeregistrationProcessDescription
          open={openDescriptionModal}
          handleCloseModal={() => setOpenDescriptionModal(false)}
        />
      ),
      key: "deregistration",
    },
  ];

  return (
    <Box>
      <Box display={"flex"} justifyContent={"space-between"}>
        {stepper.map((step, idx) => (
          <Step component={"span"} key={idx} active={+(currentStep >= idx)}>
            <StepButton
              active={+(currentStep >= idx)}
              onClick={() => {
                setCurrentStep(idx);
                history.push(details.staking(stakeId, step.key));
              }}
            >
              {step.icon}
            </StepButton>
            <TitleStep currentstep={currentStep} index={idx}>
              {step.title}
            </TitleStep>
          </Step>
        ))}
      </Box>

      <Box mt={3} display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
        <StyledBox fontSize={"1.5rem"} fontWeight={"bold"}>
          <TabTitle>{stepper[currentStep].title}</TabTitle>
          <InfoIcon style={{ cursor: "pointer" }} onClick={() => setOpenDescriptionModal(true)} />
        </StyledBox>
        <ADATransfersButton onClick={() => setOpen(true)}>
          <TranferIcon /> ADA Transfers
        </ADATransfersButton>
      </Box>
      <Box>{stepper[currentStep].description}</Box>
      <Box pb={10} minHeight={400}>
        {stepper[currentStep].component}
      </Box>

      {currentStep > 0 && (
        <PreviousButton
          onClick={() => {
            history.push(details.staking(stakeId, stepper[currentStep - 1]?.key));
            setCurrentStep(currentStep - 1);
          }}
        >
          <PreviousIcon />
          <ButtonText>Previous: {stepper[currentStep - 1]?.title}</ButtonText>
        </PreviousButton>
      )}
      <NextButton
        onClick={() => {
          if (currentStep === stepper.length - 1) {
            history.push(details.staking(stakeId, "tablular"));
            setMode("tablular");
          } else {
            history.push(details.staking(stakeId, stepper[currentStep + 1]?.key));
            setCurrentStep(currentStep + 1);
          }
        }}
        variant="contained"
      >
        <ButtonText>
          Next: {currentStep === stepper.length - 1 ? "View in tabular" : stepper[currentStep + 1]?.title}
        </ButtonText>
        <NextIcon />
      </NextButton>
      <ADATransferModal open={open} handleCloseModal={() => setOpen(false)} />
    </Box>
  );
};

export default DelegatorLifecycle;
