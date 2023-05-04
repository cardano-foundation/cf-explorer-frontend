import React, { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import useFetch from "../../commons/hooks/useFetch";
import { API } from "../../commons/utils/api";
import NoRecord from "../../components/commons/NoRecord";
import StakeKeyOverview from "../../components/StakeDetail/StakeOverview";
import StakeTab from "../../components/StakeDetail/StakeTab";
import StakeAnalytics from "../../components/StakeDetail/StakeAnalytics";
import { StyledContainer } from "./styles";
import { REFRESH_TIMES } from "../../commons/utils/constants";

const StakeDetail: React.FC = () => {
  const { stakeId } = useParams<{ stakeId: string }>();
  const { state } = useLocation<{ data?: IStakeKeyDetail }>();
  const { data, initialized, error } = useFetch<IStakeKeyDetail>(
    `${API.STAKE.DETAIL}/${stakeId}`,
    state?.data,
    false,
    REFRESH_TIMES.STAKE_REGISTRATION
  );

  useEffect(() => {
    window.history.replaceState({}, document.title);
    document.title = `Stake address ${stakeId} | Cardano Explorer`;
  }, [stakeId]);

  if ((initialized && !data) || error) return <NoRecord />;

  return (
    <StyledContainer>
      <StakeKeyOverview data={data} loading={!initialized} />
      <StakeAnalytics />
      <StakeTab />
    </StyledContainer>
  );
};

export default StakeDetail;
