import { useEffect } from "react";

import GovernanceActionDetailsComponent from "src/components/GovernanceActionDetails";

import { StyledContainer } from "./styles";

export default function GovernanceActionDetails() {
  useEffect(() => {
    document.title = `Governance Action Details | Cardano Blockchain Explorer`;
  }, []);
  return (
    <StyledContainer>
      <GovernanceActionDetailsComponent />
    </StyledContainer>
  );
}
