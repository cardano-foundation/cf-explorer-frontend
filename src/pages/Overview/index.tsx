import { useEffect } from "react";

import OverviewComponent from "src/components/Overview";
import { FF_GLOBAL_IS_CONWAY_ERA } from "src/commons/utils/constants";

import { StyledContainer } from "./styles";
import NotFound from "../NotFound";
const Overview = () => {
  useEffect(() => {
    document.title = `Governance Overview | Cardano Blockchain Explorer`;
  }, []);
  if (!FF_GLOBAL_IS_CONWAY_ERA) return <NotFound />;
  return (
    <StyledContainer>
      <OverviewComponent />
    </StyledContainer>
  );
};

export default Overview;
