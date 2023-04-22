import { Box } from "@mui/material";
import { useParams } from "react-router";
import { useState } from "react";

import { getShortHash } from "../../commons/utils/helper";
import CopyButton from "../../components/commons/CopyButton";
import Tablular from "../../components/StakingLifeCycle/Tablular";
import SPOLifecycleComponent from "../../components/StakingLifeCycle/SPOLifecycle";

import { ButtonGroup, ButtonReport, ButtonSwitch, StakeId, StyledContainer } from "./styles";

import { ReactComponent as ChartMode } from "../../commons/resources/icons/Staking/ChartMode.svg";
import { ReactComponent as TableMode } from "../../commons/resources/icons/Staking/TableMode.svg";

const SPOLifecycle = () => {
  const { stakeId = "" } = useParams<{ stakeId: string }>();
  const [mode, setMode] = useState<"timeline" | "tablular">("timeline");

  return (
    <StyledContainer>
      <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
        <Box>
          <Box component={"h2"} mb={0}>
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
        {mode === "timeline" && <SPOLifecycleComponent setMode={setMode} />}
        {mode === "tablular" && <Tablular />}
      </Box>
    </StyledContainer>
  );
};

export default SPOLifecycle;
