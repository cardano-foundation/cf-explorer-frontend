import React, { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import useFetch from "src/commons/hooks/useFetch";
import { API } from "src/commons/utils/api";
import NoRecord from "src/components/commons/NoRecord";
import EpochBlockList from "src/components/EpochDetail/EpochBlockList";
import EpochOverview from "src/components/EpochDetail/EpochOverview";

import { StyledContainer } from "./styles";

const EpochDetail: React.FC = () => {
  const blockNo = useSelector(({ system }: RootState) => system.blockNo);
  const epochNo = useSelector(({ system }: RootState) => system.currentEpoch?.no);
  const { epochId } = useParams<{ epochId: string }>();
  const { state } = useLocation<{ data?: IDataEpoch }>();

  const { data, loading, initialized, error, lastUpdated } = useFetch<IDataEpoch>(
    `${API.EPOCH.DETAIL}/${epochId}`,
    state?.data,
    false,
    epochNo?.toString() === epochId ? blockNo : 0
  );

  useEffect(() => {
    window.history.replaceState({}, document.title);
    document.title = `Epoch ${epochId} | Cardano Blockchain Explorer`;
  }, [epochId]);
  if (!initialized) {
    return null;
  }

  if ((initialized && !data) || error) return <NoRecord />;

  return (
    <StyledContainer>
      <EpochOverview data={data} loading={loading} lastUpdated={lastUpdated} />
      <EpochBlockList epochId={epochId} />
    </StyledContainer>
  );
};

export default EpochDetail;
