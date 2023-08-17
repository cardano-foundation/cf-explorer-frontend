import { useEffect } from "react";
import { HiArrowLongLeft } from "react-icons/hi2";
import { useHistory } from "react-router-dom";
import { Container } from "@mui/material";

import ReportGeneratedPoolDetailTabs from "src/components/ReportGeneratedPoolDetail";

import { BackButton, BackText, TopHeader } from "./styles";

const ReportGeneratedPoolDetail = () => {
  const history = useHistory();

  useEffect(() => {
    document.title = "Pool Report Detail | Cardano Blockchain Explorer";
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
