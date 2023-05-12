import React from "react";
import { CardHeader } from "./styles";
import StakeKeyBox from "./StakeKeyBox";
import { Box, useTheme } from "@mui/material";

interface IProps {
  data: Transaction["poolCertificates"] | null;
}

const PoolCertificate: React.FC<IProps> = ({ data }) => {
  const theme = useTheme();

  return (
    <>
      {data?.map((item, index) => (
        <Box px="15px" mb="15px" bgcolor={theme.palette.background.paper} textAlign="left">
          <CardHeader>Pool Registrations</CardHeader>
          <StakeKeyBox key={index} data={item} />
        </Box>
      ))}
    </>
  );
};

export default PoolCertificate;
