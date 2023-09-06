import { useEffect } from "react";
import { Container } from "@mui/material";

import ReportGeneratedPoolDetailTabs from "src/components/ReportGeneratedPoolDetail";

const ReportGeneratedPoolDetail = () => {
  useEffect(() => {
    document.title = "Pool Report Detail | Cardano Blockchain Explorer";
  }, []);

  return (
    <Container>
      <ReportGeneratedPoolDetailTabs />
    </Container>
  );
};

export default ReportGeneratedPoolDetail;
