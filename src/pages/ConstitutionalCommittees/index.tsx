import { useEffect } from "react";

import ConstitutionalCommitteesComponent from "src/components/ConstitutionalCommittees";
import { FF_GLOBAL_IS_CONWAY_ERA } from "src/commons/utils/constants";

import { StyledContainer } from "./styles";
import NotFound from "../NotFound";

const ConstitutionalCommittees = () => {
  useEffect(() => {
    document.title = `Constitutional Committees | Cardano Blockchain Explorer`;
  }, []);
  if (!FF_GLOBAL_IS_CONWAY_ERA) return <NotFound />;
  return (
    <StyledContainer>
      <ConstitutionalCommitteesComponent />
    </StyledContainer>
  );
};

export default ConstitutionalCommittees;
