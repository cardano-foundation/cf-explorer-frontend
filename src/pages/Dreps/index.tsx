import { useEffect } from "react";

import OverViews from "src/components/Dreps/DrepsOverview";
import DelegationLists from "src/components/Dreps/DrepsList";
import { IS_CONWAY_ERA } from "src/commons/utils/constants";

import { Horizon, StyledContainer } from "./styles";
import NotFound from "../NotFound";

const Dreps = () => {
  useEffect(() => {
    document.title = `Delegated Representative | Cardano Blockchain Explorer`;
  }, []);
  if (!IS_CONWAY_ERA) {
    return <NotFound />;
  }

  return (
    <StyledContainer>
      <OverViews />
      <Horizon />
      <DelegationLists />
    </StyledContainer>
  );
};

export default Dreps;
