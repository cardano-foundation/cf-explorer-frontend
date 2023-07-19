import React, { useEffect, useRef } from "react";
import { useLocation, useParams } from "react-router-dom";

import useFetch from "src/commons/hooks/useFetch";
import { API } from "src/commons/utils/api";
import NoRecord from "src/components/commons/NoRecord";
import StakeKeyOverview from "src/components/StakeDetail/StakeOverview";
import StakeTab from "src/components/StakeDetail/StakeTab";
import StakeAnalytics from "src/components/StakeDetail/StakeAnalytics";
import { REFRESH_TIMES } from "src/commons/utils/constants";

import { StyledContainer } from "./styles";

const StakeDetail: React.FC = () => {
  const mainRef = useRef(document.querySelector("#main"));
  const { stakeId } = useParams<{ stakeId: string }>();
  const { state } = useLocation<{ data?: IStakeKeyDetail }>();
  const { data, loading, initialized, error, lastUpdated } = useFetch<IStakeKeyDetail>(
    `${API.STAKE.DETAIL}/${stakeId}`,
    state?.data,
    false,
    REFRESH_TIMES.STAKE_REGISTRATION
  );
  useEffect(() => {
    window.history.replaceState({}, document.title);
    document.title = `Stake address ${stakeId} | Cardano Explorer`;
    mainRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, [stakeId]);

  if ((initialized && !data) || error) return <NoRecord />;
  return (
    <StyledContainer>
      <StakeKeyOverview data={data} loading={loading} lastUpdated={lastUpdated} />
      <StakeAnalytics />
      <StakeTab />
    </StyledContainer>
  );
};

export default StakeDetail;
