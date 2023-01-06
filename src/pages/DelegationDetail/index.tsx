import { Container } from "@mui/material";
import React, { useRef, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { parse, stringify } from "qs";
import { BiChevronDown } from "react-icons/bi";

import useFetch from "../../commons/hooks/useFetch";

import DelegationDetailInfo from "../../components/DelegationDetail/DelegationDetailInfo";
import DelegationDetailOverview from "../../components/DelegationDetail/DelegationDetailOverview";
import DelegationDetailChart from "../../components/DelegationDetail/DelegationDetailChart";

import { OptionSelect, StyledSelect, Title } from "./styles";
import {
  DelegationEpochList,
  DelegationStakingDelegatorsList,
} from "../../components/DelegationDetail/DelegationDetailList";
import useFetchList from "../../commons/hooks/useFetchList";

interface IDelegationDetail {}

const titles = {
  epochs: "Epoch",
  delegators: "Staking Delegators",
};
const DelegationDetail: React.FC<IDelegationDetail> = () => {
  const { poolId } = useParams<{ poolId: string }>();
  const { search } = useLocation();
  const history = useHistory();
  const query = parse(search.split("?")[1]);
  const [tab, setTab] = useState<"epochs" | "delegators">("epochs");
  const [saving, setSaving] = useState<boolean>(false);
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
    data: dataTable,
    loading: loadingTable,
    total,
    initialized,
  } = useFetchList<DelegationEpoch | StakingDelegators>(
    `/delegation/pool-detail-${tab}?poolView=${poolId}&page=${query.page ? +query.page - 1 : 0}&size=${
      query.size || 10
    }`
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
      <DelegationDetailInfo data={data} loading={loading} poolId={poolId} saving={saving} setSaving={setSaving} />
      <DelegationDetailOverview data={data} loading={loading} />
      <DelegationDetailChart poolId={poolId} />

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Title>{titles[tab]}</Title>
        <StyledSelect
          value={tab}
          onChange={e => {
            setTab(e.target.value as typeof tab);
            setQuery({ page: 1, size: 10 });
            scrollEffect();
          }}
          IconComponent={() => <BiChevronDown size={30} style={{ paddingRight: 10 }} />}
        >
          <OptionSelect value="epochs">Epoch</OptionSelect>
          <OptionSelect value="delegators">Staking Delegators</OptionSelect>
        </StyledSelect>
      </div>
      {render()}
    </Container>
  );
};

export default DelegationDetail;
