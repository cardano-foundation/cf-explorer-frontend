import { Grid, Box } from "@mui/material";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { stringify } from "querystring";
import { useEffect, useState } from "react";
import { parse } from "qs";

import useFetchList from "src/commons/hooks/useFetchList";
import { API } from "src/commons/utils/api";
import { TimeDuration } from "src/components/TransactionLists/styles";
import { EmptyRecord, FooterTable } from "src/components/commons/Table";
import FormNowMessage from "src/components/commons/FormNowMessage";
import NoRecord from "src/components/commons/NoRecord";

import CardVotesOverview from "./CardVotesOverview";
import FilterVotesOverview from "./FilterVotesOverview";

export interface GovernanceVote {
  voterHash: string;
  timestamp: string;
  voterType:
    | "CONSTITUTIONAL_COMMITTEE_HOT_KEY_HASH"
    | "CONSTITUTIONAL_COMMITTEE_HOT_SCRIPT_HASH"
    | "DREP_KEY_HASH"
    | "DREP_SCRIPT_HASH"
    | "STAKING_POOL_KEY_HASH";
  votingStake: number | null;
  votingPower: number | null;
  vote: "NO" | "YES" | "ABSTAIN" | "NONE" | "ANY";
  isRepeatVote: boolean;
}

export default function VotesOverview() {
  const initParams = {
    page: 0,
    size: 6
  };

  const { txHash, index } = useParams<{ txHash: string; index: string }>();
  const history = useHistory();
  const { search } = useLocation();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [params, setParams] = useState<any>(initParams);

  const query = parse(search.split("?")[1]);

  const optionList = [3, 6, 9];

  useEffect(() => {
    setParams({
      ...query,
      page: query?.page && +query?.page >= 1 ? +query?.page - 1 : 0,
      size: +(query?.size || "") || 6
    });
  }, [JSON.stringify(query)]);

  const { data, total, isDataOverSize, lastUpdated, error, statusError, loading } = useFetchList<GovernanceVote>(
    `${API.POOL_CERTIFICATE.POOL}/votes?txHash=${txHash}&index=${index}`,
    { ...params },
    false
  );

  const renderCard = () => {
    if (data.length === 0 || error) return <NoRecord />;
    if (error && (statusError ?? 0) >= 500) return <EmptyRecord />;
    return (
      <Box>
        <Grid container spacing={3}>
          {data?.map((value, index) => (
            <Grid container item xs={12} md={6} lg={4} key={index}>
              <CardVotesOverview data={value} />
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  };

  return (
    <>
      <Box marginBottom={"32px"} display="flex" justifyContent={"space-between"} alignItems={"center"}>
        <TimeDuration>
          <FormNowMessage time={lastUpdated} />
        </TimeDuration>
        <FilterVotesOverview />
      </Box>
      <Box mt={3}>{renderCard()}</Box>
      <FooterTable
        pagination={{
          page: +params.page,
          size: +params.size || 6,
          total: total,
          onChange: (page, size) => {
            history.replace({ search: stringify({ page, size }) });
          }
        }}
        total={{ count: total || 0, title: "", isDataOverSize }}
        loading={loading}
        optionList={optionList}
      />
    </>
  );
}
