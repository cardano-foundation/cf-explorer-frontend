import { useEffect } from "react";

import NetworkMonitoringComponent from "src/components/NetworkMonitoring";

import { StyledContainer } from "./styles";

const NetworkMonitoring = () => {
  useEffect(() => {
    document.title = `Network Monitoring | Cardano Blockchain Explorer`;
  }, []);
  return (
    <StyledContainer>
      <NetworkMonitoringComponent />
    </StyledContainer>
  );
};

export default NetworkMonitoring;
