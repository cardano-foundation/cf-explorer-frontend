import { Box, IconButton, alpha, useTheme } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useHistory, useParams } from "react-router";
import { useTranslation } from "react-i18next";

import { useScreen } from "src/commons/hooks/useScreen";
import {
  DeredistrationIcon,
  NextIcon,
  OperatorRewardIcon,
  PoolUpdateIcon,
  PreviousIcon,
  RegistrationIcon
} from "src/commons/resources";
import { details } from "src/commons/routers";
import CustomTooltip from "src/components/commons/CustomTooltip";
import InfoSolidIcon from "src/components/commons/InfoSolidIcon";

import {
  DeregistrationSPOProcessDescription,
  OperatorRewards,
  RegistrationSPOProcessDescription,
  SPOInvolvementInDelegationDescription
} from "../../ModalDescription";
import { ButtonText } from "../DelegatorLifecycle/styles";
import Deregistration from "./Deregistration";
import OperatorReward from "./OperatorRewards";
import PoollUpdates from "./PoolUpdates";
import Registration from "./Registration";
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
  const { t } = useTranslation();
  const { poolId = "" } = useParams<{ poolId: string }>();
  const [openDescriptionModal, setOpenDescriptionModal] = useState(false);
  const history = useHistory();
  const { isMobile } = useScreen();
  const { palette } = useTheme();
  const [tabsValid, setTabValid] = useState(["isRegistration", "isUpdate", "isReward", "isDeRegistration"]);
  useEffect(() => {
    const element = document.getElementById(`step-${currentStep}`);
    if (element && typeof element.scrollIntoView === "function") {
      element.scrollIntoView(true);
    }
  }, [currentStep]);

  useEffect(() => {
    if (renderTabsSPO) {
      setTabValid((prev) => prev.filter((tab) => renderTabsSPO[tab]));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(renderTabsSPO)]);

  if (!renderTabsSPO) return null;

  const stepper: StepperProps[] = [
    {
      icon: <RegistrationIcon width={"25px"} height={"25px"} />,
      title: t("common.registration"),
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
      icon: <PoolUpdateIcon width={"25px"} height={"25px"} />,
      title: t("slc.poolUpdates"),
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
      icon: <OperatorRewardIcon width={"25px"} height={"25px"} />,
      title: t("common.operatorRewards"),
      component: <OperatorReward />,
      description: (
        <OperatorRewards open={openDescriptionModal} handleCloseModal={() => setOpenDescriptionModal(false)} />
      ),
      key: "operator-rewards",
      keyCheckShow: "isReward"
    },
    {
      icon: <DeredistrationIcon width={"25px"} height={"25px"} />,
      title: t("slc.deregistration"),
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
    if (renderTabsSPO[step.keyCheckShow] && currentStep !== idx) {
      history.replace(details.spo(poolId, "timeline", step.key));
      setCurrentStep(idx);
    }
  };

  return (
    <StyledComponent>
      <Box display={"flex"} justifyContent={"space-between"}>
        {stepper.map((step, idx) => {
          const colorProps = getColorInfo(currentStep === idx, renderTabsSPO[step.keyCheckShow]);
          return (
            <Step
              id={`step-${idx}`}
              key={idx}
              component={renderTabsSPO[step.keyCheckShow] ? "span" : CustomTooltip}
              title={renderTabsSPO[step.keyCheckShow] ? undefined : t("common.noRecordAtTime")}
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
                    renderTabsSPO[step.keyCheckShow] ? palette.common.white : palette.secondary.light
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
        <WrapTitle alignItems={"center"} display={"flex"} gap={1}>
          {stepper[currentStep]?.title} <InfoSolidIcon onClick={() => setOpenDescriptionModal(true)} />
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
              {t("common.Previous")}:{" "}
              {stepper.find((step) => step.keyCheckShow === tabsValid[+indexTabsValid - 1])?.title}
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
            {t("common.next")}:{" "}
            {+indexTabsValid === tabsValid.length - 1
              ? t("common.viewTabular")
              : stepper.find((step) => step.keyCheckShow === tabsValid[+indexTabsValid + 1])?.title}
          </ButtonText>
          <NextIcon />
        </NextButton>
      </StyledGroupButton>
    </StyledComponent>
  );
};

export default SPOLifecycle;
