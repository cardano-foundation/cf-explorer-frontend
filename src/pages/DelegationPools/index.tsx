import Card from "../../components/commons/Card";
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
      <Card title="Delegation Pools Explorer">
        <OverViews />
      </Card>
      <Horizon />
      <DelegationLists />
    </StyledContainer>
  );
};

export default Delegations;
