import OverViews from "../../components/DelegationPool/DelegationOverview";
import { Horizon, StyledContainer } from "./styles";
import DelegationLists from "../../components/DelegationPool/DelegationList";
import { useEffect } from "react";

interface DelegationsProps {}

const Delegations: React.FC<DelegationsProps> = () => {

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
