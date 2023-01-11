import React from "react";
import { useLocation, useParams } from "react-router-dom";
import { Box, Container, Skeleton, styled } from "@mui/material";
import TransactionOverview from "../../components/TransactionDetail/TransactionOverview";
import TransactionMetadata from "../../components/TransactionDetail/TransactionMetadata";
import useFetch from "../../commons/hooks/useFetch";
import Card from "../../components/commons/Card";
import NoRecord from "../../components/commons/NoRecord";

const StyledContainer = styled(Container)`
  padding: 30px 0px 40px;
`;

const Transaction: React.FC = () => {
  const { trxHash } = useParams<{ trxHash: string }>();
  const { state } = useLocation<{ data?: Transaction }>();
  const { data, loading, initialized, error } = useFetch<Transaction>(state?.data ? "" : `tx/${trxHash}`, state?.data);

  if ((initialized && !data) || error) return <NoRecord />;

  return (
    <StyledContainer>
      <TransactionOverview data={data} loading={loading} />
      <Box>
        {loading ? (
          <Card>
            <Skeleton variant="rectangular" style={{ borderRadius: 10, height: 50, marginBottom: 10 }} />
            <Skeleton variant="rectangular" style={{ borderRadius: 10, minHeight: 350 }} />
          </Card>
        ) : (
          <TransactionMetadata data={data} loading={loading} />
        )}
      </Box>
    </StyledContainer>
  );
};

export default Transaction;
