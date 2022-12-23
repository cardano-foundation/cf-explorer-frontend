import React from "react";

import StakeKeyOverview from "../../components/StakeDetail/StakeOverview";
import StakeTab from "../../components/StakeDetail/StakeTab";

import { StyledContainer } from "./styles";

interface IStakeDetail {}

const StakeDetail: React.FC<IStakeDetail> = () => {
  return (
    <StyledContainer>
      <StakeKeyOverview />
      <StakeTab />
    </StyledContainer>
  );
};

export default StakeDetail;
