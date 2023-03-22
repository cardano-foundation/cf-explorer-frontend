import { Container } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
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
import NoRecord from "../../components/commons/NoRecord";
import { API } from "../../commons/utils/api";

const titles = {
  epochs: "Epoch",
  delegators: "Staking Delegators",
};
const DelegationDetail: React.FC = () => {
  const { poolId } = useParams<{ poolId: string }>();
  const { search, state } = useLocation<{ data?: DelegationOverview }>();
  const history = useHistory();
  const query = parse(search.split("?")[1]);
  const tab = (query.tab as "epochs" | "delegators") || "epochs";
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

  const { data, loading, initialized, error } = useFetch<DelegationOverview>(
    state?.data ? "" : `${API.DELEGATION.POOL_DETAIL_HEADER}/${poolId}`,
    state?.data
  );
  const {
    data: dataTable,
    loading: loadingTable,
    total,
    initialized: initalTable,
  } = useFetchList<DelegationEpoch | StakingDelegators>(
    `${API.DELEGATION.POOL_DETAIL}-${tab}?poolView=${poolId}&page=${query.page ? +query.page - 1 : 0}&size=${
      query.size || 10
    }`
  );

  useEffect(() => {
    window.history.replaceState({}, document.title);
    document.title = `Delegation Pool ${poolId} | Cardano Explorer`;
  }, [poolId]);

  if ((initialized && !data) || error) return <NoRecord />;

  const render = () => {
    if (tab === "epochs") {
      return (
        <div ref={tableRef}>
          <DelegationEpochList
            data={dataTable as DelegationEpoch[]}
            loading={loadingTable}
            initialized={initalTable}
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
            initialized={initalTable}
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
            setQuery({ tab: e.target.value, page: 1, size: 10 });
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
