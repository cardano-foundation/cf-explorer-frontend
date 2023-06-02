import React, { useEffect, useState } from "react";
import { Container } from "@mui/material";
import styled from "@emotion/styled";

import TransactionList from "src/components/TransactionLists";
import { setOnDetailView } from "src/stores/user";
import DetailViewTransaction from "src/components/commons/DetailView/DetailViewTransaction";
import { API } from "src/commons/utils/api";

const StyledContainer = styled(Container)`
  padding: 20px 16px 40px;
  @media screen and (max-width: ${(props) => props.theme.breakpoints.values.sm}px) {
    padding-top: 10px;
    margin-top: 0px !important;
  }
`;

const Transactions = () => {
  const [hash, setHash] = useState<string | null>(null);
  const [selected, setSelected] = useState<number | null>(null);

  useEffect(() => {
    window.history.replaceState({}, document.title);
    document.title = `Transactions List | Cardano Explorer`;
  }, []);

  const openDetail = (_: any, r: Transactions, index: number) => {
    setOnDetailView(true);
    setHash(r.hash);
    setSelected(index);
  };

  const handleClose = () => {
    setOnDetailView(false);
    setHash(null);
    setSelected(null);
  };
  return (
    <>
      <StyledContainer>
        <TransactionList
          url={API.TRANSACTION.LIST}
          openDetail={openDetail}
          selected={selected}
          showTabView
          hash={hash}
          handleClose={handleClose}
        />
      </StyledContainer>
      {hash && <DetailViewTransaction hash={hash} handleClose={handleClose} />}
    </>
  );
};

export default Transactions;
