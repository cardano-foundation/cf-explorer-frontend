import React, { useEffect } from "react";
import { Box } from "@mui/material";

import OverviewTab from "src/components/Account/OverviewTab";

import { Header, Title } from "../PrivateNotes/styles";

const MyProfile: React.FC = () => {
  useEffect(() => {
    document.title = `My Profile | Iris - Cardano Blockchain Explorer`;
  }, []);

  return (
    <Box>
      <Header pt={"12px"}>
        <Title>Overview</Title>
      </Header>
      <Box mt={2}>
        <OverviewTab />
      </Box>
    </Box>
  );
};

export default MyProfile;
