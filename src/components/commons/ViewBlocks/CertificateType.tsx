import React from "react";
import { Typography } from "@mui/material";

import { CertificateTypeBox } from "./styles";

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
      <Typography>{certType[redeemerCertType]}</Typography>
    </CertificateTypeBox>
  );
};

export default CertificateType;
