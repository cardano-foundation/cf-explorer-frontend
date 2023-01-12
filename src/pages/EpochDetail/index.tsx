import React, { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import useFetch from "../../commons/hooks/useFetch";
import NoRecord from "../../components/commons/NoRecord";
import EpochBlockList from "../../components/EpochDetail/EpochBlockList";
import EpochOverview from "../../components/EpochDetail/EpochOverview";
import { StyledContainer } from "./styles";

const EpochDetail: React.FC = () => {
  const { epochId } = useParams<{ epochId: string }>();
  const { state } = useLocation<{ data?: IDataEpoch }>();

  const { data, loading, initialized, error } = useFetch<IDataEpoch>(
    state?.data ? "" : `epoch/${epochId}`,
    state?.data
  );

  useEffect(() => {
    window.history.replaceState({}, document.title);
    document.title = `Epoch ${epochId} | Cardano Explorer`;
  }, [epochId]);

  if ((initialized && !data) || error) return <NoRecord />;

  return (
    <StyledContainer>
      <EpochOverview data={data} loading={loading} />
      <EpochBlockList epochId={epochId} />
    </StyledContainer>
  );
};

export default EpochDetail;
