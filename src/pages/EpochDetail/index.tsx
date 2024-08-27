import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import useFetch from "src/commons/hooks/useFetch";
import { API } from "src/commons/utils/api";
import NoRecord from "src/components/commons/NoRecord";
import EpochBlockList from "src/components/EpochDetail/EpochBlockList";
import EpochOverview from "src/components/EpochDetail/EpochOverview";
import FetchDataErr from "src/components/commons/FetchDataErr";

import { StyledContainer } from "./styles";

const EpochDetail: React.FC = () => {
  const blockKey = useSelector(({ system }: RootState) => system.blockKey);
  const epochNo = useSelector(({ system }: RootState) => system.currentEpoch?.no);
  const { epochId } = useParams<{ epochId: string }>();
  const { state } = useLocation<{ data?: IDataEpoch }>();
  const [key, setKey] = useState(0);

  const { data, loading, initialized, error, lastUpdated, statusError } = useFetch<IDataEpoch>(
    `${API.EPOCH.DETAIL}/${epochId}`,
    state?.data,
    false,
    epochNo?.toString() === epochId ? blockKey : key
  );

  useEffect(() => {
    // Update key if this epoch don't have rewards and when new epoch distributed for api callback
    if (!data?.rewardsDistributed && epochNo !== undefined && data?.no !== undefined && epochNo !== data.no) {
      setKey(epochNo);
    }
  }, [epochNo, data?.no, data?.rewardsDistributed]);

  useEffect(() => {
    window.history.replaceState({}, document.title);
    document.title = `Epoch ${epochId} | Cardano Blockchain Explorer`;
  }, [epochId]);

  if (!initialized) {
    return null;
  }
  if (error && (statusError || 0) >= 500) return <FetchDataErr />;
  if ((initialized && !data) || (error && (statusError || 0) < 500)) return <NoRecord />;

  return (
    <StyledContainer>
      <EpochOverview data={data} loading={loading} lastUpdated={lastUpdated} />
      <EpochBlockList epochId={epochId} />
    </StyledContainer>
  );
};

export default EpochDetail;
