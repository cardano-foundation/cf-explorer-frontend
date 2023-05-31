/* eslint-disable react-hooks/exhaustive-deps */
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
  TranferIcon
} from "../../../commons/resources";
import {
  ADATransfersButton,
  ButtonText,
  NextButton,
  PreviousButton,
  Step,
  StepButton,
  StepHeader,
  StyledBox,
  TabTitle,
  TitleStep,
  StyledGroupButton
} from "./styles";

import Registration from "./Registration";
import Delegation from "./Delegation";
import RewardsDistribution from "./RewardsDistribution";
import Deregistration from "./Deregistration";
import RewardsWithdrawal from "./Withdraw";
import ADATransferModal from "./ADATransferModal";
import {
  DelegationProcessDescription,
  DeregistrationDelegatorProcessDescription,
  RegistrationDelegatorProcessDescription,
  RewardDistributionProcessDescription,
  WithdrawingFundProcessDescription
} from "../../ModalDescription";
import { useHistory, useParams } from "react-router-dom";
import { details } from "../../../commons/routers";
import { useScreen } from "../../../commons/hooks/useScreen";
import { ListStakeKeyResponse } from "src/pages/DelegatorLifecycle";
interface StepperProps {
  icon: React.ReactNode;
  title: string;
  component: React.ReactNode;
  description: React.ReactNode;
  key: DelegationStep;
  keyCheckShow: string;
}

interface Props {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  tabsRenderConfig?: ListStakeKeyResponse;
}

const DelegatorLifecycle = ({ currentStep, setCurrentStep, tabsRenderConfig }: Props) => {
  const history = useHistory();
  const { isMobile } = useScreen();
  const { stakeId = "" } = useParams<{
    stakeId: string;
  }>();
  const [open, setOpen] = useState(false);
  const [openDescriptionModal, setOpenDescriptionModal] = useState(false);

  const stepper: StepperProps[] = [
    {
      icon: <RegistrationIcon width={"25px"} height={"25px"} fill={currentStep >= 0 ? "#fff" : "#98A2B3"} />,
      title: "Registration",
      component: <Registration />,
      description: (
        <RegistrationDelegatorProcessDescription
          open={openDescriptionModal}
          handleCloseModal={() => setOpenDescriptionModal(false)}
        />
      ),
      key: "registration",
      keyCheckShow: "hasRegistration"
    },
    {
      icon: <DelegationIcon width={"25px"} height={"25px"} fill={currentStep >= 1 ? "#fff" : "#98A2B3"} />,
      title: "Delegation",
      component: <Delegation />,
      description: (
        <DelegationProcessDescription
          open={openDescriptionModal}
          handleCloseModal={() => setOpenDescriptionModal(false)}
        />
      ),
      key: "delegation",
      keyCheckShow: "hasDelegation"
    },
    {
      icon: <RewardsDistributionIcon width={"25px"} height={"25px"} fill={currentStep >= 2 ? "#fff" : "#98A2B3"} />,
      title: "Rewards Distribution",
      component: <RewardsDistribution />,
      description: (
        <RewardDistributionProcessDescription
          open={openDescriptionModal}
          handleCloseModal={() => setOpenDescriptionModal(false)}
        />
      ),
      key: "rewards",
      keyCheckShow: "hashRewards"
    },
    {
      icon: <RewardsWithdrawalIcon width={"25px"} height={"25px"} fill={currentStep >= 3 ? "#fff" : "#98A2B3"} />,
      title: "Rewards Withdrawal",
      component: <RewardsWithdrawal />,
      description: (
        <WithdrawingFundProcessDescription
          open={openDescriptionModal}
          handleCloseModal={() => setOpenDescriptionModal(false)}
        />
      ),
      key: "withdrawal-history",
      keyCheckShow: "hasWithdrawal"
    },
    {
      icon: <DeredistrationIcon width={"25px"} height={"25px"} fill={currentStep >= 4 ? "#fff" : "#98A2B3"} />,
      title: "Deregistration",
      component: <Deregistration />,
      description: (
        <DeregistrationDelegatorProcessDescription
          open={openDescriptionModal}
          handleCloseModal={() => setOpenDescriptionModal(false)}
        />
      ),
      key: "deregistration",
      keyCheckShow: "hasDeRegistration"
    }
  ];

  if (!tabsRenderConfig) return null;

  return (
    <Box>
      <Box display={"flex"} justifyContent={"space-between"} sx={{ overflowX: "auto" }}>
        {stepper.map((step, idx) => {
          return (
            <Step
              component={"span"}
              key={idx}
              active={+(currentStep === idx)}
              display={tabsRenderConfig[step.keyCheckShow] ? "block" : "none"}
            >
              <StepButton
                active={+(currentStep === idx)}
                onClick={() => {
                  setCurrentStep(idx);
                  history.push(details.staking(stakeId, "timeline", step.key));
                }}
              >
                {step.icon}
              </StepButton>
              <TitleStep currentstep={currentStep} index={idx} px={2}>
                {step.title}
              </TitleStep>
            </Step>
          );
        })}
      </Box>
      <StepHeader>
        <StyledBox>
          <TabTitle>{stepper[currentStep].title}</TabTitle>
          <InfoIcon style={{ cursor: "pointer" }} onClick={() => setOpenDescriptionModal(true)} />
        </StyledBox>
        <ADATransfersButton onClick={() => setOpen(true)}>
          <TranferIcon /> ADA Transfers
        </ADATransfersButton>
      </StepHeader>
      <Box>{stepper[currentStep].description}</Box>
      <Box pb={5} minHeight={400}>
        {stepper[currentStep].component}
      </Box>

      <StyledGroupButton
        display="flex"
        flexDirection={isMobile ? "column" : "row"}
        justifyContent={isMobile ? "center" : "space-between"}
      >
        {currentStep > 0 ? (
          <PreviousButton
            sx={{ mb: `${isMobile ? "16px" : "0px"}` }}
            onClick={() => {
              history.push(details.staking(stakeId, "timeline", stepper[currentStep - 1]?.key));
              setCurrentStep(currentStep - 1);
            }}
          >
            <PreviousIcon />
            <ButtonText>Previous: {stepper[currentStep - 1]?.title}</ButtonText>
          </PreviousButton>
        ) : (
          <Box />
        )}
        <NextButton
          onClick={() => {
            if (currentStep === stepper.length - 1) {
              history.push(details.staking(stakeId, "tabular"));
            } else {
              history.push(details.staking(stakeId, "timeline", stepper[currentStep + 1]?.key));
              setCurrentStep(currentStep + 1);
            }
          }}
          variant="contained"
        >
          <ButtonText fontSize={isMobile ? 14 : 16}>
            Next: {currentStep === stepper.length - 1 ? "View in tabular" : stepper[currentStep + 1]?.title}
          </ButtonText>
          <NextIcon />
        </NextButton>
      </StyledGroupButton>
      <ADATransferModal open={open} handleCloseModal={() => setOpen(false)} />
    </Box>
  );
};

export default DelegatorLifecycle;
