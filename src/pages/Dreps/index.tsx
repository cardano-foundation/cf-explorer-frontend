import { useEffect } from "react";

import OverViews from "src/components/Dreps/DrepsOverview";
import DelegationLists from "src/components/Dreps/DrepsList";

import { Horizon, StyledContainer } from "./styles";

const Dreps = () => {
  useEffect(() => {
    document.title = `Delegated Representative | Cardano Blockchain Explorer`;
  }, []);

  return (
    <StyledContainer>
      <OverViews />
      <Horizon />
      <DelegationLists />
    </StyledContainer>
  );
};

export default Dreps;
