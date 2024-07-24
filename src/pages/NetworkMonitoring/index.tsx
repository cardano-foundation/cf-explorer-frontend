import { useEffect } from "react";

import NetworkMonitoringComponent from "src/components/NetworkMonitoring";
import { FF_GLOBAL_IS_CONWAY_ERA } from "src/commons/utils/constants";

import { StyledContainer } from "./styles";
import NotFound from "../NotFound";

const NetworkMonitoring = () => {
  useEffect(() => {
    document.title = `Network Monitoring | Cardano Blockchain Explorer`;
  }, []);
  if (!FF_GLOBAL_IS_CONWAY_ERA) return <NotFound />;
  return (
    <StyledContainer>
      <NetworkMonitoringComponent />
    </StyledContainer>
  );
};

export default NetworkMonitoring;
