import { useTheme } from "@mui/material";
import React, { useMemo, useRef, useState } from "react";

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
}

const Spendviews: React.FC<SpendViewProps> = ({ data }) => {
  const theme = useTheme();
  const leftBoxRef = useRef(null);
  const rightBoxRef = useRef(null);
  const [openRedeemer, setOpenRedeemer] = useState(false);
  const [openDatum, setOpenDatum] = useState(false);
  const [openCompiledCode, setOpenCompiledCode] = useState(false);

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

  return (
    <SpendContainer>
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
      <DatumModal
        data={[
          { title: "Datum Hash", value: data?.datumHashIn },
          { title: "Datum", value: data?.datumBytesIn }
        ]}
        open={openDatum}
        onClose={() => setOpenDatum(false)}
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
      <SpendBlueBox ref={leftBoxRef}>
        <UTXO hash={data?.utxoHash} index={data?.utxoIndex} detail={details.transaction} />
        <SpendRounded>
          <LongButton>
            Redeemer
            <CustomIcon
              style={{ cursor: "pointer" }}
              onClick={() => setOpenRedeemer(!openRedeemer)}
              icon={OutlineEye}
              width={22}
              fill={theme.palette.common.white}
            />
          </LongButton>
          <LongButton>
            Datum
            <CustomIcon
              style={{ cursor: "pointer" }}
              onClick={() => setOpenDatum(!openDatum)}
              icon={OutlineEye}
              width={22}
              fill={theme.palette.common.white}
            />
          </LongButton>
        </SpendRounded>
      </SpendBlueBox>
      <MiddleBox ref={rightBoxRef}>
        <Contract hash={data?.address} detail={details.address} />
        <CompiledCode onClick={() => setOpenCompiledCode(!openCompiledCode)} />
      </MiddleBox>
      <DrawPath paths={paths} lineStyle={{ stroke: theme.palette.secondary.light }} style={{ zIndex: 0 }} />
    </SpendContainer>
  );
};

export default Spendviews;
