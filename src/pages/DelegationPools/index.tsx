import OverViews from "../../components/DelegationPool/DelegationOverview";
import { Horizon, StyledContainer } from "./styles";
import DelegationLists from "../../components/DelegationPool/DelegationList";
import { useEffect } from "react";

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
