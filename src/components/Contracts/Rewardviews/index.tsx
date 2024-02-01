import { useTheme, Box } from "@mui/material";
import { useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import DrawPath from "src/components/commons/DrawPath";
import { LineArrowItem } from "src/components/commons/LineArrow";
import CompiledCode from "src/components/commons/ViewBlocks/CompiledCode";
import Contract from "src/components/commons/ViewBlocks/Contract";
import Redeemer from "src/components/commons/ViewBlocks/Redeemer";
import { MiddleBox, RewardContainer, RewardViewContainer } from "src/components/commons/ViewBlocks/styles";
import { details } from "src/commons/routers";
import Outputs from "src/components/commons/ViewBlocks/Outputs";

import RedeemerModal from "../modals/RedeemerModal";
import CompiledCodeModal from "../modals/CompiledCodeModal";

interface RewardviewsProps {
  data?: IContractItemTx;
  isMobile?: boolean;
}

const Rewardviews: React.FC<RewardviewsProps> = ({ data, isMobile }) => {
  const { t } = useTranslation();
  const { trxHash = "" } = useParams<{ trxHash: string }>();
  const theme = useTheme();
  const redeemerRef = useRef(null);
  const middleBoxRef = useRef(null);
  const outputBoxRef = useRef(null);

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
        endOffset: { 0: [0, -16], sm: [0, 0] }
      },
      {
        start: middleBoxRef,
        end: outputBoxRef,
        startPosition: { 0: ["center", "bottom"], sm: ["right", "middle"] },
        endPosition: { 0: ["center", "top"], sm: ["left", "middle"] },
        arrow: { 0: "top", sm: "left" },
        fold: { 0: "none", sm: "none" },
        startOffset: { 0: [0, 0] },
        endOffset: { 0: [0, -10], sm: [-12, 0] }
      }
    ];
  }, []);

  const mobilePaths = useMemo((): LineArrowItem[] => {
    return [
      {
        start: redeemerRef,
        end: middleBoxRef,
        startPosition: { 0: ["center", "bottom"], lg: ["right", "middle"] },
        endPosition: { 0: ["center", "top"], lg: ["left", "middle"] },
        arrow: { 0: "top", lg: "left" },
        fold: { sm: "horizontal", lg: "none" },
        startOffset: { 0: [0, 0], lg: [0, 0] },
        endOffset: { 0: [0, -10], lg: [-16, 0] }
      },
      {
        start: middleBoxRef,
        end: outputBoxRef,
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
          { title: t("contract.purpose"), value: data?.purpose },
          { title: t("contract.data"), value: data?.redeemerBytes },
          { title: t("contract.mem"), value: data?.redeemerMem },
          { title: t("contract.steps"), value: data?.redeemerSteps }
        ]}
        open={openRedeemer}
        onClose={() => setOpenRedeemer(false)}
      />

      <CompiledCodeModal
        data={[
          {
            title: t("contract.compiledCode"),
            value: data?.scriptBytes
          }
        ]}
        open={openCompiledCode}
        onClose={() => setOpenCompiledCode(false)}
      />
      <RewardViewContainer>
        <Redeemer ref={redeemerRef} onClick={() => setOpenRedeemer(!openRedeemer)} />
        <MiddleBox ref={middleBoxRef}>
          <Contract hash={data?.scriptHash} detail={details.smartContract} />
          <CompiledCode onClick={() => setOpenCompiledCode(!openCompiledCode)} />
        </MiddleBox>
        <Box ref={outputBoxRef}>
          <Outputs title="View withdrawal tab" link={details.transaction(trxHash, "withdrawals")} />
        </Box>
      </RewardViewContainer>

      <DrawPath
        paths={isMobile ? mobilePaths : paths}
        lineStyle={{ stroke: theme.isDark ? theme.palette.secondary[700] : theme.palette.secondary.light }}
        style={{ zIndex: 0 }}
      />
    </RewardContainer>
  );
};

export default Rewardviews;
