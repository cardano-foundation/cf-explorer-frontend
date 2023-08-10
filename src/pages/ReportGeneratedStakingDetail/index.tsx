import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { HiArrowLongLeft } from "react-icons/hi2";
import { Container } from "@mui/material";

import ReportGeneratedDetailTabs from "src/components/ReportGeneratedStakingDetail";

import { BackButton, BackText, TopHeader } from "./styles";

const ReportGeneratedStakingDetail = () => {
  const history = useHistory();

  useEffect(() => {
    document.title = "Stake Address Report Detail | Iris - Cardano Blockchain Explorer";
  }, []);

  return (
    <Container>
      <TopHeader>
        <BackButton onClick={history.goBack}>
          <HiArrowLongLeft />
          <BackText>Back</BackText>
        </BackButton>
      </TopHeader>
      <ReportGeneratedDetailTabs />
    </Container>
  );
};

export default ReportGeneratedStakingDetail;
