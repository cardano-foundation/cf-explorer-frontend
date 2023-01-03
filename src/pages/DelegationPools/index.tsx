import Card from "../../components/commons/Card";
import OverViews from "../../components/DelegationPool/DelegationOverview";
import { Horizon, StyledContainer } from "./styles";
import DelegationLists from "../../components/DelegationPool/DelegationList";

interface DelegationsProps {}

const Delegations: React.FC<DelegationsProps> = () => {
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
