import { Box, useTheme } from "@mui/material";
import React, { useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import { OutlineEye } from "src/commons/resources";
import CustomIcon from "src/components/commons/CustomIcon";
import DrawPath from "src/components/commons/DrawPath";
import { LineArrowItem } from "src/components/commons/LineArrow";
import CompiledCode from "src/components/commons/ViewBlocks/CompiledCode";
import Contract from "src/components/commons/ViewBlocks/Contract";
import OutputVoting from "src/components/commons/ViewBlocks/OutputVoting";
import {
  LongButton,
  MiddleBox,
  VotingBlueBox,
  VotingContainer,
  WhiteSpace
} from "src/components/commons/ViewBlocks/styles";
import { details } from "src/commons/routers";

import VotingOutputModal from "../modals/VotingOutputModal";
import RedeemerModal from "../modals/RedeemerModal";
import DatumModal from "../modals/DatumModal";
import CompiledCodeModal from "../modals/CompiledCodeModal";
import { DataTitle, DataValue } from "../common/styles";

interface VotingViewProps {
  data?: IContractItemTx;
  isMobile?: boolean;
}

const Votingviews: React.FC<VotingViewProps> = ({ data, isMobile }) => {
  const theme = useTheme();
  const leftBoxRef = useRef(null);
  const rightBoxRef = useRef(null);
  const outputBoxRef = useRef(null);
  const [openRedeemer, setOpenRedeemer] = useState(false);
  const [openDatum, setOpenDatum] = useState(false);
  const [openCompiledCode, setOpenCompiledCode] = useState(false);
  const [openVotingOutput, setOpenVotingOutput] = useState(false);
  const { t } = useTranslation();
  const paths = useMemo((): LineArrowItem[] => {
    return [
      {
        start: leftBoxRef,
        end: rightBoxRef,
        startPosition: { 0: ["center", "bottom"], lg: ["right", "middle"] },
        endPosition: { 0: ["center", "top"], lg: ["left", "middle"] },
        arrow: { 0: "top", lg: "left" },
        fold: { sm: "horizontal", lg: "none" },
        startOffset: { 0: [0, 0], lg: [0, 0] },
        endOffset: { 0: [0, -16], lg: [0, 0] }
      },
      {
        start: rightBoxRef,
        end: outputBoxRef,
        startPosition: { 0: ["center", "bottom"], lg: ["right", "middle"] },
        endPosition: { 0: ["center", "top"], lg: ["left", "middle"] },
        arrow: { 0: "top", lg: "left" },
        fold: { sm: "horizontal", lg: "none" },
        startOffset: { 0: [0, 0], lg: [0, 0] },
        endOffset: { 0: [0, -16], lg: [0, 0] }
      }
    ];
  }, []);
  const mobilePaths = useMemo((): LineArrowItem[] => {
    return [
      {
        start: leftBoxRef,
        end: rightBoxRef,
        startPosition: { 0: ["center", "bottom"] },
        endPosition: { 0: ["center", "top"] },
        arrow: { 0: "top" },
        fold: { sm: "horizontal" },
        startOffset: { 0: [0, 0] },
        endOffset: { 0: [0, -16] }
      }
    ];
  }, []);
  const handleClick = () => {
    setOpenVotingOutput(true);
  };
  return (
    <VotingContainer isMobile={+!!isMobile}>
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
      <VotingOutputModal
        data={{
          dRepId: data?.dRepId,
          voterType: data?.voterType as string,
          vote: data?.vote,
          purpose: data?.purpose as string
        }}
        open={openVotingOutput}
        onClose={() => setOpenVotingOutput(false)}
      />
      <DatumModal
        data={[
          { title: t("contract.datumHash"), value: data?.datumHashOut || data?.datumHashIn },
          { title: t("contract.datum"), value: data?.datumBytesOut || data?.datumBytesIn }
        ]}
        open={openDatum}
        onClose={() => setOpenDatum(false)}
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
      <VotingBlueBox ref={leftBoxRef}>
        <WhiteSpace>
          <DataTitle> {`${t("contract.governance")}:`}</DataTitle>
          <DataValue>{t("contract.treasury")}</DataValue>
        </WhiteSpace>
        <LongButton onClick={() => setOpenRedeemer(!openRedeemer)}>
          {t("contract.redeemer")}
          <CustomIcon
            style={{ cursor: "pointer" }}
            icon={OutlineEye}
            width={22}
            fill={theme.isDark ? theme.palette.secondary[100] : theme.palette.common.white}
          />
        </LongButton>
      </VotingBlueBox>
      <MiddleBox ref={rightBoxRef}>
        <Contract hash={data?.scriptHash} detail={details.smartContract} />
        <CompiledCode onClick={() => setOpenCompiledCode(!openCompiledCode)} />
      </MiddleBox>
      <Box ref={outputBoxRef} onClick={() => handleClick()}>
        <OutputVoting />
      </Box>
      <DrawPath
        paths={isMobile ? mobilePaths : paths}
        lineStyle={{ stroke: theme.isDark ? theme.palette.secondary[600] : theme.palette.secondary.light }}
        style={{ zIndex: 0 }}
      />
    </VotingContainer>
  );
};

export default Votingviews;
