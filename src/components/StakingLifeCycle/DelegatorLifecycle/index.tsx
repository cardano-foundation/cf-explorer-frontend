import { useEffect, useMemo, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Box, IconButton, useTheme } from "@mui/material";

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
} from "src/commons/resources";
import { details } from "src/commons/routers";
import { useScreen } from "src/commons/hooks/useScreen";
import CustomTooltip from "src/components/commons/CustomTooltip";

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
  tabsRenderConfig: ListStakeKeyResponse | null;
}

const DelegatorLifecycle = ({ currentStep, setCurrentStep, tabsRenderConfig }: Props) => {
  const history = useHistory();
  const { isMobile } = useScreen();
  const { palette } = useTheme();
  const { stakeId = "" } = useParams<{
    stakeId: string;
  }>();
  const [open, setOpen] = useState(false);
  const [openDescriptionModal, setOpenDescriptionModal] = useState(false);
  const [tabsValid, setTabValid] = useState([
    "hasRegistration",
    "hasDelegation",
    "hashRewards",
    "hasWithdrawal",
    "hasDeRegistration"
  ]);

  useEffect(() => {
    const element = document.getElementById(`step-${currentStep}`);
    if (element && typeof element.scrollIntoView === "function") {
      element.scrollIntoView(true);
    }
  }, [currentStep]);

  useEffect(() => {
    if (tabsRenderConfig) {
      setTabValid((prev) => prev.filter((tab) => tabsRenderConfig[tab]));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(tabsRenderConfig)]);

  if (!tabsRenderConfig) return null;

  const stepper: StepperProps[] = [
    {
      icon: (
        <RegistrationIcon
          width={"25px"}
          height={"25px"}
          fill={tabsRenderConfig["hasRegistration"] ? "#fff" : "#98A2B3"}
        />
      ),
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
      icon: (
        <DelegationIcon width={"25px"} height={"25px"} fill={tabsRenderConfig["hasDelegation"] ? "#fff" : "#98A2B3"} />
      ),
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
      icon: (
        <RewardsDistributionIcon
          width={"25px"}
          height={"25px"}
          fill={tabsRenderConfig["hashRewards"] ? "#fff" : "#98A2B3"}
        />
      ),
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
      icon: (
        <RewardsWithdrawalIcon
          width={"25px"}
          height={"25px"}
          fill={tabsRenderConfig["hasWithdrawal"] ? "#fff" : "#98A2B3"}
        />
      ),
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
      icon: (
        <DeredistrationIcon
          width={"25px"}
          height={"25px"}
          fill={tabsRenderConfig["hasDeRegistration"] ? "#fff" : "#98A2B3"}
        />
      ),
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

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const indexTabsValid = useMemo(() => {
    return tabsValid.findIndex((t) => t === stepper[currentStep].keyCheckShow);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const handleChangeTab = (step: StepperProps, idx: number) => {
    if (tabsRenderConfig[step.keyCheckShow] && currentStep !== idx) {
      setCurrentStep(idx);
      history.replace(details.staking(stakeId, "timeline", step.key));
    }
  };
  return (
    <Box>
      <Box display={"flex"} justifyContent={"space-between"} sx={{ overflowX: "auto" }}>
        {stepper.map((step, idx) => {
          return (
            <Step
              id={`step-${idx}`}
              key={idx}
              component={tabsRenderConfig[step.keyCheckShow] ? "span" : CustomTooltip}
              active={+(currentStep === idx)}
              title={tabsRenderConfig[step.keyCheckShow] ? undefined : "There is no record at this time"}
              onClick={() => handleChangeTab(step, idx)}
            >
              <Box>
                <StepButton
                  component={IconButton}
                  active={+(currentStep === idx)}
                  bgcolor={renderBackground(currentStep === idx, tabsRenderConfig[step.keyCheckShow])}
                  color={({ palette }) =>
                    tabsRenderConfig[step.keyCheckShow] ? palette.common.white : palette.grey[300]
                  }
                >
                  {step.icon}
                </StepButton>
                <TitleStep active={+tabsRenderConfig[step.keyCheckShow]} px={2}>
                  {step.title}
                </TitleStep>
              </Box>
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
      <Box pb={5}>{stepper[currentStep].component}</Box>

      <StyledGroupButton
        display="flex"
        flexDirection={isMobile ? "column" : "row"}
        justifyContent={isMobile ? "center" : "space-between"}
      >
        {currentStep > 0 ? (
          <PreviousButton
            sx={{ mb: `${isMobile ? "16px" : "0px"}` }}
            onClick={() => {
              history.push(
                details.staking(
                  stakeId,
                  "timeline",
                  stepper.find((step) => step.keyCheckShow === tabsValid[+indexTabsValid - 1])?.key
                )
              );
              setCurrentStep(stepper.findIndex((step) => step.keyCheckShow === tabsValid[+indexTabsValid - 1]));
            }}
          >
            <PreviousIcon />
            <ButtonText>
              Previous: {stepper.find((step) => step.keyCheckShow === tabsValid[+indexTabsValid - 1])?.title}
            </ButtonText>
          </PreviousButton>
        ) : (
          <Box />
        )}
        <NextButton
          onClick={() => {
            if (+indexTabsValid === tabsValid.length - 1) {
              history.push(details.staking(stakeId, "tabular"));
            } else {
              history.push(
                details.staking(
                  stakeId,
                  "timeline",
                  stepper.find((step) => step.keyCheckShow === tabsValid[+indexTabsValid + 1])?.key
                )
              );
              setCurrentStep(stepper.findIndex((step) => step.keyCheckShow === tabsValid[+indexTabsValid + 1]));
            }
          }}
          variant="contained"
        >
          <ButtonText fontSize={isMobile ? 14 : 16}>
            Next:{" "}
            {+indexTabsValid === tabsValid.length - 1
              ? "View in tabular"
              : stepper.find((step) => step.keyCheckShow === tabsValid[+indexTabsValid + 1])?.title}
          </ButtonText>
          <NextIcon />
        </NextButton>
      </StyledGroupButton>
      <ADATransferModal open={open} handleCloseModal={() => setOpen(false)} />
    </Box>
  );
};

export default DelegatorLifecycle;
