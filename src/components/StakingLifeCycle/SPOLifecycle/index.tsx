import { useState } from "react";
import { Box } from "@mui/material";

import { NextButton, PreviousButton, Step, StepButton, TitleStep, WrapTitle } from "./styles";

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
import PoolUpdates from "./PoolUpdates";
import { ADATransfersButton, ButtonText } from "../DelegatorLifecycle/styles";
import OperatorReward from "./OperatorRewards";
import Deregistration from "./Deregistration";
import {
  RegistrationProcessDescription,
  SPOInvolvementInDelegationDescription,
  WithdrawingFundProcessDescription,
  DeregistrationProcessDescription,
} from "../../ModalDescription";
import { details } from "../../../commons/routers";
import { useHistory, useParams } from "react-router";
import { useScreen } from "../../../commons/hooks/useScreen";
interface StepperProps {
  icon: React.ReactNode;
  title: string;
  component: React.ReactNode;
  description: React.ReactNode;
  key: "registration" | "pool-updates" | "operator-rewards" | "deregistration";
}

const SPOLifecycle = ({
  setMode,
  containerPosition,
  currentStep,
  setCurrentStep,
  handleResize,
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
  const { poolId = "" } = useParams<{
    poolId: string;
  }>();
  const [openDescriptionModal, setOpenDescriptionModal] = useState(false);
  const history = useHistory();
  const { isMobile } = useScreen();
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
      icon: <PoolUpdateIcon width={"25px"} height={"25px"} fill={currentStep >= 1 ? "#fff" : "#98A2B3"} />,
      title: "Pool Updates",
      component: <PoolUpdates handleResize={handleResize} containerPosition={containerPosition} />,
      description: (
        <SPOInvolvementInDelegationDescription
          open={openDescriptionModal}
          handleCloseModal={() => setOpenDescriptionModal(false)}
        />
      ),
      key: "pool-updates",
    },
    {
      icon: <OperatorRewardIcon width={"25px"} height={"25px"} fill={currentStep >= 2 ? "#fff" : "#98A2B3"} />,
      title: "Operator Rewards",
      component: <OperatorReward handleResize={handleResize} containerPosition={containerPosition} />,
      description: (
        <WithdrawingFundProcessDescription
          open={openDescriptionModal}
          handleCloseModal={() => setOpenDescriptionModal(false)}
        />
      ),
      key: "operator-rewards",
    },
    {
      icon: <RewardsWithdrawalIcon width={"25px"} height={"25px"} fill={currentStep >= 3 ? "#fff" : "#98A2B3"} />,
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
    <Box mr={isMobile ? 2 : 0}>
      <Box display={"flex"} justifyContent={"space-between"}>
        {stepper.map((step, idx) => (
          <Step component={"span"} key={idx} active={+(currentStep >= idx)}>
            <StepButton
              active={+(currentStep >= idx)}
              onClick={() => {
                history.push(details.spo(poolId, step.key));
                setCurrentStep(idx);
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
        <WrapTitle>
          {stepper[currentStep]?.title}{" "}
          <InfoIcon style={{ cursor: "pointer" }} onClick={() => setOpenDescriptionModal(true)} />
        </WrapTitle>
      </Box>
      <Box>{stepper[currentStep]?.description}</Box>
      <Box minHeight={400} pb={10}>
        {stepper[currentStep]?.component}
      </Box>
      <Box
        display="flex"
        flexDirection={isMobile ? "column" : "row"}
        justifyContent={isMobile ? "center" : "space-between"}
      >
        {currentStep > 0 && (
          <PreviousButton
            sx={{ mb: `${isMobile ? "16px" : "0px"}` }}
            onClick={() => {
              history.push(details.spo(poolId, stepper[currentStep - 1]?.key));
              setCurrentStep(currentStep - 1);
            }}
          >
            <PreviousIcon />
            <Box fontSize={isMobile ? 14 : 16} component={"span"}>
              Previous: {stepper[currentStep - 1]?.title}
            </Box>
          </PreviousButton>
        )}
        <NextButton
          onClick={() => {
            if (currentStep === stepper.length - 1) {
              history.push(details.spo(poolId, "tablular"));
              setMode("tablular");
            } else {
              history.push(details.spo(poolId, stepper[currentStep + 1]?.key));
              setCurrentStep(currentStep + 1);
            }
          }}
          variant="contained"
        >
          <ButtonText fontSize={isMobile ? 14 : 16}>
            Next Step: {currentStep === stepper.length - 1 ? "View in tabular" : stepper[currentStep + 1]?.title}
          </ButtonText>
          <NextIcon />
        </NextButton>
      </Box>
    </Box>
  );
};

export default SPOLifecycle;
