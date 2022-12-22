import React from "react";
import { useParams } from "react-router-dom";

import useFetch from "../../commons/hooks/useFetch";

import StakeKeyOverview from "../../components/StakeDetail/StakeOverview";
import StakeTab from "../../components/StakeDetail/StakeTab";

import { StyledContainer } from "./styles";

interface IStakeDetail {}

const StakeDetail: React.FC<IStakeDetail> = () => {
  const { stakeId } = useParams<{ stakeId: string }>();
  const { data, loading } = useFetch<IStakeKeyDetail>(`/stakeKey/${stakeId}`);

  return (
    <StyledContainer>
      <StakeKeyOverview data={data} loading={loading} />
      <StakeTab />
    </StyledContainer>
  );
};

export default StakeDetail;
