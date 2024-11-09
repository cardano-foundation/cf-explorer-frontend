import { useEffect, useState } from "react";
import { Box, CircularProgress } from "@mui/material";
import { useParams } from "react-router-dom";

import TransactionListsFull from "src/components/TransactionListsFull";
import BlockOverview from "src/components/BlockDetail/BlockOverview";
import NoRecord from "src/components/commons/NoRecord";

import { StyledContainer } from "./styles";
import { ApiConnector } from "../../commons/connector/ApiConnector";
import { ApiReturnType } from "../../commons/connector/types/APIReturnType";

const BlockDetail = () => {
  // const blockNo = useSelector(({ system }: RootState) => system.blockNo);
  const { blockId } = useParams<{ blockId: string }>();
  // const { state } = useLocation<{ data?: BlockDetail }>();
  // const { data, loading, initialized, error, lastUpdated, statusError } = useFetch<BlockDetail>(
  //   `${API.BLOCK.DETAIL}/${blockId}`,
  //   state?.data,
  //   false,
  //   blockNo
  // );
  const [loading, setLoading] = useState<boolean>(true);
  const [blockData, setBlockData] = useState<ApiReturnType<Block>>();
  const [txList, setTxList] = useState<ApiReturnType<Transaction[]>>();

  const apiConnector: ApiConnector = ApiConnector.getApiConnector();

  useEffect(() => {
    window.history.replaceState({}, document.title);
    document.title = `Block ${blockId} | Cardano Blockchain Explorer`;

    apiConnector.getBlockDetail(blockId).then((data) => {
      setBlockData(data);
      setLoading(false);
    });
    apiConnector.getTxList(blockId).then((data) => {
      setTxList(data);
    });
  }, [blockId]);

  if (loading) {
    return (
      <Box>
        <CircularProgress />
      </Box>
    );
  }
  if (loading && !blockData) return <NoRecord />;

  return (
    <StyledContainer>
      <BlockOverview data={blockData?.data} loading={loading} lastUpdated={blockData?.lastUpdated} />
      <TransactionListsFull underline={true} txListResponse={txList} />
    </StyledContainer>
  );
};

export default BlockDetail;
