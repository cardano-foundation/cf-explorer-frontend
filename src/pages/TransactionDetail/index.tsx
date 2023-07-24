import React, { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Box, Container, Skeleton, styled } from "@mui/material";

import TransactionOverview from "src/components/TransactionDetail/TransactionOverview";
import TransactionMetadata from "src/components/TransactionDetail/TransactionMetadata";
import useFetch from "src/commons/hooks/useFetch";
import Card from "src/components/commons/Card";
import NoRecord from "src/components/commons/NoRecord";
import { API } from "src/commons/utils/api";
import { REFRESH_TIMES } from "src/commons/utils/constants";

const StyledContainer = styled(Container)`
  max-width: 95vw !important;
  padding: 30px 16px 40px;

  @media screen and (max-width: ${(props) => props.theme.breakpoints.values.sm}px) {
    padding-top: 10px;
    margin-top: 0px !important;
  }
`;

const Transaction: React.FC = () => {
  const { trxHash } = useParams<{ trxHash: string }>();
  const { state } = useLocation<{ data?: Transaction }>();
  const { data, loading, initialized, error, lastUpdated } = useFetch<Transaction>(
    `${API.TRANSACTION.DETAIL}/${trxHash}`,
    state?.data,
    false,
    REFRESH_TIMES.TRANSACTION_DETAIL
  );

  useEffect(() => {
    window.history.replaceState({}, document.title);
    document.title = `Transaction ${trxHash} | Iris - Cardano Blockchain Explorer`;
  }, [trxHash]);

  if (!initialized) {
    return null;
  }
  if ((initialized && !data) || error) return <NoRecord />;

  return (
    <StyledContainer>
      <TransactionOverview data={data} loading={loading} lastUpdated={lastUpdated} />
      <Box>
        {!initialized ? (
          <Card>
            <Skeleton variant="rectangular" style={{ borderRadius: 10, height: 50, marginBottom: 10 }} />
            <Skeleton variant="rectangular" style={{ borderRadius: 10, minHeight: 350 }} />
          </Card>
        ) : (
          <TransactionMetadata data={data} loading={!initialized} />
        )}
      </Box>
    </StyledContainer>
  );
};

export default Transaction;
