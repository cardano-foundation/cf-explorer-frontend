import styled from "@emotion/styled";
import { Container } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { API } from "src/commons/utils/api";
import TransactionList from "src/components/TransactionLists";
import DetailViewTransaction from "src/components/commons/DetailView/DetailViewTransaction";
import { setOnDetailView } from "src/stores/user";

const StyledContainer = styled(Container)`
  @media screen and (max-width: ${(props) => props.theme.breakpoints.values.sm}px) {
    padding-top: 0;
    margin-top: 0px !important;
  }
`;

const Transactions = () => {
  const [selected, setSelected] = useState<string | null>(null);
  const { onDetailView } = useSelector(({ user }: RootState) => user);

  useEffect(() => {
    window.history.replaceState({}, document.title);
    document.title = `Transactions List | Cardano Blockchain Explorer`;
  }, []);

  const openDetail = (_: React.MouseEvent<Element, MouseEvent>, r: Transactions) => {
    setOnDetailView(true);
    setSelected(r.hash);
  };

  const handleClose = () => {
    setOnDetailView(false);
    setSelected(null);
  };

  useEffect(() => {
    if (!onDetailView) handleClose();
  }, [onDetailView]);

  return (
    <>
      <StyledContainer>
        <TransactionList
          url={API.TRANSACTION.LIST}
          openDetail={openDetail}
          selected={selected}
          showTabView
          handleClose={handleClose}
        />
      </StyledContainer>
      <DetailViewTransaction hash={selected || ""} open={onDetailView} handleClose={handleClose} />
    </>
  );
};

export default Transactions;
