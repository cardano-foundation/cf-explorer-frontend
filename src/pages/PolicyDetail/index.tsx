import { useEffect } from "react";
import { useParams } from "react-router-dom";

import useFetch from "src/commons/hooks/useFetch";
import { API } from "src/commons/utils/api";
import NoRecord from "src/components/commons/NoRecord";
import PolicyOverview from "src/components/PolicyDetail/PolicyOverview";
import PolicyTable from "src/components/PolicyDetail/PolicyTable";

import { StyledContainer } from "./styles";

const PolicyDetail = () => {
  const { policyId } = useParams<{ policyId: string }>();
  const { data, loading, initialized, error } = useFetch<PolicyDetail>(`${API.POLICY}/${policyId}`);

  useEffect(() => {
    window.history.replaceState({}, document.title);
    document.title = `Policy ${policyId} | Iris - Cardano Blockchain Explorer`;
  }, [policyId]);

  if (!initialized) {
    return null;
  }

  if ((initialized && !data) || error) return <NoRecord />;

  return (
    <StyledContainer>
      <PolicyOverview data={data} loading={loading} />
      <PolicyTable />
    </StyledContainer>
  );
};

export default PolicyDetail;
