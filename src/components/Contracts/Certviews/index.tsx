import { useTheme } from "@mui/material";
import React, { useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import { OutlineEye } from "src/commons/resources";
import CustomIcon from "src/components/commons/CustomIcon";
import DrawPath from "src/components/commons/DrawPath";
import { LineArrowItem } from "src/components/commons/LineArrow";
import CertificateType from "src/components/commons/ViewBlocks/CertificateType";
import CompiledCode from "src/components/commons/ViewBlocks/CompiledCode";
import Contract from "src/components/commons/ViewBlocks/Contract";
import { Center, CertContainer, CertRrounded, LongButton, MiddleBox } from "src/components/commons/ViewBlocks/styles";
import { details } from "src/commons/routers";

import RedeemerModal from "../modals/RedeemerModal";
import CompiledCodeModal from "../modals/CompiledCodeModal";

interface CertviewsProps {
  data?: IContractItemTx;
  isMobile?: boolean;
}

const Certviews: React.FC<CertviewsProps> = ({ data, isMobile }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const certRef = useRef(null);
  const middleRef = useRef(null);
  const [openRedeemer, setOpenRedeemer] = useState(false);
  const [openCompiledCode, setOpenCompiledCode] = useState(false);

  const paths = useMemo((): LineArrowItem[] => {
    return [
      {
        start: certRef,
        end: middleRef,
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
        start: certRef,
        end: middleRef,
        startPosition: { 0: ["center", "bottom"] },
        endPosition: { 0: ["center", "top"] },
        arrow: { 0: "top" },
        fold: { sm: "horizontal" },
        startOffset: { 0: [0, 0] },
        endOffset: { 0: [0, -10] }
      }
    ];
  }, []);
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
