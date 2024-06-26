import { useTheme } from "@mui/material";
import { useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import { useScreen } from "src/commons/hooks/useScreen";
import { details } from "src/commons/routers";
import { formatNumberDivByDecimals, isAssetId } from "src/commons/utils/helper";
import DrawPath from "src/components/commons/DrawPath";
import { LineArrowItem } from "src/components/commons/LineArrow";
import Assets from "src/components/commons/ViewBlocks/Assets";
import Burn from "src/components/commons/ViewBlocks/Burn";
import CompiledCode from "src/components/commons/ViewBlocks/CompiledCode";
import Contract from "src/components/commons/ViewBlocks/Contract";
import Redeemer from "src/components/commons/ViewBlocks/Redeemer";
import {
  MiddleBox,
  MintBlueBox,
  MintContainer,
  MintRrounded,
  RightBox
} from "src/components/commons/ViewBlocks/styles";

import AssetsModal from "../modals/AssetsModal";
import CompiledCodeModal from "../modals/CompiledCodeModal";
import RedeemerModal from "../modals/RedeemerModal";

export interface MintviewsProps {
  isBurned?: boolean;
  data?: IContractItemTx;
  isMobile?: boolean;
}

const Mintviews: React.FC<MintviewsProps> = ({ isBurned = false, data, isMobile }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const screen = useScreen();
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
          sm: ["right", "middle"]
        },
        endPosition: {
          0: ["center", "top"],
          sm: ["left", "middle"]
        },
        arrow: { 0: "top", sm: "left" },
        startOffset: { 0: [0] },
        endOffset: { 0: [0, -16], sm: [-12, 0] }
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
      title: item.displayName ? item.displayName : item.fingerprint,
      value: formatNumberDivByDecimals(item.quantity, item?.metadata?.decimals || 0),
      link: item.fingerprint,
      showTooltip: !item.displayName || isAssetId(item.displayName)
    }));
  }, [data, screen.isMobile]);

  const burnedAssetsData = useMemo(() => {
    const burningTokens = (data?.burningTokens as IContractItemTx["burningTokens"]) || [];
    return burningTokens.map((item) => ({
      title: item.displayName ? item.displayName : item.fingerprint,
      value: formatNumberDivByDecimals(item.quantity, item?.metadata?.decimals || 0),
      link: item.fingerprint,
      showTooltip: !item.displayName || isAssetId(item.displayName)
    }));
  }, [data, screen]);
  const isMint = data?.mintingTokens && data.mintingTokens?.length > 0;
  return (
    <MintContainer isMobile={+!!isMobile}>
      <Redeemer ref={redeemerRef} onClick={() => setOpenRedeemer(!openRedeemer)} />
      <MiddleBox ref={middleBoxRef}>
        <Contract hash={data?.scriptHash} detail={details.smartContract} />
        <CompiledCode onClick={() => setOpenCompiledCode(!openCompiledCode)} />
      </MiddleBox>

      {isBurned ? (
        <RightBox ref={rightBoxRef}>
          {isMint ? (
            <MintBlueBox isBurned={isBurned}>
              <MintRrounded>
                <Assets
                  onClick={() => setOpenAssets(!openAssets)}
                  total={data?.mintingTokens?.length}
                  isBurned={isBurned}
                />
                <Burn total={data?.burningTokens?.length} onClick={() => setOpenBurnedAssets(!openBurnedAssets)} />
              </MintRrounded>
            </MintBlueBox>
          ) : (
            <Burn total={data?.burningTokens?.length} onClick={() => setOpenBurnedAssets(!openBurnedAssets)} />
          )}
        </RightBox>
      ) : (
        <RightBox ref={rightBoxRef}>
          <Assets onClick={() => setOpenAssets(!openAssets)} total={data?.mintingTokens?.length} />
        </RightBox>
      )}
      <DrawPath
        paths={isMobile ? mobilePaths : paths}
        lineStyle={{ stroke: theme.isDark ? theme.palette.secondary[700] : theme.palette.secondary.light }}
        style={{ zIndex: 0 }}
      />
      <AssetsModal
        isBurnType={true}
        open={openAssets}
        data={mintedAssetsData}
        onClose={() => setOpenAssets(!openAssets)}
      />
      <AssetsModal
        open={openBurnedAssets}
        isBurned={true}
        data={burnedAssetsData}
        onClose={() => setOpenBurnedAssets(!openBurnedAssets)}
      />
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
    </MintContainer>
  );
};

export default Mintviews;
