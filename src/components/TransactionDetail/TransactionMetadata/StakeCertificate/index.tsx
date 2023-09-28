import React from "react";
import { Box, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";

import StakeKeyBox from "./StakeKeyBox";
import { CardHeader } from "../PoolCertificate/styles";

interface IProps {
  data: Transaction["stakeCertificates"] | null;
}

const StakeCertificate: React.FC<IProps> = ({ data }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  return (
    <>
      {data
        ?.filter((d) => d.type === "STAKE_REGISTRATION")
        ?.map((item, index) => (
          <Box key={index} px="15px" mb="15px" bgcolor={theme.palette.secondary[0]} textAlign="left">
            <CardHeader>{t("glossary.stakeAddressRegistrations")}</CardHeader>
            <StakeKeyBox key={index} data={item} />
          </Box>
        ))}
      {data
        ?.filter((d) => d.type === "STAKE_DEREGISTRATION")
        ?.map((item, index) => (
          <Box key={index} px="15px" mb="15px" bgcolor={theme.palette.secondary[0]} textAlign="left">
            <CardHeader>{t("glossary.stakeAddressDeregistrations")}</CardHeader>
            <StakeKeyBox key={index} data={item} />
          </Box>
        ))}
    </>
  );
};

export default StakeCertificate;
