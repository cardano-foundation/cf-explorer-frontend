import { Box, CircularProgress, Container, styled } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

import useFetch from "src/commons/hooks/useFetch";
import { API } from "src/commons/utils/api";
import TransactionMetadata from "src/components/TransactionDetail/TransactionMetadata";
import TransactionOverview from "src/components/TransactionDetail/TransactionOverview";
import FetchDataErr from "src/components/commons/FetchDataErr";
import NoRecord from "src/components/commons/NoRecord";
import { ApiConnector } from "../../commons/connector/ApiConnector";
import { ApiReturnType } from "../../commons/connector/types/APIReturnType";

const StyledContainer = styled(Container)`
  padding: 30px 16px 40px;

  @media screen and (max-width: ${(props) => props.theme.breakpoints.values.sm}px) {
    margin-top: 0px !important;
  }
`;

const TransactionDetail: React.FC = () => {
  const { trxHash } = useParams<{ trxHash: string }>();
  const [txData, setTxData] = useState<ApiReturnType<Transaction>>();
  const [loading, setLoading] = useState<boolean>(true);
  const apiConnector: ApiConnector = ApiConnector.getApiConnector();

  useEffect(() => {
    window.history.replaceState({}, document.title);
    document.title = `Transaction ${trxHash} | Cardano Blockchain Explorer`;
    apiConnector.getTx(trxHash).then((data) => {
      setTxData(data);
      setLoading(false);
    });
  }, [trxHash]);

  if (loading) {
    return (
      <Box>
        <CircularProgress />
      </Box>
    );
  }

  if (!loading && !txData) return <NoRecord />;

  return (
    <StyledContainer>
      <TransactionOverview data={txData?.data} loading={loading} />
      <Box>
        <TransactionMetadata data={txData?.data} loading={loading} />
      </Box>
    </StyledContainer>
  );
};

export default TransactionDetail;
