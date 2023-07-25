import React, { useEffect } from "react";
import { HiArrowLongLeft } from "react-icons/hi2";
import { useHistory } from "react-router-dom";
import { Container } from "@mui/material";

import ReportGeneratedPoolDetailTabs from "src/components/ReportGeneratedPoolDetail";
import { BackButton, BackText } from "src/components/commons/DetailHeader/styles";

import { TopHeader } from "./styles";

const ReportGeneratedPoolDetail = () => {
  const history = useHistory();

  useEffect(() => {
    document.title = "Pool Report Detail | Iris - Cardano Blockchain Explorer";
  }, []);

  return (
    <Container>
      <TopHeader>
        <BackButton onClick={history.goBack}>
          <HiArrowLongLeft />
          <BackText>Back</BackText>
        </BackButton>
      </TopHeader>
      <ReportGeneratedPoolDetailTabs />
    </Container>
  );
};

export default ReportGeneratedPoolDetail;
