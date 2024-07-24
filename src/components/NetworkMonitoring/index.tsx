import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import { styled } from "@mui/system";

import Card from "../commons/Card";
import RegisteredStakepoolsChart from "./RegisteredStakepools";
import TransactionNumberChart from "./TransactionNumberChart";

export default function NetworkMonitoringComponent() {
  const { t } = useTranslation();
  return (
    <WrapPage>
      <Card title={t("glossary.networkMonitoring")} />
      <RegisteredStakepoolsChart />
      <TransactionNumberChart />
    </WrapPage>
  );
}

const WrapPage = styled(Box)`
  display: flex;
  gap: 24px;
  flex-direction: column;
`;
