import { CircularProgress, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { getShortWallet } from "src/commons/utils/helper";
import DelegatorLifecycleComponent from "src/components/StakingLifeCycle/DelegatorLifecycle";
import Tabular from "src/components/StakingLifeCycle/DelegatorLifecycle/Tabular";
import CopyButton from "src/components/commons/CopyButton";
import { details } from "src/commons/routers";
import ReportComposerModal from "src/components/StakingLifeCycle/DelegatorLifecycle/ReportComposerModal";
import CustomTooltip from "src/components/commons/CustomTooltip";
import useAuth from "src/commons/hooks/useAuth";
import useFetch from "src/commons/hooks/useFetch";
import { API } from "src/commons/utils/api";
import DelegatorDetailContext from "src/components/StakingLifeCycle/DelegatorLifecycle/DelegatorDetailContext";
import NoRecord from "src/components/commons/NoRecord";
import { ChartMode, TableMode } from "src/commons/resources";

import {
  BoxContainerStyled,
  BoxItemStyled,
  LabelSwitch,
  BoxSwitchContainer,
  SwitchGroup,
  ButtonReport,
  ButtonSwitch,
  LifeCycleHeader,
  LifeCycleTitle,
  StakeId,
  AddressLine,
  StyledContainer,
  Label,
  ReportButtonContainer
} from "./styles";
import { IReportLimit } from "../SPOLifecycle";

interface Params {
  stakeId: string;
  mode: ViewMode;
  tab: DelegationStep;
}

const MODES: ViewMode[] = ["timeline", "tabular"];

const DelegatorLifecycle = () => {
  const { t } = useTranslation();
  const { stakeId = "", mode = "timeline", tab = "registration" } = useParams<Params>();

  const tabList: { [key in DelegationStep]: number } & { tablular: null } = {
    registration: 0,
    delegation: 1,
    rewards: 2,
    "withdrawal-history": 3,
    deregistration: 4,
    tablular: null
  };

  const tabsValid = {
    registration: "hasRegistration",
    delegation: "hasDelegation",
    rewards: "hashRewards",
    "withdrawal-history": "hasWithdrawal",
    deregistration: "hasDeRegistration"
  };
  let validTab: DelegationStep = tabList[tab] >= 0 ? tab : "registration";
  const validMode: ViewMode = MODES.find((item) => item === mode) || "timeline";

  const [currentStep, setCurrentStep] = useState(tabList[validTab]);
  const [open, setOpen] = useState(false);
  const history = useHistory();

  const theme = useTheme();
  const { sidebar } = useSelector(({ user }: RootState) => user);
  const { isLoggedIn } = useAuth();
  const { data, error, initialized } = useFetch<IStakeKeyDetail>(`${API.STAKE.DETAIL}/${stakeId}`, undefined, false);
  const { data: listTabs, loading: loadingListTabs } = useFetch<ListStakeKeyResponse>(
    API.STAKE_LIFECYCLE.TABS(stakeId)
  );
  const { data: dataReportLimit } = useFetch<IReportLimit>(API.REPORT.REPORT_LIMIT);

  useEffect(() => {
    if (listTabs && listTabs[tabsValid[tab]]) {
      setCurrentStep(tabList[validTab]);
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    validTab = "registration";
    setCurrentStep(tabList["registration"]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listTabs]);

  useEffect(() => {
    document.title = `${t("slc.stakingDelegationLC")} ${stakeId} | ${t("head.page.dashboard")}`;
  }, [stakeId]);

  const changeMode = (mode: ViewMode) => {
    history.push(details.staking(stakeId, mode, validTab));
  };
  if (!initialized && !error) return null;

  if (error || !data) return <NoRecord />;

  return (
    <DelegatorDetailContext.Provider value={data}>
      <StyledContainer>
        <BoxContainerStyled>
          <LifeCycleHeader sidebar={+sidebar}>
            <LifeCycleTitle>{t("slc.stakingDelegationLC")}</LifeCycleTitle>
            <AddressLine>
              <Label>{t("common.stakeAddress")}:</Label>
              <CustomTooltip title={stakeId}>
                <StakeId to={details.stake(stakeId)}>{getShortWallet(stakeId)}</StakeId>
              </CustomTooltip>
              <CopyButton text={stakeId} />
            </AddressLine>
          </LifeCycleHeader>
          <BoxItemStyled sidebar={+sidebar}>
            <BoxSwitchContainer sidebar={+sidebar}>
              <LabelSwitch>
                {validMode === "timeline" ? t("common.switchTablularView") : t("common.switchTimelineView")}
              </LabelSwitch>
              <SwitchGroup>
                <ButtonSwitch active={+(validMode === "timeline")} onClick={() => changeMode("timeline")}>
                  <TableMode
                    fill={validMode === "timeline" ? theme.palette.secondary[0] : theme.palette.secondary.light}
                  />
                </ButtonSwitch>
                <ButtonSwitch active={+(validMode === "tabular")} onClick={() => changeMode("tabular")}>
                  <ChartMode
                    fill={validMode === "tabular" ? theme.palette.secondary[0] : theme.palette.secondary.light}
                  />
                </ButtonSwitch>
              </SwitchGroup>
            </BoxSwitchContainer>
            <CustomTooltip
              title={
                !isLoggedIn
                  ? t("common.pleaseSignIntoUseFeature")
                  : t("message.report.limitGenerate", { time: dataReportLimit?.limitPer24hours || 0 })
              }
            >
              <ReportButtonContainer>
                {!(!isLoggedIn || dataReportLimit?.isLimitReached) && (
                  <ButtonReport
                    disabled={!isLoggedIn || dataReportLimit?.isLimitReached}
                    onClick={() => setOpen(true)}
                    sidebar={+sidebar}
                  >
                    {t("common.composeReport")}
                  </ButtonReport>
                )}
              </ReportButtonContainer>
            </CustomTooltip>
          </BoxItemStyled>
        </BoxContainerStyled>
        {loadingListTabs && <CircularProgress color="success" />}

        {!loadingListTabs && listTabs && (
          <>
            {validMode === "timeline" ? (
              <DelegatorLifecycleComponent
                currentStep={currentStep}
                setCurrentStep={setCurrentStep}
                tabsRenderConfig={listTabs}
              />
            ) : (
              <Tabular tabsRenderConfig={listTabs} />
            )}
          </>
        )}

        <ReportComposerModal open={open} handleCloseModal={() => setOpen(false)} />
      </StyledContainer>
    </DelegatorDetailContext.Provider>
  );
};

export default DelegatorLifecycle;
