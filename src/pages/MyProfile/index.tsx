import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

import useAuth from "src/commons/hooks/useAuth";
import { routers } from "src/commons/routers";
import OverviewTab from "src/components/Account/OverviewTab";

import { Header, Title } from "../PrivateNotes/styles";

const MyProfile: React.FC = () => {
  const { isLoggedIn } = useAuth();
  const history = useHistory();
  useEffect(() => {
    document.title = `My Profile | Iris - Cardano Blockchain Explorer`;
  }, []);

  useEffect(() => {
    if (!isLoggedIn) {
      history.replace(routers.HOME);
    }
  }, [isLoggedIn]);

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
