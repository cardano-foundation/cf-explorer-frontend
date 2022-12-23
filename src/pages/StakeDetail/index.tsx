import { parse, stringify } from "qs";
import React from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";

import useFetch from "../../commons/hooks/useFetch";
import useFetchList from "../../commons/hooks/useFetchList";

import StakeKeyOverview from "../../components/StakeDetail/StakeOverview";
import StakeTab from "../../components/StakeDetail/StakeTab";

import { StyledContainer } from "./styles";

interface IStakeDetail {}

const StakeDetail: React.FC<IStakeDetail> = () => {
  const { search } = useLocation();
  const query = parse(search.split("?")[1]);
  const { stakeId } = useParams<{ stakeId: string }>();
  const [activeTab, setActiveTab] = React.useState<TabStakeDetail>("delegation");


  const { data, loading } = useFetch<IStakeKeyDetail>(`/stake/address/${stakeId}`);
  const {
    data: dataTab,
    loading: loadingTab,
    error,
    initialized,
    total,
    currentPage,
  } = useFetchList<DelegationHistory | Instantaneous | StakeHistory | WithdrawalHistory>(
    `/stake/${stakeId}/${apiPath[activeTab]}`,
    {
      page: query.page ? +query.page - 1 : 0,
      size: query.size ? (query.size as string) : 10,
    }
  );

  return (
    <StyledContainer>
      <StakeKeyOverview data={data} loading={loading} />
      <StakeTab
        loading={loadingTab}
        error={error}
        initialized={initialized}
        data={dataTab}
        setActiveTab={setActiveTab}
        activeTab={activeTab}
        total={total}
        currentPage={currentPage}
      />
    </StyledContainer>
  );
};

export default StakeDetail;

const apiPath = {
  delegation: "delegation-history",
  stakeKey: "stake-history",
  withdrawal: "withdrawal-history",
  instantaneous: "instantaneous-rewards",
};
