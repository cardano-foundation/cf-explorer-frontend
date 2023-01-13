import React, { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import useFetch from "../../commons/hooks/useFetch";
import NoRecord from "../../components/commons/NoRecord";
import StakeKeyOverview from "../../components/StakeDetail/StakeOverview";
import StakeTab from "../../components/StakeDetail/StakeTab";
import { StyledContainer } from "./styles";

const StakeDetail: React.FC = () => {
  const { stakeId } = useParams<{ stakeId: string }>();
  const { state } = useLocation<{ data?: IStakeKeyDetail }>();
  const { data, loading, initialized, error } = useFetch<IStakeKeyDetail>(
    state?.data ? "" : `/stake/address/${stakeId}`,
    state?.data
  );

  useEffect(() => {
    window.history.replaceState({}, document.title);
    document.title = `Stake address ${stakeId} | Cardano Explorer`;
  }, []);
  
  if ((initialized && !data) || error) return <NoRecord />;

  return (
    <StyledContainer>
      <StakeKeyOverview data={data} loading={loading} />
      <StakeTab />
    </StyledContainer>
  );
};

export default StakeDetail;
