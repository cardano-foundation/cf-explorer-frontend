import { useEffect } from "react";

import OverViews from "src/components/DelegationPool/DelegationOverview";
import DelegationLists from "src/components/DelegationPool/DelegationList";

import { Horizon, StyledContainer } from "./styles";

const Delegations = () => {
  useEffect(() => {
    document.title = `Delegation Pools | Cardano Explorer`;
  }, []);

  return (
    <StyledContainer>
      <OverViews />
      <Horizon />
      <DelegationLists />
    </StyledContainer>
  );
};

export default Delegations;
