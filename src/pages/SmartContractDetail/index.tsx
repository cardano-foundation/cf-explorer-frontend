import { Box, Typography, useTheme } from "@mui/material";
import { useHistory, useParams } from "react-router-dom";
import React from "react";

import { BackButton } from "../ContractDetail/styles";

const SmartContractDetail = () => {
  const theme = useTheme();
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  return (
    <Box display="flex" gap={1} mt={6} flexDirection="column" alignItems="center" justifyContent="center">
      <Typography color={theme.palette.primary.main} fontSize={40}>
        (SmartContract Detail) - This page will come soon!
      </Typography>
      <BackButton onClick={history.goBack} color={theme.palette.primary.main}>
        Go back
      </BackButton>
      <Typography color={theme.palette.primary.main} fontSize={16}>
        {id}
      </Typography>
    </Box>
  );
};

export default SmartContractDetail;
