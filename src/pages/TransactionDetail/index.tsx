import React, { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Box, Container, Skeleton, styled } from "@mui/material";
import TransactionOverview from "../../components/TransactionDetail/TransactionOverview";
import TransactionMetadata from "../../components/TransactionDetail/TransactionMetadata";
import useFetch from "../../commons/hooks/useFetch";
import Card from "../../components/commons/Card";
import NoRecord from "../../components/commons/NoRecord";
import { API } from "../../commons/utils/api";
import { REFRESH_TIMES } from "../../commons/utils/constants";
import ScrollToTop from "~/components/ScrollToTop";

const StyledContainer = styled(Container)`
  padding: 30px 16px 40px;
`;

const Transaction: React.FC = () => {
  const { trxHash } = useParams<{ trxHash: string }>();
  const { state } = useLocation<{ data?: Transaction }>();
  const { data, initialized, error } = useFetch<Transaction>(
    `${API.TRANSACTION.DETAIL}/${trxHash}`,
    state?.data,
    false,
    REFRESH_TIMES.EPOCH_DETAIL
  );

  useEffect(() => {
    window.history.replaceState({}, document.title);
    document.title = `Transaction ${trxHash} | Cardano Explorer`;
  }, [trxHash]);

  if ((initialized && !data) || error) return <NoRecord />;

  return (
    <StyledContainer>
      <ScrollToTop />
      <TransactionOverview data={data} loading={!initialized} />
      <Box>
        {!initialized ? (
          <Card>
            <Skeleton variant='rectangular' style={{ borderRadius: 10, height: 50, marginBottom: 10 }} />
            <Skeleton variant='rectangular' style={{ borderRadius: 10, minHeight: 350 }} />
          </Card>
        ) : (
          <TransactionMetadata data={data} loading={!initialized} />
        )}
      </Box>
    </StyledContainer>
  );
};

export default Transaction;
