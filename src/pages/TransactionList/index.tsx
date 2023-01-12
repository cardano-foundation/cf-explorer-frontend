import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

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
  const [hash, setHash] = useState<string | null>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const { width } = useWindowSize();
  const history = useHistory();

  useEffect(() => {
    window.history.replaceState({}, document.title);
    document.title = `Transactions List | Cardano Explorer`;
  }, []);

  const openDetail = (_: any, r: Transactions, index: number) => {
    if (width > 1023) {
      setOnDetailView(true);
      setHash(r.hash);
      setSelected(index);
    } else history.push(details.transaction(r.hash));
  };

  const handleClose = () => {
    setOnDetailView(false);
    setHash(null);
    setSelected(null);
  };
  return (
    <StyledContainer>
      <TransactionList url="tx/list" openDetail={openDetail} selected={selected} hash={hash} />
      {hash && <DetailViewTransaction hash={hash} handleClose={handleClose} />}
    </StyledContainer>
  );
};

export default Transactions;
