import React from "react";
import { Box } from "@mui/material";
import StakeKeyBox from "./StakeKeyBox";
import { CardHeader } from "../PoolCertificate/styles";
import { useTheme } from "@mui/material";

interface IProps {
  data: Transaction["stakeCertificates"] | null;
}

const StakeCertificate: React.FC<IProps> = ({ data }) => {
  const theme = useTheme();
  console.log("data", data);
  return (
    <>
      {data
        ?.filter(d => d.type === "STAKE_REGISTRATION")
        ?.map((item, index) => (
          <Box px="15px" mb="15px" bgcolor={theme.palette.background.paper} textAlign="left">
            <CardHeader>Stake Key Registrations</CardHeader>
            <StakeKeyBox key={index} data={item} />
          </Box>
        ))}
      {data
        ?.filter(d => d.type === "STAKE_DEREGISTRATION")
        ?.map((item, index) => (
          <Box px="15px" mb="15px" bgcolor={theme.palette.background.paper} textAlign="left">
            <CardHeader>Stake Key Deregistrations</CardHeader>
            <StakeKeyBox key={index} data={item} />
          </Box>
        ))}
    </>
  );
};

export default StakeCertificate;
