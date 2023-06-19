import { useEffect, useMemo, useState } from "react";
import { Box, IconButton, useTheme } from "@mui/material";
import { useHistory, useParams } from "react-router";

import { useScreen } from "src/commons/hooks/useScreen";
import { ListTabResponseSPO } from "src/pages/SPOLifecycle";
import {
  DeredistrationIcon,
  InfoIcon,
  NextIcon,
  OperatorRewardIcon,
  PoolUpdateIcon,
  PreviousIcon,
  RegistrationIcon
} from "src/commons/resources";
import { details } from "src/commons/routers";
import CustomTooltip from "src/components/commons/CustomTooltip";

import {
  DeregistrationSPOProcessDescription,
  RegistrationSPOProcessDescription,
  SPOInvolvementInDelegationDescription,
  OperatorRewards
} from "../../ModalDescription";
import { ButtonText } from "../DelegatorLifecycle/styles";
import Deregistration from "./Deregistration";
import OperatorReward from "./OperatorRewards";
import Registration from "./Registration";
import PoollUpdates from "./PoolUpdates";
import {
  NextButton,
  PreviousButton,
  Step,
  StepButton,
  StepHeader,
  StyledComponent,
  StyledGroupButton,
  TitleStep,
  WrapTitle
} from "./styles";

interface StepperProps {
  icon: React.ReactNode;
  title: string;
  component: React.ReactNode;
  description: React.ReactNode;
  key: SPOStep;
  keyCheckShow: string;
}

interface Props {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  renderTabsSPO?: ListTabResponseSPO;
}

