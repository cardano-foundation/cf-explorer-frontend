import { useTheme } from "@mui/material";
import { useMemo, useRef, useState } from "react";

import DrawPath from "src/components/commons/DrawPath";
import { LineArrowItem } from "src/components/commons/LineArrow";
import CompiledCode from "src/components/commons/ViewBlocks/CompiledCode";
import Contract from "src/components/commons/ViewBlocks/Contract";
import Redeemer from "src/components/commons/ViewBlocks/Redeemer";
import { Center, MiddleBox, RewardContainer } from "src/components/commons/ViewBlocks/styles";
import { details } from "src/commons/routers";

import RedeemerModal from "../modals/RedeemerModal";
import CompiledCodeModal from "../modals/CompiledCodeModal";

interface RewardviewsProps {
  data?: IContractItemTx;
  isMobile?: boolean;
}

const Rewardviews: React.FC<RewardviewsProps> = ({ data, isMobile }) => {
  const theme = useTheme();
  const redeemerRef = useRef(null);
  const middleBoxRef = useRef(null);
  const [openRedeemer, setOpenRedeemer] = useState(false);
  const [openCompiledCode, setOpenCompiledCode] = useState(false);

  const paths = useMemo((): LineArrowItem[] => {
    return [
      {
        start: redeemerRef,
        end: middleBoxRef,
        startPosition: { 0: ["center", "bottom"], sm: ["right", "middle"] },
        endPosition: { 0: ["center", "top"], sm: ["left", "middle"] },
        arrow: { 0: "top", sm: "left" },
        fold: { sm: "horizontal", lg: "none" },
        startOffset: { 0: [0, 0], sm: [0, 0] },
        endOffset: { 0: [0, -10], sm: [-16, 0] }
      }
    ];
  }, []);

  const mobilePaths = useMemo((): LineArrowItem[] => {
    return [
      {
        start: redeemerRef,
        end: middleBoxRef,
        startPosition: { 0: ["center", "bottom"], sm: ["right", "middle"] },
        endPosition: { 0: ["center", "top"], sm: ["left", "middle"] },
        arrow: { 0: "top", sm: "left" },
        fold: { sm: "horizontal", lg: "none" },
        startOffset: { 0: [0, 0], sm: [0, 0] },
        endOffset: { 0: [0, -10], sm: [-16, 0] }
      }
    ];
  }, []);
  return (
    <RewardContainer>
      <RedeemerModal
        data={[
          { title: "Purpose", value: data?.purpose },
          { title: "Data", value: data?.redeemerBytes },
          { title: "Mem", value: data?.redeemerMem },
          { title: "Steps", value: data?.redeemerSteps }
        ]}
        open={openRedeemer}
        onClose={() => setOpenRedeemer(false)}
      />

      <CompiledCodeModal
        data={[
          {
            title: "Compiled Code",
            value: data?.scriptBytes
          }
        ]}
        open={openCompiledCode}
        onClose={() => setOpenCompiledCode(false)}
      />
      <Center>
        <Redeemer ref={redeemerRef} onClick={() => setOpenRedeemer(!openRedeemer)} />
        <MiddleBox ref={middleBoxRef}>
          <Contract hash={data?.stakeAddress} detail={details.stake} />
          <CompiledCode onClick={() => setOpenCompiledCode(!openCompiledCode)} />
        </MiddleBox>
      </Center>
      <DrawPath
        paths={isMobile ? paths : mobilePaths}
        lineStyle={{ stroke: theme.isDark ? theme.palette.secondary[700] : theme.palette.secondary.light }}
        style={{ zIndex: 0 }}
      />
    </RewardContainer>
  );
};

export default Rewardviews;
