import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../commons/hooks/useFetch";
import NoRecord from "../../components/commons/NoRecord";
import PolicyOverview from "../../components/PolicyDetail/PolicyOverview";
import PolicyTable from "../../components/PolicyDetail/PolicyTable";
import { StyledContainer } from "./styles";

const PolicyDetail = () => {
  const { policyId } = useParams<{ policyId: string }>();
  const { data, loading, initialized, error } = useFetch<PolicyDetail>(`/policy/${policyId}`);

  useEffect(() => {
    window.history.replaceState({}, document.title);
    document.title = `Policy ${policyId} | Cardano Explorer`;
  }, [policyId]);
  
  if ((initialized && !data) || error) return <NoRecord />;

  return (
    <StyledContainer>
      <PolicyOverview data={data} loading={loading} />
      <PolicyTable />
    </StyledContainer>
  );
};

export default PolicyDetail;