const SPOLifecycle = ({ currentStep, setCurrentStep, renderTabsSPO }: Props) => {
  const { poolId = "" } = useParams<{ poolId: string }>();
  const [openDescriptionModal, setOpenDescriptionModal] = useState(false);
  const history = useHistory();
  const { isMobile } = useScreen();
  const { palette } = useTheme();
  const [tabsValid, setTabValid] = useState(["isRegistration", "isUpdate", "isReward", "isDeRegistration"]);
  useEffect(() => {
    document.getElementById(`step-${currentStep}`)?.scrollIntoView();
  }, [currentStep]);

  useEffect(() => {
    if (renderTabsSPO) {
      setTabValid((prev) => prev.filter((tab) => renderTabsSPO[tab]));
    }
  }, [JSON.stringify(renderTabsSPO)]);

  if (!renderTabsSPO) return null;

  const stepper: StepperProps[] = [
    {
      icon: (
        <RegistrationIcon width={"25px"} height={"25px"} fill={renderTabsSPO["isRegistration"] ? "#fff" : "#98A2B3"} />
      ),
      title: "Registration",
      component: <Registration />,
      description: (
        <RegistrationSPOProcessDescription
          open={openDescriptionModal}
          handleCloseModal={() => setOpenDescriptionModal(false)}
        />
      ),
      key: "registration",
      keyCheckShow: "isRegistration"
    },
    {
      icon: <PoolUpdateIcon width={"25px"} height={"25px"} fill={renderTabsSPO["isUpdate"] ? "#fff" : "#98A2B3"} />,
      title: "Pool Updates",
      component: <PoollUpdates />,
      description: (
        <SPOInvolvementInDelegationDescription
          open={openDescriptionModal}
          handleCloseModal={() => setOpenDescriptionModal(false)}
        />
      ),
      key: "pool-updates",
      keyCheckShow: "isUpdate"
    },
    {
      icon: <OperatorRewardIcon width={"25px"} height={"25px"} fill={renderTabsSPO["isReward"] ? "#fff" : "#98A2B3"} />,
      title: "Operator Rewards",
      component: <OperatorReward />,
      description: (
        <OperatorRewards open={openDescriptionModal} handleCloseModal={() => setOpenDescriptionModal(false)} />
      ),
      key: "operator-rewards",
      keyCheckShow: "isReward"
    },
    {
      icon: (
        <DeredistrationIcon
          width={"25px"}
          height={"25px"}
          fill={renderTabsSPO["isDeRegistration"] ? "#fff" : "#98A2B3"}
        />
      ),
      title: "Deregistration",
      component: <Deregistration />,
      description: (
        <DeregistrationSPOProcessDescription
          open={openDescriptionModal}
          handleCloseModal={() => setOpenDescriptionModal(false)}
        />
      ),
      key: "deregistration",
      keyCheckShow: "isDeRegistration"
    }
  ];

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const indexTabsValid = useMemo(() => {
    return tabsValid.findIndex((t) => t === stepper[currentStep].keyCheckShow);
  }, [currentStep, tabsValid]);

  const renderBackground = (isActive: boolean, hasData: boolean) => {
    if (isActive) {
      return `${palette.green[600]} !important`;
    }
    if (hasData) {
      return `${palette.grey[700]} !important`;
    }
    return `${palette.grey[200]} !important`;
  };

  if (!renderTabsSPO) return null;

  return (
    <StyledComponent>
      <Box display={"flex"} justifyContent={"space-between"}>
        {stepper.map((step, idx) => (
          <Step
            key={idx}
            id={`step-${idx}`}
            active={+(currentStep === idx)}
            component={renderTabsSPO[step.keyCheckShow] ? "span" : CustomTooltip}
            title={renderTabsSPO[step.keyCheckShow] ? undefined : "There is no record at this time"}
          >
            <Box>
              <StepButton
                component={IconButton}
                active={+(currentStep === idx)}
                onClick={() => {
                  if (renderTabsSPO[step.keyCheckShow] && currentStep !== idx) {
                    history.replace(details.spo(poolId, "timeline", step.key));
                    setCurrentStep(idx);
                  }
                }}
                bgcolor={renderBackground(currentStep === idx, renderTabsSPO[step.keyCheckShow])}
                color={({ palette }) => (renderTabsSPO[step.keyCheckShow] ? palette.common.white : palette.grey[300])}
              >
                {step.icon}
              </StepButton>
              <TitleStep active={+renderTabsSPO[step.keyCheckShow]}>{step.title}</TitleStep>
            </Box>
          </Step>
        ))}
      </Box>
      <StepHeader>
        <WrapTitle>
          {stepper[currentStep]?.title}{" "}
          <InfoIcon style={{ cursor: "pointer" }} onClick={() => setOpenDescriptionModal(true)} />
        </WrapTitle>
      </StepHeader>
      <Box>{stepper[currentStep]?.description}</Box>
      <Box pb={10}>{stepper[currentStep]?.component}</Box>
      <StyledGroupButton display={"flex"} isShowPrev={currentStep > 0}>
        {currentStep > 0 && (
          <PreviousButton
            onClick={() => {
              history.replace(
                details.spo(
                  poolId,
                  "timeline",
                  stepper.find((step) => step.keyCheckShow === tabsValid[+indexTabsValid - 1])?.key
                )
              );
              setCurrentStep(stepper.findIndex((step) => step.keyCheckShow === tabsValid[+indexTabsValid - 1]));
            }}
          >
            <PreviousIcon />
            <Box fontSize={isMobile ? 14 : 16} component={"span"}>
              Previous: {stepper.find((step) => step.keyCheckShow === tabsValid[+indexTabsValid - 1])?.title}
            </Box>
          </PreviousButton>
        )}
        <NextButton
          onClick={() => {
            if (+indexTabsValid === tabsValid.length - 1) {
              history.push(details.spo(poolId, "tabular"));
            } else {
              history.replace(
                details.spo(
                  poolId,
                  "timeline",
                  stepper.find((s) => s.keyCheckShow === tabsValid[+indexTabsValid + 1])?.key
                )
              );
              setCurrentStep(stepper.findIndex((step) => step.keyCheckShow === tabsValid[+indexTabsValid + 1]));
            }
          }}
          variant="contained"
        >
          <ButtonText>
            Next:{" "}
            {+indexTabsValid === tabsValid.length - 1
              ? "View in tabular"
              : stepper.find((step) => step.keyCheckShow === tabsValid[+indexTabsValid + 1])?.title}
          </ButtonText>
          <NextIcon />
        </NextButton>
      </StyledGroupButton>
    </StyledComponent>
  );
};

export default SPOLifecycle;
