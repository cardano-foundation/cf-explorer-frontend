import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import { styled } from "@mui/system";

import { NETWORK, NETWORKS } from "src/commons/utils/constants";

import Card from "../commons/Card";
import RegisteredStakepoolsChart from "./RegisteredStakepools";
import TransactionNumberChart from "./TransactionNumberChart";
import BlockPropagationChart from "./BlockPropagation";

export default function NetworkMonitoringComponent() {
  const { t } = useTranslation();
  return (
    <WrapPage>
      <Card title={t("glossary.networkMonitoring")} />
      <TransactionNumberChart />
      {NETWORK === NETWORKS.mainnet && <BlockPropagationChart />}
      <RegisteredStakepoolsChart />
    </WrapPage>
  );
}

const WrapPage = styled(Box)`
  display: flex;
  gap: 24px;
  flex-direction: column;
`;
