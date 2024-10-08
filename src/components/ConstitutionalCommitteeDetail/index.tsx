import { Box } from "@mui/material";
import { useParams } from "react-router-dom";

import useFetch from "src/commons/hooks/useFetch";
import { API } from "src/commons/utils/api";

import Overview from "./Overview";
import Tabs from "./Tabs";
import NoRecord from "../commons/NoRecord";
import FetchDataErr from "../commons/FetchDataErr";

const ConstitutionalCommitteeDetail = () => {
  const { CCid } = useParams<{ CCid?: string }>();
  const { data, loading, error, statusError } = useFetch<CCDetailOVerview>(API.COMMITTEE.DETAIL_OVERVIEW(CCid || ""));

  if (error && (statusError || 0) < 500) {
    return <NoRecord m="170px 0px" padding={`0 !important`} />;
  }
  if (error && (statusError || 0) >= 500) {
    return <FetchDataErr m="170px 0px" padding={`0 !important`} />;
  }
  return (
    <Box>
      <Overview data={data} loading={loading} />
      <Tabs />
    </Box>
  );
};

export default ConstitutionalCommitteeDetail;
