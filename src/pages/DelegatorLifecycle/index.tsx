import { useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";

import { getShortWallet } from "../../commons/utils/helper";
import DelegatorLifecycleComponent from "../../components/StakingLifeCycle/DelegatorLifecycle";
import Tabular from "../../components/StakingLifeCycle/DelegatorLifecycle/Tabular";
import CopyButton from "../../components/commons/CopyButton";

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
  Label
} from "./styles";

import { ReactComponent as ChartMode } from "../../commons/resources/icons/Staking/ChartMode.svg";
import { ReactComponent as TableMode } from "../../commons/resources/icons/Staking/TableMode.svg";
import { details } from "../../commons/routers";
import ReportComposerModal from "../../components/StakingLifeCycle/DelegatorLifecycle/ReportComposerModal";
import CustomTooltip from "../../components/commons/CustomTooltip";
import useAuth from "~/commons/hooks/useAuth";
import useFetch from "~/commons/hooks/useFetch";
import { API } from "~/commons/utils/api";
import DelegatorDetailContext from "~/components/StakingLifeCycle/DelegatorLifecycle/DelegatorDetailContext";
import NoRecord from "~/components/commons/NoRecord";
import { useSelector } from "react-redux";

interface Params {
  stakeId: string;
  mode: ViewMode;
  tab: DelegationStep;
}

export interface ListStakeKeyResponse {
  [key: string]: boolean;
  hasDeRegistration: boolean;
  hasDelegation: boolean;
  hasRegistration: boolean;
  hasWithdrawal: boolean;
  hashRewards: boolean;
}

const MODES: ViewMode[] = ["timeline", "tabular"];

const dataTabsConfig = {
  hasDeRegistration: true,
  hasDelegation: true,
  hasRegistration: true,
  hasWithdrawal: true,
  hashRewards: true
};

const DelegatorLifecycle = () => {
  const { stakeId = "", mode = "timeline", tab = "registration" } = useParams<Params>();
  const tabList: { [key in DelegationStep]: number } & { tablular: null } = {
    registration: 0,
    delegation: 1,
    rewards: 2,
    "withdrawal-history": 3,
    deregistration: 4,
    tablular: null
  };

  const validTab: DelegationStep = tabList[tab] >= 0 ? tab : "registration";
  const validMode: ViewMode = MODES.find((item) => item === mode) || "timeline";

  const [currentStep, setCurrentStep] = useState(tabList[validTab]);
  const [open, setOpen] = useState(false);
  const history = useHistory();

  const theme = useTheme();
  const { sidebar } = useSelector(({ user }: RootState) => user);
  const { isLoggedIn } = useAuth();
  const { data, error, initialized } = useFetch<IStakeKeyDetail>(`${API.STAKE.DETAIL}/${stakeId}`, undefined, false);

  useEffect(() => {
    setCurrentStep(tabList[validTab]);
  }, [validTab]);

  useEffect(() => {
    document.title = `Staking Delegation Lifecycle ${stakeId} | Cardano Explorer`;
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
            <LifeCycleTitle>Staking Delegation Lifecycle</LifeCycleTitle>
            <AddressLine>
              <Label>Stake Address:</Label>
              <CustomTooltip title={stakeId}>
                <StakeId to={details.stake(stakeId)}>{getShortWallet(stakeId)}</StakeId>
              </CustomTooltip>
              <CopyButton text={stakeId} />
            </AddressLine>
          </LifeCycleHeader>
          <BoxItemStyled sidebar={+sidebar}>
            <BoxSwitchContainer sidebar={+sidebar}>
              <LabelSwitch>Switch to {validMode === "timeline" ? "tabular" : "timeline"} view</LabelSwitch>
              <SwitchGroup>
                <ButtonSwitch active={+(validMode === "timeline")} onClick={() => changeMode("timeline")}>
                  <ChartMode fill={validMode === "timeline" ? theme.palette.common.white : theme.palette.grey[500]} />
                </ButtonSwitch>
                <ButtonSwitch active={+(validMode === "tabular")} onClick={() => changeMode("tabular")}>
                  <TableMode fill={validMode === "tabular" ? theme.palette.common.white : theme.palette.grey[500]} />
                </ButtonSwitch>
              </SwitchGroup>
            </BoxSwitchContainer>
            {validMode === "tabular" && (
              <ButtonReport disabled={!isLoggedIn} onClick={() => setOpen(true)} sidebar={+sidebar}>
                Compose report
              </ButtonReport>
            )}
          </BoxItemStyled>
        </BoxContainerStyled>
        {dataTabsConfig && (
          <>
            {validMode === "timeline" ? (
              <DelegatorLifecycleComponent
                currentStep={currentStep}
                setCurrentStep={setCurrentStep}
                tabsRenderConfig={dataTabsConfig}
              />
            ) : (
              <Tabular tabsRenderConfig={dataTabsConfig} />
            )}
          </>
        )}

        <ReportComposerModal open={open} handleCloseModal={() => setOpen(false)} />
      </StyledContainer>
    </DelegatorDetailContext.Provider>
  );
};

export default DelegatorLifecycle;
