import React from "react";
import { Box, useTheme } from "@mui/material";

import StakeKeyBox from "./StakeKeyBox";
import { CardHeader } from "../PoolCertificate/styles";

interface IProps {
  data: Transaction["stakeCertificates"] | null;
}

const StakeCertificate: React.FC<IProps> = ({ data }) => {
  const theme = useTheme();
  return (
    <>
      {data
        ?.filter((d) => d.type === "STAKE_REGISTRATION")
        ?.map((item, index) => (
          <Box key={index} px="15px" mb="15px" bgcolor={theme.palette.background.paper} textAlign="left">
            <CardHeader>Stake Address Registrations</CardHeader>
            <StakeKeyBox key={index} data={item} />
          </Box>
        ))}
      {data
        ?.filter((d) => d.type === "STAKE_DEREGISTRATION")
        ?.map((item, index) => (
          <Box key={index} px="15px" mb="15px" bgcolor={theme.palette.background.paper} textAlign="left">
            <CardHeader>Stake Address Deregistrations</CardHeader>
            <StakeKeyBox key={index} data={item} />
          </Box>
        ))}
    </>
  );
};

export default StakeCertificate;
