import React, { useEffect, useRef } from "react";
import { useLocation, useParams } from "react-router-dom";

import useFetch from "src/commons/hooks/useFetch";
import { API } from "src/commons/utils/api";
import NoRecord from "src/components/commons/NoRecord";
import StakeKeyOverview from "src/components/StakeDetail/StakeOverview";
import StakeTab from "src/components/StakeDetail/StakeTab";
import StakeAnalytics from "src/components/StakeDetail/StakeAnalytics";
import { REFRESH_TIMES } from "src/commons/utils/constants";
import { setSpecialPath } from "src/stores/system";
import { routers } from "src/commons/routers";

import { StyledContainer } from "./styles";

const StakeDetail: React.FC = () => {
  const mainRef = useRef(document.querySelector("#main"));
  const { stakeId } = useParams<{ stakeId: string }>();
  const { state } = useLocation<{ fromPath?: SpecialPath }>();
  const status = useFetch<ListStakeKeyResponse>(
    API.STAKE_LIFECYCLE.TABS(stakeId),
    undefined,
    false,
    REFRESH_TIMES.STAKE_REGISTRATION
  );

  const { data, loading, initialized, error, lastUpdated } = useFetch<IStakeKeyDetail>(
    `${API.STAKE.DETAIL}/${stakeId}`,
    undefined,
    false,
    REFRESH_TIMES.STAKE_REGISTRATION
  );

  useEffect(() => {
    document.title = `Stake address ${stakeId} | Cardano Blockchain Explorer`;
    mainRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, [stakeId]);

  useEffect(() => {
    if (state?.fromPath) return setSpecialPath(state.fromPath);

    if (status.data?.hasDeRegistration) return setSpecialPath(routers.STAKE_ADDRESS_DEREGISTRATION);
    if (status.data?.hasDelegation) return setSpecialPath(routers.STAKE_ADDRESS_DELEGATIONS);
    if (status.data?.hasRegistration) return setSpecialPath(routers.STAKE_ADDRESS_REGISTRATION);
  }, [state, status]);

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
