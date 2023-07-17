import { useEffect } from "react";
import { Container } from "@mui/material";
import { useHistory } from "react-router-dom";
import { HiArrowLongLeft } from "react-icons/hi2";

import ReportGeneratedDetailTabs from "src/components/ReportGeneratedStakingDetail";
import { BackButton, BackText } from "src/components/commons/DetailHeader/styles";

import { TopHeader } from "../ReportGeneratedPoolDetail/styles";

const ReportGeneratedStakingDetail = () => {
  const history = useHistory();

  useEffect(() => {
    document.title = "Stake Address Report Detail | Cardano Explorer";
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
