import { useMemo, useRef, useState } from "react";
import { useTheme } from "@mui/material";

import DrawPath from "src/components/commons/DrawPath";
import { LineArrowItem } from "src/components/commons/LineArrow";
import {
  Rrounded,
  MiddleBox,
  MintContainer,
  RightBox,
  MintBlueBox,
  MintRrounded
} from "src/components/commons/ViewBlocks/styles";
import Redeemer from "src/components/commons/ViewBlocks/Redeemer";
import Contract from "src/components/commons/ViewBlocks/Contract";
import Assets from "src/components/commons/ViewBlocks/Assets";
import PolicyID from "src/components/commons/ViewBlocks/PolicyID";
import CompiledCode from "src/components/commons/ViewBlocks/CompiledCode";
import Burn from "src/components/commons/ViewBlocks/Burn";
import { details } from "src/commons/routers";

import AssetsModal from "../modals/AssetsModal";
import RedeemerModal from "../modals/RedeemerModal";
import CompiledCodeModal from "../modals/CompiledCodeModal";

export interface MintviewsProps {
  isBurned?: boolean;
  data?: IContractItemTx;
  isMobile?: boolean;
}

const Mintviews: React.FC<MintviewsProps> = ({ isBurned = false, data, isMobile }) => {
  const theme = useTheme();
  const redeemerRef = useRef(null);
  const middleBoxRef = useRef(null);
  const rightBoxRef = useRef(null);
  const [openRedeemer, setOpenRedeemer] = useState(false);
  const [openCompiledCode, setOpenCompiledCode] = useState(false);
  const [openAssets, setOpenAssets] = useState(false);
  const [openBurnedAssets, setOpenBurnedAssets] = useState(false);

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
        end: rightBoxRef,
        startPosition: {
          0: ["center", "bottom"],
          sm: ["center", "bottom"],
          lg: ["right", "middle"]
        },
        endPosition: {
          0: ["center", "top"],
          sm: ["right", "top"],
          lg: ["left", "middle"]
        },
        arrow: { 0: "top", sm: "top", lg: "left" },
        fold: { sm: "none" },
        startOffset: { 0: [0], sm: [0, 0] },
        endOffset: { 0: [0, -16], sm: [0, -10], lg: [-12, 0] },
        autoAlign: { 0: "none", sm: "start-vertical", lg: "none" }
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
        endOffset: { 0: [0, -16], sm: [0, 0] }
      },
      {
        start: middleBoxRef,
        end: rightBoxRef,
        startPosition: {
          0: ["center", "bottom"]
        },
        endPosition: {
          0: ["center", "top"]
        },
        arrow: { 0: "top" },
        fold: { sm: "none" },
        startOffset: { 0: [0] },
        endOffset: { 0: [0, -16] },
        autoAlign: { 0: "none", sm: "start-vertical" }
      }
    ];
  }, []);
  const mintedAssetsData = useMemo(() => {
    const mintingTokens = (data?.mintingTokens as IContractItemTx["mintingTokens"]) || [];
    return mintingTokens.map((item) => ({
      title: item.displayName ?? item.fingerprint,
      value: item.quantity,
      link: item.fingerprint
    }));
  }, [data]);

  const burnedAssetsData = useMemo(() => {
    const burningTokens = (data?.burningTokens as IContractItemTx["burningTokens"]) || [];
    return burningTokens.map((item) => ({
      title: item.displayName ?? item.fingerprint,
      value: item.quantity,
      link: item.fingerprint
    }));
  }, [data]);
  const isMint = data?.mintingTokens && data.mintingTokens?.length > 0;
  return (
    <MintContainer isMobile={+!!isMobile}>
      <AssetsModal open={openAssets} data={mintedAssetsData} onClose={() => setOpenAssets(!openAssets)} />
      <AssetsModal
        open={openBurnedAssets}
        isBurned={true}
        data={burnedAssetsData}
        onClose={() => setOpenBurnedAssets(!openBurnedAssets)}
      />
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
      <Redeemer ref={redeemerRef} onClick={() => setOpenRedeemer(!openRedeemer)} />
      <MiddleBox ref={middleBoxRef}>
        <Contract hash={data?.scriptHash} detail={details.policyDetail} />
        <CompiledCode onClick={() => setOpenCompiledCode(!openCompiledCode)} />
      </MiddleBox>
      {isBurned ? (
        <RightBox ref={rightBoxRef}>
          <MintBlueBox>
            <MintRrounded>
              {isMint ? (
                <Assets onClick={() => setOpenAssets(!openAssets)} total={data?.mintingTokens?.length} />
              ) : (
                <PolicyID hash={data?.scriptHash} detail={details.policyDetail} />
              )}
              <Burn total={data?.burningTokens?.length} onClick={() => setOpenBurnedAssets(!openBurnedAssets)} />
            </MintRrounded>
            {isMint && <PolicyID hash={data?.scriptHash} detail={details.policyDetail} />}
          </MintBlueBox>
        </RightBox>
      ) : (
        <MintBlueBox>
          <Rrounded ref={rightBoxRef}>
            <Assets onClick={() => setOpenAssets(!openAssets)} total={data?.mintingTokens?.length} />
            <PolicyID hash={data?.scriptHash} detail={details.policyDetail} />
          </Rrounded>
        </MintBlueBox>
      )}
      <DrawPath
        paths={isMobile ? mobilePaths : paths}
        lineStyle={{ stroke: theme.palette.secondary.light }}
        style={{ zIndex: 0 }}
      />
    </MintContainer>
  );
};

export default Mintviews;
