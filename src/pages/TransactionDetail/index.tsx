import { Box, Container, styled } from "@mui/material";
import React, { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";

import useFetch from "src/commons/hooks/useFetch";
import { API } from "src/commons/utils/api";
import TransactionMetadata from "src/components/TransactionDetail/TransactionMetadata";
import TransactionOverview from "src/components/TransactionDetail/TransactionOverview";
import Card from "src/components/commons/Card";
import { CommonSkeleton } from "src/components/commons/CustomSkeleton";
import NoRecord from "src/components/commons/NoRecord";

const StyledContainer = styled(Container)`
  padding: 30px 16px 40px;

  @media screen and (max-width: ${(props) => props.theme.breakpoints.values.sm}px) {
    margin-top: 0px !important;
  }
`;

const TransactionDetail: React.FC = () => {
  const { trxHash } = useParams<{ trxHash: string }>();
  const { state } = useLocation<{ data?: Transaction }>();
  const { data, loading, initialized, error } = useFetch<Transaction>(
    `${API.TRANSACTION.DETAIL}/${trxHash}`,
    state?.data
  );

  useEffect(() => {
    window.history.replaceState({}, document.title);
    document.title = `Transaction ${trxHash} | Cardano Blockchain Explorer`;
  }, [trxHash]);

  if (!initialized) {
    return null;
  }
  if ((initialized && !data) || error) return <NoRecord />;

  return (
    <StyledContainer>
      <TransactionOverview data={data} loading={loading} />
      <Box>
        {!initialized ? (
          <Card>
            <CommonSkeleton variant="rectangular" style={{ borderRadius: 10, height: 50, marginBottom: 10 }} />
            <CommonSkeleton variant="rectangular" style={{ borderRadius: 10, minHeight: 350 }} />
          </Card>
        ) : (
          <TransactionMetadata data={data} loading={!initialized} />
        )}
      </Box>
    </StyledContainer>
  );
};

export default TransactionDetail;
