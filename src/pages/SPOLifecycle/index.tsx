import { useHistory, useParams } from "react-router";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { CircularProgress, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";

import SPOLifecycleComponent from "src/components/StakingLifeCycle/SPOLifecycle";
import ReportComposerModal from "src/components/StakingLifeCycle/DelegatorLifecycle/ReportComposerModal";
import Tabular from "src/components/StakingLifeCycle/SPOLifecycle/Tablular";
import CustomTooltip from "src/components/commons/CustomTooltip";
import { details } from "src/commons/routers";
import useAuth from "src/commons/hooks/useAuth";
import { API } from "src/commons/utils/api";
import useFetch from "src/commons/hooks/useFetch";
import PoolDetailContext from "src/components/StakingLifeCycle/SPOLifecycle/PoolDetailContext";
import NoRecord from "src/components/commons/NoRecord";
import { ChartMode, TableMode } from "src/commons/resources";
import { ROLE_ELEVATED_GEN_REPORT } from "src/commons/utils/constants";
import DynamicEllipsisText from "src/components/DynamicEllipsisText";
import { TruncateSubTitleContainer } from "src/components/share/styled";

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

interface Params {
  poolId: string;
  mode: ViewMode;
  tab: SPOStep;
}

export interface IReportLimit {
  isLimitReached: boolean;
  limitPer24hours: number;
}

const MODES: ViewMode[] = ["timeline", "tabular"];

const SPOLifecycle = () => {
  const { t } = useTranslation();
  const { poolId = "", mode = "timeline", tab = "registration" } = useParams<Params>();
  const { data: dataReportLimit } = useFetch<IReportLimit>(API.REPORT.REPORT_LIMIT);

  useEffect(() => {
    document.title = `Staking Delegation Lifecycle ${poolId} | Cardano Blockchain Explorer`;
  }, [poolId]);

  const tabList = {
    registration: 0,
    "pool-updates": 1,
    "operator-rewards": 2,
    deregistration: 3,
    tablular: null
  };

  const tabsValid = {
    registration: "isRegistration",
    "pool-updates": "isUpdate",
    "operator-rewards": "isReward",
    deregistration: "isDeRegistration"
  };

  const { data, error, initialized } = useFetch<PoolInfo>(poolId ? API.SPO_LIFECYCLE.POOL_INFO(poolId) : "");
  const { data: renderTabsSPO, loading: loadingListTabs } = useFetch<ListTabResponseSPO>(
    API.SPO_LIFECYCLE.TABS(poolId)
  );
  let validTab: SPOStep = tabList[tab] >= 0 ? tab : "registration";
  const validMode: ViewMode = MODES.find((item) => item === mode) || "timeline";

  const [currentStep, setCurrentStep] = useState(tabList[validTab]);

  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (renderTabsSPO && renderTabsSPO[tabsValid[tab]]) {
      setCurrentStep(tabList[validTab]);
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    validTab = "registration";
    setCurrentStep(tabList["registration"]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [renderTabsSPO]);

  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);
  const history = useHistory();
  const theme = useTheme();
  const { sidebar } = useSelector(({ user }: RootState) => user);

  const changeMode = (newMode: ViewMode) => {
    if (mode === newMode) return;
    history.push(details.spo(poolId, newMode, validTab));
  };

  if (!initialized && !error) return null;
  if (error || !data || !data.poolId) return <NoRecord />;

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

  return (
    <PoolDetailContext.Provider value={data}>
      <StyledContainer ref={containerRef}>
        <BoxContainerStyled>
          <LifeCycleHeader sidebar={+sidebar}>
            <LifeCycleTitle>{t("common.slcFor")}</LifeCycleTitle>
            <AddressLine>
              <Label>{t("common.poolID")}:</Label>
              <CustomTooltip title={data.poolView}>
                <StakeId to={details.delegation(data.poolView)}>
                  <TruncateSubTitleContainer>
                    <DynamicEllipsisText value={data.poolView} isCopy={true} />
                  </TruncateSubTitleContainer>
                </StakeId>
              </CustomTooltip>
            </AddressLine>
          </LifeCycleHeader>
          <BoxItemStyled sidebar={+sidebar}>
            <BoxSwitchContainer sidebar={+sidebar}>
              <LabelSwitch>
                {validMode === "timeline" ? t("common.switchTablularView") : t("slc.switchTimelineView")}
              </LabelSwitch>
              <SwitchGroup>
                <ButtonSwitch active={+(validMode === "timeline")} onClick={() => changeMode("timeline")}>
                  <TableMode
                    fill={validMode === "timeline" ? theme.palette.common.white : theme.palette.secondary.light}
                  />
                </ButtonSwitch>
                <ButtonSwitch active={+(validMode === "tabular")} onClick={() => changeMode("tabular")}>
                  <ChartMode
                    fill={validMode === "tabular" ? theme.palette.common.white : theme.palette.secondary.light}
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
        {renderTabsSPO && !loadingListTabs && (
          <>
            {validMode === "timeline" ? (
              <SPOLifecycleComponent
                currentStep={currentStep}
                setCurrentStep={setCurrentStep}
                renderTabsSPO={renderTabsSPO}
              />
            ) : (
              <Tabular renderTabsSPO={renderTabsSPO} />
            )}
          </>
        )}

        <ReportComposerModal open={open} handleCloseModal={() => setOpen(false)} />
      </StyledContainer>
    </PoolDetailContext.Provider>
  );
};

export default SPOLifecycle;
