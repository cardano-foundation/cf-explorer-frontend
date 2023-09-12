import { useEffect } from "react";
import { Container } from "@mui/material";

import ReportGeneratedDetailTabs from "src/components/ReportGeneratedStakingDetail";

const ReportGeneratedStakingDetail = () => {
  useEffect(() => {
    document.title = "Stake Address Report Detail | Cardano Blockchain Explorer";
  }, []);

  return (
    <Container>
      <ReportGeneratedDetailTabs />
    </Container>
  );
};

export default ReportGeneratedStakingDetail;
