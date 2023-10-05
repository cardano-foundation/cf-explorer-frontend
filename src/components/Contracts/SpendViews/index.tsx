import { useTheme } from "@mui/material";
import React, { useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import { OutlineEye } from "src/commons/resources";
import CustomIcon from "src/components/commons/CustomIcon";
import DrawPath from "src/components/commons/DrawPath";
import { LineArrowItem } from "src/components/commons/LineArrow";
import CompiledCode from "src/components/commons/ViewBlocks/CompiledCode";
import Contract from "src/components/commons/ViewBlocks/Contract";
import UTXO from "src/components/commons/ViewBlocks/UTXO";
import {
  LongButton,
  MiddleBox,
  SpendBlueBox,
  SpendContainer,
  SpendRounded
} from "src/components/commons/ViewBlocks/styles";
import { details } from "src/commons/routers";

import RedeemerModal from "../modals/RedeemerModal";
import DatumModal from "../modals/DatumModal";
import CompiledCodeModal from "../modals/CompiledCodeModal";

interface SpendViewProps {
  data?: IContractItemTx;
  isMobile?: boolean;
}

const Spendviews: React.FC<SpendViewProps> = ({ data, isMobile }) => {
  const theme = useTheme();
  const leftBoxRef = useRef(null);
  const rightBoxRef = useRef(null);
  const [openRedeemer, setOpenRedeemer] = useState(false);
  const [openDatum, setOpenDatum] = useState(false);
  const [openCompiledCode, setOpenCompiledCode] = useState(false);
  const { t } = useTranslation();
  const paths = useMemo((): LineArrowItem[] => {
    return [
      {
        start: leftBoxRef,
        end: rightBoxRef,
        startPosition: { 0: ["center", "bottom"], sm: ["right", "middle"] },
        endPosition: { 0: ["center", "top"], sm: ["left", "middle"] },
        arrow: { 0: "top", sm: "left" },
        fold: { sm: "horizontal", lg: "none" },
        startOffset: { 0: [0, 0], sm: [0, 0] },
        endOffset: { 0: [0, -16], sm: [0, 0] }
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
  return (
    <SpendContainer isMobile={+!!isMobile}>
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
      <SpendBlueBox ref={leftBoxRef}>
        <UTXO hash={data?.utxoHash} index={data?.utxoIndex} detail={details.transaction} />
        <SpendRounded>
          <LongButton>
            {t("contract.redeemer")}
            <CustomIcon
              style={{ cursor: "pointer" }}
              onClick={() => setOpenRedeemer(!openRedeemer)}
              icon={OutlineEye}
              width={22}
              fill={theme.isDark ? theme.palette.secondary[100] : theme.palette.common.white}
            />
          </LongButton>
          <LongButton>
            Datum
            <CustomIcon
              style={{ cursor: "pointer" }}
              onClick={() => setOpenDatum(!openDatum)}
              icon={OutlineEye}
              width={22}
              fill={theme.isDark ? theme.palette.secondary[100] : theme.palette.common.white}
            />
          </LongButton>
        </SpendRounded>
      </SpendBlueBox>
      <MiddleBox ref={rightBoxRef}>
        <Contract hash={data?.address} detail={details.address} />
        <CompiledCode onClick={() => setOpenCompiledCode(!openCompiledCode)} />
      </MiddleBox>
      <DrawPath
        paths={isMobile ? mobilePaths : paths}
        lineStyle={{ stroke: theme.isDark ? theme.palette.secondary[600] : theme.palette.secondary.light }}
        style={{ zIndex: 0 }}
      />
    </SpendContainer>
  );
};

export default Spendviews;
