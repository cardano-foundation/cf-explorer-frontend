import React from "react";
import { useParams } from "react-router-dom";

import useFetch from "../../commons/hooks/useFetch";

import StakeKeyOverview from "../../components/StakeDetail/StakeOverview";

import { StyledContainer } from "./styles";

interface IStakeDetail {}

const StakeDetail: React.FC<IStakeDetail> = () => {
  const params = useParams<{ stakeId: string }>();
  const { data, loading } = useFetch<IStakeKeyDetail>(`TODO/${params.stakeId}`);

  return (
    <StyledContainer>
      <StakeKeyOverview data={data} loading={loading} />
    </StyledContainer>
  );
};

export default StakeDetail;
