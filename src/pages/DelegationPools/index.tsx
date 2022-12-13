import { Container } from "@mui/material";
import { parse, stringify } from "qs";
import { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

import useFetchList from "../../commons/hooks/useFetchList";
import useFetch from "../../commons/hooks/useFetch";

import Card from "../../components/commons/Card";
import OverViews from "../../components/DelegationPool/DelegationOverview";
import { Horizon, SearchContainer, StyledInput } from "./styles";
import { HeaderSearchIcon } from "../../commons/resources";
import DelegationLists from "../../components/DelegationPool/DelegationList";

interface DelegationsProps {}

const Delegations: React.FC<DelegationsProps> = () => {
  const { search } = useLocation();
  const history = useHistory();
  const query = parse(search.split("?")[1]);
  const [searchPools, setSearchPools] = useState(query.searchPools ? (query.searchPools as string) : "");

  const setQuery = (query: any) => {
    history.push({ search: stringify(query) });
  };

  const { data: overviews, loading: overviewsLoading } = useFetch<OverViewDelegation>("/delegation/header");
  const {
    data: delegationLists,
    total,
    loading,
    initialized,
  } = useFetchList<Delegators>("/delegation/pool-list", {
    page: query.page ? +query.page : 1,
    size: query.size ? (query.size as string) : 10,
    search: query.searchPools ? (query.searchPools as string) : "",
  });

  console.log(delegationLists);
  

  return (
    <Container>
      <Card title="Delegation Pools Explorer">
        <OverViews data={overviews} loading={overviewsLoading} />
      </Card>
      <Horizon />
      <SearchContainer>
        <StyledInput
          placeholder="Search Pools"
          onChange={e => setSearchPools(e.target.value)}
          value={searchPools || ""}
          onKeyUp={e => {
            if (e.key === "Enter") {
              setQuery({ searchPools, page: 1, size: 10 });
            }
          }}
        />
        <button
          style={{ background: "transparent", border: "none", cursor: "pointer" }}
          onClick={() => setQuery({ searchPools, page: 1, size: 10 })}
        >
          <img src={HeaderSearchIcon} alt="Search" />
        </button>
      </SearchContainer>
      <DelegationLists data={delegationLists} total={total} loading={loading} initialized={initialized} />
    </Container>
  );
};

export default Delegations;
