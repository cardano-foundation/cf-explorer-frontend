import { useEffect } from "react";
import { Box, CircularProgress } from "@mui/material";
import { useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import TransactionListsFull from "src/components/TransactionListsFull";
import BlockOverview from "src/components/BlockDetail/BlockOverview";
import useFetch from "src/commons/hooks/useFetch";
import NoRecord from "src/components/commons/NoRecord";
import { API } from "src/commons/utils/api";
import FetchDataErr from "src/components/commons/FetchDataErr";

import { StyledContainer } from "./styles";

const BlockDetail = () => {
  const blockNo = useSelector(({ system }: RootState) => system.blockNo);
  const { blockId } = useParams<{ blockId: string }>();
  const { state } = useLocation<{ data?: BlockDetail }>();
  const { data, loading, initialized, error, lastUpdated, statusError } = useFetch<BlockDetail>(
    `${API.BLOCK.DETAIL}/${blockId}`,
    state?.data,
    false,
    blockNo
  );

  useEffect(() => {
    window.history.replaceState({}, document.title);
    document.title = `Block ${blockId} | Cardano Blockchain Explorer`;
  }, [blockId]);

  if (loading) {
    return (
      <Box>
        <CircularProgress />
      </Box>
    );
  }
  if (!initialized) {
    return null;
  }
  if (error && (statusError || 0) >= 500) return <FetchDataErr />;
  if ((initialized && !data) || (error && (statusError || 0) < 500)) return <NoRecord />;

  return (
    <StyledContainer>
      <BlockOverview data={data} loading={loading} lastUpdated={lastUpdated} />
      <TransactionListsFull underline={true} url={`${API.BLOCK.DETAIL}/${blockId}/txs`} />
    </StyledContainer>
  );
};

export default BlockDetail;
