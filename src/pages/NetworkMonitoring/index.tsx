import { useEffect } from "react";

import NetworkMonitoringComponent from "src/components/NetworkMonitoring";
import { NETWORK, NETWORKS } from "src/commons/utils/constants";

import { StyledContainer } from "./styles";
import NotFound from "../NotFound";

const NetworkMonitoring = () => {
  useEffect(() => {
    document.title = `Network Monitoring | Cardano Blockchain Explorer`;
  }, []);
  if (NETWORK !== NETWORKS.mainnet) return <NotFound />;
  return (
    <StyledContainer>
      <NetworkMonitoringComponent />
    </StyledContainer>
  );
};

export default NetworkMonitoring;
