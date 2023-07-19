import styled from "@emotion/styled";
import { Container } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { API } from "src/commons/utils/api";
import TransactionList from "src/components/TransactionLists";
import DetailViewTransaction from "src/components/commons/DetailView/DetailViewTransaction";
import { setOnDetailView } from "src/stores/user";

const StyledContainer = styled(Container)`
  padding-top: 20px;
  @media screen and (max-width: ${(props) => props.theme.breakpoints.values.sm}px) {
    padding-top: 10px;
    margin-top: 0px !important;
  }
`;

const Transactions = () => {
  const [hash, setHash] = useState<string | null>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const { onDetailView } = useSelector(({ user }: RootState) => user);

  useEffect(() => {
    window.history.replaceState({}, document.title);
    document.title = `Transactions List | Iris - Cardano Blockchain Explorer`;
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
      {hash && onDetailView && <DetailViewTransaction hash={hash} handleClose={handleClose} />}
    </>
  );
};

export default Transactions;
