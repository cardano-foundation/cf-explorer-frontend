import React from "react";
import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import { CertValueBox, CertificateTypeBox } from "./styles";

const CertificateType: React.FC<{ redeemerCertType?: IContractItemTx["redeemerCertType"] }> = ({
  redeemerCertType = "DELEGATION"
}) => {
  const { t } = useTranslation();
  const certType = {
    DELEGATION: "Stake Registration",
    STAKE_DEREGISTRATION: "Stake Address Deregistrations"
  };
  return (
    <CertificateTypeBox>
      <Typography fontSize="1rem" fontWeight={600}>
        {t("contract.certificateType")}:
      </Typography>
      <CertValueBox>{certType[redeemerCertType]}</CertValueBox>
    </CertificateTypeBox>
  );
};

export default CertificateType;
