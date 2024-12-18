import { useEffect } from "react";

import OverViews from "src/components/Dreps/DrepsOverview";
import { FF_GLOBAL_IS_CONWAY_ERA } from "src/commons/utils/constants";
import DrepsList from "src/components/Dreps/DrepsList";

import NotFound from "../NotFound";
import { StyledContainer } from "./styles";

const Dreps = () => {
  useEffect(() => {
    document.title = `Delegated Representative | Cardano Blockchain Explorer`;
  }, []);
  if (!FF_GLOBAL_IS_CONWAY_ERA) {
    return <NotFound />;
  }

  return (
    <StyledContainer>
      <OverViews />
      <DrepsList />
    </StyledContainer>
  );
};

export default Dreps;
