import { Box, useTheme } from "@mui/material";
import React, { useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import { OutlineEye } from "src/commons/resources";
import { details } from "src/commons/routers";
import CustomIcon from "src/components/commons/CustomIcon";
import DrawPath from "src/components/commons/DrawPath";
import { LineArrowItem } from "src/components/commons/LineArrow";
import CertificateType from "src/components/commons/ViewBlocks/CertificateType";
import CompiledCode from "src/components/commons/ViewBlocks/CompiledCode";
import Contract from "src/components/commons/ViewBlocks/Contract";
import Outputs from "src/components/commons/ViewBlocks/Outputs";
import { Center, CertContainer, CertRrounded, LongButton, MiddleBox } from "src/components/commons/ViewBlocks/styles";

import CompiledCodeModal from "../modals/CompiledCodeModal";
import RedeemerModal from "../modals/RedeemerModal";

interface CertviewsProps {
  data?: IContractItemTx;
  isMobile?: boolean;
}

const Certviews: React.FC<CertviewsProps> = ({ data, isMobile }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const { trxHash = "" } = useParams<{ trxHash: string }>();

  const certRef = useRef(null);
  const middleRef = useRef(null);
  const outputBoxRef = useRef(null);
  const [openRedeemer, setOpenRedeemer] = useState(false);
  const [openCompiledCode, setOpenCompiledCode] = useState(false);

  const paths = useMemo((): LineArrowItem[] => {
    return [
      {
        start: certRef,
        end: middleRef,
        startPosition: { 0: ["center", "bottom"], lg: ["right", "middle"] },
        endPosition: { 0: ["center", "top"], lg: ["left", "middle"] },
        arrow: { 0: "top", lg: "left" },
        fold: { 0: "horizontal", lg: "none" },
        startOffset: { 0: [0, 0], lg: [0, 0] },
        endOffset: { 0: [0, -10], lg: [-16, 0] }
      },
      {
        start: middleRef,
        end: outputBoxRef,
        startPosition: { 0: ["center", "bottom"], lg: ["right", "middle"] },
        endPosition: { 0: ["center", "top"], lg: ["left", "middle"] },
        arrow: { 0: "top", lg: "left" },
        fold: { sm: "horizontal", lg: "none" },
        startOffset: { 0: [0, 0], lg: [0, 0] },
        endOffset: { 0: [0, -10], lg: [-16, 0] }
      }
    ];
  }, []);

  const mobilePaths = useMemo((): LineArrowItem[] => {
    return [
      {
        start: certRef,
        end: middleRef,
        startPosition: { 0: ["center", "bottom"] },
        endPosition: { 0: ["center", "top"] },
        arrow: { 0: "top" },
        fold: { sm: "horizontal" },
        startOffset: { 0: [0, 0] },
        endOffset: { 0: [0, -10] }
      },
      {
        start: middleRef,
        end: outputBoxRef,
        startPosition: { 0: ["center", "bottom"] },
        endPosition: { 0: ["center", "top"] },
        arrow: { 0: "top" },
        fold: { sm: "horizontal" },
        startOffset: { 0: [0, 0] },
        endOffset: { 0: [0, -10] }
      }
    ];
  }, []);

  const detailInfo =
    data?.redeemerCertType === "DELEGATION"
      ? { title: "View delegation tab", tab: "delegations" }
      : { title: "View stake certificate tab", tab: "stakeCertificates" };
  return (
    <CertContainer>
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
      <Center isMoble={+!!isMobile}>
        <CertRrounded ref={certRef}>
          <CertificateType redeemerCertType={data?.redeemerCertType} />
          <LongButton onClick={() => setOpenRedeemer(!openRedeemer)}>
            {t("contract.redeemer")}
            <CustomIcon
              style={{ cursor: "pointer" }}
              icon={OutlineEye}
              width={22}
              fill={theme.isDark ? theme.palette.secondary[100] : theme.palette.common.white}
            />
          </LongButton>
        </CertRrounded>
        <MiddleBox ref={middleRef}>
          <Contract hash={data?.scriptHash} detail={details.smartContract} />
          <CompiledCode onClick={() => setOpenCompiledCode(!openCompiledCode)} />
        </MiddleBox>
        <Box ref={outputBoxRef}>
          <Outputs link={details.transaction(trxHash, detailInfo.tab)} title={detailInfo.title} />
        </Box>
      </Center>
      <DrawPath
        paths={isMobile ? mobilePaths : paths}
        lineStyle={{ stroke: theme.isDark ? theme.palette.secondary[600] : theme.palette.secondary.light }}
        style={{ zIndex: 0 }}
      />
    </CertContainer>
  );
};

export default Certviews;
