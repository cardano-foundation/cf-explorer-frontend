import { Box, useTheme } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useHistory, useParams } from "react-router";

import { getShortWallet } from "../../commons/utils/helper";
import DelegatorLifecycleComponent from "../../components/StakingLifeCycle/DelegatorLifecycle";
import Tablular from "../../components/StakingLifeCycle/DelegatorLifecycle/Tablular";
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
import { useScreen } from "../../commons/hooks/useScreen";
import useAuth from "~/commons/hooks/useAuth";
import useFetch from "~/commons/hooks/useFetch";
import { API } from "~/commons/utils/api";
import DelegatorDetailContext from "~/components/StakingLifeCycle/DelegatorLifecycle/DelegatorDetailContext";
import NoRecord from "~/components/commons/NoRecord";
import { useSelector } from "react-redux";

const DelegatorLifecycle = () => {
  const {
    stakeId = "",
    mode = "timeline",
    tab = "registration"
  } = useParams<{ stakeId: string; mode: ViewMode; tab: DelegationStep }>();
  const tabList: { [key in DelegationStep]: number } & { tablular: null } = {
    registration: 0,
    delegation: 1,
    rewards: 2,
    "withdrawal-history": 3,
    deregistration: 4,
    tablular: null
  };
  const [currentStep, setCurrentStep] = useState(tabList[tab || "registration"] || 0);
  const [open, setOpen] = useState(false);
  const history = useHistory();
  const containerRef = useRef(null);
  const [containerPosition, setContainerPosition] = useState<{ top?: number; left?: number }>({
    top: undefined,
    left: undefined
  });
  const theme = useTheme();
  const { sidebar } = useSelector(({ user }: RootState) => user);
  const { isLoggedIn } = useAuth();
  const { data, error, initialized } = useFetch<IStakeKeyDetail>(`${API.STAKE.DETAIL}/${stakeId}`, undefined, false);

  useEffect(() => {
    setCurrentStep(tabList[tab || "registration"] || 0);
  }, [tab]);

  const { isMobile } = useScreen();

  useEffect(() => {
    if (containerRef.current) {
      const position = (containerRef.current as any)?.getBoundingClientRect();
      setContainerPosition({ top: position.top, left: position.left });
    }
  }, [containerRef.current]);

  const handleResize = () => {
    if (containerRef.current) {
      const position = (containerRef.current as any).getBoundingClientRect();
      setContainerPosition({ top: position.top, left: position.left });
    }
  };
  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const changeMode = (mode: ViewMode) => {
    history.push(details.staking(stakeId, mode, tab));
  };
  if (!initialized && !error) return null;
  if (error || !data) return <NoRecord />;

  return (
    <DelegatorDetailContext.Provider value={data}>
      <StyledContainer ref={containerRef}>
        <BoxContainerStyled>
          <LifeCycleHeader sidebar={+sidebar}>
            <LifeCycleTitle>Staking Lifecycle For</LifeCycleTitle>
            <AddressLine>
              <Label>Stake key:</Label>
              <CustomTooltip title={stakeId}>
                <StakeId to={details.stake(stakeId)}>{getShortWallet(stakeId)}</StakeId>
              </CustomTooltip>
              <CopyButton text={stakeId} />
            </AddressLine>
          </LifeCycleHeader>
          <BoxItemStyled sidebar={+sidebar}>
            <BoxSwitchContainer sidebar={+sidebar}>
              <LabelSwitch>Switch to {mode === "timeline" ? "tabular" : "timeline"} view</LabelSwitch>
              <SwitchGroup>
                <ButtonSwitch active={+(mode === "timeline")} onClick={() => changeMode("timeline")}>
                  <ChartMode fill={mode === "timeline" ? theme.palette.common.white : theme.palette.grey[500]} />
                </ButtonSwitch>
                <ButtonSwitch active={+(mode === "tabular")} onClick={() => changeMode("tabular")}>
                  <TableMode fill={mode === "tabular" ? theme.palette.common.white : theme.palette.grey[500]} />
                </ButtonSwitch>
              </SwitchGroup>
            </BoxSwitchContainer>
            {mode === "tabular" && (
              <ButtonReport disabled={!isLoggedIn} onClick={() => setOpen(true)} sidebar={+sidebar}>
                Compose report
              </ButtonReport>
            )}
          </BoxItemStyled>
        </BoxContainerStyled>
        {mode === "timeline" ? (
          <DelegatorLifecycleComponent
            handleResize={handleResize}
            containerPosition={containerPosition}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
          />
        ) : (
          <Tablular />
        )}
        <ReportComposerModal open={open} handleCloseModal={() => setOpen(false)} />
      </StyledContainer>
    </DelegatorDetailContext.Provider>
  );
};

export default DelegatorLifecycle;
