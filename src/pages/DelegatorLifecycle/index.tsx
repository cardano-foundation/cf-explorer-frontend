import { Box } from "@mui/material";
import { useParams } from "react-router";
import { useEffect, useRef, useState } from "react";

import { getShortHash } from "../../commons/utils/helper";
import CopyButton from "../../components/commons/CopyButton";
import Tablular from "../../components/StakingLifeCycle/Tablular";
import DelegatorLifecycleComponent from "../../components/StakingLifeCycle/DelegatorLifecycle";

import { ButtonGroup, ButtonReport, ButtonSwitch, StakeId, StyledContainer } from "./styles";

import { ReactComponent as ChartMode } from "../../commons/resources/icons/Staking/ChartMode.svg";
import { ReactComponent as TableMode } from "../../commons/resources/icons/Staking/TableMode.svg";

const DelegatorLifecycle = () => {
  const { stakeId = "" } = useParams<{ stakeId: string }>();
  const [mode, setMode] = useState<"timeline" | "tablular">("timeline");
  const containerRef = useRef(null);
  const [containerPosition, setContainerPosition] = useState<{ top?: number; left?: number }>({
    top: undefined,
    left: undefined,
  });

  useEffect(() => {
    if (containerRef.current) {
      const position = (containerRef.current as any)?.getBoundingClientRect();
      setContainerPosition({ top: position.top, left: position.left });
    }
  }, [containerRef.current]);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const position = (containerRef.current as any).getBoundingClientRect();
        setContainerPosition({ top: position.top, left: position.left });
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <StyledContainer ref={containerRef}>
      <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
        <Box>
          <Box component={"h2"} mb={0} mt={0}>
            Staking Lifecycle For
          </Box>
          <Box display={"flex"} alignItems={"center"}>
            <Box component={"span"}>Stake key:</Box>
            <StakeId>{getShortHash(stakeId)}</StakeId>
            <CopyButton text={stakeId} />
          </Box>
        </Box>
        <Box display={"flex"} alignItems={"center"}>
          <Box color={({ palette }) => palette.grey[400]}>
            Switch to {mode === "timeline" ? "tablular" : "timeline"} view
          </Box>
          <ButtonGroup>
            <ButtonSwitch active={mode === "timeline"} onClick={() => setMode("timeline")}>
              <ChartMode fill={mode === "timeline" ? "#fff" : "#344054"} />
            </ButtonSwitch>
            <ButtonSwitch active={mode === "tablular"} onClick={() => setMode("tablular")}>
              <TableMode fill={mode === "tablular" ? "#fff" : "#344054"} />
            </ButtonSwitch>
          </ButtonGroup>
          {mode === "tablular" && <ButtonReport>Compose report</ButtonReport>}
        </Box>
      </Box>

      <Box>
        {mode === "timeline" && <DelegatorLifecycleComponent containerPosition={containerPosition} setMode={setMode} />}
        {mode === "tablular" && <Tablular />}
      </Box>
    </StyledContainer>
  );
};

export default DelegatorLifecycle;
