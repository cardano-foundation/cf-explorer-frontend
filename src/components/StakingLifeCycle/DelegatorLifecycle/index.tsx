import { Box, IconButton, alpha, useTheme } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

import { useScreen } from "src/commons/hooks/useScreen";
import {
  DelegationIcon,
  DeredistrationIcon,
  InfoIcon,
  NextIcon,
  PreviousIcon,
  RegistrationIcon,
  RewardsDistributionIcon,
  RewardsWithdrawalIcon,
  TranferIcon
} from "src/commons/resources";
import { details } from "src/commons/routers";
import CustomTooltip from "src/components/commons/CustomTooltip";

import {
  DelegationProcessDescription,
  DeregistrationDelegatorProcessDescription,
  RegistrationDelegatorProcessDescription,
  RewardDistributionProcessDescription,
  WithdrawingFundProcessDescription
} from "../../ModalDescription";
import ADATransferModal from "./ADATransferModal";
import Delegation from "./Delegation";
import Deregistration from "./Deregistration";
import Registration from "./Registration";
import RewardsDistribution from "./RewardsDistribution";
import RewardsWithdrawal from "./Withdraw";
import {
  ADATransfersButton,
  ButtonText,
  NextButton,
  PreviousButton,
  Step,
  StepButton,
  StepHeader,
  StyledBox,
  StyledGroupButton,
  TabTitle,
  TitleStep
} from "./styles";

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
      icon: <RegistrationIcon width={"25px"} height={"25px"} />,
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
      icon: <DelegationIcon width={"25px"} height={"25px"} />,
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
      icon: <RewardsDistributionIcon width={"25px"} height={"25px"} />,
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
      icon: <RewardsWithdrawalIcon width={"25px"} height={"25px"} />,
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
      icon: <DeredistrationIcon width={"25px"} height={"25px"} />,
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

  const getColorInfo = (isActive: boolean, hasData: boolean) => {
    if (isActive) {
      return {
        background: `${palette.primary.main} !important`,
        color: `${palette.secondary[0]} !important`,
        textColor: `${palette.secondary.light} !important`
      };
    }
    if (hasData) {
      return {
        background: `${palette.primary[200]} !important`,
        color: `${palette.secondary.light} !important`,
        textColor: `${palette.secondary.light} !important`
      };
    }
    return {
      background: `${alpha(palette.secondary[600], 0.7)} !important`,
      color: `${palette.primary[100]} !important`,
      textColor: `${alpha(palette.secondary[600], 0.7)} !important`
    };
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
          const colorProps = getColorInfo(currentStep === idx, tabsRenderConfig[step.keyCheckShow]);
          return (
            <Step
              id={`step-${idx}`}
              key={idx}
              component={tabsRenderConfig[step.keyCheckShow] ? "span" : CustomTooltip}
              title={tabsRenderConfig[step.keyCheckShow] ? undefined : "There is no record at this time"}
              onClick={() => handleChangeTab(step, idx)}
              sx={{
                borderColor: colorProps.background
              }}
            >
              <Box>
                <StepButton
                  component={IconButton}
                  active={+(currentStep === idx)}
                  border={({ palette }) => `1px solid ${palette.primary[200]}`}
                  bgcolor={colorProps.background}
                  color={({ palette }) =>
                    tabsRenderConfig[step.keyCheckShow] ? palette.common.white : palette.secondary.light
                  }
                  sx={{
                    "& svg": {
                      fill: colorProps.color
                    }
                  }}
                >
                  {step.icon}
                </StepButton>
                <TitleStep
                  px={2}
                  sx={{
                    color: colorProps.textColor
                  }}
                >
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
