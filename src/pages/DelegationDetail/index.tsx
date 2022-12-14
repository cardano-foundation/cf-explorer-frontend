import { Container } from "@mui/material";
import React, { useRef, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { parse, stringify } from "qs";

import useFetch from "../../commons/hooks/useFetch";

import DelegationDetailInfo from "../../components/DelegationDetail/DelegationDetailInfo";
import DelegationDetailOverview from "../../components/DelegationDetail/DelegationDetailOverview";
import DelegationDetailChart from "../../components/DelegationDetail/DelegationDetailChart";

import { OptionSelect, SelectComponent, Title } from "./styles";
import {
  DelegationEpochList,
  DelegationStakingDelegatorsList,
} from "../../components/DelegationDetail/DelegationDetailList";
import useFetchList from "../../commons/hooks/useFetchList";

interface IDelegationDetail {}

const DelegationDetail: React.FC<IDelegationDetail> = () => {
  const { poolId } = useParams<{ poolId: string }>();
  const { search } = useLocation();
  const history = useHistory();
  const query = parse(search.split("?")[1]);
  const [tab, setTab] = useState<"epochs" | "delegators">("epochs");
  const tableRef = useRef(null);

  const scrollEffect = () => {
    tableRef !== null &&
      tableRef.current &&
      (tableRef.current as any).scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
  };

  const setQuery = (query: any) => {
    history.push({ search: stringify(query) });
  };

  const { data, loading } = useFetch<DelegationOverview>(`/delegation/pool-detail-header/${poolId}`);
  const {
    data: analyticsData,
    loading: loadingAnalytics,
    initialized,
  } = useFetch<AnalyticsDelegators>(`/delegation/pool-detail-analytics?pool=${poolId}`);
  const {
    data: dataTable,
    loading: loadingTable,
    total,
  } = useFetchList<DelegationEpoch | StakingDelegators>(
    `/delegation/pool-detail-${tab}?pool=${poolId}&page=${query.page || 1}&size=${query.size || 10}`
  );

  const render = () => {
    if (tab === "epochs") {
      return (
        <div ref={tableRef}>
          <DelegationEpochList
            data={dataTable as DelegationEpoch[]}
            loading={loadingTable}
            initialized={initialized}
            total={total}
            scrollEffect={scrollEffect}
          />
        </div>
      );
    }
    if (tab === "delegators") {
      return (
        <div ref={tableRef}>
          <DelegationStakingDelegatorsList
            data={dataTable as StakingDelegators[]}
            loading={loadingTable}
            initialized={initialized}
            total={total}
            scrollEffect={scrollEffect}
          />
        </div>
      );
    }
  };

  return (
    <Container>
      <DelegationDetailInfo data={data} loading={loading} poolId={poolId} />
      <DelegationDetailOverview data={data} loading={loading} />
      <DelegationDetailChart data={analyticsData} loading={loadingAnalytics} />

      <Container>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Title>{title[tab]}</Title>
          <SelectComponent
            value={tab || "epochs"}
            onChange={e => {
              setTab(e.target.value as typeof tab);
              setQuery({ page: 1, size: 10 });
              scrollEffect();
            }}
          >
            <OptionSelect value={"epochs"}>Epochs</OptionSelect>
            <OptionSelect value={"delegators"}>Staking Delegators</OptionSelect>
          </SelectComponent>
        </div>
        {render()}
      </Container>
    </Container>
  );
};

export default DelegationDetail;

const title = {
  epochs: "Epochs",
  delegators: "Staking Delegators",
};
