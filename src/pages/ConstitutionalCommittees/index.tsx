import { useEffect } from "react";

import ConstitutionalCommitteesComponent from "src/components/ConstitutionalCommittees";

import { StyledContainer } from "./styles";

const ConstitutionalCommittees = () => {
  useEffect(() => {
    document.title = `Constitutional Committees | Cardano Blockchain Explorer`;
  }, []);
  return (
    <StyledContainer>
      <ConstitutionalCommitteesComponent />
    </StyledContainer>
  );
};

export default ConstitutionalCommittees;
