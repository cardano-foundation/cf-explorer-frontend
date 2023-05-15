import React from "react";
import ReportGeneratedPoolDetailTabs from "../../components/ReportGeneratedPoolDetail";
import { Container } from "@mui/material";
import { BackButton, BackText } from "../../components/commons/DetailHeader/styles";
import { HiArrowLongLeft } from "react-icons/hi2";
import { TopHeader } from "./styles";
import { useHistory } from "react-router-dom";

const ReportGeneratedPoolDetail = () => {
  const history = useHistory();
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
