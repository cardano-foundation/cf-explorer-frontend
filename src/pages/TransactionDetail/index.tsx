import React from "react";
import { useParams } from "react-router-dom";
import { Box, Container, Skeleton, styled } from "@mui/material";
import TransactionOverview from "../../components/TransactionDetail/TransactionOverview";
import TransactionMetadata from "../../components/TransactionDetail/TransactionMetadata";
import useFetch from "../../commons/hooks/useFetch";
import Card from "../../components/commons/Card";

const StyledContainer = styled(Container)`
  padding: 30px 0px 40px;
`;

interface Props {}

const Transaction: React.FC<Props> = () => {
  const params = useParams<{ trxHash: string }>();
  const { data: transactionDetail, loading } = useFetch<Transaction>(`tx/${params.trxHash}`);

  return (
    <StyledContainer>
      <TransactionOverview data={transactionDetail} loading={loading} />
      <Box>
        {loading ? (
          <Card>
            <Skeleton variant="rectangular" style={{ borderRadius: 10, height: 50, marginBottom: 10 }} />
            <Skeleton variant="rectangular" style={{ borderRadius: 10, minHeight: 350 }} />
          </Card>
        ) : (
          <TransactionMetadata data={transactionDetail} loading={loading} />
        )}
      </Box>
    </StyledContainer>
  );
};

export default Transaction;
