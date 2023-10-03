import React from "react";
import { Typography } from "@mui/material";

import { CertValueBox, CertificateTypeBox } from "./styles";

const CertificateType: React.FC<{ redeemerCertType?: IContractItemTx["redeemerCertType"] }> = ({
  redeemerCertType = "DELEGATION"
}) => {
  const certType = {
    DELEGATION: "Stake Registration",
    STAKE_DEREGISTRATION: "Stake Address Deregistrations"
  };
  return (
    <CertificateTypeBox>
      <Typography fontSize="1rem" fontWeight={600}>
        Certificate Type:
      </Typography>
      <CertValueBox>{certType[redeemerCertType]}</CertValueBox>
    </CertificateTypeBox>
  );
};

export default CertificateType;
