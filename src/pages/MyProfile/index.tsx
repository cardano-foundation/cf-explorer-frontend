import { Box } from "@mui/material";
import React, { useEffect } from "react";
import OverviewTab from "../../components/Account/OverviewTab";
import { Header, Title } from "../PrivateNotes/styles";

const MyProfile: React.FC = () => {
  useEffect(() => {
    document.title = `My Profile | Cardano Explorer`;
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
