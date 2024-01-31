import { CircularProgress, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import DelegatorLifecycleComponent from "src/components/StakingLifeCycle/DelegatorLifecycle";
import Tabular from "src/components/StakingLifeCycle/DelegatorLifecycle/Tabular";
import { details } from "src/commons/routers";
import ReportComposerModal from "src/components/StakingLifeCycle/DelegatorLifecycle/ReportComposerModal";
import CustomTooltip from "src/components/commons/CustomTooltip";
import useAuth from "src/commons/hooks/useAuth";
import useFetch from "src/commons/hooks/useFetch";
import { API } from "src/commons/utils/api";
import DelegatorDetailContext from "src/components/StakingLifeCycle/DelegatorLifecycle/DelegatorDetailContext";
import NoRecord from "src/components/commons/NoRecord";
import { ChartMode, TableMode } from "src/commons/resources";
import { ROLE_ELEVATED_GEN_REPORT } from "src/commons/utils/constants";
import { TruncateSubTitleContainer } from "src/components/share/styled";
import DynamicEllipsisText from "src/components/DynamicEllipsisText";

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
    if (listTabs && listTabs[tabsValid[tab] as keyof ListStakeKeyResponse]) {
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

  const changeMode = (newMode: ViewMode) => {
    if (mode === newMode) return;
    history.push(details.staking(stakeId, newMode, validTab));
  };
  if (!initialized && !error) return null;

  if (error || !data) return <NoRecord />;

  const checkDisableGenReport = () => {
    if (!isLoggedIn) return true;
    if (dataReportLimit?.limitPer24hours === ROLE_ELEVATED_GEN_REPORT) return false;
    return dataReportLimit?.isLimitReached;
  };

  const getTooltip = () => {
    if (!isLoggedIn) return t("common.pleaseSignIntoUseFeature");
    if (dataReportLimit?.limitPer24hours === ROLE_ELEVATED_GEN_REPORT) return "";
    return t("message.report.limitGenerate", { time: dataReportLimit?.limitPer24hours || 0 });
  };
  const distributeTotal = listTabs as unknown as DistributionTotal;

  return (
    <DelegatorDetailContext.Provider
      value={{
        ...data,
        totalDelegatorRewards: distributeTotal?.totalDelegatorRewards || 0,
        totalOperatorRewards: distributeTotal?.totalOperatorRewards || 0
      }}
    >
      <StyledContainer>
        <BoxContainerStyled>
          <LifeCycleHeader sidebar={+sidebar}>
            <LifeCycleTitle>{t("slc.stakingDelegationLC")}</LifeCycleTitle>
            <AddressLine>
              <Label>{t("common.stakeAddress")}:</Label>
              <StakeId to={details.stake(stakeId)}>
                <TruncateSubTitleContainer>
                  <DynamicEllipsisText value={stakeId} isCopy isTooltip />
                </TruncateSubTitleContainer>
              </StakeId>
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
                    data-testid="chartmode"
                    fill={validMode === "tabular" ? theme.palette.secondary[0] : theme.palette.secondary.light}
                  />
                </ButtonSwitch>
              </SwitchGroup>
            </BoxSwitchContainer>
            <CustomTooltip title={getTooltip()}>
              <ReportButtonContainer>
                <ButtonReport disabled={checkDisableGenReport()} onClick={() => setOpen(true)} sidebar={+sidebar}>
                  {t("common.composeReport")}
                </ButtonReport>
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
