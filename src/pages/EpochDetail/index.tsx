import React from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../commons/hooks/useFetch";
import EpochBlockList from "../../components/EpochDetail/EpochBlockList";
import EpochOverview from "../../components/EpochDetail/EpochOverview";
import { StyledContainer } from "./styles";

const EpochDetail: React.FC = () => {
  const { epochId } = useParams<{ epochId: string }>();

  const { data, loading: loading, initialized } = useFetch<IDataEpoch>(`epoch/${epochId}`);

  return (
    <StyledContainer>
      <EpochOverview data={data} loading={loading || !initialized} />
      <EpochBlockList epochId={epochId} />
    </StyledContainer>
  );
};

export default EpochDetail;
