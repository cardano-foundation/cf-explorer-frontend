import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { HiArrowLongLeft } from "react-icons/hi2";

import ReportGeneratedDetailTabs from "src/components/ReportGeneratedStakingDetail";
import { BackButton, BackText } from "src/components/commons/DetailHeader/styles";

import { TopHeader } from "../ReportGeneratedPoolDetail/styles";
import { StyledContainer } from "./styles";

const ReportGeneratedStakingDetail = () => {
  const history = useHistory();

  useEffect(() => {
    document.title = "Stake Key Report Detail | Iris - Cardano Blockchain Explorer";
  }, []);

  return (
    <StyledContainer>
      <TopHeader>
        <BackButton onClick={history.goBack}>
          <HiArrowLongLeft />
          <BackText>Back</BackText>
        </BackButton>
      </TopHeader>
      <ReportGeneratedDetailTabs />
    </StyledContainer>
  );
};

export default ReportGeneratedStakingDetail;
