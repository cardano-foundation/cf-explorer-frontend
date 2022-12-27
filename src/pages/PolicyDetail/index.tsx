import PolicyOverview from "../../components/PolicyDetail/PolicyOverview";
import PolicyTable from "../../components/PolicyDetail/PolicyTable";
import { StyledContainer } from "./styles";

const PolicyDetail = () => {
  return (
    <StyledContainer>
      <PolicyOverview />
      <PolicyTable />
    </StyledContainer>
  );
};

export default PolicyDetail;
