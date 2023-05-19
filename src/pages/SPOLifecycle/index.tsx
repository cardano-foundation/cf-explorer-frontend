import { useHistory, useParams } from "react-router";
import { useEffect, useRef, useState } from "react";

import { getShortWallet } from "../../commons/utils/helper";
import CopyButton from "../../components/commons/CopyButton";
import SPOLifecycleComponent from "../../components/StakingLifeCycle/SPOLifecycle";

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
import ReportComposerModal from "../../components/StakingLifeCycle/DelegatorLifecycle/ReportComposerModal";
import Tablular from "../../components/StakingLifeCycle/SPOLifecycle/Tablular";
import CustomTooltip from "../../components/commons/CustomTooltip";
import { useScreen } from "../../commons/hooks/useScreen";
import { details } from "../../commons/routers";
import useAuth from "~/commons/hooks/useAuth";
import { useSelector } from "react-redux";
import { useTheme } from "@emotion/react";

const SPOLifecycle = () => {
  const {
    poolId = "",
    mode = "timeline",
    tab = "registration"
  } = useParams<{ poolId: string; mode: ViewMode; tab: SPOStep }>();

  const tabList = {
    registration: 0,
    "pool-updates": 1,
    "operator-rewards": 2,
    deregistration: 3,
    tablular: null
  };

  const [currentStep, setCurrentStep] = useState(tabList[tab || "registration"] || 0);

  const { isMobile } = useScreen();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    setCurrentStep(tabList[tab || "registration"] || 0);
  }, [tab]);

  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);
  const history = useHistory();
  const theme = useTheme();
  const { sidebar } = useSelector(({ user }: RootState) => user);
  const [containerPosition, setContainerPosition] = useState<{ top?: number; left?: number }>({
    top: undefined,
    left: undefined
  });

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
    history.push(details.spo(poolId, mode, tab));
  };

  return (
    <StyledContainer ref={containerRef}>
      <BoxContainerStyled>
        <LifeCycleHeader sidebar={+sidebar}>
          <LifeCycleTitle>Staking Lifecycle For</LifeCycleTitle>
          <AddressLine>
            <Label>Pool ID:</Label>
            <CustomTooltip title={poolId}>
              <StakeId to={details.delegation(poolId)}>{getShortWallet(poolId)}</StakeId>
            </CustomTooltip>
            <CopyButton text={poolId} />
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
        <SPOLifecycleComponent
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
  );
};

export default SPOLifecycle;
