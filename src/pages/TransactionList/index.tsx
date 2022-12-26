import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { parse } from "qs";

import useFetchList from "../../commons/hooks/useFetchList";
import TransactionList from "../../components/TransactionLists";
import { Container } from "@mui/material";
import { useWindowSize } from "react-use";
import { setOnDetailView } from "../../stores/user";
import { details } from "../../commons/routers";
import DetailViewTransaction from "../../components/commons/DetailView/DetailViewTransaction";
import styled from "@emotion/styled";

  const StyledContainer = styled(Container)`
  padding: 20px 0 40px;
`;


interface Props {}

const Transactions: React.FC<Props> = () => {
  const { search } = useLocation();
  const query = parse(search.split("?")[1]);
  const [detailView, setDetailView] = useState<string | null>(null);
  const { width } = useWindowSize();
  const history = useHistory();

  const {
    data: transactions,
    loading: transactionsLoading,
    initialized,
    total,
    totalPage,
    currentPage,
  } = useFetchList<Transactions>("tx/list", {
    page: query.page ? +query.page - 1 : 0,
    size: query.size ? (query.size as string) : 10,
  });

  const openDetail = (_: any, r: Transactions) => {
    if (width > 1023) {
      setOnDetailView(true);
      setDetailView(r.hash);
    } else history.push(details.transaction(r.hash));
  };

  const handleClose = () => {
    setOnDetailView(false);
    setDetailView(null);
  };
  const selected = transactions?.findIndex(item => item.hash === detailView);
  return (
    <StyledContainer>
      <TransactionList
        currentPage={currentPage}
        loading={transactionsLoading}
        initialized={initialized}
        transactions={transactions}
        total={total}
        totalPage={totalPage}
        openDetail={openDetail}
        selected={selected}
      />
      {detailView && <DetailViewTransaction hash={detailView} handleClose={handleClose} />}
    </StyledContainer>
  );
};

export default Transactions;
