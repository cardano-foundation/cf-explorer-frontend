import { useEffect } from "react";

import OverViews from "src/components/DelegationPool/DelegationOverview";
import DelegationLists from "src/components/DelegationPool/DelegationList";

import { StyledContainer } from "./styles";

const Delegations = () => {
  useEffect(() => {
    document.title = `Delegation Pools | Cardano Blockchain Explorer`;
  }, []);

  return (
    <StyledContainer>
      <OverViews />
      {/* <Horizon /> */}
      <DelegationLists />
    </StyledContainer>
  );
};

export default Delegations;
