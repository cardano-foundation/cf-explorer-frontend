import { Grid, Box } from "@mui/material";

import useFetchList from "src/commons/hooks/useFetchList";
import { API } from "src/commons/utils/api";
import { TimeDuration } from "src/components/TransactionLists/styles";

import CardVotesOverview from "./CardVotesOverview";
import FilterVotesOverview from "./FilterVotesOverview";

export interface GovernanceVote {
  index: number;
  indexType: number;
  status: string;
  txHash: string;
  type: string;
  vote: string;
  votingPower: string;
  isRepeatVote: boolean;
  voterHash: string;
}
const hash = "drep1dy63xfdv0va2aruqe0huzy65h6a6vln6r09rq5lt87gqcmh9u96";
export default function VotesOverview() {
  const { data } = useFetchList<GovernanceVote>(
    hash ? `${API.POOL_CERTIFICATE.POOL}/${hash}` : API.POOL_CERTIFICATE.POOL,
    undefined,
    false
  );

  const renderCard = () => {
    return (
      <Box>
        <Box marginBottom={"32px"} display="flex" justifyContent={"space-between"} alignItems={"center"}>
          <TimeDuration>Updating...</TimeDuration>

          <FilterVotesOverview />
        </Box>
        <Grid container spacing={3}>
          {data?.map((value, index) => (
            <Grid container item xs={12} md={6} lg={4} key={index}>
              <CardVotesOverview />
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  };

  return (
    <>
      <Box mt={3}>{renderCard()}</Box>
    </>
  );
}
