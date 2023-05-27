import { Container } from "@mui/material";
import ReportGeneratedDetailTabs from "../../components/ReportGeneratedStakingDetail";
import { BackButton, BackText } from "../../components/commons/DetailHeader/styles";
import { HiArrowLongLeft } from "react-icons/hi2";
import { TopHeader } from "../ReportGeneratedPoolDetail/styles";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";

const ReportGeneratedStakingDetail = () => {
  const history = useHistory();

  useEffect(() => {
    document.title = "Stake Key Report Detail | Cardano Explorer";
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
